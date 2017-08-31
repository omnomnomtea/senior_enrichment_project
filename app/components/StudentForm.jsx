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
      firstNameDirty: false,
      lastNameDirty: false,
      emailDirty: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onUpdateFirstName = this.onUpdateFirstName.bind(this);
    this.onUpdateLastName = this.onUpdateLastName.bind(this);
    this.onUpdateEmail = this.onUpdateEmail.bind(this);

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>First Name:
          <input type="text" onChange={this.onUpdateFirstName} value={this.state.firstName} name="firstName" />
        </label>

        <label>Last Name:
        <input type="text" onChange={this.onUpdateLastName} value={this.state.lastName} name="lastName" />
        </label>

        <label>Email:
        <input type="text" onChange={this.onUpdateEmail} value={this.state.email} name="imageURL" />
        </label>

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

  enableSubmit() {
    return this.state.firstName && this.state.lastName && this.state.email;
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.enableSubmit()) {
      const student = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email
      };
      this.props.createStudent(student);
      this.setState({ firstName: '', lastName: '', email: '', firstNameDirty: false, lastNameDirty: false, emailDirty: false })
    }
  }

}


const mapState = (state, ownProps) => {
  return {
    id: ownProps.match.params.id,
  }
};

const mapDispatch = (dispatch) => {
  return {
    createStudent: (student) => dispatch(createStudent(student))
  }
}

const WrappedStudentForm = connect(mapState, mapDispatch)(StudentForm);
export default WrappedStudentForm;
