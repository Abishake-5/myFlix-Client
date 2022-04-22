import { combineReducers } from "redux";
import { SET_FILTER, SET_MOVIES } from "../actions/actions";

function visibilityFilter(state = '', action){
    console.log("--Reducer-- Filter")

    switch (action.type){  //  Switch takes in action type to determine what action need to be made eg. a move  might need to be posted,  updated or entirely removed
        case SET_FILTER:
            return action.value;
            default:
                return state;
    }
}
function movies( state = [], action){
    console.log("--Reducer-- Movies")
    switch (action.type) {
    case SET_MOVIES:
      return action.value;
        default:
            return state;
            
    }
}
const moviesApp = combineReducers({
    visibilityFilter,
    movies
})

export default moviesApp;


/* 
Reducers
It's a function tht accepts state and action as arguements, and returns the next state of the app
(prevState, action ) => newState
actions describe what happened but reducers describes how the applications state changes
*/