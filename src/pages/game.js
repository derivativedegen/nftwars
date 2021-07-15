import React from "react";
import { Link } from "react-router-dom";

export default function Game(props) {
  return (
    <div className="col-12">
      <div className="d-flex justify-content-center">
        <h1>Insert Game Here</h1>
      </div>

      <div class="mt-4 d-flex justify-content-center">
        <Link to="/menu">
          <button className="menuButton shadow-lg"> Main Menu </button>
        </Link>
      </div>
    </div>
  );
}
