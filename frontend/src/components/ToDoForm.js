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
        let projects = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            projects.push(event.target.selectedOptions.item(i).value)
        }
        this.setState({
            'projects': projects
        })
    }

    handleSubmit(event) {
        this.props.createToDo(this.state.text, this.state.creator, this.state.project)
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
                    <label htmlFor="users">creator</label>

                    <input type="number" className="form-control" name="creator" value={this.state.creator}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="users">project</label>

                    <select name="projects" multiple onChange={(event) => this.handleProjectChange(event)}>
                        {this.props.projects.map((item) => <option value={item.id}>{item.name}</option>)}
                    </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>

        );
    }
}

export default ToDoForm