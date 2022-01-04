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
import User from "./components/User";
import ProjectForm from "./components/ProjectForm";
import ToDoForm from "./components/ToDoForm";



class App extends React.Component {
    constructor(props) {
        super();
        this.state = {
            'users': [],
            'projects': [],
            'todo': [],
            'token': [],
            'username': []

        }
    }

    createProject(name, users, repository_link){
        const headers = this.get_headers()
        const data = {name:name, users:users, repository_link:repository_link}
        // console.log(name)
        // console.log(users)
        console.log(data)

        axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers}).then(
            response => {
                // let new_project = response.data
                // const users = this.state.users.filter((item) => item.id === new_project.user)[0]
                // new_project.users = users
                // this.setState({books:[...this.setState.projects, new_project]})

                this.load_data()
            }
        ).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })
    }

    createToDo(text, user, project){
        // console.log(text)
        // console.log(creator)
        // console.log(project)

        const headers = this.get_headers()
        const data = {text:text, creator:user, project:project}
        console.log(data)
        axios.post(`http://127.0.0.1:8000/api/todo/`, data, {headers}).then(
            response => {

                this.load_data()
            }
        ).catch(error => {
            console.log(error)
            this.setState({todo: []})
        })
    }

    deleteProject(id){
        console.log(id)

        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers}).then(
            response => {
                // const users = response.data.results
                //
                // this.setState(
                //     {
                //         'projects': this.state.projects.filter((item) => item.id !== id)
                //     }
                // )
                this.load_data()
            }
        ).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })
    }

    deleteToDo(id){
        console.log(id)
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`, {headers}).then(
            response => {

                this.load_data()
            }
        ).catch(error => {
            console.log(error)
            this.setState({todo: []})
        })
    }

    set_token(token){
        console.log(token)
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    is_auth(){
        return !!this.state.token
    }

    logout(){
        this.set_token('')
        this.state.username = []
    }

    get_token_from_storage(){
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }

    get_token(username, password){
        const data = {username: username, password: password}
        axios.post('http://127.0.0.1:8000/api-token-auth/', data).then(
            response =>{
                this.set_token(response.data['token'])
                console.log(response.data)
                this.usernameDefine(username)
            }
        ).catch(error => alert('Неверный логин или пароль'))

    }

    load_data(){
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users/', {headers}).then(
            response => {
                // console.log(response.data.results)
                const users = response.data.results

                this.setState(
                    {
                        'users': users
                    }
                )
            }
        ).catch(error => {
            console.log(error)
            this.setState({users: []})
        })

        axios.get('http://127.0.0.1:8000/api/projects/', {headers}).then(
            response => {
                const projects = response.data.results

                this.setState(
                    {
                        'projects': projects
                    }
                )
            }
        ).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })

        axios.get('http://127.0.0.1:8000/api/todo/', {headers}).then(
            response => {
                const todo = []
                for (let i = 0; i < response.data.results.length; i++){
                    if (response.data.results[i].is_active){
                        todo.push(response.data.results[i])
                    }
                }
                console.log(todo)

                this.setState(
                    {
                        'todo': todo
                    }
                )
            }
        ).catch(error => {
            console.log(error)
            this.setState({todo: []})
        })
    }

    get_headers(){
        let headers = {
            'Content-Type':'application/json'
        }
        if (this.is_auth()){
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    componentDidMount() {
        this.get_token_from_storage()
        // this.load_data()
    }

    usernameDefine(username){
        this.state.username = username
    }


    render() {
        return (
            <div>
                <div>
                    <HashRouter>
                        {/*<MenuFooter info ={*/}
                        <div>
                            <h3>{this.state.username}</h3>
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
                                    <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)}/>}/>
                                    <Route exact path='/todo' component={() => <ToDoList todo={this.state.todo} deleteToDo={(id) => this.deleteToDo(id)}/>}/>
                                    <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)}/>}/>
                                    <Route exact path='/projects/create' component={() => <ProjectForm users={this.state.users} createProject={(name, users, repository_link) => this.createProject(name, users, repository_link)}/>}/>
                                    <Route exact path='/todo/create' component={() => <ToDoForm projects={this.state.projects} users={this.state.users} createToDo={(text, user, project) => this.createToDo(text, user, project)}/>}/>


                                    <Redirect from='/users' to='/' />

                                    <Route component={NotFound404}/>
                                </Switch>
                            </div>
                        <footer>
                            <div>
                                <p>Copyright &copy; To Do 2021</p>
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
