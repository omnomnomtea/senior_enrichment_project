import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStudent, modifyStudent, deleteStudent } from '../reducers/studentReducer'

class Student extends Component {

  constructor() {
    super();
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  render() {
    return (
      <div className="panel panel-info col-sm-12 col-md-12 col-lg-6">
        <div className="panel panel-heading col-12">
          {this.props.student.firstName + " " + this.props.student.lastName}
        </div>
        <div className="panel panel-body col-12">
          <p>{this.props.student.email}</p>
          <button onClick={this.handleDeleteClick}>x</button>
        </div>
      </div>
    )
  }

  handleDeleteClick (event) {
    this.props.deleteStudent(this.props.student)
  }

}

const mapState = (state, ownProps) => {
  return {
    history: ownProps.history,
    student: state.students.find(student => student.id === ownProps.id),
    id: ownProps.id
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
