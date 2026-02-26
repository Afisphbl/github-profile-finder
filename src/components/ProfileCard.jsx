import { useGithubUser } from "../context/GithubUser";
import { Users, UserPlus, BookOpen, Link, Calendar } from "lucide-react";
import "../styles/ProfileCard.css";

function ProfileCard() {
  const { githubUser } = useGithubUser();
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  return (
    <aside className="profile-card fade-in">
      <ProfileHeader
        userName={githubUser?.name || "Unknown User"}
        avatarUrl={githubUser?.avatar_url || "/default-avatar.png"}
        login={githubUser?.login || "unknown"}
      />

      <div className="profile-stats">
        <StatItem label="Followers" value={githubUser?.followers || 0}>
          <Users size={20} />
        </StatItem>
        <StatItem label="Following" value={githubUser?.following || 0}>
          <UserPlus size={20} />
        </StatItem>
        <StatItem label="Repos" value={githubUser?.public_repos || 0}>
          <BookOpen size={20} />
        </StatItem>
      </div>

      <div className="profile-info">
        <InfoItem
          blog={githubUser?.blog}
          createdAt={formatDate(githubUser?.created_at)}
        />
      </div>
    </aside>
  );
}

function ProfileHeader({ userName, avatarUrl, login }) {
  return (
    <div className="profile-header">
      <img
        className="profile-avatar"
        src={avatarUrl}
        alt={`${userName}'s avatar`}
      />
      <div className="profile-names">
        <h2>{userName}</h2>
        <a
          href={`https://github.com/${login}`}
          target="_blank"
          rel="noopener noreferrer"
          className="profile-login"
        >
          @{login}
        </a>
      </div>
    </div>
  );
}

function StatItem({ label, value, children }) {
  return (
    <div className="stat-item">
      {children}
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

function InfoItem({ blog, createdAt }) {
  return (
    <>
      {blog && (
        <div className="info-item">
          <Link size={20} />
          <a href={blog} target="_blank" rel="noopener noreferrer">
            {blog}
          </a>
        </div>
      )}

      <div className="info-item">
        <Calendar size={20} />
        <span>Joined on {createdAt}</span>
      </div>
    </>
  );
}

export default ProfileCard;
