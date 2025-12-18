import React, { useState, useEffect } from 'react';
import './App.css';

// Simple SVG icons as components
const CalendarIcon = () => (
  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const RefreshIcon = ({ spinning }) => (
  <svg className={`icon-tiny ${spinning ? 'loading-spinner' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
  </svg>
);

const FilterIcon = () => (
  <svg className="icon-small" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
  </svg>
);

const StarIcon = ({ filled }) => (
  <svg className={`star-icon ${filled ? 'marked' : ''}`} fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
  </svg>
);

const ClockIcon = () => (
  <svg className="icon-tiny" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"></circle>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"></path>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg className="icon-tiny" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
  </svg>
);

const AlertIcon = () => (
  <svg className="icon-small" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

function App() {
  const [contests, setContests] = useState([]);
  const [filteredContests, setFilteredContests] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [markedContests, setMarkedContests] = useState(() => {
    try {
      const saved = localStorage.getItem('markedContests');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(Date.now());

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const platforms = [
  'codeforces',
  'codechef',
  'leetcode',
  'atcoder',
  'topcoder',
  'hackerrank',
  'hackerearth',
];





  useEffect(() => {
    fetchContests();
    const timer = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    filterContests();
  }, [contests, selectedPlatforms]);

  useEffect(() => {
    try {
      localStorage.setItem('markedContests', JSON.stringify(markedContests));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [markedContests]);

  const fetchContests = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/contests`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch contests from server');
      }
      
      const data = await response.json();
      
if (data.success) {
  const sorted = data.contests.sort(
    (a, b) => new Date(a.start_time) - new Date(b.start_time)
  );
  setContests(sorted);
}

 else {
        throw new Error(data.message || 'Failed to load contests');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching contests:', err);
    } finally {
      setLoading(false);
    }
  };

const filterContests = () => {
  let filtered = [...contests];

  if (selectedPlatforms.length > 0) {
    filtered = filtered.filter(contest => {
      const site = contest.site.toLowerCase();

      return selectedPlatforms.some(platform =>
        site.includes(platform)
      );
    });
  }

  filtered.sort(
    (a, b) => new Date(a.start_time) - new Date(b.start_time)
  );

  setFilteredContests(filtered);
};



  const togglePlatform = (platform) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const toggleMarkContest = (contestId) => {
    setMarkedContests(prev => ({
      ...prev,
      [contestId]: !prev[contestId]
    }));
  };

  const getCountdown = (startTime, duration) => {
    const start = new Date(startTime).getTime();
    const diff = start - currentTime;
    
    if (diff < 0) {
      const end = start + (duration * 1000);
      const endDiff = end - currentTime;
      if (endDiff > 0) return 'Live Now';
      return 'Ended';
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    return `${minutes}m ${seconds}s`;
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h`;
    }
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

const getPlatformDisplayName = (site) => ({
  codeforces: 'CodeForces',
  codechef: 'CodeChef',
  leetcode: 'LeetCode',
  atcoder: 'AtCoder',
  topcoder: 'TopCoder',
  hackerrank: 'HackerRank',
  hackerearth: 'HackerEarth',
}[site] || site);



  return (
    <div className="app-container">
      <div className="max-width-container">
        {/* Header */}
        <div className="glass-card">
          <div className="header">
            <div className="header-title">
              <CalendarIcon />
              <h1>Contest Tracker</h1>
            </div>
            <button onClick={fetchContests} disabled={loading} className="button">
              <RefreshIcon spinning={loading} />
              Refresh
            </button>
          </div>
        </div>

        {/* Platform Filters */}
        <div className="glass-card filter-section">
          <h2><FilterIcon /> Filter by Platform</h2>
          <div className="filter-buttons">
            {platforms.map(platform => (
              <button
                key={platform}
                onClick={() => togglePlatform(platform)}
                className={`filter-button ${selectedPlatforms.includes(platform) ? 'active' : ''}`}
              >
                {getPlatformDisplayName(platform)}
              </button>
            ))}
            {selectedPlatforms.length > 0 && (
              <button onClick={() => setSelectedPlatforms([])} className="filter-button clear-button">
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="error-box">
            <div className="error-content">
              <AlertIcon />
              <div className="error-text">
                <div className="error-title">Error loading contests</div>
                <div className="error-message">{error}</div>
                <div className="error-hint">
                  Make sure the backend server is running on {API_URL}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="loading-container">
            <RefreshIcon spinning={true} />
            <p className="loading-text">Loading contests...</p>
          </div>
        )}

        {/* Contest List */}
        {!loading && (
          <div className="contests-grid">
            {filteredContests.length === 0 ? (
              <div className="glass-card empty-state">
                <CalendarIcon />
                <p className="empty-text">
                  {contests.length === 0 ? 'No upcoming contests found' : 'No contests match the selected filters'}
                </p>
              </div>
            ) : (
              filteredContests.map(contest => {
                const contestId = `${contest.id}-${contest.start_time}`;
                const countdown = getCountdown(contest.start_time, contest.duration);
                const isLive = countdown === 'Live Now';
                const isMarked = markedContests[contestId];
                
                return (
                  <div key={contestId} className={`contest-card ${isMarked ? 'marked' : ''} ${isLive ? 'live' : ''}`}>
                    <div className="contest-content">
                      <div className="contest-main">
                        <div className="contest-header">
                          <button onClick={() => toggleMarkContest(contestId)} className="star-button">
                            <StarIcon filled={isMarked} />
                          </button>
                          <div className="contest-info">
                            <h3 className="contest-title">{contest.name}</h3>
                            <div className="contest-badges">
                              <span className="badge">
                                {getPlatformDisplayName(contest.site)}
                              </span>
                              {isLive && (
                                <span className="badge live">
                                  <span className="pulse-dot"></span>
                                  Live Now
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="contest-details">
                          <div className="detail-item">
                            <CalendarIcon />
                            <span>{formatDate(contest.start_time)}</span>
                          </div>
                          <div className="detail-item">
                            <ClockIcon />
                            <span>Duration: {formatDuration(contest.duration)}</span>
                          </div>
                          <div className="detail-item">
                            <span className={`countdown ${isLive ? 'live' : ''}`}>
                              {isLive ? 'Live Now' : `Starts in: ${countdown}`}
                            </span>
                          </div>
                        </div>
                      </div>

                      <a href={contest.url} target="_blank" rel="noopener noreferrer" className="visit-button">
                        <ExternalLinkIcon />
                        Visit
                      </a>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Footer Stats */}
        {!loading && filteredContests.length > 0 && (
          <div className="glass-card footer-stats">
            <p>
              Showing {filteredContests.length} of {contests.length} upcoming contests
              {Object.values(markedContests).filter(Boolean).length > 0 && (
                <span> • {Object.values(markedContests).filter(Boolean).length} marked</span>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;