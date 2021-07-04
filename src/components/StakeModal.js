import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "../ui/button";
import Loader from "./loader";
import "./StakeModal.css";

function StakeModal({
  type,
  show,
  hideModal,
  stakeCheck,
  balanceNum,
  approved,
  confirmed,
  chooseExplorer,
  loading
}) {
  const [amount, setAmount] = useState(0);
  let approvedLink = null;
  if (approved) {
    approvedLink = chooseExplorer("tx") + approved.transactionHash;
  }

  let confirmedLink = null;
  if (confirmed) {
    confirmedLink = chooseExplorer("tx") + confirmed.transactionHash;
  }

  return (
    <>
      <Modal show={show} onHide={hideModal} className="modaltest">
        <div className="modalFull">
          <Modal.Body className="d-flex justify-content-center">
            <h1 className="pagename textred textspaced bomberescort mb-0">
              Stake
            </h1>
          </Modal.Body>
          <Modal.Body>
            <div className="col-12 col-lg-10 offset-lg-1 d-flex justify-content-center">
              <input
                type="number"
                min="5"
                max={balanceNum}
                placeholder="5"
                value={amount ? amount : null}
                className="stakeclaiminput shadow-lg"
                id="stakeclaiminput"
                onChange={(e) => {
                  setAmount(Number(e.target.value));
                }}
              />
            </div>
            <div className="col-12 col-lg-10 offset-lg-1 text-center">
              <p className="textlarge textbold textwhite pt-3">
                Balance: <span className="textred">{balanceNum}</span> {type}
              </p>
              {type === "WAR Tokens" ? (
                <p className="textbold textwhite">
                  The minimum WAR tokens you can stake is 5.
                </p>
              ) : null}
            </div>
          </Modal.Body>
          <Modal.Body className="d-flex justify-content-around pt-0">
            <Button
              text="Cancel"
              clickAction={hideModal}
              buttonType="btn-modal-cancel"
            />
            <Button
              text="Max"
              clickAction={() => setAmount(balanceNum)}
              buttonType="btn-modal"
            />
            <Button
              text="Stake"
              clickAction={() => stakeCheck(amount)}
              buttonType="btn-modal"
            />
          </Modal.Body>
          <Modal.Body>
            <div className="explorerLinks d-flex justify-content-center">
              <div>
                {approved ? (
                  <h5 className="textwhite">
                    Approved:{" "}
                    <a href={approvedLink} target="_blank">
                      View on Explorer
                    </a>
                  </h5>
                ) : null}
                {confirmed ? (
                  <h5 className="textwhite">
                    Confirmed:{" "}
                    <a href={confirmedLink} target="_blank">
                      View on Explorer
                    </a>
                  </h5>
                ) : null}
              </div>
            </div>
          </Modal.Body>
          {loading ? (
            <Modal.Body>
              <div className="explorerLinks d-flex justify-content-center">
                <Loader />
              </div>
            </Modal.Body>
          ) : null}
        </div>
      </Modal>
    </>
  );
}

export default StakeModal;
