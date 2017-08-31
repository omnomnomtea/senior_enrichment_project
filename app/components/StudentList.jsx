import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link } from 'react-router-dom'
import Student from './Student';


class StudentList extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="container">
        <h2>Students
        <Link to={`/editStudent/`}>
        <button className='btn btn-success'>+</button>
        </Link>
        </h2>
        {
          this.props.students.map((student) => {
            return (<Student key={student.id} id={student.id} />)
          })
        }
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
