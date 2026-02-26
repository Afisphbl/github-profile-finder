import React from "react";
import { AlertTriangle } from "lucide-react";
import "../styles/ErrorMessage.css";

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-container fade-in">
      <AlertTriangle size={48} className="error-icon" />
      <h2>Oops! Something went wrong</h2>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
