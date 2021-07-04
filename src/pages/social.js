import React from "react";
import SocialCard from "../components/socialCard";
import "./social.css";
import { Link } from "react-router-dom";

const Social = () => {
  return (
    <div>
      <div className="d-flex justify-content-around flex-wrap">
        <SocialCard
          title="Twitter"
          link="https://twitter.com/nftwars"
          icon="icon-twitter"
          description="Let us know what's on your mind!"
        />
        <SocialCard
          title="Telegram"
          link="https://t.me/NFTWars"
          icon="icon-telegram socialicon-large"
          description="Want to join the community?"
          description2="Come connect with us in Telegram."
        />
        <SocialCard
          title="Medium"
          link="https://nftwars.medium.com/"
          icon="icon-medium"
          description="Need more information?"
          description2="Do a deep dive into our Medium."
        />
      </div>

      <div class="mt-4 d-flex justify-content-center">
        <Link to="/menu">
          <button className="menuButton shadow-lg"> Main Menu </button>
        </Link>
      </div>
    </div>
  );
};

export default Social;
