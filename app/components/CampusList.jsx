import React from 'react';
import { connect } from 'react-redux';
import Campus from './Campus';

function CampusList (props) {
    return (
      <div className="">
        <h2>Campuses</h2>
        {props.campuses.map((campus => {
          return <Campus key={campus.id} id={campus.id} />
        }))}
      </div>
    )
}

const mapState = (state) => {
  return {
    campuses: state.campuses,
  }
};
const mapDispatch = (dispatch) => {
  return {}
};

const BetterCampusLIst = connect(mapState, mapDispatch)(CampusList);


export default BetterCampusLIst;
