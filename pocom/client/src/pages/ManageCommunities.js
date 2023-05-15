import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../styles/ManageCommunities.css';
import EditDeleteCommunity from './EditDeleteCommunity'
import { useState, useEffect } from "react";

function ManageCommunities() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="divManageCommunities">
            <div className="App bg-white p-5 rounded-5 shadow-lg container mt-3 mb-3">
                <h1 className="mb-3 text-success">Comunidades creadas</h1>
                <div className='row'>
                    <div className='col-3 mb-3'>
                        <img className='imageDimensions' src='https://i.pinimg.com/originals/c2/0f/6d/c20f6de2b36d083cb0d8d1a5fa666b7c.jpg'></img>
                        <h4 className='title' onClick={() => setIsOpen(true)}>Community name</h4>
                        <p>community description: this community is very funny!! ^^</p>
                    </div>
                    <div className='col-3 mb-3'>
                        <img className='imageDimensions' src='https://i.pinimg.com/originals/c2/0f/6d/c20f6de2b36d083cb0d8d1a5fa666b7c.jpg'></img>
                        <h4 className='title' onClick={() => setIsOpen(true)}>community title</h4>
                        <p>community description: this community is very funny!! ^^</p>
                    </div>
                    <div className='col-3 mb-3'>
                        <img className='imageDimensions' src='https://i.pinimg.com/originals/c2/0f/6d/c20f6de2b36d083cb0d8d1a5fa666b7c.jpg'></img>
                        <h4 className='title' onClick={() => setIsOpen(true)}>Community name</h4>
                        <p>community description: this community is very funny!! ^^</p>
                    </div>
                    <div className='col-3 mb-3'>
                        <img className='imageDimensions' src='https://i.pinimg.com/originals/c2/0f/6d/c20f6de2b36d083cb0d8d1a5fa666b7c.jpg'></img>
                        <h4 className='title' onClick={() => setIsOpen(true)}>community title</h4>
                        <p>community description: this community is very funny!! ^^</p>
                    </div>

                    <div className='col-3 mb-3'>
                        <img className='imageDimensions' src='https://i.pinimg.com/originals/c2/0f/6d/c20f6de2b36d083cb0d8d1a5fa666b7c.jpg'></img>
                        <h4 className='title' onClick={() => setIsOpen(true)}>Community name</h4>
                        <p>community description: this community is very funny!! ^^</p>
                    </div>
                    <div className='col-3 mb-3'>
                        <img className='imageDimensions' src='https://i.pinimg.com/originals/c2/0f/6d/c20f6de2b36d083cb0d8d1a5fa666b7c.jpg'></img>
                        <h4 className='title' onClick={() => setIsOpen(true)}>community title</h4>
                        <p>community description: this community is very funny!! ^^</p>
                    </div>
                    <div className='col-3 mb-3'>
                        <img className='imageDimensions' src='https://i.pinimg.com/originals/c2/0f/6d/c20f6de2b36d083cb0d8d1a5fa666b7c.jpg'></img>
                        <h4 className='title' onClick={() => setIsOpen(true)}>Community name</h4>
                        <p>community description: this community is very funny!! ^^</p>
                    </div>
                    <div className='col-3 mb-3'>
                        <img className='imageDimensions' src='https://i.pinimg.com/originals/c2/0f/6d/c20f6de2b36d083cb0d8d1a5fa666b7c.jpg'></img>
                        <h4 className='title' onClick={() => setIsOpen(true)}>community title</h4>
                        <p>community description: this community is very funny!! ^^</p>
                    </div>

                    <div className='col-3 mb-3'>
                        <img className='imageDimensions' src='https://i.pinimg.com/originals/c2/0f/6d/c20f6de2b36d083cb0d8d1a5fa666b7c.jpg'></img>
                        <h4 className='title' onClick={() => setIsOpen(true)}>Community name</h4>
                        <p>community description: this community is very funny!! ^^</p>
                    </div>
                    <div className='col-3 mb-3'>
                        <img className='imageDimensions' src='https://i.pinimg.com/originals/c2/0f/6d/c20f6de2b36d083cb0d8d1a5fa666b7c.jpg'></img>
                        <h4 className='title' onClick={() => setIsOpen(true)}>community title</h4>
                        <p>community description: this community is very funny!! ^^</p>
                    </div>
                    <div className='col-3 mb-3'>
                        <img className='imageDimensions' src='https://i.pinimg.com/originals/c2/0f/6d/c20f6de2b36d083cb0d8d1a5fa666b7c.jpg'></img>
                        <h4 className='title' onClick={() => setIsOpen(true)}>Community name</h4>
                        <p>community description: this community is very funny!! ^^</p>
                    </div>
                    <div className='col-3 mb-3'>
                        <img className='imageDimensions' src='https://i.pinimg.com/originals/c2/0f/6d/c20f6de2b36d083cb0d8d1a5fa666b7c.jpg'></img>
                        <h4 className='title' onClick={() => setIsOpen(true)}>community title</h4>
                        <p>community description: this community is very funny!! ^^</p>
                    </div>
                </div>
            </div>
            <EditDeleteCommunity open={isOpen} onClose={() => setIsOpen(false)}></EditDeleteCommunity>
        </div>
    );
}

export default ManageCommunities;