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
    this.enableSubmit = this.enableSubmit.bind(this);
  }

  componentDidMount() {
    this.tryToSetState(this.props);
  }

  componentWillReceiveProps(nextProps){
    this.tryToSetState(nextProps);
  }

  tryToSetState(nextProps) {
    if (nextProps.campus) {
      this.setState({
        name: nextProps.campus.name,
        image: nextProps.campus.image,
        id: nextProps.campus.id
      });
    }
  }

  render() {
    if (this.props.campuses.length <= 0) {
      return (<div />);
    }

    return (
      <div>
        <h2>{this.props.id ? "Edit" : "Add New"} Campus {!!this.props.campus && this.props.campus.name}</h2>
        <form onSubmit={this.handleSubmit}>

          <label>{!!this.props.id && "New "}Name:
          <input type="text" onChange={this.onUpdateName} value={this.state.name} name="campusName" />
          </label>

          <label>{!!this.props.id && "New "}Image URL:
        <input type="text" onChange={this.onUpdateImage} value={this.state.image} name="imageURL" />
          </label>

          <button className="btn btn-success" type="submit" disabled={!this.enableSubmit()}>
            {this.props.id ? "Edit" : "Add"} Campus
        </button>
        </form>
      </div>
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
      let campus = {}
      if (this.state.name) campus.name = this.state.name;
      if (this.state.image) campus.image = this.state.image;

      if (!this.props.id) { //if we're creating a new campus
        this.props.createCampus(campus);
      }
      else {//we're editing a campus
        campus.id = this.props.id;
        this.props.editCampus(campus);
      }
      this.setState({ name: '', image: '', nameDirty: false, imageDirty: false })
      if (!this.props.id) {
        this.props.history.push('/campuses/')
      }
      else {
        this.props.history.push(`/campus/${this.props.id}`)
      }
    }
  }
}

const mapState = (state, ownProps) => {
  const id = Number(ownProps.match.params.id);
  return {
    id: id,
    history: ownProps.history,
    campuses: state.campuses,
    campus: state.campuses.find(campus => campus.id === id)
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
