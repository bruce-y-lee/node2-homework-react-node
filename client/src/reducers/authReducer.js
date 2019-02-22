import {FETCH_USER} from '../actions/types';

// null -> don't know weather signin or not
export default function(state = null,action) {
  //  console.log("authReducer");
    //console.log(action);
    switch(action.type){
        case FETCH_USER:
        // '' || false -> return false
            return action.payload || false; 
        default:
            return state;   
    }
}