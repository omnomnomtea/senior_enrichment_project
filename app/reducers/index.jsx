import { combineReducers } from 'redux'
import students from './studentReducer';
import users from './userReducer';
import campuses from './campusReducer';

const rootReducer = combineReducers({students, users, campuses})

export default rootReducer;
