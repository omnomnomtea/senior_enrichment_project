import React, { Component } from 'react';
import { createCampus, modifyCampus, deleteCampus } from '../reducers/campusReducer'
import Campus from './Campus'
import { Link } from 'react-router';
import StudentList from './StudentList'


export default function SingleCampusPage(props) {
  const id = Number(props.match.params.id);
  return (
    <div className="col-sm-12 col-md-12 col-lg-12">
      <div className="col-sm-12 col-md-12 col-lg-12">
        <Campus id={id} />
      </div>

      <StudentList campusId={id} />
    </div>
  )

}

