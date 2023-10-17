import axios from "axios";
import React, { useEffect, useState } from "react";
import RepoDetails from "../repoDetails/RepoDetails";

const Dashboard = () => {
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);

  useEffect(() => {
    const repoLinks = [
      "https://api.github.com/repos/a-org-b/Poly-Pass-Extension",
      "https://api.github.com/repos/MyriadFlow/gateway",
      "https://api.github.com/repos/MyriadFlow/smartcontracts",
    ];

    const fetchData = async () => {
      const repoData = await Promise.all(
        repoLinks.map((link) => axios.get(link))
      );
      const repoDetails = repoData.map((response) => response.data);
      setRepos(repoDetails);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>GitHub Repo Dashboard</h1>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <button onClick={() => setSelectedRepo(repo)}>View Details</button>{" "}
            {repo.name}
          </li>
        ))}
      </ul>
      {selectedRepo && <RepoDetails repo={selectedRepo} />}
    </div>
  );
};

export default Dashboard;
