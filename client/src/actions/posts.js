import * as api from "../api"
import { ACTION_TYPES } from "../constants/actionType";

export const getPost = (id) => async (dispatch) =>{
    try {
        dispatch({ type: ACTION_TYPES.START_LOADING });
        const { data } = await api.fetchPost(id);
        // console.log(data);
        dispatch({ type: ACTION_TYPES.FETCH_POST, payload: { post : data } });
        dispatch({ type: ACTION_TYPES.END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const getPosts = (page) => async (dispatch) =>{
    try {
        dispatch({ type: ACTION_TYPES.START_LOADING });
        const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);

        dispatch({ type: ACTION_TYPES.FETCH_ALL, payload: { data, currentPage, numberOfPages } });
        dispatch({ type: ACTION_TYPES.END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) =>{
    try {
        dispatch({ type: ACTION_TYPES.START_LOADING });
        const { data: {data} } = await api.fetchPostsBySearch(searchQuery);
        // console.log(data);
        dispatch({
            type: ACTION_TYPES.FETCH_BY_SEARCH,
            payload: {data}
        });
        dispatch({ type: ACTION_TYPES.END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post,navigate) => async (dispatch) =>{
    try {
        dispatch({ type: ACTION_TYPES.START_LOADING });
        const {data} = await api.createPost(post);
        // console.log(data.creator);
        dispatch({
            type:ACTION_TYPES.CREATE,
            payload: data
        })
        navigate(`posts/${data._id}`)
        dispatch({ type: ACTION_TYPES.END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (currentId,newPost) => async (dispatch) =>{
    try {
        const { data } = await api.updatePost(currentId,newPost);
        dispatch({
            type: ACTION_TYPES.UPDATE,
            payload: data
        })
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (currentId) =>async(dispatch) =>{
    try {
        await api.deletePost(currentId);
        dispatch({
            type: ACTION_TYPES.DELETE,
            payload: currentId
        })
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (currentId) => async(dispatch) =>{
    try {
        const { data } = await api.likePost(currentId);
        dispatch({
            type: ACTION_TYPES.LIKE,
            payload: data
        })
    } catch (error) {
        console.log(error);
    }
}


// by default actions should return an object
// but if we have to use a function inside
// then we use thunk, which uses a middleware between actions and reducers
// this middleware takes a function and returns a function
// therefore this getPosts returns a function