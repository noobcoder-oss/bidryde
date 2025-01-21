"use client";

import { CssButtonOutline, Footer, Navbar } from "@/Components";
import { assets } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Custom404() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const styles = {
    page: {
      height: "100vh",
      backgroundColor: "#D4E9FF",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
    },
    content: {
      zIndex: "10",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "archivo",
      padding: "0 20px",
      textAlign: "center",
    },
    vector: {
      height: "100vh",
      position: "absolute",
      top: "8%",
      left: "0",
      gap: "2rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    h1: {
      margin: "2%",
      fontSize: "clamp(24px, 5vw, 32px)",
    },
    h5: {
      margin: "5%",
      fontSize: "clamp(16px, 3vw, 20px)",
    },
    image: {
      width: "clamp(60px, 10vw, 100px)",
      height: "auto",
    },
    button: {
      margin: "0 1rem 0 1rem",
      padding: "clamp(8px, 2vw, 10px) clamp(20px, 4vw, 30px)",
      fontSize: "clamp(14px, 2vw, 1rem)",
      border: "1px solid #276EBC",
      backgroundColor: "#FFFFFF",
      textColor: "#276EBC",
      width: isMobile ? "200px" : "auto",
      whiteSpace: isMobile ? "normal" : "nowrap",
    },
    svg: {
      width: "98vw",
      height: "100vh",
      maxWidth: "1920px",
    },
  };

  const mobileSvgViewBox = isMobile ? "0 0 960 490" : "0 0 1920 980";
  const buttonText = isMobile
    ? "Find Cars in Hyderabad"
    : "Find rental cars in Hyderabad";

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <div style={styles.content}>
          <Image
            src={assets.images.operatingZones.locationPin}
            alt="Location Pin"
            width={100}
            height={100}
            style={styles.image}
          />
          <h1 style={styles.h1}>Oops</h1>
          <h5 style={styles.h5}>Page not found</h5>
          <Link href="/">
            <CssButtonOutline
              title={buttonText}
              style={styles.button}
              backgroundColor="#FFFFFF"
              textColor="#276EBC"
              border="1px solid #276EBC"
              width={isMobile ? "200px" : "auto"}
            />
          </Link>
        </div>
        <div style={styles.vector}>
          <svg
            style={styles.svg}
            viewBox={mobileSvgViewBox}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M-106.522 -313.987C-180.882 -165.872 -111.226 35.6302 -0.202153 203.844C99.5527 354.983 293.021 368.913 473.159 350.348C597.968 337.486 725.178 363.174 830.306 485.506"
              stroke="#276EBC"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="36 36"
            />
            <path
              d="M2059.5 188.499C2067.37 354.045 1921.95 509.957 1752.23 618.66C1599.74 716.329 1417.25 650.568 1260.14 560.515C1151.28 498.121 1024.59 469.99 878.873 539.148"
              stroke="#276EBC"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="36 36"
            />
          </svg>
        </div>
      </div>
      <Footer />
    </>
  );
}
