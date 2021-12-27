import React from 'react'


class ToDoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {text: '', creator: 0, project:0}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleProjectChange(event) {
        if (!event.target.selectedOptions) {

            this.setState({
                'projects': []
            })
            return;
        }
        let project = event.target.selectedOptions.item(0).value

        this.setState({
            'projects': project
        })
    }

    handleCreatorChange(event) {
        if (!event.target.selectedOptions) {

            this.setState({
                'users': []
            })
            return;
        }
        let user = event.target.selectedOptions.item(0).value
        // console.log(user)
        this.setState({
            'users': user
        })
    }


    handleSubmit(event) {
        this.props.createToDo(this.state.text, this.state.users, this.state.projects)
        // console.log(this.state.text)
        // console.log(this.state.creator)
        // console.log(this.state.project)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="login">text</label>
                    <input type="text" className="form-control" name="text" value={this.state.text}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="user">creator</label>

                    <select name="users" onChange={(event) => this.handleCreatorChange(event)}>
                        {this.props.users.map((item) => <option value={item.id}>{item.first_name}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="project">project</label>

                    <select name="projects" onChange={(event) => this.handleProjectChange(event)}>
                        {this.props.projects.map((item) => <option value={item.id}>{item.name}</option>)}
                    </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>

        );
    }
}

export default ToDoForm