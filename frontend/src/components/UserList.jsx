import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './UserList.css'; 

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4200/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:4200/user/${id}`);
        setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="container">
      <h2 style={{ textAlign: 'center', marginBottom: '20px',marginTop: '1750px' }}>Employees List</h2>
      <table className="table"
       border={1}
          cellPadding={5}
          style={{ margin: '0 auto', width: '100vw', maxWidth: '90%' }}>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Profile Picture</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>
                  <img
                    src={user.profilePicture}
                    alt={`${user.fullName}'s Profile`}
                    width="120"
                    height="120"
                    style={{ borderRadius: '10%' }}
                  />
                </td>
                <td>₹{user.salary}/-</td>
                <td>
                  <Link to={`/user/view/${user.id}`} className="action-icons view">
                    <i className="fa fa-eye"></i> View
                  </Link>
                  <Link to={`/user/edit/${user.id}`} className="action-icons edit">
                    <i className="fas fa-edit"></i> Edit
                  </Link>
                  <span onClick={() => deleteUser(user.id)} className="action-icons delete">
                    <i className="fas fa-trash-alt"></i> Delete
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;

















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import './UserList.css'; 

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:4200/users');
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const deleteUser = async (id) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         await axios.delete(`http://localhost:4200/user/${id}`);
//         setUsers(users.filter((user) => user.id !== id));
//       } catch (error) {
//         console.error('Error deleting user:', error);
//       }
//     }
//   };

//   if (loading) return <p>Loading users...</p>;

//   return (
//     <div className="container">
//       <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>User List</h2>
//       <table className="table"
//        border={1}
//           cellPadding={5}
//           style={{ margin: '0 auto', width: '100vw', maxWidth: '90%' }}>
//         <thead>
//           <tr>
//             <th>User ID</th>
//             <th>Full Name</th>
//             <th>Email</th>
//             <th>Profile Picture</th>
//             <th>Salary</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length > 0 ? (
//             users.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.id}</td>
//                 <td>{user.fullName}</td>
//                 <td>{user.email}</td>
//                 <td>
//                   <img
//                     src={user.profilePicture}
//                     alt={`${user.fullName}'s Profile`}
//                     width="80"
//                     height="80"
//                     style={{ borderRadius: '10%' }}
//                   />
//                 </td>
//                 <td>₹{user.salary}/-</td>
//                 <td>
//                   <Link to={`/user/view/${user.id}`} className="action-icons view">
//                     <i className="fa fa-eye"> View</i>
//                   </Link>
//                   <Link to={`/user/edit/${user.id}`} className="action-icons edit">
//                     <i className="fas fa-edit"> Edit</i>
//                   </Link>
//                   <span onClick={() => deleteUser(user.id)} className="action-icons delete">
//                     <i className="fas fa-trash-alt"> Delete</i>
//                   </span>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6">No users found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserList;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import './UserList.css'; 

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:4200/users');
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const deleteUser = async (id) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         await axios.delete(`http://localhost:4200/user/${id}`);
//         setUsers(users.filter((user) => user.id !== id));
//       } catch (error) {
//         console.error('Error deleting user:', error);
//       }
//     }
//   };

//   if (loading) return <p>Loading users...</p>;

//   return (
//     <div className="container">
//       <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>User List</h2>
//       <table  className="table"
//   border={1}
//   cellPadding={5}
//   style={{ margin: '0 auto', width: '100vw', maxWidth: '90%' }}>
//         <thead>
//           <tr>
//             <th>User ID</th>
//             <th>Full Name</th>
//             <th>Email</th>
//             <th>Profile Picture</th>
//             <th>Salary</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length > 0 ? (
//             users.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.id}</td>
//                 <td>{user.fullName}</td>
//                 <td>{user.email}</td>
//                 <td>
//                   <img
//                     src={user.profilePicture}
//                     alt={`${user.fullName}'s Profile`}
//                     width="80"
//                     height="80"
//                     style={{ borderRadius: '10%' }}
//                   />
//                 </td>
//                 <td>₹ {user.salary}</td>
//                 <td>
//                     <Link to={`/user/view/${user.id}`} className="action-icons" style={{ color: 'orange' }}>
//                       <i className="fas fa-eye"> View</i>
//                     </Link>
//                     <Link to={`/user/edit/${user.id}`} className="action-icons" style={{ color: 'green' }}>
//                       <i className="fas fa-edit"> Edit</i>
//                     </Link>
//                     <span onClick={() => deleteUser(user.id)} className="action-icons" style={{ color: 'red' }}>
//                       <i className="fas fa-trash-alt"> Delete</i>
//                     </span>
//                   </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6">No users found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserList;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import './UserList.css'; 

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:4200/users');
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const deleteUser = async (id) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         await axios.delete(`http://localhost:4200/user/${id}`);
//         setUsers(users.filter((user) => user.id !== id));
//       } catch (error) {
//         console.error('Error deleting user:', error);
//       }
//     }
//   };

