import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProjectForm = () => {
  const { id } = useParams(); // Get the project ID from URL params (if editing an existing project)
  const navigate = useNavigate();

  // State to store project details and available users
  const [project, setProject] = useState({
    projectName: '',
    projectDescription: '',
    startDate: '',
    endDate: '',
    roleInProject: '',
    status: '',
    user: { id: '' }, // Initially empty, to be filled with the selected user ID
  });

  const [users, setUsers] = useState([]); // State to hold the list of users
  const [loading, setLoading] = useState(true);

  // Fetch the list of users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4200/users'); // Fetch existing users
        setUsers(response.data); // Store users in the state
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    // If we are editing an existing project, fetch the project details
    if (id) {
      const fetchProject = async () => {
        try {
          const response = await axios.get(`http://localhost:4200/projects/${id}`);
          setProject(response.data); // Set project data for editing
        } catch (error) {
          console.error('Error fetching project:', error);
        }
      };
      fetchProject();
    }

    fetchUsers(); // Fetch the list of users
    setLoading(false);
  }, [id]);

  // Handle input changes for the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:4200/projects/${id}`, project); // Update project
      } else {
        await axios.post('http://localhost:4200/projects', project); // Create new project
      }
      navigate('/projects'); // Redirect to the project list after submission
    } catch (error) {
      console.error('Error submitting project:', error);
    }
  };

  if (loading) return <p>Loading form...</p>;

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>{id ? 'Edit Project' : 'Add Project'}</h2>
      <form onSubmit={handleSubmit}>
        {/* Project Name */}
        <input 
          type="text" 
          name="projectName" 
          value={project.projectName} 
          onChange={handleChange} 
          placeholder="Project Name" 
          required 
        />
        
        {/* Project Description */}
        <input 
          type="text" 
          name="projectDescription" 
          value={project.projectDescription} 
          onChange={handleChange} 
          placeholder="Project Description" 
          required 
        />

        {/* Start Date */}
        <input 
          type="date" 
          name="startDate" 
          value={project.startDate.split('T')[0]} 
          onChange={handleChange} 
          required 
        />
        
        {/* End Date */}
        <input 
          type="date" 
          name="endDate" 
          value={project.endDate.split('T')[0]} 
          onChange={handleChange} 
          required 
        />

        {/* Role in Project */}
        <input 
          type="text" 
          name="roleInProject" 
          value={project.roleInProject} 
          onChange={handleChange} 
          placeholder="Role in Project" 
        />
        
        {/* Status */}
        <input 
          type="text" 
          name="status" 
          value={project.status} 
          onChange={handleChange} 
          placeholder="Status" 
        />

        {/* Select existing user */}
        <select
          name="user"
          value={project.user.id}
          onChange={(e) => setProject({ ...project, user: { id: e.target.value } })} // Update the user ID
          required
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.id}  {user.username}
            </option>
          ))}
        </select>

        <button type="submit">{id ? 'Update Project' : 'Create Project'}</button>
      </form>
    </div>
  );
};

export default ProjectForm;
