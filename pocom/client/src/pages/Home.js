import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Home.css';

const Home = () => { 
    return (
      <div>
        <nav class="navbar bg-body-tertiary bg-white">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">Navbar</a>
            <form class="d-flex" role="search">
              <input type="text"></input>
              <button className="navLeftMargin">Search</button>
            </form>
            <div>
              <button>Login</button>
              <button className="navLeftMargin">Profile</button>
            </div>
          </div>
        </nav>
        
        <div className="divHome">
          <div className="bg-white col-9">
            <div>
              <h1 className="leftMargin">Your feed</h1>
            </div>

            <div className="d-flex leftMargin">
              <p>community</p>
              <p className="leftMargin">published by</p>
              <button style={{marginLeft: "auto", marginRight: 10}}>join comunity</button>
            </div>

            <h3 className="leftMargin">Topic post</h3>

            <div>
              <div className="d-flex justify-content-center"><p>Post content</p></div>
              <div className="d-flex justify-content-center">
                <img className="postImage" src="https://upload.wikimedia.org/wikipedia/commons/0/07/Reddit_icon.svg"></img>
              </div>
            </div>

            <div className="input-group gap-2 leftMargin">
              <button>Like</button>
              <button>Dislike</button>
              <p>comments number</p>
            </div>

            <div className="leftMargin">
              <p>make a comment</p>
              <input type="text"></input>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
export default Home;