//   if (loading) return <p>Loading users...</p>;

//   return (
//     <div className="container">
//       <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>User List</h2>
//       <table  className="table"
//   border={1}
//   cellPadding={5}
//   style={{ margin: '0 auto', width: '100vw', maxWidth: '90%' }}>
//         <thead>
//           <tr>
//             <th>User ID</th>
//             <th>Full Name</th>
//             <th>Email</th>
//             <th>Profile Picture</th>
//             <th>Salary</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length > 0 ? (
//             users.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.id}</td>
//                 <td>{user.fullName}</td>
//                 <td>{user.email}</td>
//                 <td>
//                   <img
//                     src={user.profilePicture}
//                     alt={`${user.fullName}'s Profile`}
//                     width="80"
//                     height="80"
//                     style={{ borderRadius: '10%' }}
//                   />
//                 </td>
//                 <td>₹ {user.salary}</td>
//                 <td>
//                   <Link to={`/user/view/${user.id}`} className="action-icons">
//                     <i className="fas fa-eye">View</i>
//                   </Link>
//                   <Link to={`/user/edit/${user.id}`} className="action-icons">
//                     <i className="fas fa-edit">Edit</i>
//                   </Link>
//                   <span onClick={() => deleteUser(user.id)} className="action-icons">
//                     <i className="fas fa-trash-alt">Delete</i>
//                   </span>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6">No users found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserList;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:4200/users');
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const deleteUser = async (id) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         await axios.delete(`http://localhost:4200/user/${id}`);
//         setUsers(users.filter(user => user.id !== id));
//       } catch (error) {
//         console.error('Error deleting user:', error);
//       }
//     }
//   };

//   if (loading) return <p>Loading users...</p>;

//   return (
//     <div style={{ textAlign: 'center' }}>
//       <h2>User List</h2><h2>User List</h2>
//       <table  border={1}
//               cellPadding={5}
//               style={{ margin: '0 auto', width: '150%' }}>
//         <thead>
//           <tr>
//             <th>USER ID</th>
//             <th>Full Name</th>
//             <th>Email</th>
//             <th>Profile Picture</th>
//             <th>Salary</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length > 0 ? (
//             users.map(user => (
//               <tr key={user.id}>
//                 <td>{user.id}</td>
//                 <td>{user.fullName}</td>
//                 <td>{user.email}</td>
//                 <td><img src={user.profilePicture} alt={`${user.fullName}'s Profile`} width="100" height="100" /></td>
//                 <td><strong>Salary:</strong> ₹ {user.salary}</td>
//                 <td>
//                   <Link to={`/user/edit/${user.id}`}>Edit</Link>
//                   <button onClick={() => deleteUser(user.id)}>Delete</button>
//                   <Link to={`/user/view/${user.id}`}>View</Link>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5">No users found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserList;





















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:4200/users');
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const deleteUser = async (id) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         await axios.delete(`http://localhost:4200/user/${id}`);
//         setUsers(users.filter(user => user.id !== id));
//       } catch (error) {
//         console.error('Error deleting user:', error);
//       }
//     }
//   };

//   if (loading) return <p>Loading users...</p>;

