import React, { Component } from 'react';
import { createCampus, modifyCampus, deleteCampus } from '../reducers/campusReducer'
import Student from './Student'
import { Link } from 'react-router-dom';
import StudentList from './StudentList'


export default function SingleStudentPage(props) {
  const id = Number(props.match.params.id);

  return (
    <div className="panel panel-primary">
      <Student id={id} />
    </div>
  )

}

