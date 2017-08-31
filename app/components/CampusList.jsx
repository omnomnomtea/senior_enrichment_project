import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { BrowserRouter, Route } from 'react-router';

//import NavBar from './NavBar';
import Campus from './Campus';

class CampusList extends Component {
  render() {
    return (
        <div className="">
          {this.props.campuses.map((campus => {
            return <Campus key={campus.id} id={campus.id} />
          }))}
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
  return {}
};

const BetterCampusLIst = connect(mapState, mapDispatch)(CampusList);


export default BetterCampusLIst;
