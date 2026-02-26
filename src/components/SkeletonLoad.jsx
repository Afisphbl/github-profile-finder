import React from "react";
import "../styles/SkeletonLoader.css";

const SkeletonLoader = ({ type }) => {
  if (type === "profile") {
    return (
      <div className="skeleton-container profile-skeleton">
        <div className="skeleton-avatar"></div>
        <div className="skeleton-details">
          <div className="skeleton-text title"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-stats">
            <div className="skeleton-text block"></div>
            <div className="skeleton-text block"></div>
            <div className="skeleton-text block"></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "repos") {
    return (
      <div className="skeleton-container repos-skeleton">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton-repo-item">
            <div className="skeleton-text title"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text small"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "followers") {
    return (
      <div className="skeleton-container followers-skeleton">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton-follower-item">
            <div className="skeleton-avatar small"></div>
            <div className="skeleton-text small"></div>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default SkeletonLoader;
