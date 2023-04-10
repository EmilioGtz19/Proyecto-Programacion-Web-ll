import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => { 
    return (
      <div className="text-white">
        <div>
          <h1>Your feed</h1>
        </div>

        <div>
          <p>community</p>
          <p>published by</p>
          <button>join comunity</button>
        </div>

        <h3>Topic post</h3>

        <div>
          <p>Post content</p>
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/07/Reddit_icon.svg"></img>
        </div>

        <div>
          <button>Like</button>
          <button>Dislike</button>
          <p>comments number</p>
        </div>

        <div>
          <p>make a comment</p>
          <input type="text"></input>
        </div>
      </div>
    );
  }
  
export default Home;