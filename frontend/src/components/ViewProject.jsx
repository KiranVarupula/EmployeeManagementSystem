import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewProject = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:4200/projects/${id}`);
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <p>Loading project details...</p>;
  if (!project) return <p>Project not found.</p>;

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'left', maxWidth: '800px', margin: '0 auto' }}>
      <div>
        <h2>Project Details</h2>
        <p><strong>ID:</strong> {project.projectId}</p>
        <p><strong>Name:</strong> {project.projectName}</p>
        <p><strong>Description:</strong> {project.projectDescription}</p>
        <p><strong>Start Date:</strong> {new Date(project.startDate).toLocaleDateString()}</p>
        <p><strong>End Date:</strong> {new Date(project.endDate).toLocaleDateString()}</p>
        <p><strong>Role in Project:</strong> {project.roleInProject}</p>
        <p><strong>Status:</strong> {project.status}</p>
        <p><strong>User ID:</strong> {project.user.id}</p>
      </div>
    </div>
  );
};

export default ViewProject;



