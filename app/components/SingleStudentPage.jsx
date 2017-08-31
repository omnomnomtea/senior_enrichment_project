import React from 'react';
import Student from './Student'

export default function SingleStudentPage(props) {
  const id = Number(props.match.params.id);

  return (
    <div className="panel">
      <Student id={id} />
    </div>
  )
}

