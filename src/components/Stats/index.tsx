import { FC, useState, useEffect } from "react";

import { Button } from "..";
import { StatsNumber } from "./StatsNumber";
import { StatsTitle } from "./StatsTitle";

import "./styles.scss";

interface GithubStats {
  login: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  html_url: string;
}

type StatsProps = {
  githubId: string;
};

export const Stats: FC<StatsProps> = ({ githubId }) => {
  const [stats, setStats] = useState({} as GithubStats);
  const [starred, setStarred] = useState(0);

  useEffect(() => {
    fetch(`https://api.github.com/users/${githubId}`)
      .then((res) => res.json())
      .then((data) => setStats(data));

    fetch(`https://api.github.com/users/${githubId}/starred`)
      .then((res) => res.json())
      .then((data) => setStarred(data.length));
  }, [githubId]);

  if (!stats.login) return;

  return (
    <div className="stats">
      <StatsTitle name={stats.name} />

      <p className="stats__bio">{stats.bio}</p>

      <div className="stats__numbers">
        <StatsNumber value={stats.public_repos} label="Repositories" />
        <StatsNumber value={stats.followers} label="Followers" />
        <StatsNumber value={starred} label="Starred" />
      </div>

      <Button text="View Github Profile" to={stats.html_url} />
    </div>
  );
};
