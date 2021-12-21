import React from 'react'

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.repository_link}</td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (

        <table>
            <th>Id</th>
            <th>Name</th>
            <th>Repository link</th>
            {projects.map((project) => <ProjectItem project={project}/>)}
        </table>
    )
}


export default ProjectList