import React from "react";
import "./spinner.css";

export default function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      </div>
    </div>
  );
}