import React, {useState,useEffect} from "react"
import { TextField, Button,Typography, Paper } from "@mui/material";
import FileBase64 from "react-file-base64"

import useStyles from "./styles"
import { useDispatch, useSelector} from "react-redux"
import { createPost,updatePost } from "../../actions/posts";
import { useNavigate } from "react-router-dom";

const Form = ({currentId,setCurrentId})=>{
    const [postData, setPostData] = useState({
        title: "",
        message: "",
        tags:"",
        selectedFile: ""
    })
    const {classes} = useStyles();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));
    let creator;
    if(user?.result?.picture){
        creator=user.token.sub;
    }
    else if(user){
        creator = user.result._id;
    }
    const {posts} = useSelector((state)=>state.posts);
    const post = currentId? posts.find((p)=>p._id===currentId): null;
    useEffect(()=>{
        if(post) setPostData(post);
    },[post])

    const dispatch = useDispatch();

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(currentId){
            dispatch(updatePost(currentId,{ ...postData, name: user?.result?.name }));
        }
        else{
            dispatch(createPost({ ...postData, name: user?.result?.name, creator: creator },navigate));
        }
        clear();
    }

    const clear = () =>{
        setPostData({
            title: "",
            message: "",
            tags:"",
            selectedFile: ""
        });
        setCurrentId(null);
    }

    if (!user?.result?.name) {
        return (
          <Paper className={classes.paper} elevation={6}>
            <Typography variant="h6" align="center">
              Please Sign In to create your own memories and like other's memories.
            </Typography>
          </Paper>
        );
    }

    return (
            <Paper className={classes.paper} elevation={6}>
                <form className={`${classes.form} ${classes.root}`} autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Typography variant="h6">{currentId? "Editing": "Creating"} a memory</Typography>
                    <TextField name="Title" variant="outlined" label="title" fullWidth value={postData.title} onChange={(e) => setPostData({...postData,title: e.target.value})} />
                    <TextField name="Message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                    <TextField name="Tags" variant="outlined" label="Tags (comma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})} />
                    <div className={classes.fileInput} ><FileBase64 type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })}/></div>
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                    <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                </form>
            </Paper>
    )
}

export default Form