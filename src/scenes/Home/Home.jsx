import React from 'react'
import TopBar from '../global/TopBar'
// import Sidebar from '../global/SideBar'
import Dashboard from '../dashboard'

const Home = () => {
    return (
        <div>
            <TopBar />
            <Dashboard sx={{overflowX:"hidden"}} />
        </div>
    )
}

export default Home
