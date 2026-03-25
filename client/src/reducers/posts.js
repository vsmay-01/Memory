import { ACTION_TYPES } from "../constants/actionType";

const post = (state = { isLoading: true, posts: [] },action) =>{
    switch (action.type) {
        case ACTION_TYPES.START_LOADING:
            return { ...state, isLoading: true };
        case ACTION_TYPES.END_LOADING:
            return { ...state, isLoading: false };
        case ACTION_TYPES.FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case ACTION_TYPES.FETCH_BY_SEARCH:
            return { ...state, posts: action.payload.data };
        case ACTION_TYPES.FETCH_POST:
            return { ...state, post: action.payload.post };
        case ACTION_TYPES.LIKE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case ACTION_TYPES.CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case ACTION_TYPES.UPDATE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case ACTION_TYPES.DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        default:
            return state;
        }
}
export default post;