import { CREATE_CASE } from "../actionTypes";

  function rootReducer(state = {}, action) {
      if (action.type === CREATE_CASE){
        return action.payload;
      }
    return state;
  };
  export default rootReducer;