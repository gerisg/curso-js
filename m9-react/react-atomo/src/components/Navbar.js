import React from 'react'
let username = 'Alejandro'
let avatar = 'https://i.pravatar.cc/150?img=39'

function Navbar() {
    return (
        <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand" href="#">
                <img 
                    src={avatar} width="30" height="30" 
                    className="d-inline-block align-top rounded-circle mr-3" />
                {username}
            </a>
        </nav>
    )
}

export default Navbar