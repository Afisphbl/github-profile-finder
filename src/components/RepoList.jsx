import React, { useState } from "react";
import { useGithubUser } from "../context/GithubUser";
import { Book, Star, GitFork } from "lucide-react";
import "../styles/RepoList.css";

function RepoList() {
  const { githubUser, githubRepos } = useGithubUser();
  const [sortOption, setSortOption] = useState("recent");

  function handleSortChange(value) {
    setSortOption(value);
  }

  const sortedRepos = [...githubRepos].sort((a, b) => {
    if (sortOption === "recent") {
      return new Date(b.updated_at) - new Date(a.updated_at);
    }

    if (sortOption === "mostStar") {
      return b.stargazers_count - a.stargazers_count;
    }
  });
  return (
    <section className="repos-container fade-in">
      <RepoHeader
        repos={githubUser?.public_repos || []}
        onHandleSortChange={handleSortChange}
      />

      <ul className="repos-list">
        {sortedRepos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </ul>
    </section>
  );
}

function RepoHeader({ repos, onHandleSortChange }) {
  return (
    <div className="repos-header">
      <h3>
        Repositories <span>({repos})</span>
      </h3>

      <select
        className="sort-select"
        name="sort"
        id="sort"
        onChange={(e) => onHandleSortChange(e.target.value)}
      >
        <option value="recent">Recently Update</option>
        <option value="mostStar">Most Starred</option>
      </select>
    </div>
  );
}

function RepoCard({ repo }) {
  return (
    <li className="repo-card">
      <RepoCardHeader
        name={repo.name}
        visibility={repo.visibility}
        url={repo.html_url}
      />
      <p className="repo-description">{repo.description}</p>
      <div className="repo-meta">
        {repo.language && (
          <span className="repo-lang">
            <span className="lang-color"></span>
            <span>{repo.language}</span>
          </span>
        )}
        <RepoCardStat>
          <Star size={16} />
          <span>{repo.watchers}</span>
        </RepoCardStat>
        <RepoCardStat>
          <GitFork size={16} />
          <span>{repo.forks}</span>
        </RepoCardStat>
      </div>
    </li>
  );
}

function RepoCardHeader({ name, visibility, url }) {
  return (
    <div className="repo-header">
      <a
        className="repo-title"
        rel="noopener noreferrer"
        href={url}
        target="_blank"
      >
        <Book size={16} />
        {name}
      </a>

      <span className="repo-visibility">{visibility}</span>
    </div>
  );
}

function RepoCardStat({ children }) {
  return <div className="repo-stat">{children}</div>;
}

export default RepoList;
