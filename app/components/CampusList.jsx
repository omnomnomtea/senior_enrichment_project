import React from 'react';
import { connect } from 'react-redux';
import Campus from './Campus';

function CampusList(props) {
  return (
    <div>
      <h2>Campuses <button className='btn btn-success'>+</button> </h2>
      {props.campuses.map((campus => {
        return (
          <div key={campus.id} className="col-sm-12 col-md-6 col-lg-4">
            <Campus id={campus.id} />
          </div>
        )
      }))}
    </div>
  )
}

const mapState = (state) => {
  return {
    campuses: state.campuses,
  }
};
const mapDispatch = () => {
  return {}
};

const BetterCampusLIst = connect(mapState, mapDispatch)(CampusList);


export default BetterCampusLIst;
