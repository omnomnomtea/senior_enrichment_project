import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCampus, modifyCampus, deleteCampus } from '../reducers/campusReducer'

class Campus extends Component {

  constructor() {
    super();
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  render() {
    return (
      <div className="panel panel-primary col-sm-12 col-md-6 col-lg-4">
        <div className="panel panel-heading col-12">
          {this.props.campus.name}
        </div>
        <div className="panel panel-body col-12">
          <img src={this.props.campus.image} height="175px" />
          <button onClick={this.handleDeleteClick}>x</button>
        </div>
      </div>
    )
  }

  handleDeleteClick (event) {
    this.props.deleteCampus(this.props.campus)
  }

}

const mapState = (state, ownProps) => {
  return {
    history: ownProps.history,
    campus: state.campuses.find(campus => campus.id === ownProps.id),
    id: ownProps.id
  }
};


const mapDispatch = (dispatch) => {
  return {
    deleteCampus: (campus) => { dispatch(deleteCampus(campus)) },
    createCampus: (campus) => { dispatch(createCampus(campus)) },
    modifyCampus: (campus) => { dispatch(modifyCampus(campus)) },
  }
}

const WrappedCampus = connect(mapState, mapDispatch)(Campus);
export default WrappedCampus;
