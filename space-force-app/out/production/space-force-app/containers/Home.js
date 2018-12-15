import React, {Component } from "react";
import "./Home.css";
import Post from './Post';
import testimg from './testimg.jpg';
import { connect } from 'react-redux';



class Home extends Component {


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
          <Post username = {this.props.userid} description="sdkrbhjkejrahbfwkjhb" image = {testimg}/>
          
          
        </div>
      </div>
    );
  }


} 

const mapStateToProps = (state, ownProps) => {
  return {
      userid : state.testReducer.userid,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);