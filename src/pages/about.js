import React from "react";
import logo from "../images/logo.png";
import "./about.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="col-xs-12 col-xl-8 offset-xl-2">
      <div className="pagebox pt-4 pb-4 shadow-lg">
        <div className="row justify-content-center col-12 text-white pr-0 pl-0 ml-0 mr-0">
          <div className="col-12 col-md-10 col-lg-6 pt-3 pl-0 pr-0">
            <div className="row justify-content-center">
              <div className="pb-3">
                <img src={logo} className="biopicture" alt="bio-pic" />
              </div>

              {/* 
                <div className="pl-3">
                  <h3 className="textred textspaced">
                    <u>Game Info</u>
                  </h3>
                </div> 
                */}
            </div>

            <div className="raleway text-center col-xs-12 col-xl-10 offset-xl-1 pt-2 pl-1 pr-1">
              <p>
                Play a Rock-Paper-Scissors style game with your wrapped NFT
                card, but instead of the traditional game options, NFTWars uses
                Bunker, Infantry, and Artillery. Stake WAR tokens to earn FIGHT
                Tokens, and redeem FIGHT Tokens towards new cards each week.
                Depending on how many tokens you stake, you may be able to
                choose a super rare card to use as your avatar in-game, to show
                off to your friends, and (eventually) wager the card itself
                against someone for their card, IF you’re feeling confident!
              </p>
              <p>
                $WAR is an experiment in NFT gaming and does not offer any
                guarantees or returns. Please DYOR and learn more on our{" "}
                <a
                  href="https://nftwars.medium.com/nftwars-new-era-has-begun-f3ddc0c00d2f"
                  target="_blank"
                  rel="noreferrer"
                  className="textred"
                >
                  Medium.
                </a>
              </p>
            </div>
          </div>

          <div className="col-12 col-md-10 col-lg-6 pt-3 pl-2 pr-2">
            <h3 className="textred textspaced">
              <u>Mission Brief</u>
            </h3>
            <ul className="raleway pb-2">
              <li className="brief-item">Wrap your NFT.</li>
              <li className="brief-item">Battle others.</li>
              <li className="brief-item">Climb the ranks.</li>
              <li className="brief-item">Stake WAR tokens.</li>
              <li className="brief-item">Earn FIGHT Tokens.</li>
              <li className="brief-item">Redeem FIGHT for rare NFTs.</li>
              <li className="brief-item">Dominate the NFT Warzone.</li>
            </ul>
            <div className="row pr-0 ml-0 pt-2">
              <h4 className="textred textspaced pr-2">Power Ups: </h4>
              <h5 className="text-white raleway smallheader pt-1">
                Coming Soon...
              </h5>
            </div>
            <div className="row pr-0 ml-0 pt-2">
              <h4 className="textred textspaced pr-2">Levels: </h4>
              <h5 className="text-white raleway smallheader pt-1">
                Coming Soon....
              </h5>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4 d-flex justify-content-center">
        <Link to="/menu">
          <button className="menuButton shadow-lg"> Main Menu </button>
        </Link>
      </div>
    </div>
  );
};

export default About;
