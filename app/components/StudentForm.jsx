import React, { Component } from 'react';
import { createStudent, modifyStudent } from '../reducers/studentReducer'
import { connect } from 'react-redux';

class StudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      campusId: 0,
      firstNameDirty: false,
      lastNameDirty: false,
      emailDirty: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onUpdateFirstName = this.onUpdateFirstName.bind(this);
    this.onUpdateLastName = this.onUpdateLastName.bind(this);
    this.onUpdateEmail = this.onUpdateEmail.bind(this);
    this.onUpdateCampus = this.onUpdateCampus.bind(this);
  }


  componentDidMount() {
    this.tryToSetState(this.props);
  }

  componentWillReceiveProps(nextProps){
    this.tryToSetState(nextProps);
  }

  tryToSetState(props) {
    if (props.student) { //if props has info...
      this.setState({
        id: props.id,
        firstName: props.student.firstName,
        lastName: props.student.lastName,
        email: props.student.email,
        campusId: props.student.campusId,
      })
    }
  }

  render() {
    return (
      <div>
        <h2>{this.props.id ? 'Edit' : 'Add'} Student {this.props.student && this.props.student.firstName + " " + this.props.student.lastName}</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="formgroup">

            <label className="control-label">
              {!!this.props.id && "New"} First Name:
          </label>
            <input className="form-control" type="text" onChange={this.onUpdateFirstName} value={this.state.firstName} name="firstName" />
          </div>
          <div className="formgroup">

            <label className="control-label">
              {!!this.props.id && "New"} Last Name:
          </label>
            <input className="form-control" type="text" onChange={this.onUpdateLastName} value={this.state.lastName} name="lastName" />

          </div>

          <div className="formgroup">
            <label className="control-label">
              {!!this.props.id && "New"} Email:
          </label>
            <input className="form-control" type="text" onChange={this.onUpdateEmail} value={this.state.email} name="imageURL" />
          </div>

          <div className="formgroup">
            <label className="control-label">
              {!!this.props.id && "New"} Campus
          </label>
            <select className="form-control" value={this.state.campusId} onChange={this.onUpdateCampus}>
              {
                this.props.campuses.map((campus) => {
                  return (
                    <option key={campus.id} value={campus.id}>{campus.name}</option>
                  )
                })
              }
            </select>
          </div>

          <button className="btn btn-success" type="submit" disabled={!this.enableSubmit()}>
            {this.props.id ? 'Edit' : 'Add'} Student
          </button>
        </form>
      </div>
    )
  }

  onUpdateFirstName(event) {
    this.setState({ firstName: event.target.value, firstNameDirty: true });
  }
  onUpdateLastName(event) {
    this.setState({ lastName: event.target.value, firstNameDirty: true });
  }
  onUpdateEmail(event) {
    this.setState({ email: event.target.value, emailDirty: true });
  }
  onUpdateCampus(event) {
    this.setState({ campusId: event.target.value });
  }
  enableSubmit() {
    return this.state.firstName && this.state.lastName && this.state.email;
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.enableSubmit()) {
      const student = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        campusId: this.state.campusId,
        id: this.state.id
      };

      let id;
      if (!this.props.id) {
        this.props.createStudent(student);
        id = this.props.id;
      }
      else {
        this.props.editStudent(student);
      }

      this.setState({ firstName: '', lastName: '', email: '', firstNameDirty: false, lastNameDirty: false, emailDirty: false })

      if (id) {
        this.props.history.push(`/student/${id}`);
      }
      else {
        this.props.history.push(`/students/`)
      }
    }
  }

}


const mapState = (state, ownProps) => {
  let id;
  let student;
  if (ownProps.match) {
    id = Number(ownProps.match.params.id);
    student = state.students.find(searchStudent => searchStudent.id === id);
  }
  return {
    id: id,
    campuses: state.campuses,
    student: student,
    history: ownProps.history
  }
};

const mapDispatch = (dispatch) => {
  return {
    createStudent: (student) => dispatch(createStudent(student)),
    editStudent: (student) => dispatch(modifyStudent(student))
  }
}

const WrappedStudentForm = connect(mapState, mapDispatch)(StudentForm);
export default WrappedStudentForm;
