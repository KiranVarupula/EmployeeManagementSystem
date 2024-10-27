import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './UserList.css';  // Make sure this CSS file includes your provided styles

const FinancialList = () => {
  const [financials, setFinancials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFinancials = async () => {
      try {
        const response = await axios.get('http://localhost:4200/financials');
        setFinancials(response.data);
        console.log('Fetched Financial Data:', response.data); // Log fetched data to console
      } catch (error) {
        console.error('Error fetching financials:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFinancials();
  }, []);

  const deleteFinancial = async (id) => {
    if (window.confirm('Are you sure you want to delete this financial record?')) {
      try {
        await axios.delete(`http://localhost:4200/financials/${id}`);
        console.log(`Financial record with ID ${id} deleted.`); // Log deleted record ID
        setFinancials(financials.filter(financial => financial.id !== id));
      } catch (error) {
        console.error('Error deleting financial record:', error);
      }
    }
  };

  if (loading) return <p>Loading financial data...</p>;

  return (
    <div className="container">
      <h2 style={{ textAlign: 'center' }}>Financial Records</h2>
      <table className="table"
        cellPadding={5}
        style={{ margin: '0 auto', width: '100vw', maxWidth: '90%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Bank Name</th>
            <th>Bank Account</th>
            <th>IFSC</th>
            <th>Basic Salary</th>
            <th>Net Salary</th>
            <th>Salary Month</th>
            <th>Date of Payment</th>
            <th>Payment Method</th>
            <th>Company Logo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {financials.length > 0 ? (
            financials.map(financial => (
              <tr key={financial.id}>
                <td>{financial.id}</td>
                <td>{financial.bankName}</td>
                <td>{financial.bankAccount}</td>
                <td>{financial.bankIFSC}</td>
                <td>{financial.basicSalary}</td>
                <td>{financial.netSalary}</td>
                <td>{financial.salaryMonth}</td>
                <td>{new Date(financial.dateOfPayment).toLocaleDateString()}</td>
                <td>{financial.paymentMethod}</td>
                <td><img src={financial.compLogo} alt="Company Logo" style={{ width: '50px' }} /></td>
                <td style={{ display: 'flex', gap: '10px', justifyContent: 'center', width: '20vw' }}>
                  <Link
                    to={`/financial/view/${financial.id}`}
                    style={{
                      backgroundColor: '#4CAF50', // Green color for view
                      color: '#fff',
                      padding: '5px 10px',
                      borderRadius: '5px',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s, color 0.3s',
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#45a049')} // Darker green on hover
                    onMouseLeave={(e) => (e.target.style.backgroundColor = '#4CAF50')}
                  >
                    <i className="fa fa-eye"></i> View
                    </Link>

                    <Link
                      to={`/financial/edit/${financial.id}`}
                      style={{
                        backgroundColor: '#ff9800', // Orange color for edit
                        color: '#fff',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s, color 0.3s',
                      }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = '#e68a00')} // Darker orange on hover
                      onMouseLeave={(e) => (e.target.style.backgroundColor = '#ff9800')}
                    >
                      <i className="fas fa-edit"></i> Edit
                    </Link>

                    <button
                      onClick={() => deleteFinancial(financial.id)}
                      style={{
                        backgroundColor: '#f44336', // Red color for delete
                        color: '#fff',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s, color 0.3s',
                      }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = '#d32f2f')} // Darker red on hover
                      onMouseLeave={(e) => (e.target.style.backgroundColor = '#f44336')}
                    >
                      <i className="fas fa-trash-alt"></i> Delete
                    </button>
                  </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11">No financial records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FinancialList;






















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import './UserList.css';  // Make sure this CSS file includes your provided styles

// const FinancialList = () => {
//   const [financials, setFinancials] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFinancials = async () => {
//       try {
//         const response = await axios.get('http://localhost:4200/financials');
//         setFinancials(response.data);
//         console.log('Fetched Financial Data:', response.data); // Log fetched data to console
//       } catch (error) {
//         console.error('Error fetching financials:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFinancials();
//   }, []);

//   const deleteFinancial = async (id) => {
//     if (window.confirm('Are you sure you want to delete this financial record?')) {
//       try {
//         await axios.delete(`http://localhost:4200/financials/${id}`);
//         console.log(`Financial record with ID ${id} deleted.`); // Log deleted record ID
//         setFinancials(financials.filter(financial => financial.id !== id));
//       } catch (error) {
//         console.error('Error deleting financial record:', error);
//       }
//     }
//   };

//   if (loading) return <p>Loading financial data...</p>;

//   return (
//     <div className="container">
//       <h2 style={{ textAlign: 'center' }}>Financial Records</h2>
//       <table className="table"
//         cellPadding={5}
//         style={{ margin: '0 auto', width: '100vw', maxWidth: '90%' }}>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Bank Name</th>
//             <th>Bank Account</th>
//             <th>IFSC</th>
//             <th>Basic Salary</th>
//             <th>Net Salary</th>
//             <th>Salary Month</th>
//             <th>Date of Payment</th>
//             <th>Payment Method</th>
//             <th>Company Logo</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {financials.length > 0 ? (
//             financials.map(financial => (
//               <tr key={financial.id}>
//                 <td>{financial.id}</td>
//                 <td>{financial.bankName}</td>
//                 <td>{financial.bankAccount}</td>
//                 <td>{financial.bankIFSC}</td>
//                 <td>{financial.basicSalary}</td>
//                 <td>{financial.netSalary}</td>
//                 <td>{financial.salaryMonth}</td>
//                 <td>{new Date(financial.dateOfPayment).toLocaleDateString()}</td>
//                 <td>{financial.paymentMethod}</td>
//                 <td><img src={financial.compLogo} alt="Company Logo" style={{ width: '50px' }} /></td>
//                 <td style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
//                   <Link
//                     to={`/financial/view/${financial.id}`}
//                     style={{
//                       backgroundColor: '#4CAF50', // Green color for view
//                       color: '#fff',
//                       padding: '5px 10px',
//                       borderRadius: '5px',
//                       textDecoration: 'none',
//                       cursor: 'pointer',
//                       transition: 'background-color 0.3s, color 0.3s',
//                     }}
//                     onMouseEnter={(e) => (e.target.style.backgroundColor = '#45a049')} // Darker green on hover
//                     onMouseLeave={(e) => (e.target.style.backgroundColor = '#4CAF50')}
//                   >
//                     <i className="fa fa-eye"></i> View
//                   </Link>

//                   <Link
//                     to={`/financial/edit/${financial.id}`}
//                     style={{
//                       backgroundColor: '#ff9800', // Orange color for edit
//                       color: '#fff',
//                       padding: '5px 10px',
//                       borderRadius: '5px',
//                       textDecoration: 'none',
//                       cursor: 'pointer',
//                       transition: 'background-color 0.3s, color 0.3s',
//                     }}
//                     onMouseEnter={(e) => (e.target.style.backgroundColor = '#e68a00')} // Darker orange on hover
//                     onMouseLeave={(e) => (e.target.style.backgroundColor = '#ff9800')}
//                   >
//                    <i className="fas fa-edit"></i> Edit
//                   </Link>

//                   <button
//                     onClick={() => deleteFinancial(financial.id)}
//                     style={{
//                       backgroundColor: '#f44336', // Red color for delete
//                       color: '#fff',
//                       padding: '5px 10px',
//                       borderRadius: '5px',
//                       border: 'none',
//                       cursor: 'pointer',
//                       transition: 'background-color 0.3s, color 0.3s',
//                     }}
//                     onMouseEnter={(e) => (e.target.style.backgroundColor = '#d32f2f')} // Darker red on hover
//                     onMouseLeave={(e) => (e.target.style.backgroundColor = '#f44336')}
//                   >
//                     <i className="fas fa-trash-alt"></i> Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="11">No financial records found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default FinancialList;



























// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import './UserList.css';  // Make sure this CSS file includes your provided styles

// const FinancialList = () => {
//   const [financials, setFinancials] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFinancials = async () => {
//       try {
//         const response = await axios.get('http://localhost:4200/financials');
//         setFinancials(response.data);
//         console.log('Fetched Financial Data:', response.data); // Log fetched data to console
//       } catch (error) {
//         console.error('Error fetching financials:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFinancials();
//   }, []);

//   const deleteFinancial = async (id) => {
//     if (window.confirm('Are you sure you want to delete this financial record?')) {
//       try {
//         await axios.delete(`http://localhost:4200/financials/${id}`);
//         console.log(`Financial record with ID ${id} deleted.`); // Log deleted record ID
//         setFinancials(financials.filter(financial => financial.id !== id));
//       } catch (error) {
//         console.error('Error deleting financial record:', error);
//       }
//     }
//   };

//   if (loading) return <p>Loading financial data...</p>;

//   return (
//     <div className="container">
//       <h2 style={{ textAlign: 'center' }}>Financial Records</h2>
//       <table className="table"
//       cellPadding={5}
//       style={{ margin: '0 auto', width: '100vw', maxWidth: '90%' }}>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Bank Name</th>
//             <th>Bank Account</th>
//             <th>IFSC</th>
//             <th>Basic Salary</th>
//             <th>Net Salary</th>
//             <th>Salary Month</th>
//             <th>Date of Payment</th>
//             <th>Payment Method</th>
//             <th>Company Logo</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {financials.length > 0 ? (
//             financials.map(financial => (
//               <tr key={financial.id}>
//                 <td>{financial.id}</td>
//                 <td>{financial.bankName}</td>
//                 <td>{financial.bankAccount}</td>
//                 <td>{financial.bankIFSC}</td>
//                 <td>{financial.basicSalary}</td>
//                 <td>{financial.netSalary}</td>
//                 <td>{financial.salaryMonth}</td>
//                 <td>{new Date(financial.dateOfPayment).toLocaleDateString()}</td>
//                 <td>{financial.paymentMethod}</td>
//                 <td><img src={financial.compLogo} alt="Company Logo" style={{ width: '50px' }} /></td>
//                 <td>
//                   <Link
//                     to={`/financial/view/${financial.id}`}
//                     style={{
//                       backgroundColor: '#4CAF50', // Green color for view
//                       color: '#fff',
//                       padding: '5px 10px',
//                       borderRadius: '5px',
//                       textDecoration: 'none',
//                       margin: '0 5px',
//                       cursor: 'pointer',
//                       transition: 'background-color 0.3s, color 0.3s',
//                     }}
//                     onMouseEnter={(e) => (e.target.style.backgroundColor = '#45a049')} // Darker green on hover
//                     onMouseLeave={(e) => (e.target.style.backgroundColor = '#4CAF50')}
//                   >
//                     View
//                   </Link>

//                   <Link
//                     to={`/financial/edit/${financial.id}`}
//                     style={{
//                       backgroundColor: '#ff9800', // Orange color for edit
//                       color: '#fff',
//                       padding: '5px 10px',
//                       borderRadius: '5px',
//                       textDecoration: 'none',
//                       margin: '0 5px',
//                       cursor: 'pointer',
//                       transition: 'background-color 0.3s, color 0.3s',
//                     }}
//                     onMouseEnter={(e) => (e.target.style.backgroundColor = '#e68a00')} // Darker orange on hover
//                     onMouseLeave={(e) => (e.target.style.backgroundColor = '#ff9800')}
//                   >
//                     Edit
//                   </Link>

//                   <button
//                     onClick={() => deleteFinancial(financial.id)}
//                     style={{
//                       backgroundColor: '#f44336', // Red color for delete
//                       color: '#fff',
//                       padding: '5px 10px',
//                       borderRadius: '5px',
//                       border: 'none',
//                       cursor: 'pointer',
//                       margin: '0 100px',
//                       transition: 'background-color 0.3s, color 0.3s',
//                     }}
//                     onMouseEnter={(e) => (e.target.style.backgroundColor = '#d32f2f')} // Darker red on hover
//                     onMouseLeave={(e) => (e.target.style.backgroundColor = '#f44336')}
//                   >
//                     Delete
//                   </button>
//                 </td> 
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="11">No financial records found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default FinancialList;
















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import './UserList.css';  // Make sure this CSS file includes your provided styles

// const FinancialList = () => {
//   const [financials, setFinancials] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFinancials = async () => {
//       try {
//         const response = await axios.get('http://localhost:4200/financials');
//         setFinancials(response.data);
//         console.log('Fetched Financial Data:', response.data); // Log fetched data to console
//       } catch (error) {
//         console.error('Error fetching financials:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFinancials();
//   }, []);

//   const deleteFinancial = async (id) => {
//     if (window.confirm('Are you sure you want to delete this financial record?')) {
//       try {
//         await axios.delete(`http://localhost:4200/financials/${id}`);
//         console.log(`Financial record with ID ${id} deleted.`); // Log deleted record ID
//         setFinancials(financials.filter(financial => financial.id !== id));
//       } catch (error) {
//         console.error('Error deleting financial record:', error);
//       }
//     }
//   };

//   if (loading) return <p>Loading financial data...</p>;

//   return (
//     <div className="container">
//       <h2 style={{ textAlign: 'center' }}>Financial Records</h2>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Bank Name</th>
//             <th>Bank Account</th>
//             <th>IFSC</th>
//             <th>Basic Salary</th>
//             <th>Net Salary</th>
//             <th>Salary Month</th>
//             <th>Date of Payment</th>
//             <th>Payment Method</th>
//             <th>Company Logo</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {financials.length > 0 ? (
//             financials.map(financial => (
//               <tr key={financial.id}>
//                 <td>{financial.id}</td>
//                 <td>{financial.bankName}</td>
//                 <td>{financial.bankAccount}</td>
//                 <td>{financial.bankIFSC}</td>
//                 <td>{financial.basicSalary}</td>
//                 <td>{financial.netSalary}</td>
//                 <td>{financial.salaryMonth}</td>
//                 <td>{new Date(financial.dateOfPayment).toLocaleDateString()}</td>
//                 <td>{financial.paymentMethod}</td>
//                 <td><img src={financial.compLogo} alt="Company Logo" style={{ width: '50px' }} /></td>
//                 <td>
//                   <Link to={`/financial/view/${financial.id}`} className="action-icons view">View</Link>
//                   <Link to={`/financial/edit/${financial.id}`} className="action-icons edit">Edit</Link>
//                   <button onClick={() => deleteFinancial(financial.id)} className="action-icons delete">Delete</button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="11">No financial records found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default FinancialList;













// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const FinancialList = () => {
//   const [financials, setFinancials] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFinancials = async () => {
//       try {
//         const response = await axios.get('http://localhost:4200/financials');
//         setFinancials(response.data);
//         console.log('Fetched Financial Data:', response.data); // Log fetched data to console
//       } catch (error) {
//         console.error('Error fetching financials:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFinancials();
//   }, []);

//   const deleteFinancial = async (id) => {
//     if (window.confirm('Are you sure you want to delete this financial record?')) {
//       try {
//         await axios.delete(`http://localhost:4200/financials/${id}`);
//         console.log(`Financial record with ID ${id} deleted.`); // Log deleted record ID
//         setFinancials(financials.filter(financial => financial.id !== id));
//       } catch (error) {
//         console.error('Error deleting financial record:', error);
//       }
//     }
//   };

//   if (loading) return <p>Loading financial data...</p>;

//   // Inline styles for action buttons
//   const buttonStyles = {
//     base: {
//       cursor: 'pointer',
//       padding: '5px 10px',
//       margin: '0 5px',
//       borderRadius: '5px',
//       border: 'none',
//       color: '#fff',
//       transition: 'background-color 0.3s ease',
//     },
//     view: {
//       backgroundColor: '#4CAF50', // Green
//     },
//     edit: {
//       backgroundColor: '#ff9800', // Orange
//     },
//     delete: {
//       backgroundColor: '#f44336', // Red
//     },
//     hover: {
//       view: { backgroundColor: '#45a049' }, // Darker green
//       edit: { backgroundColor: '#e68a00' }, // Darker orange
//       delete: { backgroundColor: '#d32f2f' }, // Darker red
//     },
//   };

//   return (
//     <div style={{ textAlign: 'center' }}>
//       <h2>Financial Records</h2>
//       <table style={{ margin: '0 auto', width: '90%', backgroundColor: '#f9f9f9', borderCollapse: 'collapse', marginTop: '20px' }}>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Bank Name</th>
//             <th>Bank Account</th>
//             <th>IFSC</th>
//             <th>Basic Salary</th>
//             <th>Net Salary</th>
//             <th>Salary Month</th>
//             <th>Date of Payment</th>
//             <th>Payment Method</th>
//             <th>Company Logo</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {financials.length > 0 ? (
//             financials.map(financial => (
//               <tr key={financial.id}>
//                 <td>{financial.id}</td>
//                 <td>{financial.bankName}</td>
//                 <td>{financial.bankAccount}</td>
//                 <td>{financial.bankIFSC}</td>
//                 <td>{financial.basicSalary}</td>
//                 <td>{financial.netSalary}</td>
//                 <td>{financial.salaryMonth}</td>
//                 <td>{new Date(financial.dateOfPayment).toLocaleDateString()}</td>
//                 <td>{financial.paymentMethod}</td>
//                 <td><img src={financial.compLogo} alt="Company Logo" style={{ width: '50px' }} /></td>
//                 <td>
//                   <Link
//                     to={`/financial/view/${financial.id}`}
//                     style={{ ...buttonStyles.base, ...buttonStyles.view }}
//                     onMouseEnter={(e) => (e.target.style.backgroundColor = buttonStyles.hover.view.backgroundColor)}
//                     onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyles.view.backgroundColor)}
//                   >
//                     View
//                   </Link>
//                   <Link
//                     to={`/financial/edit/${financial.id}`}
//                     style={{ ...buttonStyles.base, ...buttonStyles.edit }}
//                     onMouseEnter={(e) => (e.target.style.backgroundColor = buttonStyles.hover.edit.backgroundColor)}
//                     onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyles.edit.backgroundColor)}
//                   >
//                     Edit
//                   </Link>
//                   <button
//                     onClick={() => deleteFinancial(financial.id)}
//                     style={{ ...buttonStyles.base, ...buttonStyles.delete }}
//                     onMouseEnter={(e) => (e.target.style.backgroundColor = buttonStyles.hover.delete.backgroundColor)}
//                     onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyles.delete.backgroundColor)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="11">No financial records found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default FinancialList;












// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const FinancialList = () => {
//   const [financials, setFinancials] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFinancials = async () => {
//       try {
//         const response = await axios.get('http://localhost:4200/financials');
//         setFinancials(response.data);
//         console.log('Fetched Financial Data:', response.data); // Log fetched data to console
//       } catch (error) {
//         console.error('Error fetching financials:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFinancials();
//   }, []);

//   const deleteFinancial = async (id) => {
//     if (window.confirm('Are you sure you want to delete this financial record?')) {
//       try {
//         await axios.delete(`http://localhost:4200/financials/${id}`);
//         console.log(`Financial record with ID ${id} deleted.`); // Log deleted record ID
//         setFinancials(financials.filter(financial => financial.id !== id));
//       } catch (error) {
//         console.error('Error deleting financial record:', error);
//       }
//     }
//   };

//   if (loading) return <p>Loading financial data...</p>;

//   return (
//     <div style={{ textAlign: 'center' }}>
//       <h2>Financial Records</h2>
//       <table border={1} cellPadding={5} style={{ margin: '0 auto', width: '100%' }}>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Bank Name</th>
//             <th>Bank Account</th>
//             <th>IFSC</th>
//             <th>Basic Salary</th>
//             <th>HRA</th>
//             <th>PF</th>
//             <th>Medical Allowances</th>
//             <th>Food Allowances</th>
//             <th>Net Salary</th>
//             <th>Bonus</th>
//             <th>Tax Deductions</th>
//             <th>Net Salary After Tax</th>
//             <th>Salary Month</th>
//             <th>Date of Payment</th>
//             <th>Payment Method</th>
//             <th>Company Logo</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {financials.length > 0 ? (
//             financials.map(financial => (
//               <tr key={financial.id}>
//                 <td>{financial.id}</td>
//                 <td>{financial.bankName}</td>
//                 <td>{financial.bankAccount}</td>
//                 <td>{financial.bankIFSC}</td>
//                 <td>{financial.basicSalary}</td>
//                 <td>{financial.hra}</td>
//                 <td>{financial.pf}</td>
//                 <td>{financial.medicalAllowances}</td>
//                 <td>{financial.foodAllowances}</td>
//                 <td>{financial.netSalary}</td>
//                 <td>{financial.bonus}</td>
//                 <td>{financial.taxDeductions}</td>
//                 <td>{financial.netSalaryAfterTax}</td>
//                 <td>{financial.salaryMonth}</td>
//                 <td>{new Date(financial.dateOfPayment).toLocaleDateString()}</td>
//                 <td>{financial.paymentMethod}</td>
//                 <td><img src={financial.compLogo} alt="Company Logo" style={{ width: '50px' }} /></td>
//                 <td>
//                   <Link to={`/financial/edit/${financial.id}`}>Edit</Link>
//                   <button onClick={() => deleteFinancial(financial.id)}>Delete</button>
//                   <Link to={`/financial/view/${financial.id}`}>View</Link>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="18">No financial records found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default FinancialList;

