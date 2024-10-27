import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewCertification = () => {
    const { id } = useParams();
    const [certification, setCertification] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCertification = async () => {
            try {
                const response = await axios.get(`http://localhost:4200/certificate/${id}`);
                setCertification(response.data);
                setError(''); // Clear any previous errors on successful fetch
            } catch (err) {
                console.error(err);
                setError('Failed to fetch certification data.');
            } finally {
                setLoading(false);
            }
        };
        fetchCertification();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'row', height: '80vh' }}>
            {/* Left side for the image */}
            <div style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingLeft: '20px', marginLeft: '20px' }}>
                <img
                    src={certification.credentialUrl}
                    alt={`Certification for ${certification.certificationName}`} // Improved accessibility
                    style={{ width: '500px', height: '350px', borderRadius: '10px' }} // Modified image size
                />
            </div>

            {/* Right side for the details */}
            <div style={{ flex: '1', padding: '20px' }}>
                <h2>View Certification</h2>
                <p><strong>ID:</strong> {certification.certificationId}</p>
                <p><strong>Certification Name:</strong> {certification.certificationName}</p>
                <p><strong>Issuer:</strong> {certification.certificationIssuer}</p>
                <p><strong>Date of Issuance:</strong> {new Date(certification.dateOfIssuance).toLocaleDateString()}</p>
                <p><strong>Expiration Date:</strong> {new Date(certification.expirationDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {certification.certificationStatus}</p>
                <p><strong>Type:</strong> {certification.certificationType}</p>
                <p><strong>Credential URL:</strong> <a href={certification.credentialUrl} target="_blank" rel="noopener noreferrer">View Credential</a></p>
                <p><strong>Description:</strong> {certification.description}</p>
                <p><strong>Skills Acquired:</strong> {certification.skillsAcquired}</p>
                <p><strong>User ID:</strong> {certification.user.id}</p>
            </div>
        </div>
    );
};

export default ViewCertification;
