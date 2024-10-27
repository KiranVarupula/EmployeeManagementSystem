import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UserForm.css'; 

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: '',
    profilePicture: '',
    dateOfBirth: '',
    email: '',
    phoneNumber: '',
    department: '',
    position: '',
    dateOfHire: '',
    salary: '',
    address: '',
    gender: '',
    temporaryAddress: ''
  });
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageUploadError, setImageUploadError] = useState('');
  const [sameAddress, setSameAddress] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [imageLoadError, setImageLoadError] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:4200/user/${id}`);
          setUser(response.data);
          setImagePreview(response.data.profilePicture);
        }
      } catch (error) {
        setError('Error fetching user data.');
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    if (name === 'profilePicture') {
      setImagePreview(value);
      setImageUploadError('');
      setImageLoadError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    for (const key in user) {
      formData.append(key, user[key]);
    }
  
    try {
      if (id) {
        await axios.put(`http://localhost:4200/user/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        await axios.post('http://localhost:4200/user', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      setSuccessMessage('Details added successfully!');
      setUser({
        fullName: '',
        profilePicture: '',
        dateOfBirth: '',
        email: '',
        phoneNumber: '',
        department: '',
        position: '',
        dateOfHire: '',
        salary: '',
        address: '',
        gender: '',
        temporaryAddress: ''
      });
      setImagePreview('');
      setSameAddress(false);
      setTimeout(() => navigate('/users'), 2000);
    } catch (error) {
      setError('Error submitting the form. Please try again.');
      console.error("Error submitting the form:", error);
    }
  };
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setUser({ ...user, profilePicture: reader.result });
        setImageUploadError('');
        setImageLoadError(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddressCheckboxChange = (e) => {
    setSameAddress(e.target.checked);
    if (e.target.checked) {
      setUser({ ...user, temporaryAddress: user.address });
    } else {
      setUser({ ...user, temporaryAddress: '' });
    }
  };

  const handleImageError = () => {
    setImageLoadError(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', fontFamily: 'Arial, sans-serif', height: '100vh' }}>
      <div style={{ flex: 1, maxWidth: '50%', padding: '20px',marginTop:'100px' }}>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Profile Preview"
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            onError={handleImageError}
          />
        )}
        {imageLoadError && <p style={{ color: 'red' }}>Preview image is not coming.</p>}
      </div>
      <div style={{ flex: 1, maxWidth: '50%', maxHeight: '400%', padding: '20px', border: '0px solid #ccc', borderRadius: '8px' }}>
        <h2>{id ? 'Edit User' : 'Add User'}</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', margin: '10px 0' }}>
            Full Name:
            <input type="text" name="fullName" value={user.fullName} onChange={handleChange} placeholder="Full Name" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </label>

          <label style={{ display: 'block', margin: '10px 0' }}>
            Profile Picture (URL):
            <input type="text" name="profilePicture" value={user.profilePicture} onChange={handleChange} placeholder="Profile Picture URL" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
            {/* <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginTop: '5px' }} /> */}
          </label>

          <label style={{ display: 'block', margin: '10px 0' }}>
            Date of Birth:
            <input type="date" name="dateOfBirth" value={user.dateOfBirth} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </label>

          <label style={{ display: 'block', margin: '10px 0' }}>
            Email:
            <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </label>

          <label style={{ display: 'block', margin: '10px 0' }}>
            Phone Number:
            <input type="text" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} placeholder="Phone Number" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </label>

          <label style={{ display: 'block', margin: '10px 0' }}>
            Gender:
            <select name="gender" value={user.gender} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label style={{ display: 'block', margin: '10px 0' }}>
            Department:
            <input type="text" name="department" value={user.department} onChange={handleChange} placeholder="Department" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </label>

          <label style={{ display: 'block', margin: '10px 0' }}>
            Position:
            <input type="text" name="position" value={user.position} onChange={handleChange} placeholder="Position" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </label>

          <label style={{ display: 'block', margin: '10px 0' }}>
            Date of Hire:
            <input type="date" name="dateOfHire" value={user.dateOfHire} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </label>

          <label style={{ display: 'block', margin: '10px 0' }}>
            Salary:
            <input type="number" name="salary" value={user.salary} onChange={handleChange} placeholder="Salary" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </label>

          <label style={{ display: 'block', margin: '10px 0' }}>
            Permanent Address:
            <input type="text" name="address" value={user.address} onChange={handleChange} placeholder="Address" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </label>

          <label style={{ display: 'block', margin: '10px 0' }}>
            Temporary Address:
            <input type="text" name="temporaryAddress" value={sameAddress ? user.address : user.temporaryAddress} onChange={handleChange} placeholder="Temporary Address" disabled={sameAddress} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
            <input type="checkbox" checked={sameAddress} onChange={handleAddressCheckboxChange} style={{ marginTop: '10px' }} />
            <span style={{ marginLeft: '5px' }}>Same as Address</span>
          </label>

          <button type="submit" style={{ marginTop: '20px', padding: '10px 15px', backgroundColor: '#007BFF', color: '#FFF', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            {id ? 'Update User' : 'Add User'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;








// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const UserForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     fullName: '',
//     profilePicture: '',
//     dateOfBirth: '',
//     email: '',
//     phoneNumber: '',
//     department: '',
//     position: '',
//     dateOfHire: '',
//     salary: '',
//     address: '',
//     gender: '',
//     temporaryAddress: ''
//   });
//   const [imagePreview, setImagePreview] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [imageUploadError, setImageUploadError] = useState('');
//   const [sameAddress, setSameAddress] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [imageLoadError, setImageLoadError] = useState(false); // State to track image loading error

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         if (id) {
//           const response = await axios.get(`http://localhost:4200/user/${id}`);
//           setUser(response.data);
//           setImagePreview(response.data.profilePicture);
//         }
//       } catch (error) {
//         setError('Error fetching user data.');
//         console.error("Error fetching user data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });

//     if (name === 'profilePicture') {
//       setImagePreview(value);
//       setImageUploadError('');
//       setImageLoadError(false); // Reset the image load error state
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (id) {
//         await axios.put(`http://localhost:4200/user/${id}`, user);
//       } else {
//         await axios.post('http://localhost:4200/user', user);
//       }
//       setSuccessMessage('Details added successfully!');
//       setUser({
//         fullName: '',
//         profilePicture: '',
//         dateOfBirth: '',
//         email: '',
//         phoneNumber: '',
//         department: '',
//         position: '',
//         dateOfHire: '',
//         salary: '',
//         address: '',
//         gender: '',
//         temporaryAddress: ''
//       });
//       setImagePreview('');
//       setSameAddress(false);
//       setTimeout(() => navigate('/users'), 2000);
//     } catch (error) {
//       setError('Error submitting the form. Please try again.');
//       console.error("Error submitting the form:", error);
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//         setUser({ ...user, profilePicture: reader.result });
//         setImageUploadError('');
//         setImageLoadError(false); // Reset image load error state
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleAddressCheckboxChange = (e) => {
//     setSameAddress(e.target.checked);
//     if (e.target.checked) {
//       setUser({ ...user, temporaryAddress: user.address });
//     } else {
//       setUser({ ...user, temporaryAddress: '' });
//     }
//   };

//   const handleImageError = () => {
//     setImageLoadError(true); // Set the error state to true if the image fails to load
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//       {/* Preview Section */}
//       <div className="lg:w-1/2 w-full lg:mr-6 mb-10">
//         <div className="relative h-full rounded-lg overflow-hidden">
//           <img
//             src={imagePreview || 'https://via.placeholder.com/400'} // Placeholder if no image
//             alt="Profile Preview"
//             className="w-full h-full object-cover"
//             onError={handleImageError}
//           />
//           {imageLoadError && <p className="text-red-500">Preview image is not coming.</p>}
//           <div className="bg-white p-6 rounded-lg shadow-md absolute bottom-0 left-0 right-0">
//             <h1 className="text-xl font-bold">{user.fullName || 'User Name'}</h1>
//             <p>Email: {user.email || 'example@example.com'}</p>
//             <p>Phone: {user.phoneNumber || '000-000-0000'}</p>
//             <p>Department: {user.department || 'Department'}</p>
//             <p>Position: {user.position || 'Position'}</p>
//           </div>
//         </div>
//       </div>

//       {/* Form Section */}
//       <div className="lg:w-1/2 w-full">
//         <h2 className="text-2xl font-bold text-center mb-4">{id ? 'Edit User' : 'Add User'}</h2>
//         {error && <p className="text-red-500">{error}</p>}
//         {imageUploadError && <p className="text-red-500">{imageUploadError}</p>}
//         {successMessage && <p className="text-green-500">{successMessage}</p>}
//         <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
//           {/* Full Name */}
//           <label className="block mb-4">
//             <span>Full Name:</span>
//             <input type="text" name="fullName" value={user.fullName} onChange={handleChange} placeholder="Full Name" required className="mt-2 block w-full p-2 border border-gray-300 rounded" />
//           </label>

//           {/* Profile Picture */}
//           <label className="block mb-4">
//             <span>Profile Picture (URL):</span>
//             <input type="text" name="profilePicture" value={user.profilePicture} onChange={handleChange} placeholder="Profile Picture URL" className="mt-2 block w-full p-2 border border-gray-300 rounded" />
//             <input type="file" accept="image/*" onChange={handleFileChange} className="mt-2" />
//           </label>

//           {/* Date of Birth */}
//           <label className="block mb-4">
//             <span>Date of Birth:</span>
//             <input type="date" name="dateOfBirth" value={user.dateOfBirth} onChange={handleChange} className="mt-2 block w-full p-2 border border-gray-300 rounded" />
//           </label>

//           {/* Email */}
//           <label className="block mb-4">
//             <span>Email:</span>
//             <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required className="mt-2 block w-full p-2 border border-gray-300 rounded" />
//           </label>

//           {/* Phone Number */}
//           <label className="block mb-4">
//             <span>Phone Number:</span>
//             <input type="text" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} placeholder="Phone Number" className="mt-2 block w-full p-2 border border-gray-300 rounded" />
//           </label>

//           {/* Gender */}
//           <label className="block mb-4">
//             <span>Gender:</span>
//             <select name="gender" value={user.gender} onChange={handleChange} className="mt-2 block w-full p-2 border border-gray-300 rounded">
//               <option value="">Select Gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//           </label>

//           {/* Department */}
//           <label className="block mb-4">
//             <span>Department:</span>
//             <input type="text" name="department" value={user.department} onChange={handleChange} placeholder="Department" className="mt-2 block w-full p-2 border border-gray-300 rounded" />
//           </label>

//           {/* Position */}
//           <label className="block mb-4">
//             <span>Position:</span>
//             <input type="text" name="position" value={user.position} onChange={handleChange} placeholder="Position" className="mt-2 block w-full p-2 border border-gray-300 rounded" />
//           </label>

//           {/* Date of Hire */}
//           <label className="block mb-4">
//             <span>Date of Hire:</span>
//             <input type="date" name="dateOfHire" value={user.dateOfHire} onChange={handleChange} className="mt-2 block w-full p-2 border border-gray-300 rounded" />
//           </label>

//           {/* Salary */}
//           <label className="block mb-4">
//             <span>Salary:</span>
//             <input type="number" name="salary" value={user.salary} onChange={handleChange} placeholder="Salary" className="mt-2 block w-full p-2 border border-gray-300 rounded" />
//           </label>

//           {/* Address */}
//           <label className="block mb-4">
//             <span>Address:</span>
//             <input type="text" name="address" value={user.address} onChange={handleChange} placeholder="Address" className="mt-2 block w-full p-2 border border-gray-300 rounded" />
//           </label>

//           {/* Temporary Address */}
//           <label className="block mb-4">
//             <input type="checkbox" checked={sameAddress} onChange={handleAddressCheckboxChange} />
//             <span className="ml-2">Same as Address</span>
//           </label>
//           <label className="block mb-4">
//             <span>Temporary Address:</span>
//             <input type="text" name="temporaryAddress" value={sameAddress ? user.address : user.temporaryAddress} onChange={handleChange} placeholder="Temporary Address" disabled={sameAddress} className="mt-2 block w-full p-2 border border-gray-300 rounded" />
//           </label>

//           {/* Submit Button */}
//           <button type="submit" className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600 transition duration-300">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UserForm;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const UserForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     fullName: '',
//     profilePicture: '',
//     dateOfBirth: '',
//     email: '',
//     phoneNumber: '',
//     department: '',
//     position: '',
//     dateOfHire: '',
//     salary: '',
//     address: '',
//     gender: '',
//     temporaryAddress: ''
//   });
//   const [imagePreview, setImagePreview] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [imageUploadError, setImageUploadError] = useState('');
//   const [sameAddress, setSameAddress] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [imageLoadError, setImageLoadError] = useState(false); // State to track image loading error

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         if (id) {
//           const response = await axios.get(`http://localhost:4200/user/${id}`);
//           setUser(response.data);
//           setImagePreview(response.data.profilePicture);
//         }
//       } catch (error) {
//         setError('Error fetching user data.');
//         console.error("Error fetching user data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });

//     if (name === 'profilePicture') {
//       setImagePreview(value);
//       setImageUploadError('');
//       setImageLoadError(false); // Reset the image load error state
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (id) {
//         await axios.put(`http://localhost:4200/user/${id}`, user);
//       } else {
//         await axios.post('http://localhost:4200/user', user);
//       }
//       setSuccessMessage('Details added successfully!');
//       setUser({
//         fullName: '',
//         profilePicture: '',
//         dateOfBirth: '',
//         email: '',
//         phoneNumber: '',
//         department: '',
//         position: '',
//         dateOfHire: '',
//         salary: '',
//         address: '',
//         gender: '',
//         temporaryAddress: ''
//       });
//       setImagePreview('');
//       setSameAddress(false);
//       setTimeout(() => navigate('/users'), 2000);
//     } catch (error) {
//       setError('Error submitting the form. Please try again.');
//       console.error("Error submitting the form:", error);
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//         setUser({ ...user, profilePicture: reader.result });
//         setImageUploadError('');
//         setImageLoadError(false); // Reset image load error state
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleAddressCheckboxChange = (e) => {
//     setSameAddress(e.target.checked);
//     if (e.target.checked) {
//       setUser({ ...user, temporaryAddress: user.address });
//     } else {
//       setUser({ ...user, temporaryAddress: '' });
//     }
//   };

//   const handleImageError = () => {
//     setImageLoadError(true); // Set the error state to true if the image fails to load
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h2>{id ? 'Edit User' : 'Add User'}</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
//       {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
//       <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Full Name:
//           <input type="text" name="fullName" value={user.fullName} onChange={handleChange} placeholder="Full Name" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Profile Picture (URL):
//           <input type="text" name="profilePicture" value={user.profilePicture} onChange={handleChange} placeholder="Profile Picture URL" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//           <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginTop: '5px' }} />
//           {imagePreview && (
//             <div style={{ margin: '10px 0' }}>
//               <img
//                 src={imagePreview}
//                 alt="Profile Preview"
//                 style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
//                 onError={handleImageError} // Handle image load error
//               />
//               {imageLoadError && <p style={{ color: 'red' }}>Preview image is not coming.</p>} {/* Error message */}
//             </div>
//           )}
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Date of Birth:
//           <input type="date" name="dateOfBirth" value={user.dateOfBirth} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Email:
//           <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Phone Number:
//           <input type="text" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} placeholder="Phone Number" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Gender:
//           <select name="gender" value={user.gender} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
//             <option value="">Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Department:
//           <input type="text" name="department" value={user.department} onChange={handleChange} placeholder="Department" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Position:
//           <input type="text" name="position" value={user.position} onChange={handleChange} placeholder="Position" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Date of Hire:
//           <input type="date" name="dateOfHire" value={user.dateOfHire} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Salary:
//           <input type="number" name="salary" value={user.salary} onChange={handleChange} placeholder="Salary" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Address:
//           <input type="text" name="address" value={user.address} onChange={handleChange} placeholder="Address" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Temporary Address:
//           <input type="text" name="temporaryAddress" value={sameAddress ? user.address : user.temporaryAddress} onChange={handleChange} placeholder="Temporary Address" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//           <input type="checkbox" checked={sameAddress} onChange={handleAddressCheckboxChange} style={{ marginTop: '10px' }} />
//           <span style={{ marginLeft: '5px' }}>Temporary Addrees Same as Address</span>
//         </label>

//         <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
//           {id ? 'Update User' : 'Add User'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UserForm;
















































































// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const UserForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     fullName: '',
//     profilePicture: '',
//     dateOfBirth: '',
//     email: '',
//     phoneNumber: '',
//     department: '',
//     position: '',
//     dateOfHire: '',
//     salary: '',
//     address: '',
//     gender: '',
//     temporaryAddress: ''
//   });
//   const [imagePreview, setImagePreview] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [imageUploadError, setImageUploadError] = useState('');
//   const [sameAddress, setSameAddress] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         if (id) {
//           const response = await axios.get(`http://localhost:4200/user/${id}`);
//           setUser(response.data);
//           setImagePreview(response.data.profilePicture); // Ensure this URL is valid
//         }
//       } catch (error) {
//         setError('Error fetching user data.');
//         console.error("Error fetching user data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });

//     if (name === 'profilePicture') {
//       setImagePreview(value); // Set preview if a URL is entered
//       setImageUploadError('');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); 

//     try {
//       if (id) {
//         await axios.put(`http://localhost:4200/user/${id}`, user);
//       } else {
//         await axios.post('http://localhost:4200/user', user);
//       }
//       setSuccessMessage('Details added successfully!'); 
//       setUser({
//         fullName: '',
//         profilePicture: '',
//         dateOfBirth: '',
//         email: '',
//         phoneNumber: '',
//         department: '',
//         position: '',
//         dateOfHire: '',
//         salary: '',
//         address: '',
//         gender: '',
//         temporaryAddress: ''
//       });
//       setImagePreview('');
//       setSameAddress(false);
//       setTimeout(() => navigate('/users'), 2000);
//     } catch (error) {
//       setError('Error submitting the form. Please try again.');
//       console.error("Error submitting the form:", error);
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result); // Set preview to the file's result
//         setUser({ ...user, profilePicture: reader.result }); // Set profile picture to the Base64 string
//         setImageUploadError('');
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleAddressCheckboxChange = (e) => {
//     setSameAddress(e.target.checked);
//     if (e.target.checked) {
//       setUser({ ...user, temporaryAddress: user.address });
//     } else {
//       setUser({ ...user, temporaryAddress: '' });
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h2>{id ? 'Edit User' : 'Add User'}</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
//       {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} 
//       <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Full Name:
//           <input type="text" name="fullName" value={user.fullName} onChange={handleChange} placeholder="Full Name" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Profile Picture (URL):
//           <input type="text" name="profilePicture" value={user.profilePicture} onChange={handleChange} placeholder="Profile Picture URL" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//           <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginTop: '5px' }} />
//           {imagePreview && (
//             <div style={{ margin: '10px 0' }}>
//               <img src={imagePreview} alt="Profile Preview" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
//             </div>
//           )}
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Date of Birth:
//           <input type="date" name="dateOfBirth" value={user.dateOfBirth} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Email:
//           <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Phone Number:
//           <input type="text" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} placeholder="Phone Number" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Gender:
//           <select name="gender" value={user.gender} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
//             <option value="">Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Department:
//           <input type="text" name="department" value={user.department} onChange={handleChange} placeholder="Department" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Position:
//           <input type="text" name="position" value={user.position} onChange={handleChange} placeholder="Position" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Date of Hire:
//           <input type="date" name="dateOfHire" value={user.dateOfHire} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Salary:
//           <input type="number" name="salary" value={user.salary} onChange={handleChange} placeholder="Salary" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Address:
//           <input type="text" name="address" value={user.address} onChange={handleChange} placeholder="Address" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Temporary Address:
//           <input type="text" name="temporaryAddress" value={user.temporaryAddress} onChange={handleChange} placeholder="Temporary Address" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label>
//           <input type="checkbox" checked={sameAddress} onChange={handleAddressCheckboxChange} />
//           Same as Address
//         </label>

//         <button type="submit" style={{ marginTop: '20px', padding: '10px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
//           {id ? 'Update User' : 'Add User'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UserForm;






















































// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const UserForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     fullName: '',
//     profilePicture: '',
//     dateOfBirth: '',
//     email: '',
//     phoneNumber: '',
//     department: '',
//     position: '',
//     dateOfHire: '',
//     salary: '',
//     address: '',
//     gender: '',
//     temporaryAddress: ''
//   });
//   const [imagePreview, setImagePreview] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [imageUploadError, setImageUploadError] = useState('');
//   const [sameAddress, setSameAddress] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         if (id) {
//           const response = await axios.get(`http://localhost:4200/user/${id}`);
//           setUser(response.data);
//           setImagePreview(response.data.profilePicture);
//         }
//       } catch (error) {
//         setError('Error fetching user data.');
//         console.error("Error fetching user data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });

//     if (name === 'profilePicture') {
//       setImagePreview(value);
//       setImageUploadError('');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); 

//     try {
//       if (id) {
//         await axios.put(`http://localhost:4200/user/${id}`, user);
//       } else {
//         await axios.post('http://localhost:4200/user', user);
//       }
//       setSuccessMessage('Details added successfully!'); 
//       setUser({
//         fullName: '',
//         profilePicture: '',
//         dateOfBirth: '',
//         email: '',
//         phoneNumber: '',
//         department: '',
//         position: '',
//         dateOfHire: '',
//         salary: '',
//         address: '',
//         gender: '',
//         temporaryAddress: ''
//       });
//       setImagePreview('');
//       setSameAddress(false);
//       setTimeout(() => navigate('/users'), 2000);
//     } catch (error) {
//       setError('Error submitting the form. Please try again.');
//       console.error("Error submitting the form:", error);
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//         setUser({ ...user, profilePicture: reader.result });
//         setImageUploadError('');
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleAddressCheckboxChange = (e) => {
//     setSameAddress(e.target.checked);
//     if (e.target.checked) {
//       setUser({ ...user, temporaryAddress: user.address });
//     } else {
//       setUser({ ...user, temporaryAddress: '' });
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h2>{id ? 'Edit User' : 'Add User'}</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
//       {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} 
//       <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Full Name:
//           <input type="text" name="fullName" value={user.fullName} onChange={handleChange} placeholder="Full Name" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Profile Picture (URL):
//           <input type="text" name="profilePicture" value={user.profilePicture} onChange={handleChange} placeholder="Profile Picture URL" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//           <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginTop: '5px' }} />
//           {imagePreview && (
//             <div style={{ margin: '10px 0' }}>
//               <img src={imagePreview} alt="Profile Preview" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
//             </div>
//           )}
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Date of Birth:
//           <input type="date" name="dateOfBirth" value={user.dateOfBirth} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Email:
//           <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Phone Number:
//           <input type="text" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} placeholder="Phone Number" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Gender:
//           <select name="gender" value={user.gender} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
//             <option value="">Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Department:
//           <input type="text" name="department" value={user.department} onChange={handleChange} placeholder="Department" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Position:
//           <input type="text" name="position" value={user.position} onChange={handleChange} placeholder="Position" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Date of Hire:
//           <input type="date" name="dateOfHire" value={user.dateOfHire} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Salary:
//           <input type="number" name="salary" value={user.salary} onChange={handleChange} placeholder="Salary" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Address:
//           <input type="text" name="address" value={user.address} onChange={handleChange} placeholder="Address" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Temporary Address:
//           <input type="text" name="temporaryAddress" value={sameAddress ? user.address : user.temporaryAddress} onChange={handleChange} placeholder="Temporary Address" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//           <label>
//             <input type="checkbox" checked={sameAddress} onChange={handleAddressCheckboxChange} /> Same as Address
//           </label>
//         </label>

//         <button type="submit" style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
//           {id ? 'Update User' : 'Add User'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UserForm;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const UserForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     fullName: '',
//     profilePicture: '',
//     dateOfBirth: '',
//     email: '',
//     phoneNumber: '',
//     department: '',
//     position: '',
//     dateOfHire: '',
//     salary: '',
//     address: '',
//     gender: '',
//     temporaryAddress: ''
//   });
//   const [imagePreview, setImagePreview] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [imageUploadError, setImageUploadError] = useState(''); // New state for image upload errors
//   const [sameAddress, setSameAddress] = useState(false);
//   const [successMessage, setSuccessMessage] = useState(''); // New state for success message

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         if (id) {
//           const response = await axios.get(`http://localhost:4200/user/${id}`);
//           setUser(response.data);
//           setImagePreview(response.data.profilePicture);
//         }
//       } catch (error) {
//         setError('Error fetching user data.');
//         console.error("Error fetching user data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
  
//     if (name === 'profilePicture') {
//       setImagePreview(value);
//       // Clear previous image upload error on change
//       setImageUploadError('');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); 

//     try {
//       if (id) {
//         await axios.put(`http://localhost:4200/user/${id}`, user);
//       } else {
//         await axios.post('http://localhost:4200/user', user);
//       }
//       setSuccessMessage('Details added successfully!'); // Set success message
//       // Clear input fields
//       setUser({
//         fullName: '',
//         profilePicture: '',
//         dateOfBirth: '',
//         email: '',
//         phoneNumber: '',
//         department: '',
//         position: '',
//         dateOfHire: '',
//         salary: '',
//         address: '',
//         gender: '',
//         temporaryAddress: ''
//       });
//       setImagePreview('');
//       setSameAddress(false);
//       // Navigate after a short delay (optional)
//       setTimeout(() => navigate('/users'), 2000);
//     } catch (error) {
//       setError('Error submitting the form. Please try again.');
//       console.error("Error submitting the form:", error);
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//         setUser({ ...user, profilePicture: reader.result });
//         setImageUploadError(''); // Clear any image upload error if file is uploaded
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleAddressCheckboxChange = (e) => {
//     setSameAddress(e.target.checked);
//     if (e.target.checked) {
//       setUser({ ...user, temporaryAddress: user.address }); // Copy permanent address to temporary
//     } else {
//       setUser({ ...user, temporaryAddress: '' }); // Clear temporary address
//     }
//   };

//   // Add a function to check image upload status
//   const checkImageUploadStatus = async () => {
//     try {
//       // Assuming the image upload is part of the user data submission,
//       // we can check the response here for errors.
//       const response = await axios.post('http://localhost:4200/user', user);
//       if (!response.data.success) {
//         setImageUploadError('Image upload failed. Please try again.');
//       }
//     } catch (error) {
//       setImageUploadError('Image upload failed. Please try again.');
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h2>{id ? 'Edit User' : 'Add User'}</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
//       {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Show success message */}
//       <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Full Name:
//           <input type="text" name="fullName" value={user.fullName} onChange={handleChange} placeholder="Full Name" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Profile Picture (URL):
//           <input type="text" name="profilePicture" value={user.profilePicture} onChange={handleChange} placeholder="Profile Picture URL" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//           {imagePreview && (
//             <div style={{ margin: '10px 0' }}>
//               <img src={imagePreview} alt="Profile Preview" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
//             </div>
//           )}
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Date of Birth:
//           <input type="date" name="dateOfBirth" value={user.dateOfBirth} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Email:
//           <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Phone Number:
//           <input type="text" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} placeholder="Phone Number" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Gender:
//           <select name="gender" value={user.gender} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
//             <option value="">Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Department:
//           <input type="text" name="department" value={user.department} onChange={handleChange} placeholder="Department" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Position:
//           <input type="text" name="position" value={user.position} onChange={handleChange} placeholder="Position" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Date of Hire:
//           <input type="date" name="dateOfHire" value={user.dateOfHire} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Salary:
//           <input type="number" name="salary" value={user.salary} onChange={handleChange} placeholder="Salary" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Address:
//           <input type="text" name="address" value={user.address} onChange={handleChange} placeholder="Address" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Temporary Address:
//           <input type="text" name="temporaryAddress" value={sameAddress ? user.address : user.temporaryAddress} onChange={handleChange} placeholder="Temporary Address" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//           <label>
//             <input type="checkbox" checked={sameAddress} onChange={handleAddressCheckboxChange} /> Same as Address
//           </label>
//         </label>

//         <button type="submit" style={{ marginTop: '20px', padding: '10px 15px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UserForm;






















































// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const UserForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     fullName: '',
//     profilePicture: '',
//     dateOfBirth: '',
//     email: '',
//     phoneNumber: '',
//     department: '',
//     position: '',
//     dateOfHire: '',
//     salary: '',
//     address: '',
//     gender: '',
//     temporaryAddress: ''
//   });
//   const [imagePreview, setImagePreview] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [imageUploadError, setImageUploadError] = useState(''); // New state for image upload errors
//   const [sameAddress, setSameAddress] = useState(false);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         if (id) {
//           const response = await axios.get(`http://localhost:4200/user/${id}`);
//           setUser(response.data);
//           setImagePreview(response.data.profilePicture);
//         }
//       } catch (error) {
//         setError('Error fetching user data.');
//         console.error("Error fetching user data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
  
//     if (name === 'profilePicture') {
//       setImagePreview(value);
//       // Clear previous image upload error on change
//       setImageUploadError('');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); 

//     try {
//       if (id) {
//         await axios.put(`http://localhost:4200/user/${id}`, user);
//       } else {
//         await axios.post('http://localhost:4200/user', user);
//       }
//       navigate('/users');
//     } catch (error) {
//       setError('Error submitting the form. Please try again.');
//       console.error("Error submitting the form:", error);
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//         setUser({ ...user, profilePicture: reader.result });
//         setImageUploadError(''); // Clear any image upload error if file is uploaded
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleAddressCheckboxChange = (e) => {
//     setSameAddress(e.target.checked);
//     if (e.target.checked) {
//       setUser({ ...user, temporaryAddress: user.address }); // Copy permanent address to temporary
//     } else {
//       setUser({ ...user, temporaryAddress: '' }); // Clear temporary address
//     }
//   };

//   // Add a function to check image upload status
//   const checkImageUploadStatus = async () => {
//     try {
//       // Assuming the image upload is part of the user data submission,
//       // we can check the response here for errors.
//       const response = await axios.post('http://localhost:4200/user', user);
//       if (!response.data.success) {
//         setImageUploadError('Image upload failed. Please try again.');
//       }
//     } catch (error) {
//       setImageUploadError('Image upload failed. Please try again.');
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h2>{id ? 'Edit User' : 'Add User'}</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>} {/* Show image upload error only if it exists */}
//       <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Full Name:
//           <input type="text" name="fullName" value={user.fullName} onChange={handleChange} placeholder="Full Name" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Profile Picture (URL):
//           <input type="text" name="profilePicture" value={user.profilePicture} onChange={handleChange} placeholder="Profile Picture URL" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//           {imagePreview && (
//             <div style={{ margin: '10px 0' }}>
//               <img src={imagePreview} alt="Profile Preview" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
//             </div>
//           )}
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Date of Birth:
//           <input type="date" name="dateOfBirth" value={user.dateOfBirth} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Email:
//           <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Phone Number:
//           <input type="text" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} placeholder="Phone Number" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Gender:
//           <select name="gender" value={user.gender} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
//             <option value="">Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Department:
//           <input type="text" name="department" value={user.department} onChange={handleChange} placeholder="Department" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Position:
//           <input type="text" name="position" value={user.position} onChange={handleChange} placeholder="Position" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Date of Hire:
//           <input type="date" name="dateOfHire" value={user.dateOfHire} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Salary:
//           <input type="number" name="salary" value={user.salary} onChange={handleChange} placeholder="Salary" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Permanent Address:
//           <input type="text" name="address" value={user.address} onChange={handleChange} placeholder="Address" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Temporary Address:
//           <input type="text" name="temporaryAddress" value={sameAddress ? user.address : user.temporaryAddress} onChange={handleChange} disabled={sameAddress} placeholder="Temporary Address" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label>
//           <input type="checkbox" checked={sameAddress} onChange={handleAddressCheckboxChange} />
//           Temporary address is the same as permanent address
//         </label>

//         <button type="submit" onClick={checkImageUploadStatus} style={{ width: '100%', padding: '10px', marginTop: '20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
//           {id ? 'Update User' : 'Add User'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UserForm;














// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const UserForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     fullName: '',
//     profilePicture: '',
//     dateOfBirth: '',
//     email: '',
//     phoneNumber: '',
//     department: '',
//     position: '',
//     dateOfHire: '',
//     salary: '',
//     address: '',
//     gender: '',
//     temporaryAddress: ''
//   });
//   const [imagePreview, setImagePreview] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [urlError, setUrlError] = useState('');
//   const [sameAddress, setSameAddress] = useState(false);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         if (id) {
//           const response = await axios.get(`http://localhost:4200/user/${id}`);
//           setUser(response.data);
//           setImagePreview(response.data.profilePicture);
//         }
//       } catch (error) {
//         setError('Error fetching user data.');
//         console.error("Error fetching user data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
  
//     if (name === 'profilePicture') {
//       setImagePreview(value);
//       // Clear previous URL error on change
//       setUrlError('');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); 

//     try {
//       if (id) {
//         await axios.put(`http://localhost:4200/user/${id}`, user);
//       } else {
//         await axios.post('http://localhost:4200/user', user);
//       }
//       navigate('/users');
//     } catch (error) {
//       setError('Error submitting the form. Please try again.');
//       console.error("Error submitting the form:", error);
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//         setUser({ ...user, profilePicture: reader.result });
//         setUrlError(''); // Clear any URL error if file is uploaded
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleAddressCheckboxChange = (e) => {
//     setSameAddress(e.target.checked);
//     if (e.target.checked) {
//       setUser({ ...user, temporaryAddress: user.address }); // Copy permanent address to temporary
//     } else {
//       setUser({ ...user, temporaryAddress: '' }); // Clear temporary address
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h2>{id ? 'Edit User' : 'Add User'}</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Full Name:
//           <input type="text" name="fullName" value={user.fullName} onChange={handleChange} placeholder="Full Name" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Profile Picture (URL):
//           <input type="text" name="profilePicture" value={user.profilePicture} onChange={handleChange} placeholder="Profile Picture URL" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//           {urlError && <p style={{ color: 'red', marginTop: '5px' }}>{urlError}</p>}
//           {imagePreview && (
//             <div style={{ margin: '10px 0' }}>
//               <img src={imagePreview} alt="Profile Preview" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
//             </div>
//           )}
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Date of Birth:
//           <input type="date" name="dateOfBirth" value={user.dateOfBirth} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Email:
//           <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Phone Number:
//           <input type="text" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} placeholder="Phone Number" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Gender:
//           <select name="gender" value={user.gender} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
//             <option value="">Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Department:
//           <input type="text" name="department" value={user.department} onChange={handleChange} placeholder="Department" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Position:
//           <input type="text" name="position" value={user.position} onChange={handleChange} placeholder="Position" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Date of Hire:
//           <input type="date" name="dateOfHire" value={user.dateOfHire} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Salary:
//           <input type="number" name="salary" value={user.salary} onChange={handleChange} placeholder="Salary" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Permanent Address:
//           <input type="text" name="address" value={user.address} onChange={handleChange} placeholder="Address" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Temporary Address:
//           <input type="text" name="temporaryAddress" value={sameAddress ? user.address : user.temporaryAddress} onChange={handleChange} disabled={sameAddress} placeholder="Temporary Address" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//           <label>
//             <input type="checkbox" checked={sameAddress} onChange={handleAddressCheckboxChange} /> Same as Permanent Address
//           </label>
//         </label>

//         <button type="submit" style={{ padding: '10px 15px', borderRadius: '5px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
//           {id ? 'Update User' : 'Add User'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UserForm;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const UserForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     fullName: '',
//     profilePicture: '',
//     dateOfBirth: '',
//     email: '',
//     phoneNumber: '',
//     department: '',
//     position: '',
//     dateOfHire: '',
//     salary: '',
//     address: '',
//     gender: '',
//     temporaryAddress: ''
//   });
//   const [imagePreview, setImagePreview] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [urlError, setUrlError] = useState('');
//   const [sameAddress, setSameAddress] = useState(false);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         if (id) {
//           const response = await axios.get(`http://localhost:4200/user/${id}`);
//           setUser(response.data);
//           setImagePreview(response.data.profilePicture);
//         }
//       } catch (error) {
//         setError('Error fetching user data.');
//         console.error("Error fetching user data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
  
//     if (name === 'profilePicture') {
//       setImagePreview(value);
  
//       // Validate the URL for the profile picture
//       const imagePattern = /\.(jpeg|jpg|gif|png|webp|svg)$/i;
//       const onlineUrlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/;
  
//       // Check the URL and set error message
//       if (imagePattern.test(value) || onlineUrlPattern.test(value)) {
//         setUrlError(''); // Clear any previous errors if the URL is valid
//       } else {
//         setUrlError('Please enter a valid image URL (ending with .jpg, .jpeg, .png, .gif, .webp, or .svg) or a valid online link.');
//       }
//     }
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate the profile picture URL again on submit
//     const imagePattern = /\.(jpeg|jpg|gif|png|webp|svg)$/i;
//     const onlineUrlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/;
  
//     if (!imagePattern.test(user.profilePicture) && !onlineUrlPattern.test(user.profilePicture)) {
//       setUrlError('Please enter a valid image URL before submitting.');
//       return; // Prevent submission if the URL is invalid
//     }
  
//     // Clear previous error messages
//     setError('');
//     setUrlError('');
  
//     try {
//       if (id) {
//         await axios.put(`http://localhost:4200/user/${id}`, user);
//       } else {
//         await axios.post('http://localhost:4200/user', user);
//       }
//       navigate('/users');
//     } catch (error) {
//       setError('Error submitting the form. Please try again.');
//       console.error("Error submitting the form:", error);
//     }
//   };
  

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//         setUser({ ...user, profilePicture: reader.result });
//         setUrlError(''); // Clear any URL error if file is uploaded
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleAddressCheckboxChange = (e) => {
//     setSameAddress(e.target.checked);
//     if (e.target.checked) {
//       setUser({ ...user, temporaryAddress: user.address }); // Copy permanent address to temporary
//     } else {
//       setUser({ ...user, temporaryAddress: '' }); // Clear temporary address
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h2>{id ? 'Edit User' : 'Add User'}</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Full Name:
//           <input type="text" name="fullName" value={user.fullName} onChange={handleChange} placeholder="Full Name" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Profile Picture (URL):
//           <input type="text" name="profilePicture" value={user.profilePicture} onChange={handleChange} placeholder="Profile Picture URL" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//           {urlError && <p style={{ color: 'red', marginTop: '5px' }}>{urlError}</p>}
//           {imagePreview && (
//             <div style={{ margin: '10px 0' }}>
//               <img src={imagePreview} alt="Profile Preview" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
//             </div>
//           )}
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Date of Birth:
//           <input type="date" name="dateOfBirth" value={user.dateOfBirth} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Email:
//           <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Phone Number:
//           <input type="text" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} placeholder="Phone Number" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Gender:
//           <select name="gender" value={user.gender} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
//             <option value="">Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Department:
//           <input type="text" name="department" value={user.department} onChange={handleChange} placeholder="Department" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Position:
//           <input type="text" name="position" value={user.position} onChange={handleChange} placeholder="Position" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Date of Hire:
//           <input type="date" name="dateOfHire" value={user.dateOfHire} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Salary:
//           <input type="number" name="salary" value={user.salary} onChange={handleChange} placeholder="Salary" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Permanent Address:
//           <input type="text" name="address" value={user.address} onChange={handleChange} placeholder="Address" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Temporary Address:
//           <input type="text" name="temporaryAddress" value={sameAddress ? user.address : user.temporaryAddress} onChange={handleChange} disabled={sameAddress} placeholder="Temporary Address" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//           <label>
//             <input type="checkbox" checked={sameAddress} onChange={handleAddressCheckboxChange} /> Same as Permanent Address
//           </label>
//         </label>

//         <button type="submit" style={{ width: '100%', padding: '10px', marginTop: '15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>
//           {id ? 'Update User' : 'Add User'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UserForm;
















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const UserForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     fullName: '',
//     profilePicture: '',
//     dateOfBirth: '',
//     email: '',
//     phoneNumber: '',
//     department: '',
//     position: '',
//     dateOfHire: '',
//     salary: '',
//     address: '',
//     gender: '',
//     temporaryAddress: ''
//   });
//   const [imagePreview, setImagePreview] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [urlError, setUrlError] = useState('');
//   const [sameAddress, setSameAddress] = useState(false);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         if (id) {
//           const response = await axios.get(`http://localhost:4200/user/${id}`);
//           setUser(response.data);
//           setImagePreview(response.data.profilePicture);
//         }
//       } catch (error) {
//         setError('Error fetching user data.');
//         console.error("Error fetching user data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });

//     if (name === 'profilePicture') {
//       setImagePreview(value);

//       // Validate the URL for profile picture
//       const imagePattern = /\.(jpeg|jpg|gif|png|webp|svg)$/;
//       const onlineUrlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/;

//       if (imagePattern.test(value) || onlineUrlPattern.test(value)) {
//         setUrlError(''); // Clear any previous errors if the URL is valid
//       } else {
//         setUrlError('Please enter a valid image URL (ending with .jpg, .jpeg, .png, .gif, .webp, or .svg) or a valid online link.');
//       }
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//         setUser({ ...user, profilePicture: reader.result });
//         setUrlError(''); // Clear any URL error if file is uploaded
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Check if the profile picture URL is valid before submitting
//     const imagePattern = /\.(jpeg|jpg|gif|png|webp|svg)$/;
//     const onlineUrlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/;

//     if (!imagePattern.test(user.profilePicture) && !onlineUrlPattern.test(user.profilePicture)) {
//       setUrlError('Please enter a valid image URL before submitting.');
//       return; // Prevent submission if the URL is invalid
//     }

//     try {
//       if (id) {
//         await axios.put(`http://localhost:4200/user/${id}`, user);
//       } else {
//         await axios.post('http://localhost:4200/user', user);
//       }
//       navigate('/users');
//     } catch (error) {
//       setError('Error submitting the form.');
//       console.error("Error submitting the form:", error);
//     }
//   };

//   const handleAddressCheckboxChange = (e) => {
//     setSameAddress(e.target.checked);
//     if (e.target.checked) {
//       setUser({ ...user, temporaryAddress: user.address }); // Copy permanent address to temporary
//     } else {
//       setUser({ ...user, temporaryAddress: '' }); // Clear temporary address
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h2>{id ? 'Edit User' : 'Add User'}</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Full Name:
//           <input type="text" name="fullName" value={user.fullName} onChange={handleChange} placeholder="Full Name" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Profile Picture (URL):
//           <input type="text" name="profilePicture" value={user.profilePicture} onChange={handleChange} placeholder="Profile Picture URL" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//           {urlError && <p style={{ color: 'red', marginTop: '5px' }}>{urlError}</p>}
//           {imagePreview && (
//             <div style={{ margin: '10px 0' }}>
//               <img src={imagePreview} alt="Profile Preview" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
//             </div>
//           )}
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Date of Birth:
//           <input type="date" name="dateOfBirth" value={user.dateOfBirth} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Email:
//           <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Phone Number:
//           <input type="text" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} placeholder="Phone Number" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Gender:
//           <select name="gender" value={user.gender} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
//             <option value="">Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Department:
//           <input type="text" name="department" value={user.department} onChange={handleChange} placeholder="Department" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Position:
//           <input type="text" name="position" value={user.position} onChange={handleChange} placeholder="Position" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Date of Hire:
//           <input type="date" name="dateOfHire" value={user.dateOfHire} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Salary:
//           <input type="number" name="salary" value={user.salary} onChange={handleChange} placeholder="Salary" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Permanent Address:
//           <input type="text" name="address" value={user.address} onChange={handleChange} placeholder="Address" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Temporary Address:
//           <input type="text" name="temporaryAddress" value={sameAddress ? user.address : user.temporaryAddress} onChange={handleChange} placeholder="Temporary Address" disabled={sameAddress} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//           <input type="checkbox" checked={sameAddress} onChange={handleAddressCheckboxChange} /> Same as Permanent Address
//         </label>

//         <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
//           {id ? 'Update User' : 'Add User'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UserForm;






// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const UserForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     fullName: '',
//     profilePicture: '',
//     dateOfBirth: '',
//     email: '',
//     phoneNumber: '',
//     department: '', 
//     position: '',
//     dateOfHire: '',
//     salary: '',
//     address: '',
//     gender: '',
//     temporaryAddress: ''
//   });
//   const [imagePreview, setImagePreview] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [urlError, setUrlError] = useState(''); // State to manage profile picture URL error
//   const [sameAddress, setSameAddress] = useState(false); // State for checkbox

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         if (id) {
//           const response = await axios.get(`http://localhost:4200/user/${id}`);
//           setUser(response.data);
//           setImagePreview(response.data.profilePicture);
//         }
//       } catch (error) {
//         setError('Error fetching user data.');
//         console.error("Error fetching user data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });

//     if (name === 'profilePicture') {
//       setImagePreview(value);

//       // Validate the URL
//       const imagePattern = /\.(jpeg|jpg|gif|png|webp|svg)$/;
//       if (!imagePattern.test(value)) {
//         setUrlError('Please enter a valid image URL ending with .jpeg, .jpg, .gif, .png, .webp, or .svg.');
//       } else {
//         setUrlError(''); // Clear error if the URL is valid
//       }
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//         setUser({ ...user, profilePicture: reader.result });
//         setUrlError(''); // Clear any URL error if file is uploaded
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Check if the profile picture URL is valid before submitting
//     const imagePattern = /\.(jpeg|jpg|gif|png|webp|svg)$/;
//     if (!imagePattern.test(user.profilePicture)) {
//       setUrlError('Please enter a valid image URL before submitting.');
//       return; // Prevent submission if the URL is invalid
//     }

//     try {
//       if (id) {
//         await axios.put(`http://localhost:4200/user/${id}`, user);
//       } else {
//         await axios.post('http://localhost:4200/user', user);
//       }
//       navigate('/users');
//     } catch (error) {
//       setError('Error submitting the form.');
//       console.error("Error submitting the form:", error);
//     }
//   };

//   const handleAddressCheckboxChange = (e) => {
//     setSameAddress(e.target.checked);
//     if (e.target.checked) {
//       setUser({ ...user, temporaryAddress: user.address }); // Copy permanent address to temporary
//     } else {
//       setUser({ ...user, temporaryAddress: '' }); // Clear temporary address
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h2>{id ? 'Edit User' : 'Add User'}</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Full Name:
//           <input type="text" name="fullName" value={user.fullName} onChange={handleChange} placeholder="Full Name" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Profile Picture (URL):
//           <input type="text" name="profilePicture" value={user.profilePicture} onChange={handleChange} placeholder="Profile Picture URL" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>
//         {urlError && <p style={{ color: 'red' }}>{urlError}</p>} {/* Display URL error message */}

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Upload Profile Picture:
//           <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginTop: '5px' }} />
//         </label>

//         {imagePreview && (
//           <div style={{ margin: '10px 0' }}>
//             <img src={imagePreview} alt="Profile Preview" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
//           </div>
//         )}

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Date of Birth:
//           <input type="date" name="dateOfBirth" value={user.dateOfBirth} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Email:
//           <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Phone Number:
//           <input type="text" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} placeholder="Phone Number" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Gender:
//           <select name="gender" value={user.gender} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
//             <option value="">Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Department:
//           <input type="text" name="department" value={user.department} onChange={handleChange} placeholder="Department" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Position:
//           <input type="text" name="position" value={user.position} onChange={handleChange} placeholder="Position" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Date of Hire:
//           <input type="date" name="dateOfHire" value={user.dateOfHire} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Salary:
//           <input type="number" name="salary" value={user.salary} onChange={handleChange} placeholder="Salary" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Permanent Address:
//           <input type="text" name="address" value={user.address} onChange={handleChange} placeholder="Address" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Temporary Address:
//           <input type="text" name="temporaryAddress" value={user.temporaryAddress} onChange={handleChange} placeholder="Temporary Address" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label>
//           <input type="checkbox" checked={sameAddress} onChange={handleAddressCheckboxChange} />
//           Same as Permanent Address
//         </label>

//         <button type="submit" style={{ padding: '10px 15px', marginTop: '20px', border: 'none', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff' }}>
//           {id ? 'Update User' : 'Add User'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UserForm;

























// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const UserForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     fullName: '',
//     profilePicture: '',
//     dateOfBirth: '',
//     email: '',
//     phoneNumber: '',
//     department: '',
//     position: '',
//     dateOfHire: '',
//     salary: '',
//     address: '',
//     gender: '',
//     temporaryAddress: ''
//   });
//   const [imagePreview, setImagePreview] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [urlError, setUrlError] = useState(''); // State to manage profile picture URL error
//   const [sameAddress, setSameAddress] = useState(false); // State for checkbox

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         if (id) {
//           const response = await axios.get(`http://localhost:4200/user/${id}`);
//           setUser(response.data);
//           setImagePreview(response.data.profilePicture);
//         }
//       } catch (error) {
//         setError('Error fetching user data.');
//         console.error("Error fetching user data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });

//     if (name === 'profilePicture') {
//       setImagePreview(value);

//       // Validate the URL
//       const imagePattern = /\.(jpeg|jpg|gif|png|webp|svg)$/;
//       if (!imagePattern.test(value)) {
//         setUrlError('Please enter a valid image URL.');
//       } else {
//         setUrlError('');
//       }
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//         setUser({ ...user, profilePicture: reader.result });
//         setUrlError(''); // Clear any URL error if file is uploaded
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (id) {
//         await axios.put(`http://localhost:4200/user/${id}`, user);
//       } else {
//         await axios.post('http://localhost:4200/user', user);
//       }
//       navigate('/users');
//     } catch (error) {
//       setError('Error submitting the form.');
//       console.error("Error submitting the form:", error);
//     }
//   };

//   const handleAddressCheckboxChange = (e) => {
//     setSameAddress(e.target.checked);
//     if (e.target.checked) {
//       setUser({ ...user, temporaryAddress: user.address }); // Copy permanent address to temporary
//     } else {
//       setUser({ ...user, temporaryAddress: '' }); // Clear temporary address
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h2>{id ? 'Edit User' : 'Add User'}</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Full Name:
//           <input type="text" name="fullName" value={user.fullName} onChange={handleChange} placeholder="Full Name" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Profile Picture (URL):
//           <input type="text" name="profilePicture" value={user.profilePicture} onChange={handleChange} placeholder="Profile Picture URL" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>
//         {urlError && <p style={{ color: 'red' }}>{urlError}</p>} {/* Display URL error message */}

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Upload Profile Picture:
//           <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginTop: '5px' }} />
//         </label>

//         {imagePreview && (
//           <div style={{ margin: '10px 0' }}>
//             <img src={imagePreview} alt="Profile Preview" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
//           </div>
//         )}

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Date of Birth:
//           <input type="date" name="dateOfBirth" value={user.dateOfBirth} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Email:
//           <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Phone Number:
//           <input type="text" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} placeholder="Phone Number" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Gender:
//           <select name="gender" value={user.gender} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
//             <option value="">Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Department:
//           <input type="text" name="department" value={user.department} onChange={handleChange} placeholder="Department" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Position:
//           <input type="text" name="position" value={user.position} onChange={handleChange} placeholder="Position" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Date of Hire:
//           <input type="date" name="dateOfHire" value={user.dateOfHire} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Salary:
//           <input type="number" name="salary" value={user.salary} onChange={handleChange} placeholder="Salary" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Permanent Address:
//           <input type="text" name="address" value={user.address} onChange={handleChange} placeholder="Address" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Temporary Address:
//           <input type="text" name="temporaryAddress" value={user.temporaryAddress} onChange={handleChange} placeholder="Temporary Address" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           <input type="checkbox" checked={sameAddress} onChange={handleAddressCheckboxChange} />
//           Copy Permanent Address to Temporary Address
//         </label>

//         <button type="submit" style={{ marginTop: '15px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>
//           {id ? 'Update User' : 'Add User'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UserForm;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const UserForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     fullName: '',
//     profilePicture: '',
//     dateOfBirth: '',
//     email: '',
//     phoneNumber: '',
//     department: '',
//     position: '',
//     dateOfHire: '',
//     salary: '',
//     address: '',
//     gender: '',
//     temporaryAddress: ''
//   });
//   const [imagePreview, setImagePreview] = useState('');
//   const [loading, setLoading] = useState(true); // Add loading state
//   const [error, setError] = useState(''); // Add error state

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         if (id) {
//           const response = await axios.get(`http://localhost:4200/user/${id}`);
//           setUser(response.data);
//           setImagePreview(response.data.profilePicture); // Set the preview to the existing profile picture
//         }
//       } catch (error) {
//         setError('Error fetching user data.'); // Set error message
//         console.error("Error fetching user data:", error);
//       } finally {
//         setLoading(false); // Set loading to false after fetch
//       }
//     };
//     fetchUser();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });

//     if (name === 'profilePicture') {
//       setImagePreview(value);
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//         setUser({ ...user, profilePicture: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (id) {
//         await axios.put(`http://localhost:4200/user/${id}`, user);
//       } else {
//         await axios.post('http://localhost:4200/user', user);
//       }
//       navigate('/users');
//     } catch (error) {
//       setError('Error submitting the form.'); // Set error message
//       console.error("Error submitting the form:", error);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>; // Show loading state
//   }

//   return (
//     <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h2>{id ? 'Edit User' : 'Add User'}</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
//       <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Full Name:
//           <input type="text" name="fullName" value={user.fullName} onChange={handleChange} placeholder="Full Name" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Profile Picture (URL):
//           <input type="text" name="profilePicture" value={user.profilePicture} onChange={handleChange} placeholder="Profile Picture URL" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Upload Profile Picture:
//           <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginTop: '5px' }} />
//         </label>

//         {imagePreview && (
//           <div style={{ margin: '10px 0' }}>
//             <img src={imagePreview} alt="Profile Preview" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
//           </div>
//         )}

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Date of Birth:
//           <input type="date" name="dateOfBirth" value={user.dateOfBirth} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Email:
//           <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Phone Number:
//           <input type="text" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} placeholder="Phone Number" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Gender:
//           <select name="gender" value={user.gender} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
//             <option value="">Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Department:
//           <input type="text" name="department" value={user.department} onChange={handleChange} placeholder="Department" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Position:
//           <input type="text" name="position" value={user.position} onChange={handleChange} placeholder="Position" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Date of Hire:
//           <input type="date" name="dateOfHire" value={user.dateOfHire} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Salary:
//           <input type="number" name="salary" value={user.salary} onChange={handleChange} placeholder="Salary" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Permanent Address:
//           <input type="text" name="address" value={user.address} onChange={handleChange} placeholder="Address" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>


//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Temporary Address:
//           <input type="text" name="temporaryAddress" value={user.temporaryAddress} onChange={handleChange} placeholder="Temporary Address" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
//           {id ? 'Update User' : 'Add User'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UserForm;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const UserForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     fullName: '',
//     profilePicture: '',
//     dateOfBirth: '',
//     email: '',
//     phoneNumber: '',
//     department: '',
//     position: '',
//     dateOfHire: '',
//     salary: '',
//     address: '',
//     gender: '', // New field
//     temporaryAddress: '' // New field
//   });
//   const [imagePreview, setImagePreview] = useState('');

//   useEffect(() => {
//     if (id) {
//       const fetchUser = async () => {
//         const response = await axios.get(`http://localhost:4200/user/${id}`);
//         setUser(response.data);
//         setImagePreview(response.data.profilePicture); // Set the preview to the existing profile picture
//       };
//       fetchUser();
//     }
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });

//     // Update the image preview if the input is the profile picture URL
//     if (name === 'profilePicture') {
//       setImagePreview(value);
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//         setUser({ ...user, profilePicture: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (id) {
//         await axios.put(`http://localhost:4200/user/${id}`, user);
//       } else {
//         await axios.post('http://localhost:4200/user', user);
//       }
//       navigate('/users');
//     } catch (error) {
//       console.error("Error submitting the form:", error);
//     }
//   };

//   return (
//     <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h2>{id ? 'Edit User' : 'Add User'}</h2>
//       <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Full Name:
//           <input type="text" name="fullName" value={user.fullName} onChange={handleChange} placeholder="Full Name" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Profile Picture (URL):
//           <input type="text" name="profilePicture" value={user.profilePicture} onChange={handleChange} placeholder="Profile Picture URL" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Upload Profile Picture:
//           <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginTop: '5px' }} />
//         </label>

//         {imagePreview && (
//           <div style={{ margin: '10px 0' }}>
//             <img src={imagePreview} alt="Profile Preview" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
//           </div>
//         )}

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Date of Birth:
//           <input type="date" name="dateOfBirth" value={user.dateOfBirth} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Email:
//           <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Phone Number:
//           <input type="text" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} placeholder="Phone Number" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Department:
//           <input type="text" name="department" value={user.department} onChange={handleChange} placeholder="Department" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Position:
//           <input type="text" name="position" value={user.position} onChange={handleChange} placeholder="Position" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Date of Hire:
//           <input type="date" name="dateOfHire" value={user.dateOfHire} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Salary:
//           <input type="number" name="salary" value={user.salary} onChange={handleChange} placeholder="Salary" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Address:
//           <input type="text" name="address" value={user.address} onChange={handleChange} placeholder="Address" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Gender:
//           <select name="gender" value={user.gender} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
//             <option value="">Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Temporary Address:
//           <input type="text" name="temporaryAddress" value={user.temporaryAddress} onChange={handleChange} placeholder="Temporary Address" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <button type="submit" style={{ marginTop: '15px', padding: '10px', width: '100%' }}>
//           {id ? 'Update User' : 'Add User'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UserForm;

















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const UserForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     fullName: '',
//     profilePicture: '',
//     dateOfBirth: '',
//     email: '',
//     phoneNumber: '',
//     department: '',
//     position: '',
//     dateOfHire: '',
//     salary: '',
//     address: '',
//     gender: '', // New field
//     temporaryAddress: '' // New field
//   });
//   const [imagePreview, setImagePreview] = useState('');

//   useEffect(() => {
//     if (id) {
//       const fetchUser = async () => {
//         const response = await axios.get(`http://localhost:4200/user/${id}`);
//         setUser(response.data);
//         setImagePreview(response.data.profilePicture); // Set the preview to the existing profile picture
//       };
//       fetchUser();
//     }
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });

//     // Update the image preview if the input is the profile picture URL
//     if (name === 'profilePicture') {
//       setImagePreview(value);
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//         setUser({ ...user, profilePicture: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (id) {
//         await axios.put(`http://localhost:4200/user/${id}`, user);
//       } else {
//         await axios.post('http://localhost:4200/user', user);
//       }
//       navigate('/users');
//     } catch (error) {
//       console.error("Error submitting the form:", error);
//     }
//   };

//   return (
//     <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h2>{id ? 'Edit User' : 'Add User'}</h2>
//       <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Full Name:
//           <input type="text" name="fullName" value={user.fullName} onChange={handleChange} placeholder="Full Name" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Profile Picture (URL):
//           <input type="text" name="profilePicture" value={user.profilePicture} onChange={handleChange} placeholder="Profile Picture URL" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Upload Profile Picture:
//           <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginTop: '5px' }} />
//         </label>

//         {imagePreview && (
//           <div style={{ margin: '10px 0' }}>
//             <img src={imagePreview} alt="Profile Preview" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
//           </div>
//         )}

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Date of Birth:
//           <input type="date" name="dateOfBirth" value={user.dateOfBirth} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Email:
//           <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Phone Number:
//           <input type="text" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} placeholder="Phone Number" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Department:
//           <input type="text" name="department" value={user.department} onChange={handleChange} placeholder="Department" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Position:
//           <input type="text" name="position" value={user.position} onChange={handleChange} placeholder="Position" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Date of Hire:
//           <input type="date" name="dateOfHire" value={user.dateOfHire} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Salary:
//           <input type="number" name="salary" value={user.salary} onChange={handleChange} placeholder="Salary" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Address:
//           <input type="text" name="address" value={user.address} onChange={handleChange} placeholder="Address" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Gender:
//           <select name="gender" value={user.gender} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
//             <option value="" disabled>Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Temporary Address:
//           <input type="text" name="temporaryAddress" value={user.temporaryAddress} onChange={handleChange} placeholder="Temporary Address" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <button type="submit" style={{ padding: '10px', marginTop: '15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
//           {id ? 'Update User' : 'Add User'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UserForm;






















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const UserForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     fullName: '',
//     profilePicture: '',
//     dateOfBirth: '',
//     email: '',
//     phoneNumber: '',
//     department: '',
//     position: '',
//     dateOfHire: '',
//     salary: '',
//     address: '',
//     gender: '', // New field
//     temporaryAddress: '' // New field
//   });
//   const [imagePreview, setImagePreview] = useState('');

//   useEffect(() => {
//     if (id) {
//       const fetchUser = async () => {
//         const response = await axios.get(`http://localhost:4200/user/${id}`);
//         setUser(response.data);
//         setImagePreview(response.data.profilePicture); // Set the preview to the existing profile picture
//       };
//       fetchUser();
//     }
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });

//     // Update the image preview if the input is the profile picture URL
//     if (name === 'profilePicture') {
//       setImagePreview(value);
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//         setUser({ ...user, profilePicture: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (id) {
//         await axios.put(`http://localhost:4200/user/${id}`, user);
//       } else {
//         await axios.post('http://localhost:4200/user', user);
//       }
//       navigate('/users');
//     } catch (error) {
//       console.error("Error submitting the form:", error);
//     }
//   };

//   return (
//     <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h2>{id ? 'Edit User' : 'Add User'}</h2>
//       <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Full Name:
//           <input type="text" name="fullName" value={user.fullName} onChange={handleChange} placeholder="Full Name" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Profile Picture (URL):
//           <input type="text" name="profilePicture" value={user.profilePicture} onChange={handleChange} placeholder="Profile Picture URL" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Upload Profile Picture:
//           <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginTop: '5px' }} />
//         </label>

//         {imagePreview && (
//           <div style={{ margin: '10px 0' }}>
//             <img src={imagePreview} alt="Profile Preview" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
//           </div>
//         )}

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Date of Birth:
//           <input type="date" name="dateOfBirth" value={user.dateOfBirth} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Email:
//           <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Phone Number:
//           <input type="text" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} placeholder="Phone Number" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Department:
//           <input type="text" name="department" value={user.department} onChange={handleChange} placeholder="Department" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Position:
//           <input type="text" name="position" value={user.position} onChange={handleChange} placeholder="Position" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Date of Hire:
//           <input type="date" name="dateOfHire" value={user.dateOfHire} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Salary:
//           <input type="number" name="salary" value={user.salary} onChange={handleChange} placeholder="Salary" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Address:
//           <input type="text" name="address" value={user.address} onChange={handleChange} placeholder="Address" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Gender:
//           <select name="gender" value={user.gender} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
//             <option value="" disabled>Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Transgender">Transgender</option>
//           </select>
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Temporary Address:
//           <input type="text" name="temporaryAddress" value={user.temporaryAddress} onChange={handleChange} placeholder="Temporary Address" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <button type="submit" style={{ padding: '10px 15px', marginTop: '20px' }}>{id ? 'Update User' : 'Add User'}</button>
//       </form>
//     </div>
//   );
// };

// export default UserForm;











// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const UserForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     fullName: '',
//     profilePicture: '',
//     dateOfBirth: '',
//     email: '',
//     phoneNumber: '',
//     department: '',
//     position: '',
//     dateOfHire: '',
//     salary: '',
//     address: '',
//   });
//   const [imagePreview, setImagePreview] = useState('');

//   useEffect(() => {
//     if (id) {
//       const fetchUser = async () => {
//         const response = await axios.get(`http://localhost:4200/user/${id}`);
//         setUser(response.data);
//         setImagePreview(response.data.profilePicture); // Set the preview to the existing profile picture
//       };
//       fetchUser();
//     }
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });

//     // Update the image preview if the input is the profile picture URL
//     if (name === 'profilePicture') {
//       setImagePreview(value);
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//         setUser({ ...user, profilePicture: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (id) {
//         await axios.put(`http://localhost:4200/user/${id}`, user);
//       } else {
//         await axios.post('http://localhost:4200/user', user);
//       }
//       navigate('/users');
//     } catch (error) {
//       console.error("Error submitting the form:", error);
//     }
//   };

//   return (
//     <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h2>{id ? 'Edit User' : 'Add User'}</h2>
//       <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Full Name:
//           <input type="text" name="fullName" value={user.fullName} onChange={handleChange} placeholder="Full Name" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>
        
//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Profile Picture (URL):
//           <input type="text" name="profilePicture" value={user.profilePicture} onChange={handleChange} placeholder="Profile Picture URL" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Upload Profile Picture:
//           <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginTop: '5px' }} />
//         </label>

//         {imagePreview && (
//           <div style={{ margin: '10px 0' }}>
//             <img src={imagePreview} alt="Profile Preview" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
//           </div>
//         )}

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Date of Birth:
//           <input type="date" name="dateOfBirth" value={user.dateOfBirth} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Email:
//           <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Phone Number:
//           <input type="text" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} placeholder="Phone Number" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Department:
//           <input type="text" name="department" value={user.department} onChange={handleChange} placeholder="Department" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Position:
//           <input type="text" name="position" value={user.position} onChange={handleChange} placeholder="Position" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Date of Hire:
//           <input type="date" name="dateOfHire" value={user.dateOfHire} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Salary:
//           <input type="number" name="salary" value={user.salary} onChange={handleChange} placeholder="Salary" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <label style={{ display: 'block', margin: '10px 0' }}>
//           Address:
//           <input type="text" name="address" value={user.address} onChange={handleChange} placeholder="Address" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </label>

//         <button type="submit" style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
//           {id ? 'Update User' : 'Create User'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UserForm;















