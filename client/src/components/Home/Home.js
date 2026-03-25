import React,{useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {Container, Grow, Grid, Paper, TextField, AppBar, Button} from "@mui/material"
import { MuiChipsInput } from 'mui-chips-input'


import Posts from "../Posts/Posts"
import Form from "../Form/Form"
import Paginate from "../Pagination/Pagination";
import { getPosts, getPostsBySearch } from "../../actions/posts"
import useStyles from "./styles"

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

const Home = () =>{
    const {classes} = useStyles();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search,setSearch] = useState("");
    const [tags,setTags] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchPost = () => {
        if (search.trim() || tags) {
          dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
          
          navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
          navigate("/");
        }
      };

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
      };

    const [currentId,setCurrentId] = useState(null);
    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField name="search" onKeyDown={handleKeyPress} variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => {setSearch(e.target.value)}} />
                            <MuiChipsInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onChange={(newTags)=>setTags(newTags)}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        {(!searchQuery && !tags.length) && (
                            <Paper className={classes.pagination} elevation={6}>
                                <Paginate page={page}/>
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home;
