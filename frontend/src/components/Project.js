import React from 'react'

const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.repository_link}</td>
            <td>
                <button onClick={() => deleteProject(project.id)} type='button'>
                    Delete
                </button>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject}) => {
    return (

        <table>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Repository link</th>
                <th>
                </th>
            </tr>
            {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
        </table>
    )
}


export default ProjectList