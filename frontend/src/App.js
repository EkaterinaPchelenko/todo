import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from "axios";

import UserList from "./components/User";
import MenuFooter from "./components/MenuFooter";



class App extends React.Component {
    constructor(props) {
        super();
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/').then(
            response => {
                const users = response.data

                this.setState(
                    {
                        'users': users
                    }
                )
            }
        ).catch(error => console.log(error))
        // const users = [
        //   {'username': 'Kate',
        //   'first_name': 'Ekaterina',
        //   'last_name': 'Pchelenko',
        //   'email': 'kate@mail.com',
        //   },
        //   {'username': 'Ivan',
        //   'first_name': 'Ivan',
        //   'last_name': 'Ivanov',
        //   'email': 'ivan@mail.com',
        //   },
        // ]

        // this.setState(
        //     {
        //       'users': users
        //     }
        // )
    }

    render() {
        return (
            <div>

                <MenuFooter info ={
                    <div>
                        <UserList users={this.state.users}/>
                    </div>
                }/>

            </div>
        );
    }
}

export default App;
