import React, { useEffect } from "react";

const Overlay = ({ image, onClose }) => {
  useEffect(() => {
    // Function to handle keydown events
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Add event listener for keydown
    window.addEventListener("keydown", handleKeyDown);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!image) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <img
        src={image}
        alt="Document Preview"
        className="max-w-full max-h-full rounded-lg p-7"
        style={{ borderRadius: "5rem" }}
      />
    </div>
  );
};

export default Overlay;
