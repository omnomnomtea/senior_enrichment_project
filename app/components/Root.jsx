import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { BrowserRouter, Route } from 'react-router';

//import NavBar from './NavBar';
import Campus from './Campus';
import CampusList from './CampusList'
import { loadCampuses } from '../reducers/campusReducer'


class Root extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.loadCampuses();
  }

  render() {
    return (
      <div className="container">
        <CampusList />
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  return {
    campuses: state.campuses,
    users: state.users,
    students: state.students,
  }
};
const mapDispatch = (dispatch) => {
  return {
    loadCampuses: () => { dispatch(loadCampuses()) }
  }
};

const BetterRoot = connect(mapState, mapDispatch)(Root);


export default BetterRoot;
