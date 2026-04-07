import React from "react";
import {Container} from "@mui/material"
import {Routes,Route} from "react-router-dom"
import { GoogleOAuthProvider } from "@react-oauth/google";

import PostDetails from './components/PostDetails/PostDetails';
import Navbar from "./components/Navbar/Navbar"
import Home from "./components/Home/Home"
import Auth from "./components/Auth/Auth"

const App = ()=>{
    //
    const user = JSON.parse(localStorage.getItem('profile'));
    return (
        <GoogleOAuthProvider clientId="128693979404-sonn1g69ncflqkubsk2fo9tcva3n36vb.apps.googleusercontent.com">
            <Container maxWidth="xl">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/posts" element={<Home />} />
                    <Route path="/posts/search" element={<Home />} />
                    <Route path="/posts/:id" element={<PostDetails />} />
                    <Route path="/auth"  element={(!user ? <Auth /> : <Home/>)} />
                </Routes>
            </Container>
        </GoogleOAuthProvider>
    );
}

export default App;