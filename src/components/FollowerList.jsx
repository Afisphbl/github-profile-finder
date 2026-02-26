import React, { useState } from "react";
import Button from "./Button";
import { useGithubUser } from "../context/GithubUser";
import "../styles/FollowerList.css";

function FollowerList() {
  const { githubFollowers } = useGithubUser();
  const followers = githubFollowers.length > 100 ? 100 : githubFollowers.length;

  const [showFollowers, setShowFollowers] = useState(
    followers > 12 ? 12 : followers,
  );

  function handleLoadMore() {
    setShowFollowers((prev) => (prev + 12 > followers ? followers : prev + 12));
  }

  return (
    <section className="followers-container fade-in">
      <div className="followers-header">
        <h3>Followers ({followers})</h3>
      </div>
      <div className="followers-grid">
        {githubFollowers.slice(0, showFollowers).map((follower) => (
          <FollowerCard key={follower.id} follower={follower} />
        ))}
      </div>

      {showFollowers >= 12 && (
        <Button className="load-more-btn" onClick={handleLoadMore}>
          Load More
        </Button>
      )}
    </section>
  );
}

function FollowerCard({ follower }) {
  return (
    <a
      href={follower.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="follower-card"
    >
      <img
        className="follower-avatar"
        src={follower.avatar_url}
        alt={follower.login}
      />

      <p className="follower-login">{follower.login}</p>
    </a>
  );
}

export default FollowerList;
