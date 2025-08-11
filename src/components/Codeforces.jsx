import React, { useState } from 'react';
import './Codeforces.css'; // We'll create this CSS file for styling

function Codeforces() {
  const [handle, setHandle] = useState('');
  const [userData, setUserData] = useState(null);
  const [solvedCount, setSolvedCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!handle) {
      setError('Please enter a Codeforces handle.');
      return;
    }
    setLoading(true);
    setUserData(null);
    setError(null);

    try {
      // Fetch user info (rating, rank) and user submissions simultaneously
      const [infoResponse, statusResponse] = await Promise.all([
        fetch(`https://codeforces.com/api/user.info?handles=${handle}`),
        fetch(`https://codeforces.com/api/user.status?handle=${handle}&from=1`)
      ]);

      if (!infoResponse.ok || !statusResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const infoData = await infoResponse.json();
      const statusData = await statusResponse.json();

      // Check for API errors (e.g., user not found)
      if (infoData.status === 'FAILED') {
        throw new Error(infoData.comment);
      }
      if (statusData.status === 'FAILED') {
        throw new Error(statusData.comment);
      }

      // Calculate unique solved problems
      const submissions = statusData.result;
      const solvedProblems = new Set();
      submissions.forEach(sub => {
        if (sub.verdict === 'OK') {
          // Create a unique identifier for each problem
          const problemId = `${sub.problem.contestId}-${sub.problem.index}`;
          solvedProblems.add(problemId);
        }
      });
      
      setUserData(infoData.result[0]);
      setSolvedCount(solvedProblems.size);

    } catch (err) {
      setError(err.message);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cf-container">
      <div className="cf-progress-box">
        <h2>Codeforces Progress</h2>

        <div className="cf-search-bar">
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="Enter Codeforces Handle..."
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {error && <p className="cf-error-message">{error}</p>}

        {userData && (
          <div className="cf-stats-grid">
            <div className="cf-stat-card main-stat">
              <span>Total Solved</span>
              <p>{solvedCount}</p>
            </div>
            <div className="cf-stat-card main-stat">
              <span>Rating</span>
              <p style={{ color: getRatingColor(userData.rating) }}>
                {userData.rating || 'Unrated'}
              </p>
            </div>
            <div className="cf-stat-card main-stat">
              <span>Rank</span>
              <p style={{ color: getRatingColor(userData.rating) }}>
                {capitalizeFirstLetter(userData.rank) || 'Unrated'}
              </p>
            </div>
             <div className="cf-stat-card">
              <span>Contribution</span>
              <p>{userData.contribution}</p>
            </div>
            <div className="cf-stat-card">
              <span>Max Rating</span>
              <p style={{ color: getRatingColor(userData.maxRating) }}>
                {userData.maxRating}
              </p>
            </div>
            <div className="cf-stat-card">
              <span>Max Rank</span>
              <p style={{ color: getRatingColor(userData.maxRating) }}>
                {capitalizeFirstLetter(userData.maxRank)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function to capitalize the first letter of a string (e.g., "expert" -> "Expert")
const capitalizeFirstLetter = (string) => {
  if (!string) return 'N/A';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Helper function to get color based on Codeforces rating
const getRatingColor = (rating) => {
    if (rating < 1200) return '#808080'; // Newbie - Gray
    if (rating < 1400) return '#008000'; // Pupil - Green
    if (rating < 1600) return '#03a89e'; // Specialist - Cyan
    if (rating < 1900) return '#0000ff'; // Expert - Blue
    if (rating < 2100) return '#aa00aa'; // Candidate Master - Purple
    if (rating < 2400) return '#ff8c00'; // Master - Orange
    if (rating < 3000) return '#ff0000'; // Grandmaster - Red
    return '#ff0000'; // Legendary Grandmaster - Red
};


export default Codeforces;