//   return (
//     <div style={{ textAlign: 'center', padding: '20px' }}>
//       <h2 style={{ marginBottom: '20px' }}>User List</h2>
//       <table
//         border={1}
//         cellPadding={10}
//         style={{ margin: '0 auto', width: '80%', borderCollapse: 'collapse' }}
//       >
//         <thead>
//           <tr>
//             <th style={{ textAlign: 'center' }}>User ID</th>
//             <th style={{ textAlign: 'center' }}>Full Name</th>
//             <th style={{ textAlign: 'center' }}>Email</th>
//             <th style={{ textAlign: 'center' }}>Profile Picture</th>
//             <th style={{ textAlign: 'center' }}>Salary</th>
//             <th style={{ textAlign: 'center' }}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length > 0 ? (
//             users.map(user => (
//               <tr key={user.id}>
//                 <td style={{ textAlign: 'center' }}>{user.id}</td>
//                 <td style={{ textAlign: 'center' }}>{user.fullName}</td>
//                 <td style={{ textAlign: 'center' }}>{user.email}</td>
//                 <td style={{ textAlign: 'center' }}>
//                   <img
//                     src={user.profilePicture}
//                     alt={`${user.fullName}'s Profile`}
//                     width="80"
//                     height="80"
//                     style={{ borderRadius: '50%' }}
//                   />
//                 </td>
//                 <td style={{ textAlign: 'center' }}>₹ {user.salary}</td>
//                 <td style={{ textAlign: 'center' }}>
//                   <Link to={`/user/view/${user.id}`} style={{ margin: '0 10px' }}>
//                     <i className="fas fa-eye" title="View"></i>
//                   </Link>
//                   <Link to={`/user/edit/${user.id}`} style={{ margin: '0 10px' }}>
//                     <i className="fas fa-edit" title="Edit"></i>
//                   </Link>
//                   <button onClick={() => deleteUser(user.id)} style={{ margin: '0 10px' }}>
//                     <i className="fas fa-trash" title="Delete"></i>
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" style={{ textAlign: 'center' }}>
//                 No users found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserList;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './UserList.css'; // Ensure you create and import this CSS file

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isTableFormat, setIsTableFormat] = useState(true); // State to manage display format

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:4200/users');
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const deleteUser = async (id) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         await axios.delete(`http://localhost:4200/user/${id}`);
//         setUsers(users.filter(user => user.id !== id));
//       } catch (error) {
//         console.error('Error deleting user:', error);
//       }
//     }
//   };

//   const toggleDisplayFormat = () => {
//     setIsTableFormat(!isTableFormat);
//   };

//   if (loading) return <p>Loading users...</p>;

//   return (
//     <div className="container">
//       <h2 className="my-5">User List</h2>
//       <button onClick={toggleDisplayFormat} className="btn btn-primary mb-3">
//         {isTableFormat ? "Show Card Format" : "Show Table Format"}
//       </button>

//       {isTableFormat ? (
//         // Table format
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.id}</td>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>{user.phone}</td>
//                 <td>
//                   <button onClick={() => deleteUser(user.id)} className="btn btn-danger">
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         // Card format
//         <div className="card-format-container">
//           {users.map((user) => (
//             <div className="card" key={user.id}>
//               <div className="card-header">
//                 <h3>{user.name}</h3>
//                 <button onClick={() => deleteUser(user.id)} className="btn btn-danger">
//                   Delete
//                 </button>
//               </div>
//               <div className="card-body">
//                 <p>Email: {user.email}</p>
//                 <p>Phone: {user.phone}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserList;


















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import './UserList.css'; // Make sure to create and link this CSS file

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isTableFormat, setIsTableFormat] = useState(true); // State to manage display format

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:4200/users');
//         setUsers(response.data);
//       } catch (error) {
//         setError('Error fetching users. Please try again.');
//         console.error('Error fetching users:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const deleteUser = async (id) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         await axios.delete(`http://localhost:4200/user/${id}`);
//         setUsers(users.filter(user => user.id !== id));
//       } catch (error) {
//         console.error('Error deleting user:', error);
//       }
//     }
//   };

//   const toggleDisplayFormat = () => {
//     setIsTableFormat(!isTableFormat);
//   };

//   if (loading) return <p>Loading users...</p>;
//   if (error) return <p className="text-danger">{error}</p>;

