import { ToastContainer } from "react-toastify";
import Home from "./home";
import "./page.module.scss";
import "./globals.scss";
import "react-toastify/dist/ReactToastify.css";

export default function Main() {
  return (
    <>
    
      <Home />
      <ToastContainer />
    
   
    </>
  );
}
