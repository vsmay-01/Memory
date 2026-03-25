import { ACTION_TYPES } from "../constants/actionType";

const auth = (state={authData:null},action) =>{
    switch (action.type) {
        case ACTION_TYPES.AUTH:
          localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
    
          return { ...state, authData: action.data, loading: false, errors: null };
        case ACTION_TYPES.LOGOUT:
          localStorage.clear();
          
          return { ...state, authData: null, loading: false, errors: null };
        default:
          return state;
      }
}
export default auth;