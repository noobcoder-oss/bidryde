import React from "react";
import Grid from "@mui/material/Grid";
import { assets } from "@/assets";

const footerAssets = {
  carLogo: assets.images.footer.blueLogoTransp2,
  bidrydeLogo: assets.images.footer.blueWordmarkTransp2,
  fbIcon: assets.images.footer.facebook,
  twitter: assets.images.footer.twitter,
  linkedIn: assets.images.footer.linkedinIn,
  youtube: assets.images.footer.youtube,
  instagram: assets.images.footer.instagram,
  mailIcon: assets.images.footer.mailIcon,
  hillview: assets.images.footer.hillview, // Path to the hillview image
};

import "./Footer.css";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <div
      className="footer"
      
    >
      <Grid className="x" container>
        <Grid item>
          <div className="footerLeft">
            <div className="footerLogo">
              <Image src={footerAssets.carLogo} alt="Car Logo" />
              
            </div>
            <p className="footerText">
            A self-drive car rental marketplace where<br /> you can book any car you want and at the <br />same time, host any car you have.
            </p>
            <div className="socialIcons">
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <a href="https://www.facebook.com/bidryde?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
                    <Image src={footerAssets.fbIcon} alt="facebook" />
                  </a>
                </Grid>
                <Grid item xs={2}>
                  <a href="https://twitter.com/bidryde/" target="_blank" rel="noopener noreferrer">
                    <Image src={footerAssets.twitter} alt="X" />
                  </a>
                </Grid>
                <Grid item xs={2}>
                  <a href="https://www.linkedin.com/company/bidryde/" target="_blank" rel="noopener noreferrer">
                    <Image src={footerAssets.linkedIn} alt="linkedIn" />
                  </a>
                </Grid>
                <Grid item xs={2}>
                  <a href="https://www.youtube.com/c/Bidryde" target="_blank" rel="noopener noreferrer">
                    <Image src={footerAssets.youtube} alt="youtube" />
                  </a>
                </Grid>
                <Grid item xs={2}>
                  <a href="https://www.instagram.com/bidryde/" target="_blank" rel="noopener noreferrer">
                    <Image src={footerAssets.instagram} alt="instagram" />
                  </a>
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>

        <Grid item className="linkSectionContainer">
          <Grid item>
            <div className="linkSection">
              <h4 style={{ color: "#276EBC", marginBottom: "2.125rem", fontSize: "18px" }}>Policies</h4>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <Link href="/terms-of-service" className="footerLink">
                    Terms of Service
                  </Link>
                </Grid>
                <Grid item className="footerLink " xs={12} md={12}>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </Grid>
                <Grid item className="footerLink" xs={12} md={12}>
                  <Link href="/fee-policy">Fees Policy</Link>
                </Grid>
              </Grid>
            </div>
          </Grid>

          <Grid item>
            <div className="linkSection quicklinks">
              <h4 style={{ color: "#276EBC", marginBottom: "2.125rem" }}>Quick links</h4>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <Link href="/Host" className="footerLink">
                    Host Car
                  </Link>
                </Grid>
                <Grid item className="footerLink " xs={12} md={12}>
                  <Link href="/joinWithUs" className="footerLink">
                    Attach us
                  </Link>
                </Grid>
                <Grid item className="footerLink" xs={12} md={12}>
                  <Link href="/faq" className="footerLink">
                    FAQ&apos;s
                  </Link>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>

        <Grid item>
          <div className="footerRight">
            <Grid container className="iconGrid">
              <Grid item className="iconGridItem">
                <svg
                  className="callIcon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="125"
                  height="125"
                  viewBox="0 0 125 125"
                  fill="none"
                >
                  <circle cx="62.5" cy="62.5" r="62.5" fill="#EEEEEE" />
                  <path
                    d="M43.8711 58.6978C48.9911 68.76 57.24 76.9733 67.3022 82.1289L75.1244 74.3067C76.0844 73.3467 77.5067 73.0267 78.7511 73.4533C82.7333 74.7689 87.0356 75.48 91.4444 75.48C93.4 75.48 95 77.08 95 79.0356V91.4444C95 93.4 93.4 95 91.4444 95C58.0578 95 31 67.9422 31 34.5556C31 32.6 32.6 31 34.5556 31H47C48.9556 31 50.5556 32.6 50.5556 34.5556C50.5556 39 51.2667 43.2667 52.5822 47.2489C52.9733 48.4933 52.6889 49.88 51.6933 50.8756L43.8711 58.6978Z"
                    fill="#276EBC"
                  />
                </svg>
                <p className="iconText">0404 895 7007</p>
              </Grid>
              <Grid item className="iconGridItem">
                <Image
                  src={footerAssets.mailIcon}
                  alt="mailIcon"
                  className="milIconImg"
                />
                <p className="iconText">support@bidryde.in</p>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <div className="line"></div> 
      
      <div className="copy_right_text">
        © Bid rYde Mobility Technologies Private Limited. All Rights Reserved
      </div>
    </div>
  );
}

export default Footer;
