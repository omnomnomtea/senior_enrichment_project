import React, { Component } from 'react';
import { modifyCampus, createCampus } from '../reducers/campusReducer'
import { connect } from 'react-redux';


class CampusForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      image: '',
      nameDirty: false,
      imageDirty: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onUpdateImage = this.onUpdateImage.bind(this);
    this.onUpdateName = this.onUpdateName.bind(this);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Name:
          <input type="text" onChange={this.onUpdateName} value={this.state.name} name="campusName" />
        </label>

        <label>Image URL:
        <input type="text" onChange={this.onUpdateImage} value={this.state.image} name="imageURL" />
        </label>

        <button className="btn btn-success" type="submit" disabled={!this.enableSubmit()}>{this.props.id ? "Edit" : "Add"} Campus</button>
      </form>
    )
  }

  onUpdateName(event) {
    this.setState({ name: event.target.value, nameDirty: true });
  }
  onUpdateImage(event) {
    this.setState({ image: event.target.value, imageDirty: true });
  }

  enableSubmit() {
    return this.state.name && this.state.image;
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.enableSubmit()) { //only allow submission when fields are filled out
      if (!this.props.id) { //if we're creating a new campus
        const campus = {
          name: this.state.name,
          image: this.state.image
        };
        this.props.createCampus(campus);
        this.setState({ name: '', image: '', nameDirty: false, imageDirty: false })
      }
      else {//if we're editing a campus
      const campus = {
        name: this.state.name,
        image: this.state.image
      };
      this.props.editCampus(campus);
      this.setState({ name: '', image: '', nameDirty: false, imageDirty: false })
      }
    }
  }

}


const mapState = (state, ownProps) => {
  return {
    name: ownProps.name,
    image: ownProps.image
  }
};

const mapDispatch = (dispatch) => {
  return {
    createCampus: (campus) => dispatch(createCampus(campus)),
    editCampus: (campus) => dispatch(modifyCampus(campus))
  }
}

const WrappedCampusForm = connect(mapState, mapDispatch)(CampusForm);
export default WrappedCampusForm;