import { useState, useEffect } from "react";
import styles from "./AddEvent.module.css";

const AddEvent = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const envApiUrl = import.meta.env.VITE_API_URL;
  const explicitUsePhp = (
    import.meta.env.VITE_USE_PHP_BACKEND || ""
  ).toLowerCase();
  // If VITE_USE_PHP_BACKEND is set, use it. Otherwise infer PHP when the API URL contains '/backend'
  let usePhp = explicitUsePhp === "true";
  if (explicitUsePhp === "") {
    usePhp = Boolean(envApiUrl && envApiUrl.includes("/backend"));
  }

  const phpSavePath =
    import.meta.env.VITE_PHP_SAVE_POST_PATH || "/save_post.php";
  // Use the Vite-provided API URL directly when present. Do NOT fall back to hard-coded defaults.
  const apiBase = envApiUrl || "";

  const trimSlash = (s) => (s || "").replace(/\/$/, "");
  const saveUrl = apiBase
    ? usePhp
      ? `${trimSlash(apiBase)}${phpSavePath}`
      : `${trimSlash(apiBase)}/api/posts`
    : "";

  // Manage preview URL and revoke object URLs when changed
  useEffect(() => {
    let objUrl;
    if (imageFile) {
      objUrl = URL.createObjectURL(imageFile);
      setPreviewUrl(objUrl);
    } else if (image) {
      setPreviewUrl(image);
    } else {
      setPreviewUrl("");
    }

    return () => {
      if (objUrl) URL.revokeObjectURL(objUrl);
    };
  }, [imageFile, image]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    if (!saveUrl) {
      setMessage(
        "VITE_API_URL is not configured. Please set it in your .env file."
      );
      setLoading(false);
      return;
    }
    try {
      let res;

      if (!usePhp && imageFile) {
        setMessage(
          "File upload is supported only with the PHP backend. Set VITE_USE_PHP_BACKEND=true or provide an image URL."
        );
        setLoading(false);
        return;
      }

      if (usePhp) {
        const fd = new FormData();
        fd.append("title", title);
        fd.append("content", content);
        fd.append("expiry_date", expiryDate);
        if (imageFile) fd.append("image_file", imageFile);
        else fd.append("image", image || "");

        res = await fetch(saveUrl, {
          method: "POST",
          body: fd,
        });
      } else {
        res = await fetch(saveUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            content,
            image,
            expiry_date: expiryDate,
          }),
        });
      }

      let data;
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        // Non-JSON response (often HTML error page). Read as text for diagnostics.
        const text = await res.text();
        throw new Error(text || "Server returned non-JSON response");
      }

      if (!res.ok) throw new Error(data.error || data.message || "Failed");

      setMessage("Event added successfully");
      setTitle("");
      setContent("");
      setImage("");
      setImageFile(null);
      setExpiryDate("");
    } catch (err) {
      setMessage(err.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.heading}>Add Event</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>Title</label>
            <input
              className={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter event title"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Content</label>
            <textarea
              className={styles.textarea}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="Describe the event"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Image file</label>
            <input
              className={styles.input}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files && e.target.files[0];
                setImageFile(f || null);
                // clear image url when a file is chosen
                if (f) setImage("");
              }}
            />
            <small className={styles.label} style={{ fontSize: 12 }}>
              Or enter an image URL below if you prefer
            </small>
            <input
              className={styles.input}
              value={image}
              onChange={(e) => {
                setImage(e.target.value);
                if (e.target.value) setImageFile(null);
              }}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Expiry date</label>
            <input
              className={styles.input}
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="YYYY-MM-DD"
            />
          </div>

          {previewUrl && (
            <div className={styles.previewWrap}>
              <img
                src={previewUrl}
                alt="preview"
                className={styles.preview}
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
          )}

          <div className={styles.actions}>
            <button
              className={styles.button}
              type="submit"
              disabled={loading || !saveUrl}
            >
              {loading ? "Saving..." : "Save Event"}
            </button>
          </div>
        </form>
        {message && (
          <p
            className={
              message.toLowerCase().includes("success")
                ? styles.success
                : styles.error
            }
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddEvent;
