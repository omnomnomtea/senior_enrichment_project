import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import NavBar from './NavBar';
import Campus from './Campus';
import CampusList from './CampusList';
import Student from './Student';
import StudentList from './StudentList'
import { loadCampuses } from '../reducers/campusReducer';
import { loadStudents } from '../reducers/studentReducer';
import SingleCampusPage from './SingleCampusPage'


class Root extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.loadCampuses();
    this.props.loadStudents();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <NavBar />
          <Route exact path="/campuses" component={CampusList} />
          <Route exact path="/students" component={StudentList} />
          <Route path="/campus/:id" component={SingleCampusPage} />
          <Route exact path="/" component={CampusList} />
        </div>
      </BrowserRouter>
    )
  }
}

const mapState = (state) => {
  return {
    campuses: state.campuses,
    users: state.users,
    students: state.students,
  }
};
const mapDispatch = (dispatch) => {
  return {
    loadCampuses: () => { dispatch(loadCampuses()) },
    loadStudents: () => { dispatch(loadStudents()) }
  }
};

const BetterRoot = connect(mapState, mapDispatch)(Root);
export default BetterRoot;
