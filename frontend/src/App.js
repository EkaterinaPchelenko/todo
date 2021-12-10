import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from "axios";
import Cookies from "universal-cookie/lib";

import UserList from "./components/User";
import ProjectList from "./components/Project";
import MenuFooter from "./components/MenuFooter";

import {HashRouter, Link, Route, Switch, Redirect} from "react-router-dom";
import NotFound404 from "./components/NotFound404";
import ToDoList from "./components/todo";
import LoginForm from "./components/LoginForm";


class App extends React.Component {
    constructor(props) {
        super();
        this.state = {
            'users': [],
            'projects': [],
            'todo': [],
            'token': [],

        }
    }

    set_token(token){
        console.log(token)
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token})
    }

    is_auth(){
        return !!this.state.token
    }

    logout(){
        this.set_token('')
    }

    get_token_from_storage(){
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token})
    }

    get_token(username, password){
        const data = {username: username, password: password}
        axios.post('http://127.0.0.1:8000/api-token-auth/', data).then(
            response =>{
                this.set_token(response.data['token'])
                console.log(response.data)
            }
        ).catch(error => alert('Неверный логин или пароль'))

    }

    load_data(){
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

        axios.get('http://127.0.0.1:8000/api/todo/').then(
            response => {
                const todo = response.data.results

                this.setState(
                    {
                        'todo': todo
                    }
                )
            }
        ).catch(error => console.log(error))
    }

    componentDidMount() {
        this.get_token_from_storage()
        this.load_data()
    }


    render() {
        return (
            <div>
                <div>
                    <HashRouter>

                        {/*<MenuFooter info ={*/}
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
                                {this.is_auth() ? <button onClick={() => this.logout()}> Logout </button> : <Link  to='/login'>Login</Link>}
                            </ul>
                        </div>
                            <div>
                                <Switch>
                                    <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                                    <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}/>}/>
                                    <Route exact path='/todo' component={() => <ToDoList todo={this.state.todo}/>}/>
                                    <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)}/>}/>

                                    <Redirect from='/users' to='/' />

                                    <Route component={NotFound404}/>
                                </Switch>
                            </div>
                        <footer>
                            <div>
                                <p>Copyright &copy; GeekShop 2021</p>
                            </div>
                        </footer>
                         {/*}/>*/}
                    </HashRouter>
                </div>
            </div>
        );
    }
}

export default App;
