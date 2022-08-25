import React, { useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Signup from '../Pages/Signup/Signup';
import Login from '../Pages/Login/Login';
import Navbar from '../Component/Navbar/Navbar';
import Profile from '../Pages/Profile/Profile';
import Settings from '../Pages/Settings/Settings';
import Messages from '../Pages/Messages/Messages';
import { useSelector } from 'react-redux';

const RouterApp = () => {

    const token = useSelector((state) => state.users.token);

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Navbar />}>
                    <Route exact path='/' element={<PrivateRoute Component={Home} />} />
                    <Route path='/profile/:id' element={token ? <Profile /> : <Navigate to="/login" />} />
                    <Route path='/settings' element={token ? <Settings /> : <Navigate to="/login" />} />
                    <Route path='/messages' element={token ? <Messages /> : <Navigate to="/login" />} />
                </Route>
                <Route path='/login' element={!token ? <Login /> : <Navigate to="/" />} />
                <Route path='/signup' element={!token ? <Signup /> : <Navigate to="/" />} />
            </Routes>
        </Router>
    )
}

const PrivateRoute = ({ Component, ...rest }) => {
    const token = useSelector((state) => state.users.token);
    return (
        token ? <Component {...rest} /> : <Navigate to="/login" />
    )
}

export default RouterApp;