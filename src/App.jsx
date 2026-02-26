import React from "react";
import Button from "./components/Button";
import SearchBar from "./components/SearchBar";
import SkeletonLoader from "./components/SkeletonLoad";
import ErrorMessage from "./components/ErrorMessage";
import ProfileCard from "./components/ProfileCard";
import RepoList from "./components/RepoList";
import FollowerList from "./components/FollowerList";
import { useGithubUser } from "./context/GithubUser";
import { useTheme } from "./context/ThemeContext";

import { GithubIcon, Moon, Sun } from "lucide-react";
import {} from "lucide-react";
import "./App.css";

function App() {
  const { theme, toggleTheme } = useTheme();
  const { githubUser, isLoading, error } = useGithubUser();
  return (
    <article className="app-container fade-in">
      <header className="header">
        <h1 className="header-title">
          <GithubIcon size={32} />
          Github Finder
        </h1>
        <Button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </Button>
      </header>

      <main className="main-content">
        <SearchBar />

        {error && <ErrorMessage message={error} />}
        <div className="profile-layout">
          {!error && githubUser && !isLoading && (
            <>
              <ProfileCard user={githubUser} />
              <section className="profile-details">
                <RepoList />
                <FollowerList />
              </section>
            </>
          )}
        </div>
      </main>

      {!error && isLoading && (
        <div className="profile-layout">
          <SkeletonLoader type="profile" />
          <div className="profile-details">
            <SkeletonLoader type="repos" />
          </div>
        </div>
      )}
    </article>
  );
}

export default App;
