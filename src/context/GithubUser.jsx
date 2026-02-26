import React, {
  useState,
  createContext,
  useContext,
  useCallback,
  useEffect,
} from "react";

const GithubUserContext = createContext();
const GITHUB_URL = "https://api.github.com";

export function GithubUser({ children }) {
  const [githubUser, setGithubUser] = useState(null);
  const [githubRepos, setGithubRepos] = useState([]);
  const [githubFollowers, setGithubFollowers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearGithubData = useCallback(() => {
    setGithubUser(null);
    setGithubRepos([]);
    setGithubFollowers([]);
    setError(null);

    document.title = "GitHub Profile Finder";
  }, []);

  useEffect(() => {
    if (githubUser) {
      document.title = `${githubUser.login} - GitHub Profile`;
    }
  }, [githubUser]);

  const handleSearchGithubUser = useCallback(async (username) => {
    if (!username) return;
    setIsLoading(true);
    try {
      setError(null);

      const response = await fetch(`${GITHUB_URL}/users/${username}`);
      if (!response.ok) {
        throw new Error("User not found");
      }

      const userData = await response.json();
      setGithubUser(userData);

      const reposRes = await fetch(
        `${GITHUB_URL}/users/${username}/repos?sort=updated&per_page=100`,
      );

      if (!reposRes.ok) {
        throw new Error("Failed to fetch repositories");
      }

      const reposData = await reposRes.json();
      setGithubRepos(reposData);

      const followersRes = await fetch(
        `${GITHUB_URL}/users/${username}/followers?per_page=100`,
      );

      if (!followersRes.ok) {
        throw new Error("Failed to fetch followers");
      }

      const followersData = await followersRes.json();
      setGithubFollowers(followersData);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <GithubUserContext.Provider
      value={{
        githubUser,
        githubRepos,
        githubFollowers,
        isLoading,
        error,
        handleSearchGithubUser,
        clearGithubData,
      }}
    >
      {children}
    </GithubUserContext.Provider>
  );
}

export function useGithubUser() {
  return useContext(GithubUserContext);
}
