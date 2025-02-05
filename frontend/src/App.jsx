import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // States for URL shortener form and analytics
  const [urlInput, setUrlInput] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [shortIdInput, setShortIdInput] = useState('');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [shortId, setShortId] = useState('');

  // Handle the URL shortener form submit
  const handleShortenSubmit = async (e) => {
    e.preventDefault();

    if (!urlInput) {
      setError("Please enter a valid URL.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8001/url', { url: urlInput });
      if (response.data.id) {
        setShortId(response.data.id)
        setShortUrl(`http://localhost:8001/${response.data.id}`);
        setError('');
      } else {
        setError("Failed to generate short URL. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again later.");
    }
  };

  // Handle analytics fetch
  const handleGetAnalytics = async () => {
    console.log(shortIdInput);
    if (!shortIdInput) {
      setAnalyticsData(null);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8001/url/analytics/${shortIdInput}`);
      if (response.data) {
        setAnalyticsData(response.data);
      } else {
        setAnalyticsData({ error: "No data found for this short URL ID." });
      }
    } catch (err) {
      console.error(err);
      setAnalyticsData({ error: "An error occurred while fetching analytics. Please try again later." });
    }
  };

  return (
    <div className="App">
      <h1>URL Shortener</h1>

      {/* URL Shortener Form */}
      <form onSubmit={handleShortenSubmit} className="shorten-form">
        <input
          type="url"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Enter URL"
          required
        />
        <button type="submit">Generate Short URL</button>
      </form>

      {error && <p className="error">{error}</p>}

      {shortUrl && (
        <div className="result">
          <p><strong>Short URL:</strong> <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
          <p><strong>Short ID : </strong>{shortId}</p>
        </div>
      )}

      {/* Analytics Section */}
      <div className="analytics">
        <h2>Analytics</h2>
        <input
          type="text"
          value={shortIdInput}
          onChange={(e) => setShortIdInput(e.target.value)}
          placeholder="Enter short URL ID"
        />
        <button onClick={handleGetAnalytics}>Get Analytics</button>

        {analyticsData && (
          <div className="analytics-data">
            {analyticsData.error ? (
              <p className="error">{analyticsData.error}</p>
            ) : (
              <>
                <p><strong>Total Clicks:</strong> {analyticsData.totalClicks}</p>
                <pre>{JSON.stringify(analyticsData.analytics, null, 2)}</pre>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
