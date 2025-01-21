import React from "react";
import "./BookNowCard.scss";
import Image from "next/image";
import { assets } from "@/assets";
import CloseIcon from "@mui/icons-material/Close";

function BookNowCard({onClose}) {

    const handleClose  = () => {
        onClose()
    }

  return (
    <div className="BookNowCardMainContainer">
      <div className="BookNowCardMainContainer_closeButton">
        <CloseIcon onClick= {handleClose} />
      </div>
      <h1 className="titleStyling" style={{fontFamily:"Krona One"}}>BidrYde</h1>
      <h1 className="titleStyling">Available on</h1>
      <div className="BookNowCardMainContainer_Buttons">
        <a
          href="https://play.google.com/store/apps/details?id=com.bidryde.customer"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={assets.images.GoogleButton}
            alt="google download button"
          />
        </a>

        <a
          href="https://apps.apple.com/us/app/bid-ryde-self-drive-cars/id6448796800"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <Image
            src={assets.images.AppleButton}
            alt="apple download button"
          />{" "}
        </a>
      </div>
      <h3 className="OfferTextStyling">Use &quot; RYDE10&quot;, Get 10% OFF</h3>
    </div>
  );
}

export default BookNowCard;
