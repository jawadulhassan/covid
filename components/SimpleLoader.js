import React from "react";
import ReactLoading from "react-loading";

function SimpleLoader() {
  return (
    <div
      style={{
        position: "fixed",
        left: "50%",
        top: "40%",
        width: "100%",
        height: "100%",
        zIndex: 9999,
      }}
    >
      <ReactLoading type="bars" color="white" height={80} width={80} />
    </div>
  );
}

export default SimpleLoader;
