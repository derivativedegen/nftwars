import React from "react";
import "./siteFrame.css";
import url from "url";

const SiteFrame = ({ address }) => {
  const q = url.parse(address, true);

  return (
    <div className="externalSiteFrame justify-content-center shadow-lg bg-black">
      <iframe
        src={address}
        title="externalSite"
        className="externalSiteChild"
      ></iframe>

      <div className="text-center">
        <p>
          <a
            href={address}
            target="_blank"
            rel="noreferrer"
            className="openlink"
          >
            Open on {q.host}
          </a>
        </p>
      </div>
    </div>
  );
};

export default SiteFrame;
