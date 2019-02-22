import  { FETCH_SURVEYS } from '../actions/types';


export default function(state = [], action) {
    
      //console.log(action);
      switch(action.type){
          case FETCH_SURVEYS:
          // '' || false -> return false
              return action.payload; 
          default:
              return state;   
      }
  }