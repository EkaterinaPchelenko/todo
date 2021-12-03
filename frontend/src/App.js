import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from "axios";

import UserList from "./components/User";
import ProjectList from "./components/Project";
import MenuFooter from "./components/MenuFooter";

import {HashRouter, Link, Route, Switch} from "react-router-dom";
import NotFound404 from "./components/NotFound404";


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
                const projects = response.data.results

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
                <div>
                    <HashRouter>

                        <nav>
                            <ul>
                                <Link to='/'>Users</Link>
                            </ul>
                            <ul>
                                <Link to='/projects'>Projects</Link>
                            </ul>
                            {/*<ul>*/}
                            {/*    <Link to='/'>Users</Link>*/}
                            {/*</ul>*/}

                        </nav>
                        <Switch>
                            <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                            <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}/>}/>

                            <Route component={NotFound404}/>
                        </Switch>
                    </HashRouter>
                </div>
            </div>
        );
    }
}

export default App;
