import { combineReducers } from 'redux'
import posts from './PostReducer'
import isLoading from './LoadingReducer'
export default combineReducers({
   posts:posts,
   isLoading:isLoading
  })