import React from "react";
import ReactLoading from "react-loading";

function SimpleLoader() {
  return (
    <div
      style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        width: "100%",
        height: "100%",
        zIndex: 9999,
      }}
    >
      <ReactLoading
        type="spin"
        color="black"
        height={60}
        width={60}
      />
    </div>
  );
}

export default SimpleLoader;
