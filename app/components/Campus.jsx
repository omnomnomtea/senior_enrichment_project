import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { modifyCampus, deleteCampus } from '../reducers/campusReducer'

class Campus extends Component {

  constructor() {
    super();
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  render() {
    // If we go DIRECTLY to a single campus page (to /campus/1 for example)
    // then the page with a single campus renders before the network request
    // to load the campuses finishes. We need to render an empty component
    // to prevent errors in this case, which we check for by seeing if the
    // campus prop is defined
    if (!this.props.campus) {
      return (<div />)
    }

    return (
      <div className="panel panel-info">
        <div className="clearfix panel panel-heading">
          <Link to={'/campus/' + this.props.id}>
            {this.props.campus.name}
          </Link>
          <button className='btn btn-danger pull-right' onClick={this.handleDeleteClick}>x</button>
          <Link to={`/editcampus/${this.props.id}`}>
          <button className='btn btn-warning pull-right'><span className="glyphicon glyphicon-pencil" /></button>
          </Link>
        </div>
        <div className="panel-body">
          <img src={this.props.campus.image} height="175px" />
        </div>
      </div>
    )
  }

  handleDeleteClick() {
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
