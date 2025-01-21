"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "./FloatingButton.scss";
import { assets } from "@/assets";

function FloatingButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="buttonContainer">
      <Link
        href="https://wa.me/message/3WS23U46URLXC1"
        target="_blank"
        rel="noreferrer"
        className="buttonHolder"
      >
        <div>
          {isVisible && (
            <span className="scroll-animation visible">
              <p>Chat with us</p>
            </span>
          )}
          <Image
            src={assets.images.WhatsappButton}
            alt="whatsapp service"
            className="icon"
          />
        </div>
      </Link>
    </div>
  );
}

export default FloatingButton;
