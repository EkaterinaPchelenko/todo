import React from 'react'
import UserList from "./User";

const MenuFooter = ({info}) => {
    return (
        <div>
            <div>
                <a href='#'>Users </a>
                <a href='#'>Projects </a>
                <a href='#'>To do </a>
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


