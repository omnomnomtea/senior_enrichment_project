import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { BrowserRouter, Route } from 'react-router';

//import NavBar from './NavBar';
import Campus from './Campus';
import CampusList from './CampusList';
import Student from './Student';
import { loadCampuses } from '../reducers/campusReducer';
import { loadStudents } from '../reducers/studentReducer';


class StudentList extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="container">
        <div className="">
            <h2>Students</h2>
            {
              this.props.students.map( (student) => {
                return (<Student key={student.id} id={student.id} />)
              })
            }
        </div>
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  return {
    //if we don't define the campusId we want to return every student
    //if we do have a campusId, we should list only students on that campus
    students: state.students.filter((student) => {
      return ((student.campusId === ownProps.campusId) || (ownProps.campusId === undefined));
    }),
  }
};
const mapDispatch = (dispatch) => {
  return {}
};

const BetterStudentList = connect(mapState, mapDispatch)(StudentList);
export default BetterStudentList;
