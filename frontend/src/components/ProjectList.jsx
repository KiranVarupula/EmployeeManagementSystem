import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './UserList.css';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:4200/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const deleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`http://localhost:4200/projects/${id}`);
        setProjects(projects.filter(project => project.projectId !== id));
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  if (loading) return <p>Loading projects...</p>;

  return (
    <div className="container">
      <h2 style={{ textAlign: 'center', marginBottom: '20px', marginTop: '70px' }}>Project List</h2>
      <table className="table" border={1} cellPadding={5}
       style={{ margin: '0 auto', width: '100vw', maxWidth: '90%' }}>
        <thead>
          <tr>
            <th>Project ID</th>
            <th>Project Name</th>
            <th>Description</th>
            <th>Role in Project</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.length > 0 ? (
            projects.map(project => (
              <tr key={project.projectId}>
                <td>{project.projectId}</td>
                <td>{project.projectName}</td>
                <td>{project.projectDescription}</td>
                <td>{project.roleInProject}</td>
                <td>{new Date(project.startDate).toLocaleDateString()}</td>
                <td>{new Date(project.endDate).toLocaleDateString()}</td>
                <td>{project.status}</td>
                <td>
                <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      padding: '10px',
                      border: '2px solid #ccc',
                      borderRadius: '5px',
                    }}
                  >
                    <Link
                      to={`/project/edit/${project.projectId}`}
                      style={{
                        color: '#007bff',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px',
                      }}
                    >
                      <i className="fas fa-edit" style={{ marginRight: '10px' }}></i>Edit
                    </Link>
                    <span
                      onClick={() => deleteProject(project.projectId)}
                      style={{
                        color: '#dc3545',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '5px',
                      }}
                    >
                      <i className="fas fa-trash-alt" style={{ marginRight: '5px' }}></i>Delete
                    </span>
                    <Link
                      to={`/project/view/${project.projectId}`}
                      style={{
                        color: '#28a745',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '5px',
                      }}
                    >
                      <i className="fa fa-eye" style={{ marginRight: '5px' }}></i>View
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No projects found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
























// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import './UserList.css';

// const ProjectList = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await axios.get('http://localhost:4200/projects');
//         setProjects(response.data);
//       } catch (error) {
//         console.error('Error fetching projects:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProjects();
//   }, []);

//   const deleteProject = async (id) => {
//     if (window.confirm('Are you sure you want to delete this project?')) {
//       try {
//         await axios.delete(`http://localhost:4200/projects/${id}`);
//         setProjects(projects.filter(project => project.projectId !== id));
//       } catch (error) {
//         console.error('Error deleting project:', error);
//       }
//     }
//   };

//   if (loading) return <p>Loading projects...</p>;

//   return (
//     <div className="container">
//       <h2 style={{ textAlign: 'center', marginBottom: '20px', marginTop: '70px' }}>Project List</h2>
//       <table className="table" border={1} cellPadding={5}>
//         <thead>
//           <tr>
//             <th>Project ID</th>
//             <th>Project Name</th>
//             <th>Description</th>
//             <th>Role in Project</th>
//             <th>Start Date</th>
//             <th>End Date</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {projects.length > 0 ? (
//             projects.map(project => (
//               <tr key={project.projectId}>
//                 <td>{project.projectId}</td>
//                 <td>{project.projectName}</td>
//                 <td>{project.projectDescription}</td>
//                 <td>{project.roleInProject}</td>
//                 <td>{new Date(project.startDate).toLocaleDateString()}</td>
//                 <td>{new Date(project.endDate).toLocaleDateString()}</td>
//                 <td>{project.status}</td>
//                 <td>
//                   <div className="action-container">
//                     <Link to={`/project/edit/${project.projectId}`} className="action-icons edit">
//                       <i className="fas fa-edit"></i> Edit
//                     </Link>
//                     <span onClick={() => deleteProject(project.projectId)} className="action-icons delete">
//                       <i className="fas fa-trash-alt"></i> Delete
//                     </span>
//                     <Link to={`/project/view/${project.projectId}`} className="action-icons view">
//                       <i className="fa fa-eye"></i> View
//                     </Link>
//                   </div>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="8">No projects found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProjectList;


























// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import './ProjectList.css';

// const ProjectList = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await axios.get('http://localhost:4200/projects');
//         setProjects(response.data);
//       } catch (error) {
//         console.error('Error fetching projects:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProjects();
//   }, []);

//   const deleteProject = async (id) => {
//     if (window.confirm('Are you sure you want to delete this project?')) {
//       try {
//         await axios.delete(`http://localhost:4200/projects/${id}`);
//         setProjects(projects.filter(project => project.projectId !== id));
//       } catch (error) {
//         console.error('Error deleting project:', error);
//       }
//     }
//   };

//   if (loading) return <p>Loading projects...</p>;

//   return (
//     <div className="container">
//       <h2 style={{ textAlign: 'center', marginBottom: '20px', marginTop: '70px' }}>Project List</h2>
//       <table className="table" border={1} cellPadding={5}>
//         <thead>
//           <tr>
//             <th>Project ID</th>
//             <th>Project Name</th>
//             <th>Description</th>
//             <th>Role in Project</th>
//             <th>Start Date</th>
//             <th>End Date</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {projects.length > 0 ? (
//             projects.map(project => (
//               <tr key={project.projectId}>
//                 <td>{project.projectId}</td>
//                 <td>{project.projectName}</td>
//                 <td>{project.projectDescription}</td>
//                 <td>{project.roleInProject}</td>
//                 <td>{new Date(project.startDate).toLocaleDateString()}</td>
//                 <td>{new Date(project.endDate).toLocaleDateString()}</td>
//                 <td>{project.status}</td>
//                 <td>
//                   <Link to={`/project/edit/${project.projectId}`} className="action-icons edit">
//                     <i className="fas fa-edit"></i> Edit
//                   </Link> 
//                   <span onClick={() => deleteProject(project.projectId)} className="action-icons delete">
//                     <i className="fas fa-trash-alt"></i> Delete
//                   </span>
//                   <Link to={`/project/view/${project.projectId}`} className="action-icons view">
//                     <i className="fa fa-eye"></i> View
//                   </Link>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="8">No projects found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProjectList;























// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const ProjectList = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await axios.get('http://localhost:4200/projects');
//         setProjects(response.data);
//       } catch (error) {
//         console.error('Error fetching projects:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProjects();
//   }, []);

//   const deleteProject = async (id) => {
//     if (window.confirm('Are you sure you want to delete this project?')) {
//       try {
//         await axios.delete(`http://localhost:4200/projects/${id}`);
//         setProjects(projects.filter(project => project.projectId !== id));
//       } catch (error) {
//         console.error('Error deleting project:', error);
//       }
//     }
//   };

//   if (loading) return <p>Loading projects...</p>;

//   return (
//     <div style={{ textAlign: 'center' }}>
//       <h2>Project List</h2>
//       <table border={1} cellPadding={5} style={{ margin: '0 auto', width: '80%' }}>
//         <thead>
//           <tr>
//             <th>Project ID</th>
//             <th>Project Name</th>
//             <th>Description</th>
//             <th>Role in Project</th> {/* Added Role in Project column */}
//             <th>Start Date</th>
//             <th>End Date</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {projects.length > 0 ? (
//             projects.map(project => (
//               <tr key={project.projectId}>
//                 <td>{project.projectId}</td>
//                 <td>{project.projectName}</td>
//                 <td>{project.projectDescription}</td>
//                 <td>{project.roleInProject}</td> {/* Displaying Role in Project */}
//                 <td>{new Date(project.startDate).toLocaleDateString()}</td>
//                 <td>{new Date(project.endDate).toLocaleDateString()}</td>
//                 <td>{project.status}</td>
//                 <td>
//                   <Link to={`/project/edit/${project.projectId}`}>Edit</Link>
//                   <button onClick={() => deleteProject(project.projectId)}>Delete</button>
//                   <Link to={`/project/view/${project.projectId}`}>View</Link>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="8">No projects found</td> {/* Updated colspan to 8 */}
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProjectList;


