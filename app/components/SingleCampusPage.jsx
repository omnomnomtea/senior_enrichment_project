import React, { Component } from 'react';
import { createCampus, modifyCampus, deleteCampus } from '../reducers/campusReducer'
import Campus from './Campus'
import { Link } from 'react-router';
import StudentList from './StudentList'


export default function SingleCampusPage(props) {
  const id = props.match.params.id;
  return (
    <div className="panel panel-primary">
      <Campus id={+id} />
      <StudentList campusId={id} />
    </div>
  )

}

