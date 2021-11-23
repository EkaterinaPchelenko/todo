import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from "axios";

import UserList from "./components/User";


class App extends React.Component{
  constructor(props) {
    super();
    this.state = {
      'users': []
    }
  }

  componentDidMount() {
    axios.get()
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

    this.setState(
        {
          'users': users
        }
    )
  }

  render()
  {
    return (
      <div>
        <UserList users={this.state.users}/>
      </div>
    );
  }
}

export default App;
