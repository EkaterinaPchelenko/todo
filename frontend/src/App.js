import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from "axios";

import UserList from "./components/User";
import ProjectList from "./components/Project";
import MenuFooter from "./components/MenuFooter";

import {HashRouter, Route} from "react-router-dom";


class App extends React.Component {
    constructor(props) {
        super();
        this.state = {
            'users': [],
            'projects': [],
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/').then(
            response => {
                const users = response.data.results

                this.setState(
                    {
                        'users': users
                    }
                )
            }
        ).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/').then(
            response => {
                const projects = response.data

                this.setState(
                    {
                        'projects': projects
                    }
                )
            }
        ).catch(error => console.log(error))
    }



    render() {
        return (
            <div>
                <MenuFooter info ={
                    <div>
                        <HashRouter>
                            <Route exact path='/' component={() => <UserList users={this.state.users}/>} />
                            <Route exact path='projects/' component={() => <ProjectList projects={this.state.projects}/>} />
                        </HashRouter>
                    </div>
                }/>

            </div>
        );
    }
}

export default App;
