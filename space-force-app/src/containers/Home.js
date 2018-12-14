import React, {Component } from "react";
import "./Home.css";
import Post from './Post';
import testimg from './testimg.jpg';



export default class Home extends Component {


  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Space Force</h1>
          <p>A simple instagram clone</p>
        </div>
        <div className="feed">
          <h1>Feed</h1>
          <hr></hr>
          <Post username = "lkuhvfkjehf" description="sdkrbhjkejrahbfwkjhb" image = {testimg}/>
          <Post />
          <Post />
          <Post />
          
        </div>
      </div>
    );
  }


}  