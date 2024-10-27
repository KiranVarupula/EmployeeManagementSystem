import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CertificationForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // State variables for certification details
    const [certificationName, setCertificationName] = useState('');
    const [certificationIssuer, setCertificationIssuer] = useState('');
    const [dateOfIssuance, setDateOfIssuance] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [certificationStatus, setCertificationStatus] = useState('');
    const [certificationType, setCertificationType] = useState('');
    const [credentialUrl, setCredentialUrl] = useState('');
    const [description, setDescription] = useState('');
    const [skillsAcquired, setSkillsAcquired] = useState('');
    const [userId, setUserId] = useState('');
    const [users, setUsers] = useState([]);

    // Fetch users from the backend API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:4200/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users', error);
            }
        };
        fetchUsers();
    }, []);

    // Fetch existing certification data for editing
    useEffect(() => {
        if (id) {
            const fetchCertification = async () => {
                try {
                    const response = await axios.get(`http://localhost:4200/certificate/${id}`);
                    const cert = response.data;
                    // Populate state with existing certification data
                    setCertificationName(cert.certificationName);
                    setCertificationIssuer(cert.certificationIssuer);
                    setDateOfIssuance(cert.dateOfIssuance);
                    setExpirationDate(cert.expirationDate);
                    setCertificationStatus(cert.certificationStatus);
                    setCertificationType(cert.certificationType);
                    setCredentialUrl(cert.credentialUrl);
                    setDescription(cert.description);
                    setSkillsAcquired(cert.skillsAcquired);
                    setUserId(cert.user?.id || ''); // Handle user association
                } catch (error) {
                    console.error(error);
                    alert('Failed to fetch certification for editing');
                }
            };
            fetchCertification();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                // Update existing certification
                await axios.put(`http://localhost:4200/update-certificate/${id}`, {
                    certificationName,
                    certificationIssuer,
                    dateOfIssuance,
                    expirationDate,
                    certificationStatus,
                    certificationType,
                    credentialUrl,
                    description,
                    skillsAcquired,
                    user: { id: userId },
                });
                alert('Certification updated successfully');
            } else {
                // Add new certification
                await axios.post('http://localhost:4200/certificate', {
                    certificationName,
                    certificationIssuer,
                    dateOfIssuance,
                    expirationDate,
                    certificationStatus,
                    certificationType,
                    credentialUrl,
                    description,
                    skillsAcquired,
                    user: { id: userId },
                });
                alert('Certification added successfully');
            }
            navigate('/certifications'); // Redirect to the certification list after submit
        } catch (error) {
            console.error(error);
            alert('Failed to save certification');
        }
    };

    return (
        <div>
            <h2 style={{ display: 'flex', marginTop:'130px' }}>{id ? 'Edit Certification' : 'Add Certification'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={certificationName}
                    onChange={(e) => setCertificationName(e.target.value)}
                    placeholder="Certification Name"
                    required
                />
                <input
                    type="text"
                    value={certificationIssuer}
                    onChange={(e) => setCertificationIssuer(e.target.value)}
                    placeholder="Certification Issuer"
                    required
                />
                <input
                    type="date"
                    value={dateOfIssuance}
                    onChange={(e) => setDateOfIssuance(e.target.value)}
                    required
                />
                <input
                    type="date"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                />
                <input
                    type="text"
                    value={certificationStatus}
                    onChange={(e) => setCertificationStatus(e.target.value)}
                    placeholder="Certification Status"
                    required
                />
                <input
                    type="text"
                    value={certificationType}
                    onChange={(e) => setCertificationType(e.target.value)}
                    placeholder="Certification Type"
                    required
                />
                <input
                    type="text"
                    value={credentialUrl}
                    onChange={(e) => setCredentialUrl(e.target.value)}
                    placeholder="Credential URL"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
                <input
                    type="text"
                    value={skillsAcquired}
                    onChange={(e) => setSkillsAcquired(e.target.value)}
                    placeholder="Skills Acquired"
                />

                {/* Select existing user */}
                <select
                    name="user"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}  // Update user ID
                    required
                >
                    <option value="">Select User</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.id} {user.username}
                        </option>
                    ))}
                </select>

                <button type="submit">{id ? 'Update Certification' : 'Add Certification'}</button>
            </form>
        </div>
    );
};

export default CertificationForm;

