import React, { useState } from "react";
import "./SpeedTest.css";

const SpeedTest = () => {
  const [downloadSpeed, setDownloadSpeed] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isTesting, setIsTesting] = useState(false);
  const chunkSize = 1024 * 1024;

  const testSpeed = async () => {
    setIsTesting(true);
    setDownloadSpeed("Testing...");
    setProgress(0);

    const testFileUrl =
      "https://cors-anywhere.herokuapp.com/http://speedtest.tele2.net/10MB.zip";
    const startTime = new Date().getTime();
    let loaded = 0;

    const updateSpeed = () => {
      const endTime = new Date().getTime();
      const durationInSeconds = (endTime - startTime) / 1000;
      const speedMbps = ((loaded * 8) / (durationInSeconds * 1000000)).toFixed(
        2
      );
      setDownloadSpeed(`${speedMbps} Mbps`);
    };

    try {
      const response = await fetch(testFileUrl);
      const reader = response.body.getReader();
      const totalBytes = parseInt(response.headers.get("content-length"), 10);
      const startTime = new Date().getTime();

      const readChunk = async () => {
        const { done, value } = await reader.read();
        if (done) {
          setIsTesting(false);
          return;
        }

        loaded += value.length;
        setProgress((loaded / totalBytes) * 100);

        if (loaded % (10 * chunkSize) === 0) {
          updateSpeed(loaded, startTime);
        }

        setTimeout(readChunk, 20);
      };

      readChunk();
    } catch (error) {
      console.error("Error testing download speed", error);
      setDownloadSpeed("Error occurred");
      setIsTesting(false);
    }
  };

  return (
    <div className="speed-test-container">
      <h2>Internet Speed</h2>
      <button
        className="speed-test-button"
        onClick={testSpeed}
        disabled={isTesting}
      >
        {isTesting ? "Testing..." : "Start Test"}
      </button>
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${Math.round(progress)}%` }}
        ></div>
      </div>
      <div>
        <p className="info-text">Download Speed: {downloadSpeed}</p>
        <p className="info-text">Progress: {Math.round(progress)}%</p>
      </div>
    </div>
  );
};

export default SpeedTest;
