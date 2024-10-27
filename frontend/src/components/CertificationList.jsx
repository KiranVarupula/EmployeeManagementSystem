import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './UserList.css'; // Make sure the CSS file is correctly named and imported

const CertificationList = () => {
    const [certifications, setCertifications] = useState([]);

    useEffect(() => {
        const fetchCertifications = async () => {
            try {
                const response = await axios.get('http://localhost:4200/certifications');
                setCertifications(response.data);
            } catch (error) {
                console.error(error);
                alert('Failed to fetch certifications');
            }
        };
        fetchCertifications();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4200/certificate/${id}`);
            setCertifications(certifications.filter(cert => cert.id !== id));
            alert('Certification deleted successfully');
        } catch (error) {
            console.error(error);
            alert('Failed to delete certification');
        }
    };

    return (
        <div className="container">
           <h2 style={{ textAlign: 'center', marginTop: '100px' }}>Certification List</h2>
            <table className="table"
             style={{ margin: '0 auto', width: '100vw', maxWidth: '90%' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Issuer</th>
                        <th>Date of Issuance</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {certifications.map(cert => (
                        <tr key={cert.id}>
                            <td>{cert.certificationId}</td>
                            <td>{cert.certificationName}</td>
                            <td>{cert.certificationIssuer}</td>
                            <td>{new Date(cert.dateOfIssuance).toLocaleDateString()}</td>
                            <td>{cert.certificationStatus}</td>
                            <td>
                                <Link to={`/certificate/${cert.id}`}>
                                    <button className="action-icons view"><i className="fa fa-eye"></i> View</button>
                                </Link>
                                <Link to={`/certificate/${cert.id}`}>
                                    <button className="action-icons edit"><i className="fas fa-edit"></i> Edit</button>
                                </Link>
                                <button className="action-icons delete" onClick={() => handleDelete(cert.id)}><i className="fas fa-trash-alt"></i> Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CertificationList;



// // CertificationList.jsx
// import React, { useEffect, useState } from 'react'; 
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import './UserList.css';

// const CertificationList = () => {
//     const [certifications, setCertifications] = useState([]);

//     useEffect(() => {
//         const fetchCertifications = async () => {
//             try {
//                 const response = await axios.get('http://localhost:4200/certifications');
//                 setCertifications(response.data);
//             } catch (error) {
//                 console.error(error);
//                 alert('Failed to fetch certifications');
//             }
//         };
//         fetchCertifications();
//     }, []);

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:4200/certificate/${id}`);
//             setCertifications(certifications.filter(cert => cert.id !== id));
//             alert('Certification deleted successfully');
//         } catch (error) {
//             console.error(error);
//             alert('Failed to delete certification');
//         }
//     };

//     return (
//         <div>
//             <h2>Certification List</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Issuer</th>
//                         <th>Date of Issuance</th>
//                         <th>Status</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {certifications.map(cert => (
//                         <tr key={cert.id}>
//                             <td>{cert.certificationId}</td>
//                             <td>{cert.certificationName}</td>
//                             <td>{cert.certificationIssuer}</td>
//                             <td>{new Date(cert.dateOfIssuance).toLocaleDateString()}</td>
//                             <td>{cert.certificationStatus}</td>
//                             <td>
//                                 <Link to={`/certificate/${cert.id}`}>
//                                     <button>View</button>
//                                 </Link>
//                                 <Link to={`/certificate/${cert.id}`}>
//                                     <button>Edit</button>
//                                 </Link>
//                                 <button onClick={() => handleDelete(cert.id)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default CertificationList;
