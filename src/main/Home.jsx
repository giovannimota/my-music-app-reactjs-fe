import React, { Component } from "react";
import "./home.css";

class Home extends Component {

  render() {
    return (
      <div>
        <h1>Home</h1>
        <div className="animation-area">
          <ul className="box-area">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;