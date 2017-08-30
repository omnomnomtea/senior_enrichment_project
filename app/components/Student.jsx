import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router';
import NavBar from '.NavBar'


class Student extends Component {
  constructor() {
    super()
  }

  render() {

  }

}

const mapState = (state, ownProps) => {
  return {

  }
};
const mapDispatch = (dispatch) => {
  return {

  }
}

const BetterStudent = connect(mapState, mapDispatch)(Student);


export default BetterStudent;
