import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/CommunityModal.css";

const apiUrl = process.env.REACT_APP_API_URL;

const ComModal = () => {

  const [communities, setCommunities] = useState([]);

  async function getCommunities(){
    try {

        const response = await fetch(`${apiUrl}/api/community/getCommunities`,{
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        setCommunities(data);

    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    getCommunities();
  }, []);

  return (
    <div id="modal-container" class="modal-container">
      <div class="modal-content no-top-padding">
        {/* comunidades */}
        <div className="top-margin flex-container flex-column">
        {communities.map((community) => (
            <button
              key={community.id}
              class="big-text white-text buttonfillwidth top-margin"
            >
              {community.community_name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComModal;
