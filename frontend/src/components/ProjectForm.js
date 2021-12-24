import React from 'react'


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {name: '', users: 0, repository_link:''}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {

        this.props.createProject(this.state.name, this.state.users, this.state.repository_link)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="login">name</label>
                    <input type="text" className="form-control" name="name" value={this.state.name}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="users">user</label>

                    <input type="number" className="form-control" name="users" value={this.state.users}
                           onChange={(event) => this.handleChange(event)}/>

                </div>
                <div className="form-group">
                    <label htmlFor="repository_link">repository link</label>

                    <input type="text" className="form-control" name="repository_link" value={this.state.repository_link}
                           onChange={(event) => this.handleChange(event)}/>

                </div>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>

        );
    }
}

export default ProjectForm