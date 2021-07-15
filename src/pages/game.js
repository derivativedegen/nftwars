import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Unity, { UnityContent } from "react-unity-webgl";

const unityContent = new UnityContent(
  "Build/Builds.json",
  "Build/UnityLoader.js"
);

export default function Game(props) {
  const [progression, setProgression] = useState(0);

  useEffect(function () {
    unityContent.on("progress", function (progression) {
      setProgression(progression);
    });
  }, []);

  return (
    <div className="col-12">
      <div className="d-flex flex-column justify-content-center">
        <div className="col-8 offset-2 text-center">
          <h3>Loading {progression * 100} percent...</h3>
          <Unity unityContent={unityContent} />
        </div>
      </div>

      <div class="mt-4 d-flex justify-content-center">
        <Link to="/menu">
          <button className="menuButton shadow-lg"> Main Menu </button>
        </Link>
      </div>
    </div>
  );
}
