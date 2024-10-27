import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('normal'); // State for view mode

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4200/user/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) return <p>Loading user details...</p>;
  if (!user) return <p>User not found.</p>;

  const toggleViewMode = () => {
    setViewMode(viewMode === 'normal' ? 'card' : 'normal'); // Toggle between normal and card view
  };

  const UserDetails = ({ userData }) => (
    <div>
       <p><strong>EMPLOYEE ID: {user.id} </strong> </p>
      <p><strong>Full Name:</strong> {userData.fullName}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
      <p><strong>Gender:</strong> {userData.gender}</p>
      <p><strong>Date of Birth:</strong> {new Date(userData.dateOfBirth).toLocaleDateString()}</p>
      <p><strong>Permanent Address:</strong> {userData.address}</p>
      <p><strong>Temporary Address:</strong> {userData.temporaryAddress}</p>
    </div>
  );

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', width: '100vw', maxWidth: '90%', textAlign: 'left', position: 'relative', marginTop: '150px' }}>
      {/* Toggle Switch */}
      <label style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        zIndex: 1,
      }}>
        <input
          type="checkbox"
          checked={viewMode === 'card'}
          onChange={(e) => e.stopPropagation()} // Prevent toggle change on surrounding area clicks
          onClick={toggleViewMode} // Handle click only on the toggle
          style={{ display: 'none' }} // Hide the default checkbox
        />
        <span
          style={{
            width: '40px',
            height: '20px',
            backgroundColor: viewMode === 'card' ? '#007bff' : '#ddd',
            borderRadius: '20px',
            position: 'relative',
            transition: 'background-color 0.2s ease',
          }}
        >
          <span
            style={{
              content: '',
              width: '18px',
              height: '18px',
              backgroundColor: '#fff',
              borderRadius: '50%',
              position: 'absolute',
              top: '1px',
              left: viewMode === 'card' ? '20px' : '2px',
              transition: 'left 0.2s ease',
            }}
          />
        </span>
      </label>

      {/* User Details */}
      <div style={{ marginTop: '300px' }}>
        {viewMode === 'normal' ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid black', borderRadius: '10px', padding: '20px' }}>
            <img
              src={user.profilePicture}
              alt={`${user.fullName}'s Profile`}
              style={{
                width: '350px',
                height: '350px',
                margin: '100px',
                borderRadius: '8%',
                objectFit: 'cover',
              }}
            />
            <UserDetails userData={user} />
          </div>
        ) : (
          // Card View
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '150px' }}>
            <div
              style={{
                flex: '0 0 300px',
                padding: '20px',
                border: '1px solid black',
                borderRadius: '10px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                marginTop: '50px',
              }}
            >
              <h3>Personal Information</h3>
              <img
                src={user.profilePicture}
                alt={`Profile of ${user.fullName}`}
                style={{
                  width: '200px',
                  height: '250px',
                  marginBottom: '5px',
                  marginLeft: '30px',
                  borderRadius: '5%',
                  objectFit: 'cover',
                }}
              />
              <UserDetails userData={user} />
            </div>
            <div
              style={{
                flex: '0 0 300px',
                padding: '20px',
                border: '1px solid black',
                borderRadius: '10px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                marginTop: '50px',
              }}
            >
              <h3>Employment Details</h3>
              <img
                src={user.profilePicture}
                alt={`Profile of ${user.fullName}`}
                style={{
                  width: '200px',
                  height: '250px',
                  marginBottom: '5px',
                  marginLeft: '30px',
                  borderRadius: '5%',
                  objectFit: 'cover',
                }}
              />
               <p><strong>EMPLOYEE ID: {user.id} </strong> </p>
              <p><strong>Department:</strong> {user.department}</p>
              <p><strong>Position:</strong> {user.position}</p>
              <p><strong>Date of Hire:</strong> {new Date(user.dateOfHire).toLocaleDateString()}</p>
              <p><strong>Salary:</strong> ₹ {user.salary.toLocaleString()}/-</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewUser;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const ViewUser = () => {
//   const { id } = useParams();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [viewMode, setViewMode] = useState('normal'); // State for view mode

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4200/user/${id}`);
//         setUser(response.data);
//       } catch (error) {
//         console.error('Error fetching user:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, [id]);

//   if (loading) return <p>Loading user details...</p>;
//   if (!user) return <p>User not found.</p>;

//   const toggleViewMode = () => {
//     setViewMode(viewMode === 'normal' ? 'card' : 'normal'); // Toggle between normal and card view
//   };

//   const UserDetails = ({ userData }) => (
//     <div>
//       <p><strong>Full Name:</strong> {userData.fullName}</p>
//       <p><strong>Email:</strong> {userData.email}</p>
//       <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
//       <p><strong>Gender:</strong> {userData.gender}</p>
//       <p><strong>Date of Birth:</strong> {new Date(userData.dateOfBirth).toLocaleDateString()}</p>
//       <p><strong>Permanent Address:</strong> {userData.address}</p>
//       <p><strong>Temporary Address:</strong> {userData.temporaryAddress}</p>
//     </div>
//   );

//   return (
//     <div style={{ maxWidth: '900px', margin: '0 auto', width: '100vw', maxWidth: '90%', textAlign: 'left', position: 'relative', marginTop: '150px' }}>
//       {/* Toggle Switch */}
//       <label style={{
//         position: 'absolute',
//         top: '20px',
//         right: '20px',
//         display: 'flex',
//         alignItems: 'center',
//         cursor: 'pointer',
//         zIndex: 1,
//       }}>
//         <input
//           type="checkbox"
//           checked={viewMode === 'card'}
//           onChange={toggleViewMode}
//           style={{ display: 'none' }} // Hide the default checkbox
//         />
//         <span
//           style={{
//             width: '40px',
//             height: '20px',
//             backgroundColor: viewMode === 'card' ? '#007bff' : '#ddd',
//             borderRadius: '20px',
//             position: 'relative',
//             transition: 'background-color 0.2s ease',
//           }}
//         >
//           <span
//             style={{
//               content: '',
//               width: '18px',
//               height: '18px',
//               backgroundColor: '#fff',
//               borderRadius: '50%',
//               position: 'absolute',
//               top: '1px',
//               left: viewMode === 'card' ? '20px' : '2px',
//               transition: 'left 0.2s ease',
//             }}
//           />
//         </span>
//       </label>

//       {/* User Details */}
//       <div style={{ marginTop: '300px' }}>
//         {viewMode === 'normal' ? (
//           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid black', borderRadius: '10px', padding: '20px' }}>
//             <img
//               src={user.profilePicture}
//               alt={`${user.fullName}'s Profile`}
//               style={{
//                 width: '350px',
//                 height: '350px',
//                 margin: '100px',
//                 borderRadius: '8%',
//                 objectFit: 'cover',
//               }}
//             />
//             <UserDetails userData={user} />
//           </div>
//         ) : (
//           // Card View
//           <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '150px' }}>
//             <div
//               style={{
//                 flex: '0 0 300px',
//                 padding: '20px',
//                 border: '1px solid black',
//                 borderRadius: '10px',
//                 boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//                 marginTop: '50px',
//               }}
//             >
//               <h3>Personal Information</h3>
//               <img
//                 src={user.profilePicture}
//                 alt={`Profile of ${user.fullName}`}
//                 style={{
//                   width: '200px',
//                   height: '250px',
//                   marginBottom: '5px',
//                   marginLeft: '30px',
//                   borderRadius: '5%',
//                   objectFit: 'cover',
//                 }}
//               />
//               <UserDetails userData={user} />
//             </div>
//             <div
//               style={{
//                 flex: '0 0 300px',
//                 padding: '20px',
//                 border: '1px solid black',
//                 borderRadius: '10px',
//                 boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//                 marginTop: '50px',
//               }}
//             >
//               <h3>Employment Details</h3>
//               <img
//                 src={user.profilePicture}
//                 alt={`Profile of ${user.fullName}`}
//                 style={{
//                   width: '200px',
//                   height: '250px',
//                   marginBottom: '5px',
//                   marginLeft: '30px',
//                   borderRadius: '5%',
//                   objectFit: 'cover',
//                 }}
//               />
//               <p><strong>Department:</strong> {user.department}</p>
//               <p><strong>Position:</strong> {user.position}</p>
//               <p><strong>Date of Hire:</strong> {new Date(user.dateOfHire).toLocaleDateString()}</p>
//               <p><strong>Salary:</strong> ₹ {user.salary.toLocaleString()}/-</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ViewUser;





















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const ViewUser = () => {
//   const { id } = useParams();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [viewMode, setViewMode] = useState('normal'); // State for view mode

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4200/user/${id}`);
//         setUser(response.data);
//       } catch (error) {
//         console.error('Error fetching user:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, [id]);

//   if (loading) return <p>Loading user details...</p>;
//   if (!user) return <p>User not found.</p>;

//   const toggleViewMode = () => {
//     setViewMode(viewMode === 'normal' ? 'card' : 'normal'); // Toggle between normal and card view
//   };

//   return (
//     <div style={{ maxWidth: '900px', margin: '0 auto', width: '100vw', maxWidth: '90%', textAlign: 'left', position: 'relative', marginTop:'150px' }}>
//       {/* Toggle Switch */}
//       <label style={{
//         position: 'absolute',
//         top: '20px',
//         right: '20px',
//         display: 'flex',
//         alignItems: 'center',
//         cursor: 'pointer',
//         zIndex: 1,
//       }}>
//         <input
//           type="checkbox"
//           checked={viewMode === 'card'}
//           onChange={toggleViewMode}
//           style={{ display: 'none' }} // Hide the default checkbox
//         />
//         <span
//           style={{
//             width: '40px',
//             height: '20px',
//             backgroundColor: viewMode === 'card' ? '#007bff' : '#ddd',
//             borderRadius: '20px',
//             position: 'relative',
//             transition: 'background-color 0.2s ease',
//           }}
//         >
//           <span
//             style={{
//               content: '',
//               width: '18px',
//               height: '18px',
//               backgroundColor: '#fff',
//               borderRadius: '50%',
//               position: 'absolute',
//               top: '1px',
//               left: viewMode === 'card' ? '20px' : '2px',
//               transition: 'left 0.2s ease',
//             }}
//           />
//         </span>
//       </label>

//       {/* User Details */}
//       <div style={{ marginTop: '300px' }}>
//         {viewMode === 'normal' ? (
//           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid black', borderRadius: '10px', padding: '20px' }}>
//             <img
//               src={user.profilePicture}
//               alt={`${user.fullName}'s Profile`}
//               style={{
//                 width: '350px',
//                 height: '350px',
//                 margin: '100px',
//                 borderRadius: '8%',
//                 objectFit: 'cover',
//               }}
//             />
//             <div>
//               <h2>User Details</h2>
//               <p><strong>ID:</strong> {user.id}</p>
//               <p><strong>Full Name:</strong> {user.fullName}</p>
//               <p><strong>Email:</strong> {user.email}</p>
//               <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
//               <p><strong>Gender:</strong> {user.gender}</p> 
//               <p><strong>Department:</strong> {user.department}</p>
//               <p><strong>Position:</strong> {user.position}</p>
//               <p><strong>Date of Birth:</strong> {new Date(user.dateOfBirth).toLocaleDateString()}</p>
//               <p><strong>Date of Hire:</strong> {new Date(user.dateOfHire).toLocaleDateString()}</p>
//               <p><strong>Salary:</strong> ₹ {user.salary.toLocaleString()}</p>
//               <p><strong>Permanent Address:</strong> {user.address}</p>
//               <p><strong>Temporary Address:</strong> {user.temporaryAddress}</p> 
//             </div>
//           </div>
//         ) : (
//           // Card View
//           <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '150px' }}>
//             <div
//               style={{
//                 flex: '0 0 300px',
//                 padding: '20px',
//                 border: '1px solid black',
//                 borderRadius: '10px',
//                 boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//                 marginTop: '50px',
//               }}
//             >
//               <h3>Personal Information</h3>
//               <img
//                 src={user.profilePicture}
//                 alt={`Profile of ${user.fullName}`}
//                 style={{
//                   width: '200px',
//                   height: '250px',
//                   marginBottom: '5px',
//                   marginLeft: '30px',
//                   borderRadius: '5%',
//                   objectFit: 'cover',
//                 }}
//               />
//               <p><strong>Full Name:</strong> {user.fullName}</p>
//               <p><strong>Email:</strong> {user.email}</p>
//               <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
//               <p><strong>Gender:</strong> {user.gender}</p> 
//               <p><strong>Date of Birth:</strong> {new Date(user.dateOfBirth).toLocaleDateString()}</p>
//               <p><strong>Permanent Address:</strong> {user.address}</p> 
//               <p><strong>Temporary Address:</strong> {user.temporaryAddress}</p>
//             </div>
//             <div
//               style={{
//                 flex: '0 0 300px',
//                 padding: '20px',
//                 border: '1px solid black',
//                 borderRadius: '10px',
//                 boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//                 marginTop: '50px',
//               }}
//             >
//               <h3>Employment Details</h3>
//               <img
//                 src={user.profilePicture}
//                 alt={`Profile of ${user.fullName}`}
//                 style={{
//                   width: '200px',
//                   height: '250px',
//                   marginBottom: '5px',
//                   marginLeft: '30px',
//                   borderRadius: '5%',
//                   objectFit: 'cover',
//                 }}
//               />
//               <p><strong>Department:</strong> {user.department}</p>
//               <p><strong>Position:</strong> {user.position}</p>
//               <p><strong>Date of Hire:</strong> {new Date(user.dateOfHire).toLocaleDateString()}</p>
//               <p><strong>Salary:</strong> ₹ {user.salary.toLocaleString()}/-</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ViewUser;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const ViewUser = () => {
//   const { id } = useParams();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [viewMode, setViewMode] = useState('normal'); // State for view mode

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4200/user/${id}`);
//         setUser(response.data);
//       } catch (error) {
//         console.error('Error fetching user:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, [id]);

//   if (loading) return <p>Loading user details...</p>;
//   if (!user) return <p>User not found.</p>;

//   const toggleViewMode = () => {
//     setViewMode(viewMode === 'normal' ? 'card' : 'normal'); // Toggle between normal and card view
//   };

//   return (
//     <div style={{ maxWidth: '900px', margin: '0 auto', width: '100vw', maxWidth: '90%', textAlign: 'left', position: 'relative' }}>
//       {/* Toggle Switch */}
//       <label style={{
//         position: 'absolute',
//         top: '20px',
//         right: '20px',
//         display: 'flex',
//         alignItems: 'center',
//         cursor: 'pointer',
//         zIndex: 1, // Ensure it stays above other elements
//       }}>
//         <input
//           type="checkbox"
//           checked={viewMode === 'card'}
//           onChange={toggleViewMode}
//           style={{ display: 'none' }} // Hide the default checkbox
//         />
//         <span
//           style={{
//             width: '40px',
//             height: '20px',
//             backgroundColor: viewMode === 'card' ? '#007bff' : '#ddd',
//             borderRadius: '20px',
//             position: 'relative',
//             transition: 'background-color 0.2s ease',
//           }}
//         >
//           <span
//             style={{
//               content: '',
//               width: '18px',
//               height: '18px',
//               backgroundColor: '#fff',
//               borderRadius: '50%',
//               position: 'absolute',
//               top: '1px',
//               left: viewMode === 'card' ? '20px' : '2px',
//               transition: 'left 0.2s ease',
//             }}
//           />
//         </span>
//       </label>

//       {/* User Details */}
//       <div style={{ marginTop: '70px' }}> {/* Adjusted margin to account for the toggle position */}
//         {viewMode === 'normal' ? (
//           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '10px solid #4a90e2', borderRadius: '10px', padding: '20px' }}>
//             <img
//               src={user.profilePicture}
//               alt={`${user.fullName}'s Profile`}
//               style={{
//                 width: '250px',
//                 height: '250px',
//                 margin: '100px',
//                 borderRadius: '8%',
//                 objectFit: 'cover',
//               }}
//             />
//             <div>
//               <h2>User Details</h2>
//               <p><strong>ID:</strong> {user.id}</p>
//               <p><strong>Full Name:</strong> {user.fullName}</p>
//               <p><strong>Email:</strong> {user.email}</p>
//               <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
//               <p>{user.gender}</p> 
//               <p><strong>Department:</strong> {user.department}</p>
//               <p><strong>Position:</strong> {user.position}</p>
//               <p><strong>Date of Birth:</strong> {new Date(user.dateOfBirth).toLocaleDateString()}</p>
//               <p><strong>Date of Hire:</strong> {new Date(user.dateOfHire).toLocaleDateString()}</p>
//               <p><strong>Salary:</strong> ₹ {user.salary.toLocaleString()}</p>
//               <p>{user.gender}</p> 
//               <p>{user.temporaryAddress}</p> 
//               <p><strong>Address:</strong> {user.address}</p>
//             </div>
//           </div>
//         ) : (
//           // Card View
//           <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
//             <div
//               style={{
//                 flex: '0 0 300px',
//                 padding: '20px',
//                 border: '3px solid #4a90e2',
//                 borderRadius: '10px',
//                 boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//                 marginTop:'50px',
//               }}
//             >
//               <h3>Personal Information</h3>
//               <img
//                 src={user.profilePicture}
//                 alt={`Profile of ${user.fullName}`}
//                 style={{
//                   width: '200px',
//                   height: '250px',
//                   marginBottom: '5px',
//                   marginLeft: '30px',
//                   borderRadius: '5%',
//                   objectFit: 'cover',
//                 }}
//               />
//               <p><strong>Full Name:</strong> {user.fullName}</p>
//               <p><strong>Email:</strong> {user.email}</p>
//               <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
//               <p><strong>Date of Birth:</strong> {new Date(user.dateOfBirth).toLocaleDateString()}</p>
//               <p><strong>Address:</strong> {user.address}</p>
//             </div>
//             <div
//               style={{
//                 flex: '0 0 300px',
//                 padding: '20px',
//                 border: '3px solid #4a90e2',
//                 borderRadius: '10px',
//                 boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//                 marginTop:'50px',
//               }}
//             >
//               <h3>Employment Details</h3>
//               <img
//                 src={user.profilePicture}
//                 alt={`Profile of ${user.fullName}`}
//                 style={{
//                   width: '200px',
//                   height: '250px',
//                   marginBottom: '5px',
//                   marginLeft: '30px',
//                   borderRadius: '5%',
//                   objectFit: 'cover',
//                 }}
//               />
//               <p><strong>ID:</strong> {user.id}</p>
//               <p><strong>Position:</strong> {user.position}</p>
//               <p><strong>Department:</strong> {user.department}</p>
//               <p><strong>Date of Hire:</strong> {new Date(user.dateOfHire).toLocaleDateString()}</p>
//               <p><strong>Salary:</strong> ₹ {user.salary.toLocaleString()}</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ViewUser;































// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const ViewUser = () => {
//   const { id } = useParams();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [viewMode, setViewMode] = useState('normal'); // State for view mode

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4200/user/${id}`);
//         setUser(response.data);
//       } catch (error) {
//         console.error('Error fetching user:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, [id]);

//   if (loading) return <p>Loading user details...</p>;
//   if (!user) return <p>User not found.</p>;

//   const toggleViewMode = () => {
//     setViewMode(viewMode === 'normal' ? 'card' : 'normal'); // Toggle between normal and card view
//   };

//   return (
//     <div style={{ maxWidth: '900px', margin: '0 auto', width: '100vw', maxWidth: '90%', textAlign: 'left', position: 'relative' }}>
//       {/* Toggle Switch */}
//       <label style={{
//         position: 'absolute',
//         top: '20px',
//         right: '20px',
//         display: 'flex',
//         alignItems: 'center',
//         cursor: 'pointer'
//       }}>
//         <input
//           type="checkbox"
//           checked={viewMode === 'card'}
//           onChange={toggleViewMode}
//           style={{ display: 'none' }} // Hide the default checkbox
//         />
//         <span
//           style={{
//             width: '40px',
//             height: '20px',
//             backgroundColor: viewMode === 'card' ? '#007bff' : '#ddd',
//             borderRadius: '20px',
//             position: 'relative',
//             transition: 'background-color 0.2s ease',
//           }}
//         >
//           <span
//             style={{
//               content: '',
//               width: '18px',
//               height: '18px',
//               backgroundColor: '#fff',
//               borderRadius: '50%',
//               position: 'absolute',
//               top: '1px',
//               left: viewMode === 'card' ? '20px' : '2px',
//               transition: 'left 0.2s ease',
//             }}
//           />
//         </span>
//       </label>

//       {/* User Details */}
//       {viewMode === 'normal' ? (
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '50px', border: '10px solid #4a90e2', borderRadius: '10px', padding: '20px' }}>
//           <img
//             src={user.profilePicture}
//             alt={`${user.fullName}'s Profile`}
//             style={{
//               width: '250px',
//               height: '250px',
//               margin: '100px',
//               borderRadius: '8%',
//               objectFit: 'cover',
//             }}
//           />
//           <div>
//             <h2>User Details</h2>
//             <p><strong>ID:</strong> {user.id}</p>
//             <p><strong>Full Name:</strong> {user.fullName}</p>
//             <p><strong>Email:</strong> {user.email}</p>
//             <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
//             <p><strong>Department:</strong> {user.department}</p>
//             <p><strong>Position:</strong> {user.position}</p>
//             <p><strong>Date of Birth:</strong> {new Date(user.dateOfBirth).toLocaleDateString()}</p>
//             <p><strong>Date of Hire:</strong> {new Date(user.dateOfHire).toLocaleDateString()}</p>
//             <p><strong>Salary:</strong> ₹ {user.salary.toLocaleString()}</p>
//             <p><strong>Address:</strong> {user.address}</p>
//           </div>
//         </div>
//       ) : (
//         // Card View
//         <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
//           <div
//             style={{
//               flex: '0 0 300px',
//               padding: '20px',
//               border: '3px solid #4a90e2',
//               borderRadius: '10px',
//               boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//             }}
//           >
//             <h3>Personal Information</h3>
//             <img
//               src={user.profilePicture}
//               alt={`Profile of ${user.fullName}`}
//               style={{
//                 width: '200px',
//                 height: '250px',
//                 marginBottom: '5px',
//                 marginLeft: '30px',
//                 borderRadius: '5%',
//                 objectFit: 'cover',
//               }}
//             />
//             <p><strong>Full Name:</strong> {user.fullName}</p>
//             <p><strong>Email:</strong> {user.email}</p>
//             <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
//             <p><strong>Address:</strong> {user.address}</p>
//           </div>
//           <div
//             style={{
//               flex: '0 0 300px',
//               padding: '20px',
//               border: '3px solid #4a90e2',
//               borderRadius: '10px',
//               boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//             }}
//           >
//             <h3>Employment Details</h3>
//             <img
//               src={user.profilePicture}
//               alt={`Profile of ${user.fullName}`}
//               style={{
//                 width: '200px',
//                 height: '250px',
//                 marginBottom: '5px',
//                 marginLeft: '30px',
//                 borderRadius: '5%',
//                 objectFit: 'cover',
//               }}
//             />
//             <p><strong>ID:</strong> {user.id}</p>
//             <p><strong>Position:</strong> {user.position}</p>
//             <p><strong>Department:</strong> {user.department}</p>
//             <p><strong>Date of Hire:</strong> {new Date(user.dateOfHire).toLocaleDateString()}</p>
//             <p><strong>Salary:</strong> ₹ {user.salary.toLocaleString()}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewUser;



















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const ViewUser = () => {
//   const { id } = useParams();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [viewMode, setViewMode] = useState('normal'); // State for view mode

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4200/user/${id}`);
//         setUser(response.data);
//       } catch (error) {
//         console.error('Error fetching user:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, [id]);

//   if (loading) return <p>Loading user details...</p>;
//   if (!user) return <p>User not found.</p>;

//   const toggleViewMode = () => {
//     setViewMode(viewMode === 'normal' ? 'card' : 'normal'); // Toggle between normal and card view
//   };

//   return (
//     <div style={{ maxWidth: '900px', margin: '0 auto', width: '100vw', maxWidth: '90%', textAlign: 'left', position: 'relative' }}>
//       {/* Toggle Switch */}
//       <label style={{
//         position: 'absolute',
//         top: '20px',
//         right: '20px',
//         display: 'flex',
//         alignItems: 'center',
//         cursor: 'pointer'
//       }}>
//         <input
//           type="checkbox"
//           checked={viewMode === 'card'}
//           onChange={toggleViewMode}
//           style={{ display: 'none' }} // Hide the default checkbox
//         />
//         <span
//           style={{
//             width: '40px',
//             height: '20px',
//             backgroundColor: viewMode === 'card' ? '#007bff' : '#ddd',
//             borderRadius: '20px',
//             position: 'relative',
//             transition: 'background-color 0.2s ease',
//           }}
//         >
//           <span
//             style={{
//               content: '',
//               width: '18px',
//               height: '18px',
//               backgroundColor: '#fff',
//               borderRadius: '50%',
//               position: 'absolute',
//               top: '1px',
//               left: viewMode === 'card' ? '20px' : '2px',
//               transition: 'left 0.2s ease',
//             }}
//           />
//         </span>
//       </label>

//       {/* User Details */}
//       {viewMode === 'normal' ? (
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '50px' }}>
//           <img
//             src={user.profilePicture}
//             alt={`${user.fullName}'s Profile`}
//             style={{
//               width: '250px',
//               height: '250px',
//               margin: '100px',
//               borderRadius: '8%',
//               objectFit: 'cover',
//             }}
//           />
//           <div>
//             <h2>User Details</h2>
//             <p><strong>ID:</strong> {user.id}</p>
//             <p><strong>Full Name:</strong> {user.fullName}</p>
//             <p><strong>Email:</strong> {user.email}</p>
//             <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
//             <p><strong>Department:</strong> {user.department}</p>
//             <p><strong>Position:</strong> {user.position}</p>
//             <p><strong>Date of Birth:</strong> {new Date(user.dateOfBirth).toLocaleDateString()}</p>
//             <p><strong>Date of Hire:</strong> {new Date(user.dateOfHire).toLocaleDateString()}</p>
//             <p><strong>Salary:</strong> ₹ {user.salary.toLocaleString()}</p>
//             <p><strong>Address:</strong> {user.address}</p>
//           </div>
//         </div>
//       ) : (
//         // Card View
//         <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
//           <div
//             style={{
//               flex: '0 0 300px',
//               padding: '20px',
//               border: '1px solid #ddd',
//               borderRadius: '8px',
//               boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//             }}
//           >
//             <h3>Personal Information</h3>
//             <img
//               src={user.profilePicture}
//               alt={`Profile of ${user.fullName}`}
//               style={{
//                 width: '200px',
//                 height: '250px',
//                 marginBottom: '5px',
//                 marginLeft: '30px',
//                 borderRadius: '5%',
//                 objectFit: 'cover',
//               }}
//             />
//             <p><strong>Full Name:</strong> {user.fullName}</p>
//             <p><strong>Email:</strong> {user.email}</p>
//             <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
//             <p><strong>Address:</strong> {user.address}</p>
//           </div>
//           <div
//             style={{
//               flex: '0 0 300px',
//               padding: '20px',
//               border: '1px solid #ddd',
//               borderRadius: '8px',
//               boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//             }}
//           >
//             <h3>Employment Details</h3>
//             <img
//               src={user.profilePicture}
//               alt={`Profile of ${user.fullName}`}
//               style={{
//                 width: '200px',
//                 height: '250px',
//                 marginBottom: '5px',
//                 marginLeft: '30px',
//                 borderRadius: '5%',
//                 objectFit: 'cover',
//               }}
//             />
//             <p><strong>ID:</strong> {user.id}</p>
//             <p><strong>Position:</strong> {user.position}</p>
//             <p><strong>Department:</strong> {user.department}</p>
//             <p><strong>Date of Hire:</strong> {new Date(user.dateOfHire).toLocaleDateString()}</p>
//             <p><strong>Salary:</strong> ₹ {user.salary.toLocaleString()}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewUser;











// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const ViewUser = () => {
//   const { id } = useParams();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [viewMode, setViewMode] = useState('normal'); // State for view mode

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4200/user/${id}`);
//         setUser(response.data);
//       } catch (error) {
//         console.error('Error fetching user:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, [id]);

//   if (loading) return <p>Loading user details...</p>;
//   if (!user) return <p>User not found.</p>;

//   const toggleViewMode = () => {
//     setViewMode(viewMode === 'normal' ? 'card' : 'normal'); // Toggle between normal and card view
//   };

//   return (
//     <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'left', position: 'relative' }}>
//       {/* Toggle Switch */}
//       <label style={{
//         position: 'absolute',
//         top: '20px',
//         right: '20px',
//         display: 'flex',
//         alignItems: 'center',
//         cursor: 'pointer'
//       }}>
//         <input
//           type="checkbox"
//           checked={viewMode === 'card'}
//           onChange={toggleViewMode}
//           style={{ display: 'none' }} // Hide the default checkbox
//         />
//         <span
//           style={{
//             width: '40px',
//             height: '20px',
//             backgroundColor: viewMode === 'card' ? '#007bff' : '#ddd',
//             borderRadius: '20px',
//             position: 'relative',
//             transition: 'background-color 0.2s ease',
//           }}
//         >
//           <span
//             style={{
//               content: '',
//               width: '18px',
//               height: '18px',
//               backgroundColor: '#fff',
//               borderRadius: '50%',
//               position: 'absolute',
//               top: '1px',
//               left: viewMode === 'card' ? '20px' : '2px',
//               transition: 'left 0.2s ease',
//             }}
//           />
//         </span>
//       </label>

//       {/* User Details */}
//       {viewMode === 'normal' ? (
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '50px', }}>
//           <img
//             src={user.profilePicture}
//             alt={`${user.fullName}'s Profile`}
//             style={{
//               width: '250px',
//               height: '250px',
//               margin: '100px',
//               borderRadius: '8%',
//               objectFit: 'cover',
//             }}
//           />
//           <div>
//             <h2>User Details</h2>
//             <p><strong>ID:</strong> {user.id}</p>
//             <p><strong>Full Name:</strong> {user.fullName}</p>
//             <p><strong>Email:</strong> {user.email}</p>
//             <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
//             <p><strong>Department:</strong> {user.department}</p>
//             <p><strong>Position:</strong> {user.position}</p>
//             <p><strong>Date of Birth:</strong> {new Date(user.dateOfBirth).toLocaleDateString()}</p>
//             <p><strong>Date of Hire:</strong> {new Date(user.dateOfHire).toLocaleDateString()}</p>
//             <p><strong>Salary:</strong> ₹ {user.salary.toLocaleString()}</p>
//             <p><strong>Address:</strong> {user.address}</p>
//           </div>
//         </div>
//       ) : (
//         // Card View
//         <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '50px' }}>
//           <div
//             style={{
//               flex: '0 0 300px', // Fixed width for cards, can be adjusted for responsiveness
//               padding: '20px',
//               border: '1px solid #ddd',
//               borderRadius: '8px',
//               boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//             }}
//           >
//             <h3>Card 1: Basic Information</h3>
//             <img
//               src={user.profilePicture}
//               alt={`Basic Info of ${user.fullName}`}
//               style={{
//                 width: '100%',
//                 height: '150px',
//                 marginBottom: '10px',
//                 borderRadius: '5%',
//                 objectFit: 'cover',
//               }}
//             />
//             <p><strong>Full Name:</strong> {user.fullName}</p>
//             <p><strong>Email:</strong> {user.email}</p>
//             <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
//             <p><strong>Address:</strong> {user.address}</p>
//           </div>
//           <div
//             style={{
//               flex: '0 0 300px',
//               padding: '20px',
//               border: '1px solid #ddd',
//               borderRadius: '8px',
//               boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//             }}
//           >
//             <h3>Card 2: Employment Details</h3>
//             <img
//               src={user.profilePicture}
//               alt={`Employment Info of ${user.fullName}`}
//               style={{
//                 width: '100%',
//                 height: '150px',
//                 marginBottom: '10px',
//                 borderRadius: '5%',
//                 objectFit: 'cover',
//               }}
//             />
//             <p><strong>ID:</strong> {user.id}</p>
//             <p><strong>Position:</strong> {user.position}</p>
//             <p><strong>Department:</strong> {user.department}</p>
//             <p><strong>Date of Hire:</strong> {new Date(user.dateOfHire).toLocaleDateString()}</p>
//             <p><strong>Salary:</strong> ₹ {user.salary.toLocaleString()}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewUser;


















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const ViewUser = () => {
//   const { id } = useParams();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [viewMode, setViewMode] = useState('normal'); // State for view mode

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4200/user/${id}`);
//         setUser(response.data);
//       } catch (error) {
//         console.error('Error fetching user:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, [id]);

//   if (loading) return <p>Loading user details...</p>;
//   if (!user) return <p>User not found.</p>;

//   const toggleViewMode = () => {
//     setViewMode(viewMode === 'normal' ? 'card' : 'normal'); // Toggle between normal and card view
//   };

//   return (
//     <div style={{ maxWidth: '900px', margin: '0 auto',width: '100vw', maxWidth: '90%' ,textAlign: 'left', position: 'relative' }}>
//       {/* New Toggle Switch */}
//       <label style={{
//         position: 'absolute',
//         top: '20px',
//         right: '20px',
//         display: 'flex',
//         alignItems: 'center',
//         cursor: 'pointer'
//       }}>
//         <input
//           type="checkbox"
//           checked={viewMode === 'card'}
//           onChange={toggleViewMode}
//           style={{ display: 'none' }} // Hide the default checkbox
//         />
//         <span
//           style={{
//             width: '40px',
//             height: '20px',
//             backgroundColor: viewMode === 'card' ? '#007bff' : '#ddd',
//             borderRadius: '20px',
//             position: 'relative',
//             transition: 'background-color 0.2s ease',
//           }}
//         >
//           <span
//             style={{
//               content: '',
//               width: '18px',
//               height: '18px',
//               backgroundColor: '#fff',
//               borderRadius: '50%',
//               position: 'absolute',
//               top: '1px',
//               left: viewMode === 'card' ? '20px' : '2px',
//               transition: 'left 0.2s ease',
//             }}
//           />
//         </span>
//       </label>

//       {/* User Details with Border */}
//       <div style={{
//         border: `2px solid #4a90e2`, // Border color
//         borderRadius: '8px',
//         padding: '20px',
//         marginTop: '70px', // Added margin for spacing from toggle button
//       }}>
//         <h2>User Details</h2>
//         <p><strong>ID:</strong> {user.id}</p>
//         <p><strong>Full Name:</strong> {user.fullName}</p>
//         <p><strong>Email:</strong> {user.email}</p>
//         <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
//         <p><strong>Department:</strong> {user.department}</p>
//         <p><strong>Position:</strong> {user.position}</p>
//         <p><strong>Date of Birth:</strong> {new Date(user.dateOfBirth).toLocaleDateString()}</p>
//         <p><strong>Date of Hire:</strong> {new Date(user.dateOfHire).toLocaleDateString()}</p>
//         <p><strong>Salary:</strong> ₹ {user.salary.toLocaleString()}</p>
//         <p><strong>Address:</strong> {user.address}</p>
//       </div>
//     </div>
//   );
// };

// export default ViewUser;



























// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const ViewUser = () => {
//   const { id } = useParams();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [viewMode, setViewMode] = useState('normal'); // State for view mode

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4200/user/${id}`);
//         setUser(response.data);
//       } catch (error) {
//         console.error('Error fetching user:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, [id]);

//   if (loading) return <p>Loading user details...</p>;
//   if (!user) return <p>User not found.</p>;

//   const toggleViewMode = () => {
//     setViewMode(viewMode === 'normal' ? 'card' : 'normal'); // Toggle between normal and card view
//   };

//   return (
//     <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'left', position: 'relative' }}>
//       {/* Toggle Switch */}
//       <label style={{
//         position: 'absolute',
//         top: '20px',
//         right: '20px',
//         display: 'flex',
//         alignItems: 'center',
//         cursor: 'pointer'
//       }}>
//         <input
//           type="checkbox"
//           checked={viewMode === 'card'}
//           onChange={toggleViewMode}
//           style={{ display: 'none' }} // Hide the default checkbox
//         />
//         <span
//           style={{
//             width: '40px',
//             height: '20px',
//             backgroundColor: viewMode === 'card' ? '#007bff' : '#ddd',
//             borderRadius: '20px',
//             position: 'relative',
//             transition: 'background-color 0.2s ease',
//           }}
//         >
//           <span
//             style={{
//               content: '',
//               width: '18px',
//               height: '18px',
//               backgroundColor: '#fff',
//               borderRadius: '50%',
//               position: 'absolute',
//               top: '1px',
//               left: viewMode === 'card' ? '20px' : '2px',
//               transition: 'left 0.2s ease',
//             }}
//           />
//         </span>
//       </label>

//       {/* User Details */}
//       {viewMode === 'normal' ? (
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '50px' }}>
//           <img
//             src={user.profilePicture}
//             alt={`${user.fullName}'s Profile`}
//             style={{
//               width: '250px',
//               height: '250px',
//               margin: '100px',
//               borderRadius: '8%',
//               objectFit: 'cover',
//             }}
//           />
//           <div>
//             <h2>User Details</h2>
//             <p><strong>ID:</strong> {user.id}</p>
//             <p><strong>Full Name:</strong> {user.fullName}</p>
//             <p><strong>Email:</strong> {user.email}</p>
//             <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
//             <p><strong>Department:</strong> {user.department}</p>
//             <p><strong>Position:</strong> {user.position}</p>
//             <p><strong>Date of Birth:</strong> {new Date(user.dateOfBirth).toLocaleDateString()}</p>
//             <p><strong>Date of Hire:</strong> {new Date(user.dateOfHire).toLocaleDateString()}</p>
//             <p><strong>Salary:</strong> ₹ {user.salary.toLocaleString()}</p>
//             <p><strong>Address:</strong> {user.address}</p>
//           </div>
//         </div>
//       ) : (
//         // Card View
//         <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginLeft: '200px', gap: '100px' }}>
//           <div
//             style={{
//               flex: '0 0 300px', // Fixed width for cards, can be adjusted for responsiveness
//               padding: '20px',
//               border: '1px solid #ddd',
//               borderRadius: '8px',
//               boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//             }}
//           >
//             <h3>Card 1: Basic Information</h3>
//             <img
//               src={user.profilePicture}
//               alt={`Basic Info of ${user.fullName}`}
//               style={{
//                 width: '100%',
//                 height: '150px',
//                 marginBottom: '10px',
//                 borderRadius: '5%',
//                 objectFit: 'cover',
//               }}
//             />
//             <p><strong>Full Name:</strong> {user.fullName}</p>
//             <p><strong>Email:</strong> {user.email}</p>
//             <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
//             <p><strong>Address:</strong> {user.address}</p>
//           </div>
//           <div
//             style={{
//               flex: '0 0 300px',
//               padding: '20px',
//               border: '1px solid #ddd',
//               borderRadius: '8px',
//               boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//             }}
//           >
//             <h3>Card 2: Employment Details</h3>
//             <img
//               src={user.profilePicture}
//               alt={`Employment Info of ${user.fullName}`}
//               style={{
//                 width: '100%',
//                 height: '150px',
//                 marginBottom: '10px',
//                 borderRadius: '5%',
//                 objectFit: 'cover',
//               }}
//             />
//             <p><strong>Employee ID:{user.id}</strong>   </p>
//             <p><strong>Position:</strong> {user.position}</p>
//             <p><strong>Department:</strong> {user.department}</p>
//             <p><strong>Date of Hire:</strong> {new Date(user.dateOfHire).toLocaleDateString()}</p>
//             <p><strong>Salary: ₹{user.salary.toLocaleString()} </strong>  </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewUser;

