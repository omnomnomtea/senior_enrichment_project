import axios from 'axios';

//-------------------------------------
//ACTION TYPES
//-------------------------------------

const CAMPUS_ADDED = 'CAMPUS_ADDED';
const CAMPUS_DELETED = 'CAMPUS_DELETED';
const CAMPUS_MODIFIED = 'CAMPUS_MODIFIED';


//-------------------------------------
//ACTION CREATORS
//-------------------------------------

export const campusAdded = (campus) => {
  return {
    type: CAMPUS_ADDED,
    campus: campus
  }
}

export const campusDeleted = (campus) => {
  return {
    type: CAMPUS_DELETED,
    campus: campus
  }
}

export const campusModifed = (campus) => {
  return {
    type: CAMPUS_MODIFIED,
    campus: campus
  }
}

//-------------------------------------
//REDUCER
//-------------------------------------

const reducer = (state = [], action) => {
  let newState = [];
  switch (action.type) {
    case CAMPUS_ADDED:
      return [...state, action.campus];
    case CAMPUS_MODIFIED:
      newState = [...state];
      let oldIndex = state.findIndex((campus) => campus.id === action.campus.id);
      newState[oldIndex] = action.campus;
      return newState;
    case CAMPUS_DELETED:
      oldIndex = state.findIndex((campus) => campus.id === action.campus.id);
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
export const createCampus = (campus) => {
  return (dispatch) => {
    axios.post('/api/campuses/', campus)
      .then(returnedcampus => {
        dispatch(campusAdded(returnedcampus));
      })
      .catch(console.log.bind(console))
  }
}

export const deleteCampus = (student) => {
  return (dispatch) => {
    axios.delete(`/api/students/${student.id}`)
      .then(() => {
        dispatch(campusDeleted(student));
      })
      .catch(console.log.bind(console))
  }
}

export const modifyCampus = (student) => {
  return (dispatch) => {
    axios.put('/api/students/', student)
      .then(student => {
        dispatch(campusModifed(student));
      })
      .catch(console.log.bind(console))
  }
}


//-------------------------------------
// DEFAULT EXPORT (placed here for ease finding it later)
//-------------------------------------
export default reducer;
