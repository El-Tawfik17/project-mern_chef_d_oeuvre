import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';
import Navbar from '../Navbar';
const index = () => {
    return (
        <div>
            <Router>
               <Navbar/>
                <Routes>
                    
                    <Route path='/' element={<Home />} />
                    <Route path='/profil' element={<Profil />} />
                    <Route path='/trending' element={<Trending />} />
                    <Route path="*" element={<Navigate to="/profil" replace />}/>
                </Routes>
            </Router>

        </div>
    );
};

export default index;