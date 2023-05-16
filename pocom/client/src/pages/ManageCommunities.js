import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ManageCommunities.css';
import EditDeleteCommunity from './EditDeleteCommunity'
import { useState, useEffect } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

function ManageCommunities(props) {

    const [isOpen, setIsOpen] = useState(false);
    const [communities, setCommunities] = useState([]);

    async function getCommunitiesByUser() {
        try {

            const response = await fetch(`${apiUrl}/api/community/getCommunitiesByUser/${props.user.id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();

            setCommunities(data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCommunitiesByUser();
    });


    return (
        <div className="divManageCommunities">
            <div className="App bg-white p-5 rounded-5 shadow-lg container mt-3 mb-3">
                <h1 className="mb-3 text-success">Comunidades creadas</h1>
                <div className='row'>

                    {communities.length > 0 ? (
                        communities.map((community) => (

                            <div key={community.id} className='col-3 mb-3'>
                                <img className='imageDimensions' src={community.community_photo} alt='ImageCommunity'></img>
                                <h4 className='title' onClick={() => setIsOpen(true)}>{community.community_name}</h4>
                                <p>{community.community_description}</p>
                            </div>

                        ))
                    ) : (
                        <div>
                            <h4 className='title'>No tienes comunidades creadas</h4>
                        </div>
                    )}



                </div>
            </div>
            <EditDeleteCommunity open={isOpen} onClose={() => setIsOpen(false)}></EditDeleteCommunity>
        </div>
    );
}

export default ManageCommunities;