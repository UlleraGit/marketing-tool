import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

const CookieBanner = ({ message, buttonText, localStorageKey }) => {
  const [showBanner, setShowBanner] = useState(false);

  const handleAccept = () => {
    localStorage.setItem(localStorageKey, "true");
    setShowBanner(false);
  };

  useEffect(() => {
    const accepted = localStorage.getItem(localStorageKey);
    setShowBanner(!accepted);
  }, [localStorageKey]);

  if (!showBanner) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#333",
        color: "#fff",
        padding: "10px",
        textAlign: "center",
      }}
    >
      <p>{message}</p>
      <Button onClick={handleAccept} variant="contained" color="primary">
        {buttonText}
      </Button>
    </div>
  );
};

CookieBanner.defaultProps = {
  message: "This website uses cookies to improve your experience.",
  buttonText: "OK",
  localStorageKey: "cookie_accepted",
};

export default CookieBanner;
