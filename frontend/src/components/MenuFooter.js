import React from 'react'
import App from "../App.js"
import {Link} from "react-router-dom";

const MenuFooter = ({info}) => {
    return (
        <div>
            <div>
                <ul>
                    <Link to='/'>Users</Link>
                </ul>
                <ul>
                    <Link to='/projects'>Projects</Link>
                </ul>
                <ul>
                    <Link to='/todo'>To Do</Link>
                </ul>
                <ul>
                    {App.is_auth() ? <button onClick={() => App.logout()}> Logout </button> : <Link  to='/login'>Login</Link>}
                </ul>
            </div>

            <div>
                {info}
            </div>

            <footer>
                <div>
                    <p>Copyright &copy; GeekShop 2021</p>
                </div>
            </footer>
        </div>
    )
}

export default MenuFooter


