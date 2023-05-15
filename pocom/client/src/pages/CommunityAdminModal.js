import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/CommunityModal.css";

const ComAdModal = () => {
  return (
    <div id="modal-id-container" className="modal-container Admin">
      <div className="modal-content no-top-padding">
        {/* comunidades */}
        <div className="top-margin flex-container flex-column">
          <button
            className="big-text white-text buttonfillwidth top-margin"
          >
            community name
          </button>
        </div>
      </div>
    </div>
  );
};

const editModal = () => {
  return (
    <div id="modal-edit-container" className="modal-container Edit">
      <div className="modal-content no-top-padding">
        {/* comunidades */}
        <div className="top-margin flex-container flex-column">
          <h1>texto</h1>
          <input type="text"></input>
        </div>
      </div>
    </div>
  );
};

export default ComAdModal;
