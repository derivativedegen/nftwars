import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Unity, { UnityContent } from "react-unity-webgl";
import { useDispatch } from "react-redux";
import { toggleLoading } from "../redux/transaction";
import "./game.css";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import LoadingBar from "react-top-loading-bar";

const unityContent = new UnityContent(
  "Build/Builds.json",
  "Build/UnityLoader.js"
);

export default function Game(props) {
  const dispatch = useDispatch();
  const [progression, setProgression] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Show/hide header spinning Loader
  useEffect(() => {
    isLoaded ? dispatch(toggleLoading(false)) : dispatch(toggleLoading(true));
  }, [isLoaded]);

  // Show game window after loaded
  useEffect(function () {
    unityContent.on("loaded", function () {
      setIsLoaded(true);
    });
  }, []);

  // Show game loading progress
  useEffect(function () {
    unityContent.on("progress", function (progression) {
      setProgression(progression);
    });
  }, []);

  return (
    <div className="col-12">
      <LoadingBar color="#e45251" progress={progression * 100} />

      <div className="d-flex flex-column justify-content-center">
        {isLoaded ? null : (
          <div className="col-12 p-0 m-0 text-center justify-content-center d-flex flex-column">
            <h3 className="textred">Loading... </h3>
            <h1 className="bignumber textspaced">
              {(progression * 100).toFixed(2)}%
            </h1>
          </div>
        )}

        <div
          className={`game-container col-12 offset-0 col-md-10 offset-md-1 text-center ${
            isLoaded ? "visible" : "invisible"
          }`}
        >
          <Unity unityContent={unityContent} />
        </div>
      </div>

      {isLoaded ? (
        <div class="mt-4 d-flex justify-content-center">
          <Link to="/menu">
            <button className="menuButton shadow-lg"> Main Menu </button>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
