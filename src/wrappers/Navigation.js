import React from 'react'
import { NavLink, Link } from 'react-router-dom'


const Navigation = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#"></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item" content='welcome'>
                        <NavLink className="nav-link" exact to="/">Welcome</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/calendar">Calendar</NavLink>
                    </li>
                </ul>
                {
                    props.isAuthenticated ?
                        <ul className='navbar-nav ml-auto'>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/profile">Profile</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/favorites">Favorites</NavLink>
                            </li>
                            <li className="nav-item">
                                <span onClick={props.handleLogout} className="nav-link logout-link" to="/login">Logout</span>
                            </li>
                        </ul>
                        :
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/register">Register</NavLink>
                            </li>
                        </ul>
                }
            </div>
        </nav>
    )
}

export default Navigation;