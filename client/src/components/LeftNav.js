import React from 'react';
import { NavLink } from 'react-router-dom';

const LeftNav = () => {
    return (
        <div className="left-nav-container">
            <div className="icons">
                <div className="icons-bis">
                    <NavLink to='/' exact activelassname="active-left-nav">
                        <img src="./img/icons/home.svg" alt="home" />
                    </NavLink>
                    <br />
                    <NavLink to='/trending' exact activeclassname="active-left-nav">
                        <img src="./img/icons/rocket.svg" alt="home" />
                    </NavLink>
                    <br />
                    <NavLink to='/profil' exact activeclassname="active-left-nav">
                        <img src="./img/icons/user.svg" alt="home" />
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default LeftNav;