//   return (
//     <div className="container">
//       <div className="d-flex justify-content-between align-items-center mt-3">
//         <h2 className="my-5">User List</h2>
//         <button onClick={toggleDisplayFormat} className="btn btn-primary">
//           {isTableFormat ? "Show Card Format" : "Show Table Format"}
//         </button>
//       </div>

//       {isTableFormat ? (
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.id}</td>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>
//                   <Link to={`/editUser/${user.id}`} className="btn btn-success mr-2">
//                     <i className="fa fa-edit" aria-hidden="true"></i> Edit
//                   </Link>
//                   <button onClick={() => deleteUser(user.id)} className="btn btn-danger">
//                     <i className="fa fa-trash" aria-hidden="true"></i> Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <div className="ag-format-container">
//           <div className="ag-courses_box">
//             {users.map((user) => (
//               <div className="ag-courses_item" key={user.id}>
//                 <a href="#" className="ag-courses-item_link">
//                   <div className="ag-courses-item_bg"></div>
//                   <div className="ag-courses-item_title">ID: {user.id}</div>
//                   <div className="ag-courses-item_title">{user.name}</div>
//                   <div className="ag-courses-item_date-box">
//                     Email: <span className="ag-courses-item_date">{user.email}</span>
//                   </div>
//                   <Link to={`/editUser/${user.id}`} className="btn btn-success mr-2">
//                     <i className="fa fa-edit" aria-hidden="true"></i> Edit
//                   </Link>
//                   <button onClick={() => deleteUser(user.id)} className="btn btn-danger">
//                     <i className="fa fa-trash" aria-hidden="true"></i> Delete
//                   </button>
//                 </a>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserList;





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const UserList = () => {
//   const [users, setUsers] = useState([]); 
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:4200/users');
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const deleteUser = async (id) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         await axios.delete(`http://localhost:4200/user/${id}`);
//         setUsers(users.filter(user => user.id !== id));
//       } catch (error) {
//         console.error('Error deleting user:', error);
//       }
//     }
//   };

//   if (loading) return <p>Loading users...</p>;

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#D3D3D3' }}>
//       <div style={{ width: '90%', textAlign: 'center', backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
//         <h2>User List</h2>
//         <table
//           border={1}
//           cellPadding={10}
//           style={{ margin: '20px auto', width: '100%', borderCollapse: 'collapse' }}
//         >
//           <thead>
//             <tr style={{ backgroundColor: '#f2f2f2' }}>
//               <th>User ID</th>
//               <th>Full Name</th>
//               <th>Email</th>
//               <th>Profile Picture</th>
//               <th>Salary</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.length > 0 ? (
//               users.map(user => (
//                 <tr key={user.id}>
//                   <td>{user.id}</td>
//                   <td>{user.fullName}</td>
//                   <td>{user.email}</td>
//                   <td>
//                     <img
//                       src={user.profilePicture}
//                       alt={`${user.fullName}'s Profile`}
//                       width="80"
//                       height="80"
//                       style={{ borderRadius: '5px', objectFit: 'cover' }}
//                     />
//                   </td>
//                   <td><strong>₹ {user.salary}</strong></td>
//                   <td>
//                     <Link to={`/user/edit/${user.id}`} style={{ marginRight: '10px' }}>Edit</Link>
//                     <button onClick={() => deleteUser(user.id)} style={{ marginRight: '10px' }}>Delete</button>
//                     <Link to={`/user/view/${user.id}`}>View</Link>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6">No users found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserList;













// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const UserList = () => {
//   const [users, setUsers] = useState([]); 
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:4200/users');
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const deleteUser = async (id) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         await axios.delete(`http://localhost:4200/user/${id}`);
//         setUsers(users.filter(user => user.id !== id));
//       } catch (error) {
//         console.error('Error deleting user:', error);
//       }
//     }
//   };

//   if (loading) return <p>Loading users...</p>;

//   return (
//     <div 
//       style={{ 
//         display: 'flex', 
//         justifyContent: 'center', 
//         alignItems: 'center', 
//         height: '100vh', 
//         backgroundColor: '#d9d9d9', // Cement color background
//         padding: '20px' 
//       }}
//     >
//       <div style={{ textAlign: 'center', backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
//         <h2>User List</h2>
        
//         <table
//           border={1}
//           cellPadding={10}
//           style={{ margin: '20px auto', width: '100%', borderCollapse: 'collapse' }}
//         >
//           <thead>
//             <tr style={{ backgroundColor: '#f2f2f2' }}>
//               <th>User ID</th>
//               <th>Full Name</th>
//               <th>Email</th>
//               <th>Profile Picture</th>
//               <th>Salary</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.length > 0 ? (
//               users.map(user => (
//                 <tr key={user.id}>
//                   <td>{user.id}</td>
//                   <td>{user.fullName}</td>
//                   <td>{user.email}</td>
//                   <td>
//                     <img
//                       src={user.profilePicture}
//                       alt={`${user.fullName}'s Profile`}
//                       width="80"
//                       height="80"
//                       style={{ borderRadius: '5px', objectFit: 'cover' }}
//                     />
//                   </td>
//                   <td><strong>₹ {user.salary}</strong></td>
//                   <td>
//                     <Link to={`/user/edit/${user.id}`} style={{ marginRight: '10px' }}>Edit</Link>
//                     <button onClick={() => deleteUser(user.id)} style={{ marginRight: '10px' }}>Delete</button>
//                     <Link to={`/user/view/${user.id}`}>View</Link>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6">No users found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserList;









// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const UserList = () => {
//   const [users, setUsers] = useState([]); 
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:4200/users');
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const deleteUser = async (id) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         await axios.delete(`http://localhost:4200/user/${id}`);
//         setUsers(users.filter(user => user.id !== id));
//       } catch (error) {
//         console.error('Error deleting user:', error);
//       }
//     }
//   };

//   if (loading) return <p>Loading users...</p>;

//   return (
//     <div style={{ textAlign: 'center', margin: '20px', marginTop: '80px' }}>
//       <h2>User List</h2>
      
//       <table
//           border={1}
//           cellPadding={10}
//           style={{ margin: '20px auto', width: '100%', borderCollapse: 'collapse' }}
//       >
//         <thead>
//           <tr style={{ backgroundColor: '#f2f2f2' }}>
//             <th>User ID</th>
//             <th>Full Name</th>
//             <th>Email</th>
//             <th>Profile Picture</th>
//             <th>Salary</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length > 0 ? (
//             users.map(user => (
//               <tr key={user.id}>
//                 <td>{user.id}</td>
//                 <td>{user.fullName}</td>
//                 <td>{user.email}</td>
//                 <td>
//                   <img
//                     src={user.profilePicture}
//                     alt={`${user.fullName}'s Profile`}
//                     width="80"
//                     height="80"
//                     style={{ borderRadius: '5px', objectFit: 'cover' }}
//                   />
//                 </td>
//                 <td><strong>₹ {user.salary}</strong></td>
//                 <td>
//                   <Link to={`/user/edit/${user.id}`} style={{ marginRight: '10px' }}>Edit</Link>
//                   <button onClick={() => deleteUser(user.id)} style={{ marginRight: '10px' }}>Delete</button>
//                   <Link to={`/user/view/${user.id}`}>View</Link>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6">No users found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserList;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:4200/users');
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const deleteUser = async (id) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         await axios.delete(`http://localhost:4200/user/${id}`);
//         setUsers(users.filter(user => user.id !== id));
//       } catch (error) {
//         console.error('Error deleting user:', error);
//       }
//     }
//   };

//   if (loading) return <p>Loading users...</p>;

//   return (
//     <div style={{ textAlign: 'center', padding: '20px' }}>
//       <h2>User List</h2>
//       <table
//         border={1}
//         cellPadding={10}
//         style={{ margin: '20px auto', width: '80%', borderCollapse: 'collapse' }}
//       >
//         <thead>
//           <tr>
//             <th style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>USER ID</th>
//             <th style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>Full Name</th>
//             <th style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>Email</th>
//             <th style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>Profile Picture</th>
//             <th style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>Salary</th>
//             <th style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length > 0 ? (
//             users.map(user => (
//               <tr key={user.id}>
//                 <td>{user.id}</td>
//                 <td>{user.fullName}</td>
//                 <td>{user.email}</td>
//                 <td>
//                   <img
//                     src={user.profilePicture}
//                     alt={`${user.fullName}'s Profile`}
//                     width="80"
//                     height="80"
//                     style={{ borderRadius: '50%' }}
//                   />
//                 </td>
//                 <td>₹ {user.salary}</td>
//                 <td>
//                   <Link to={`/user/view/${user.id}`} style={{ marginRight: '10px' }}>View</Link>
//                   <Link to={`/user/edit/${user.id}`} style={{ marginRight: '10px' }}>Edit</Link>
//                   <button onClick={() => deleteUser(user.id)} style={{ marginLeft: '10px' }}>Delete</button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" style={{ textAlign: 'center' }}>No users found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserList;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:4200/users');
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const deleteUser = async (id) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         await axios.delete(`http://localhost:4200/user/${id}`);
//         setUsers(users.filter((user) => user.id !== id));
//       } catch (error) {
//         console.error('Error deleting user:', error);
//       }
//     }
//   };

//   if (loading) return <p>Loading users...</p>;

//   return (
//     <div style={{ textAlign: 'center', padding: '20px' }}>
//       <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>User List</h2>
//       <table
//         border={1}
//         cellPadding={10}
//         style={{ margin: '0 auto', width: '80%', borderCollapse: 'collapse' }}
//       >
//         <thead>
//           <tr>
//             <th style={{ textAlign: 'center' }}>User ID</th>
//             <th style={{ textAlign: 'center' }}>Full Name</th>
//             <th style={{ textAlign: 'center' }}>Email</th>
//             <th style={{ textAlign: 'center' }}>Profile Picture</th>
//             <th style={{ textAlign: 'center' }}>Salary</th>
//             <th style={{ textAlign: 'center' }}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length > 0 ? (
//             users.map((user) => (
//               <tr key={user.id}>
//                 <td style={{ textAlign: 'center' }}>{user.id}</td>
//                 <td style={{ textAlign: 'center' }}>{user.fullName}</td>
//                 <td style={{ textAlign: 'center' }}>{user.email}</td>
//                 <td style={{ textAlign: 'center' }}>
//                   <img
//                     src={user.profilePicture}
//                     alt={`${user.fullName}'s Profile`}
//                     width="80"
//                     height="80"
//                     style={{ borderRadius: '50%' }}
//                   />
//                 </td>
//                 <td style={{ textAlign: 'center' }}>₹ {user.salary}</td>
//                 <td style={{ textAlign: 'center' }}>
//                   <Link to={`/user/view/${user.id}`} style={{ margin: '0 10px' }}>
//                     View
//                   </Link>
//                   <Link to={`/user/edit/${user.id}`} style={{ margin: '0 10px' }}>
//                     Edit
//                   </Link>
//                   <button onClick={() => deleteUser(user.id)} style={{ margin: '0 10px' }}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" style={{ textAlign: 'center' }}>
//                 No users found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserList;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:4200/users');
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const deleteUser = async (id) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         await axios.delete(`http://localhost:4200/user/${id}`);
//         setUsers(users.filter(user => user.id !== id));
//       } catch (error) {
//         console.error('Error deleting user:', error);
//       }
//     }
//   };

//   if (loading) return <p>Loading users...</p>;

//   return (
//     <div style={{ textAlign: 'center' }}>
//       <h2>User List</h2><h2>User List</h2>
//       <table  border={1}
//               cellPadding={5}
//               style={{ margin: '0 auto', width: '150%' }}>
//         <thead>
//           <tr>
//             <th>USER ID</th>
//             <th>Full Name</th>
//             <th>Email</th>
//             <th>Profile Picture</th>
//             <th>Salary</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length > 0 ? (
//             users.map(user => (
//               <tr key={user.id}>
//                 <td>{user.id}</td>
//                 <td>{user.fullName}</td>
//                 <td>{user.email}</td>
//                 <td><img src={user.profilePicture} alt={`${user.fullName}'s Profile`} width="100" height="100" /></td>
//                 <td><strong>Salary:</strong> ₹ {user.salary}</td>
//                 <td>
//                   <Link to={`/user/edit/${user.id}`}>Edit</Link>
//                   <button onClick={() => deleteUser(user.id)}>Delete</button>
//                   <Link to={`/user/view/${user.id}`}>View</Link>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5">No users found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserList;
