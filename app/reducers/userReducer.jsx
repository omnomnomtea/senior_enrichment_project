import axios from 'axios';

//-------------------------------------
//ACTION TYPES
//-------------------------------------
const USER_ADDED = 'USER_ADDED';
const USER_DELETED = 'USER_DELETED';
const USER_MODIFIED = 'USER_MODIFIED';


//-------------------------------------
//ACTION CREATORS
//-------------------------------------
export const userAdded = (user) => {
  return {
    type: USER_ADDED,
    user: user
  }
}

export const userDeleted = (user) => {
  return {
    type: USER_DELETED,
    user: user
  }
}

export const userModified = (user) => {
  return {
    type: USER_MODIFIED,
    user: user
  }
}

//-------------------------------------
//REDUCER
//-------------------------------------
const reducer = (state = [], action) => {
  let newState = [];
  switch (action.type) {
    case USER_ADDED:
      return [...state, action.user];
    case USER_MODIFIED:
      newState = [...state];
      let oldUserIndex = state.findIndex((user) => user.id === action.user.id);
      newState[oldUserIndex] = action.user;
      return newState;
    case USER_DELETED:
      let oldIndex = state.findIndex((user) => user.id === action.user.id);
      newState = state.slice(0, oldIndex);
      newState = newState.concat(state.slice(oldUserIndex + 1));
      return newState;
    default:
      return state;
  }
}

//-------------------------------------
//THUNK CREATORS
//-------------------------------------
export const createUser = (user) => {
  return (dispatch) => {
    axios.post('/api/users/', user)
      .then(res => res.data)
      .then(returnedUser => {
        dispatch(userAdded(returnedUser));
      })
      .catch(console.log.bind(console))
  }
}

export const deleteUser = (user) => {
  return (dispatch) => {
    axios.delete(`/api/users/${user.id}`)
      .then(() => {
        dispatch(userDeleted(user));
      })
      .catch(console.log.bind(console))
  }
}

export const modifyUser = (user) => {
  return (dispatch) => {
    axios.put('/api/users/', user)
      .then(res => res.data)
      .then(returnedUser => {
        dispatch(userModified(returnedUser));
      })
      .catch(console.log.bind(console))
  }
}


//-------------------------------------
// DEFAULT EXPORT (placed here for ease finding it later)
//-------------------------------------
export default reducer;
