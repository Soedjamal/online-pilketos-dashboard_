import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import "./styles/navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faBars, faChalkboardTeacher, faRefresh, faUserGroup, faUsers } from '@fortawesome/free-solid-svg-icons'
import { Box, Typography } from '@mui/material'


const Navbar = ({ appBarTitle }) => {
    const [menu, setMenu] = useState(false)
    const { pathname } = useLocation()
    return (
        <>
            <Box sx={{ position: 'fixed', p: "20px", bgcolor: "#202020", width: "100%", display: "flex", gap: 3, alignItems: "center", top: 0, zIndex: 1000 }}>
                <FontAwesomeIcon style={{
                    color: "#909090"
                }} onClick={() => setMenu(!menu)} icon={faBars} />
                <h2 style={{ color: "rgb(200,200,200)" }} className='head-title'>Dashboard</h2>

            </Box>

            {menu ? <div style={{
                transition: "all 0.5s ease",
                position: "fixed",
                padding: "20px 20px",
                zIndex: "1000",
                top: 0,
                left: 0,
                height: "100vh",
                backgroundColor: "#171717",
                width: "250px",
                color: "rgb(200,200,200)"
            }} className="container">
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }} className="nav-logo">
                    <h2 className="head-title">
                        Dashboard
                    </h2>
                    <FontAwesomeIcon onClick={() => setMenu(!menu)} icon={faBars} />
                </div>
                <nav style={{
                    color: "rgb(200,200,200)"
                }} className="nav-container">
                    <ul className="nav-list-container" >
                        <li style={pathname === "/" ? {
                            backgroundColor: "rgb(48, 48, 48)"
                        } : {}} className='nav-list'> <FontAwesomeIcon icon={faUserGroup} /> <Link to="/" className='nav-link'>Kandidat</Link></li>
                        <li
                            style={pathname === "/voter-cards" ? {
                                backgroundColor: "rgb(48, 48, 48)"
                            } : {}}
                            className='nav-list'> <FontAwesomeIcon icon={faAddressCard} /> <Link to="/voter-cards" className='nav-link'>Kartu Pemilih</Link></li>
                        <li
                            style={pathname === "/x-voters" ? {
                                backgroundColor: "rgb(48, 48, 48)"
                            } : {}}
                            className='nav-list'> <FontAwesomeIcon icon={faUsers} /> <Link to="/x-voters" className='nav-link'>Pemilih Kelas X</Link></li>
                        <li
                            style={pathname === "/xi-voters" ? {
                                backgroundColor: "rgb(48, 48, 48)"
                            } : {}}
                            className='nav-list'> <FontAwesomeIcon icon={faUsers} /> <Link to="/xi-voters" className='nav-link'>Pemilih Kelas XI</Link></li>
                        <li
                            style={pathname === "/xii-voters" ? {
                                backgroundColor: "rgb(48, 48, 48)"
                            } : {}}
                            className='nav-list'> <FontAwesomeIcon icon={faUsers} /> <Link to="/xii-voters" className='nav-link'>Pemilih Kelas XII</Link></li>
                        <li
                            style={pathname === "/ts-voters" ? {
                                backgroundColor: "rgb(48, 48, 48)"
                            } : {}}
                            className='nav-list'> <FontAwesomeIcon icon={faChalkboardTeacher} /> <Link to="/ts-voters" className='nav-link'>Pemilih Teacher & Staff</Link></li>
                    </ul>
                </nav>
            </div> : <div style={{
                transition: "all 0.5s ease",
                position: "absolute",
                padding: "20px 20px",
                left: "-100%",
                height: "100vh",
                backgroundColor: "#171717",
                width: "250px",
                color: "rgb(200,200,200)"
            }} className="container">
                <div className="nav-logo">
                    <h2 className="head-title">
                        Dashboard
                    </h2>
                </div>
                <nav style={{
                    color: "rgb(200,200,200)"
                }} className="nav-container">
                    <ul className="nav-list-container" >
                        <li className='nav-list'><Link to="/" className='nav-link'>Kandidat</Link></li>
                        <li className='nav-list'><Link to="/voter-cards" className='nav-link'>Card Voters</Link></li>
                        <li className='nav-list'><Link to="/voters" className='nav-link'>Voters</Link></li>
                    </ul>
                </nav>
            </div>}
        </>
    )
}

export default Navbar