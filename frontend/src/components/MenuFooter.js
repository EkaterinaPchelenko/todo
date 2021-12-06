import React from 'react'
import UserList from "./User";
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


