import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Home.css';

const Home = () => { 

  const [like, setLike] = useState(100)
  const [dislike, setDislike] = useState(4)

  const [likeActive, setLikeActive] = useState(false)
  const [dislikeActive, setDislikeActive] = useState(false)

  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([])

  const onClickHandler = (e) => {
    setComments((comments) => [...comments, comment])
  }
  const onChangeHandler = (e) => {
    setComment(e.target.value)
  }

  function likeFunction(){
    if(likeActive){
      setLikeActive(false)
      setLike(like-1)
    }
    else{
      setLikeActive(true)
      setLike(like+1)
      if(dislikeActive){
        setDislikeActive(false)
        setLike(like+1)
        setDislike(dislike-1)
      }
    }
  }

  function dislikeFunction(){
    if(dislikeActive){
      setDislikeActive(false)
      setDislike(dislike-1)
    }
    else{
      setDislikeActive(true)
      setDislike(dislike+1)
      if(likeActive){
        setLikeActive(false)
        setDislike(dislike+1)
        setLike(like-1)
      }
    }
  }

    return (
      <div>
        <nav class="navbar bg-body-tertiary bg-white">
          <div class="container-fluid">
            <a class="navbar-brand" href="/">Pocom</a>
            <form class="d-flex" role="search">
              <input className="inputTextLarge" type="text"></input>
              <button className="navLeftMargin btn btn-success">Search</button>
            </form>
            <div>
              <a className="btn btn-primary" href="/login">Login</a>
              <a className="navLeftMargin btn btn-success" href="/profile">Profile</a>
            </div>
          </div>
        </nav>
        
        <div className="divHome">
          <div className="bg-white col-9 mt-2 rounded">
            <div>
              <h1 className="leftMargin">Your feed</h1>
            </div>

            <div className="d-flex leftMargin">
              <p>community</p>
              <p className="leftMargin">published by</p>
              <button className="btn btn-primary" style={{marginLeft: "auto", marginRight: 10}}>join comunity</button>
            </div>

            <h3 className="leftMargin">Topic post</h3>

            <div>
              <div className="d-flex justify-content-center"><p>Post content</p></div>
              <div className="d-flex justify-content-center">
                <img className="postImage" src="https://upload.wikimedia.org/wikipedia/commons/0/07/Reddit_icon.svg"></img>
              </div>
            </div>

            <div className="input-group gap-2 leftMargin">
              <button onClick={likeFunction} className={[likeActive ? 'active-like': null, 'button'].join(' ')}>Like {like}</button>
              <button onClick={dislikeFunction} className={[dislikeActive ? 'active-dislike': null, 'button'].join(' ')}>Dislike {dislike}</button>
              <p>comments number</p>
            </div>

            <div className="mt-3 main-container">
              <div className="comment-flexbox">
                <h3 className="comment-text">Comment</h3>
                <textarea
                  value={comment}
                  onChange={onChangeHandler}
                  className="input-box"
                />
                <button onClick={onClickHandler} className="comment-button">Submit</button>
              </div>
            </div>

            {comments.map((text) => (
                <div className="comment-container leftMargin">{text}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
export default Home;