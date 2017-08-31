import axios from 'axios';

//-------------------------------------
//ACTION TYPES
//-------------------------------------

const CAMPUS_ADDED = 'CAMPUS_ADDED';
const CAMPUS_DELETED = 'CAMPUS_DELETED';
const CAMPUS_MODIFIED = 'CAMPUS_MODIFIED';
const CAMPUSES_LOADED = 'CAMPUSES_LOADED';


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

export const campusesLoaded = (campuses) => {
  return {
    type: CAMPUSES_LOADED,
    campuses: campuses
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
    case CAMPUSES_LOADED:
      newState = action.campuses;
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
      .then(res => res.data)
      .then(returnedCampus => {
        dispatch(campusAdded(returnedCampus));
      })
      .catch(console.log.bind(console))
  }
}

export const deleteCampus = (campus) => {
  return (dispatch) => {
    axios.delete(`/api/campuses/${campus.id}`)
      .then(() => {
        dispatch(campusDeleted(campus));
      })
      .catch(console.log.bind(console))
  }
}

export const modifyCampus = (campus) => {
  return (dispatch) => {
    axios.put('/api/campuses/', campus)
      .then(res => res.data)
      .then(campus => {
        dispatch(campusModifed(campus));
      })
      .catch(console.log.bind(console))
  }
}

export const loadCampuses = () => {
  return (dispatch) => {
    axios.get('/api/campuses/')
      .then(res => res.data)
      .then(campuses => {
        dispatch(campusesLoaded(campuses));
      })
      .catch(console.log.bind(console))
  }
}


//-------------------------------------
// DEFAULT EXPORT (placed here for ease finding it later)
//-------------------------------------
export default reducer;
