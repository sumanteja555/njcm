import { useState, useEffect } from "react";
import Accordion from "../components/HomePage/Accordion/Accordion";
import Carousel from "../components/HomePage/Carousel/Carousel";
import PrayerRequest from "../components/HomePage/PrayerRequest/PrayerRequest";
import PrayerTimings from "../components/HomePage/PrayerTimings/PrayerTimings";

// API URL - adjust based on your environment
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/get_posts.php`);

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();

        // Transform the data to match accordion format
        const accordionData = data.posts.map((post) => ({
          id: post.s_no,
          title: post.title,
          content: post.content,
          image: post.image || null,
          expiryDate: post.expiry_date,
        }));

        setPosts(accordionData);
        setError(null);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Carousel />
      <Accordion accordionData={posts} loading={loading} error={error} />
      <PrayerTimings />
      <PrayerRequest />
    </>
  );
}
