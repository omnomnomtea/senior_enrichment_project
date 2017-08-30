import axios from 'axios';

//-------------------------------------
//ACTION TYPES
//-------------------------------------

const STUDENT_ADDED = 'STUDENT_ADDED';
const STUDENT_DELETED = 'STUDENT_DELETED';
const STUDENT_MODIFIED = 'STUDENT_MODIFIED';


//-------------------------------------
//ACTION CREATORS
//-------------------------------------

export const studentAdded = (student) => {
  return {
    type: STUDENT_ADDED,
    student: student
  }
}

export const studentDeleted = (student) => {
  return {
    type: STUDENT_DELETED,
    student: student
  }
}

export const studentModified = (student) => {
  return {
    type: STUDENT_MODIFIED,
    student: student
  }
}

//-------------------------------------
//REDUCER
//-------------------------------------

const reducer = (state = [], action) => {
  let newState = [];
  switch (action.type) {
    case STUDENT_ADDED:
      return [...state, action.student];
    case STUDENT_MODIFIED:
      newState = [...state];
      let oldIndex = state.findIndex((student) => student.id === action.student.id);
      newState[oldIndex] = action.student;
      return newState;
    case STUDENT_DELETED:
      oldIndex = state.findIndex((student) => student.id === action.student.id);
      newState = state.slice(0, oldIndex);
      newState = newState.concat(state.slice(oldIndex + 1));
      return newState;
    default:
      return state;
  }
}

//-------------------------------------
//THUNK CREATORS
//-------------------------------------
export const createStudent = (student) => {
  return (dispatch) => {
    axios.post('/api/students/', student)
      .then(returnedstudent => {
        dispatch(studentAdded(returnedstudent));
      })
      .catch(console.log.bind(console))
  }
}

export const deleteStudent = (student) => {
  return (dispatch) => {
    axios.delete(`/api/students/${student.id}`)
      .then(() => {
        dispatch(studentDeleted(student));
      })
      .catch(console.log.bind(console))
  }
}

export const modifyStudent = (student) => {
  return (dispatch) => {
    axios.put('/api/students/', student)
      .then(student => {
        dispatch(studentModified(student));
      })
      .catch(console.log.bind(console))
  }
}


//-------------------------------------
// DEFAULT EXPORT (placed here for ease finding it later)
//-------------------------------------
export default reducer;
