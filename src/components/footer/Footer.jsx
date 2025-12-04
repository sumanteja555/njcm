import classes from "./Footer.module.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import CopyrightIcon from "@mui/icons-material/Copyright";

export default function Footer() {
  return (
    <>
      <div id={classes.container}>
        <div id={classes.subContainer}>
          <div id={classes.copyright}>
            2024
            <CopyrightIcon className={classes.copyrightIcon} />
            Copyright New Jersualem Covenant Ministries
          </div>
          <div id={classes.socialIcons}>
            <a href="" className={classes.socialLink}>
              <FacebookIcon className={classes.facebookIcon} />
            </a>
            <a href="" className={classes.socialLink}>
              <WhatsAppIcon className={classes.whatsappIcon} />
            </a>
            <a
              href="https://www.instagram.com/njcmrpl"
              className={classes.socialLink}
            >
              <InstagramIcon className={classes.instagramIcon} />
            </a>
            <a
              href="https://www.youtube.com/channel/UCDMbIQgMGajBbQfwAoCYE2A"
              className={classes.socialLink}
            >
              <YouTubeIcon className={classes.youtubeIcon} />
            </a>
          </div>
        </div>
        <p id={classes.developer}>
          <a href="https://www.codetroveindia.com">Built by CODE TROVE</a>
        </p>
      </div>
    </>
  );
}
