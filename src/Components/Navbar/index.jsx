"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import "./Navbar.scss";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { assets } from "@/assets";
import { CssButtonOutline, CssButtonSolid } from "../CssButton";
import { useScrollPosition } from "@/hooks";
//import { Inter } from '@next/font/google';


function Navbar({ home, hidePageButtons }) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const scrollPosition = useScrollPosition();

  const router = useRouter();

  const currentRoute = usePathname();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener("resize", showButton);
  }, []);

  const handleJoin = (mobile) => {
    if (mobile) closeMobileMenu();
    router.push("/joinWithUs", { scroll: false });
  };

  const handleBecomeHost = (mobile) => {
    if (mobile) closeMobileMenu();
    router.push("/Host", { scroll: false });
  };

  const homeStyles = {
    color: home ? "#fff" : "#000",
  };

  return (
    <>
      <nav
        className={`navbar ${scrollPosition > 0 ? "scrollActive" : ""}`}
        style={homeStyles}
      >
        <div className="navbar-container">
          <Link href="/" className="navbar-logo" onClick={closeMobileMenu}>
            <Image
              src={assets.images.appLogo}
              alt="App Logo"
              width="10px"
              height="10px"
            />
          </Link>
          {!hidePageButtons && (
            <>
              <div
                className="menu-icon"
                onClick={handleClick}
                onKeyUp={handleClick}
                role="button"
                tabIndex="0"
              >
                {click ? (
                  <CloseIcon fontSize="large" />
                ) : (
                  <Image
                    src={assets.images.MenuIcon}
                    alt="Menu"
                    width="10px"
                    height="10px"
                  />
                  // <MenuIcon fontSize="large" />
                )}
              </div>

              <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li>
                  <Link
                    href="/joinWithUs"
                    className="nav-links-mobile outlineBG"
                  >
                    Join us
                  </Link>
                </li>
                <li>
                  <Link href="/Host" className="nav-links-mobile solidBG">
                    Become Host
                  </Link>
                </li>
              </ul>
            </>
          )}

          {button && !hidePageButtons && (
            <div className="navbar__buttons">
            <CssButtonOutline
  title="Attach Us"
  backgroundColor="#FFFFFF"
  textColor="#276EBC"
  margin="0 0.8rem 0 0.8rem"
  fontSize="1rem"
  fontFamily="archivo"
  
  width="123px"
  height="52px"
  border="1px solid #276EBC"
  onClick={() => handleJoin(false)}
/>


<CssButtonSolid
  title="Become a Host"
  backgroundColor="#276EBC"
  textColor="#fff"
  fontSize="0.8rem"
  width="169px !important"  // Added !important
  height="52px"
  border="1px solid #276EBC"
// fontFamily="'Inter', sans-serif"
  onClick={() => handleBecomeHost(false)}
/>

            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
