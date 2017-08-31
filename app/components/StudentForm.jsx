import React, { Component } from 'react';
import { createStudent } from '../reducers/studentReducer'
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

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="formgroup">

          <label className="control-label">
            First Name:
          </label>
          <input className="form-control" type="text" onChange={this.onUpdateFirstName} value={this.state.firstName} name="firstName" />
        </div>
        <div className="formgroup">

          <label className="control-label">
            Last Name:
          </label>
          <input className="form-control" type="text" onChange={this.onUpdateLastName} value={this.state.lastName} name="lastName" />

        </div>

        <div className="formgroup">
          <label className="control-label">
            Email:
          </label>
          <input className="form-control" type="text" onChange={this.onUpdateEmail} value={this.state.email} name="imageURL" />
        </div>

        <div className="formgroup">
          <label className="control-label">
            Campus
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

        <button className="btn btn-success" type="submit" disabled={!this.enableSubmit()}>Add Student</button>
      </form>
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
        campusId: this.state.campusId
      };
      this.props.createStudent(student);
      this.setState({ firstName: '', lastName: '', email: '', firstNameDirty: false, lastNameDirty: false, emailDirty: false })
    }
  }

}


const mapState = (state, ownProps) => {
  return {
    id: ownProps.match.params.id,
    campuses: state.campuses
  }
};

const mapDispatch = (dispatch) => {
  return {
    createStudent: (student) => dispatch(createStudent(student))
  }
}

const WrappedStudentForm = connect(mapState, mapDispatch)(StudentForm);
export default WrappedStudentForm;
