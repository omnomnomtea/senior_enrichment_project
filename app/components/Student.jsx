import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStudent, modifyStudent, deleteStudent } from '../reducers/studentReducer'
import { Link } from 'react-router-dom';


class Student extends Component {

  constructor() {
    super();
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.getCampus = this.getCampus.bind(this);
  }

  render() {
    if (!this.props.student) return <div />

    const campusId = this.props.student.campusId;
    const id = this.props.student.id;

    return (
      <div className="panel panel-info col-sm-12 col-md-12 col-lg-6">
        <div className="panel panel-heading col-12">
          <Link to={`/student/${id}`}>{this.props.student.firstName + " " + this.props.student.lastName}</Link>
        </div>
        <div className="panel panel-body col-12">
          <p>{this.props.student.email}</p>
          <p>Campus: <Link to={`/campus/${campusId}`}>{this.getCampus(campusId).name}</Link></p>
          <button onClick={this.handleDeleteClick}>x</button>
        </div>
      </div>
    )
  }

  handleDeleteClick (event) {
    this.props.deleteStudent(this.props.student)
  }

  getCampus(id){
    return this.props.campuses.find(campus => campus.id === id)
  }

}

const mapState = (state, ownProps) => {
  return {
    history: ownProps.history,
    student: state.students.find(student => student.id === ownProps.id),
    id: ownProps.id,
    campuses: state.campuses
  }
};


const mapDispatch = (dispatch) => {
  return {
    deleteStudent: (student) => { dispatch(deleteStudent(student)) },
    createStudent: (student) => { dispatch(createStudent(student)) },
    modifyStudent: (student) => { dispatch(modifyStudent(student)) },
  }
}

const WrappedStudent = connect(mapState, mapDispatch)(Student);
export default WrappedStudent;
