import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCampus, modifyCampus, deleteCampus } from '../reducers/campusReducer'

class Campus extends Component {

  render() {
    return (
      <div className="student-box">
        <li>
        <p>{this.props.campus.name}</p>
        <img src={this.props.campus.image} />
        <button onClick={this.props.deleteCampus}>x</button>
        </li>
      </div>
    )
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
