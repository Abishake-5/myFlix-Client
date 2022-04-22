import { string } from "prop-types";

export const SET_MOVIES = "SET_MOVIES";
export const SET_FILTER = "SET_FILTER";

export function setMovies( value ){
    console.log("--Action-- set movies")
    return { 
        type: SET_MOVIES ,
        value };
}
export function setFilter( value ){
    console.log("--Action-- set Filter")

    return { 
        type: SET_FILTER ,
         value };
}


/*
Actions
The only way your application can interact with the store
Carry some info from your app to the redux store
They are plain JS objects
Must have a TYPE property that indicated the type of action being performed

{
type: 'Action'
}

Action creator
Action creator is a function that returns an action

function  action(){
    return {
        type: 'Action'
    }
}
*/
