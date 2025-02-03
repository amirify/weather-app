import React from "react";

export const LoadingIndicator = ({ message = "Loading..." }) => {
  return (
    <div className="weather-app-loading-wrapper">
      <div className="weather-app-loading"></div>
      <span>{message}</span>
    </div>
  );
};
