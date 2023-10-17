import axios from "axios";
import React, { useEffect, useState } from "react";

const RepoDetails = ({ repo }) => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const contributorsUrl = repo.contributors_url;

        const response = await axios.get(contributorsUrl);
        if (response.status === 200) {
          setContributors(response.data);
        }
      } catch (error) {
        console.error("Error fetching contributors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContributors();
  }, [repo.contributors_url]);

  return (
    <div>
      <h2>Repository Details</h2>
      <div>
        <strong>Name:</strong> {repo.name}
      </div>
      <div>
        <strong>Description:</strong> {repo.description}
      </div>
      <div>
        <strong>Contributors:</strong>
        {loading ? (
          <p>Loading contributors...</p>
        ) : (
          <ul>
            {contributors.map((contributor) => (
              <div key={contributor.id}>
                <li>{contributor.login}</li>
                <li>{contributor.contributions}</li>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RepoDetails;
