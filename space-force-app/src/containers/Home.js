import React, {Component } from "react";
import "./Home.css";
import Post from './Post';
import testimg from '../upload/testing.jpg';
//import loadAllPosts from '../redux/actions';
import { connect } from 'react-redux';
import axios from 'axios'



class Home extends Component {
    componentDidMount(){
        axios.get('./api/urls')
        .then((res) => {
            console.log(res.data);
            this.props.loadAllPosts(res.data);
        }).catch((e) => {
            console.log(e);
        })
    }

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
          <Post username = {this.props.userid} description="sdkrbhjkejrahbfwkjhb" image={testimg} />
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
