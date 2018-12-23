import React, {Component } from "react";
import "./Home.css";
import Post from './Post';
import testimg from '../upload/testing.jpg';
//import loadAllPosts from '../redux/actions';
import { connect } from 'react-redux';
import axios from 'axios'



class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            urls:[]
        };
    }

    componentDidMount(){
        axios.get('./api/urls')
        .then((res) => {
            console.log(res.data);
            const urls = res.data;
            this.setState({urls});
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
          {
                    this.state.urls.map((i) => {
                        return(<Post image={i} />);
                    })
                    //JSON.stringify(this.props.messages)
                }
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
