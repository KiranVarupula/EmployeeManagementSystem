import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewFinancial = () => {
  const { id } = useParams();
  const [financial, setFinancial] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFinancial = async () => {
      try {
        const response = await axios.get(`http://localhost:4200/financials/${id}`);
        setFinancial(response.data);
      } catch (error) {
        console.error('Error fetching financial record:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFinancial();
  }, [id]);

  if (loading) return <p>Loading financial data...</p>;
  if (!financial) return <p>Financial record not found.</p>;

  return (
    <div style={{ padding: '20px' }}>
      {/* Centered Heading */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px',marginTop:'40px' }}>
        <h2>Financial Record Details</h2>
      </div>

      {/* Content Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left side content */}
        <div style={{ flex: '1', marginRight: '200px', textAlign: 'left', marginLeft: '180px' }}>
          <p><strong>ID:</strong> {financial.id}</p>
          <p><strong>Bank Name:</strong> {financial.bankName}</p>
          <p><strong>Bank Account:</strong> {financial.bankAccount}</p>
          <p><strong>Bank IFSC:</strong> {financial.bankIFSC}</p>
          <p><strong>Company Logo:</strong> <img src={financial.compLogo} alt="Company Logo" style={{ width: '200px', height:'200px' }} /></p>
          <p><strong>User ID:</strong> {financial.user.id}</p>
        </div>

        {/* Right side content */}
        <div style={{ flex: '2', marginLeft: '20px', textAlign: 'left' }}>
          <p><strong>Basic Salary:</strong> {financial.basicSalary}</p>
          <p><strong>HRA:</strong> {financial.hra}</p>
          <p><strong>PF:</strong> {financial.pf}</p>
          <p><strong>Medical Allowances:</strong> {financial.medicalAllowances}</p>
          <p><strong>Food Allowances:</strong> {financial.foodAllowances}</p>
          <p><strong>Net Salary:</strong> {financial.netSalary}</p>
          <p><strong>Bonus:</strong> {financial.bonus}</p>
          <p><strong>Tax Deductions:</strong> {financial.taxDeductions}</p>
          <p><strong>Net Salary After Tax:</strong> {financial.netSalaryAfterTax}</p>
          <p><strong>Salary Month:</strong> {financial.salaryMonth}</p>
          <p><strong>Date of Payment:</strong> {new Date(financial.dateOfPayment).toLocaleDateString()}</p>
          <p><strong>Payment Method:</strong> {financial.paymentMethod}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewFinancial;


























// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const ViewFinancial = () => {
//   const { id } = useParams();
//   const [financial, setFinancial] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFinancial = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4200/financials/${id}`);
//         setFinancial(response.data);
//       } catch (error) {
//         console.error('Error fetching financial record:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFinancial();
//   }, [id]);

//   if (loading) return <p>Loading financial data...</p>;
//   if (!financial) return <p>Financial record not found.</p>;

//   return (
//     <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
//       {/* Left side content */}
//       <h2>Financial Record Details</h2>
//       <div style={{ flex: '1', marginTop: '80px', marginRight: '20px', textAlign: 'left' }}>
//         <p><strong>ID:</strong> {financial.id}</p>
//         <p><strong>Bank Name:</strong> {financial.bankName}</p>
//         <p><strong>Bank Account:</strong> {financial.bankAccount}</p>
//         <p><strong>Bank IFSC:</strong> {financial.bankIFSC}</p>
//         <p><strong>Company Logo:</strong> <img src={financial.compLogo} alt="Company Logo" style={{ width: '100px' }} /></p>
//         <p><strong>User ID:</strong> {financial.user.id}</p>
//       </div>

//       {/* Right side content */}
//       <div style={{ flex: '2', marginLeft: '20px',marginTop: '80px', textAlign: 'left' }}>
//         <p><strong>Basic Salary:</strong> {financial.basicSalary}</p>
//         <p><strong>HRA:</strong> {financial.hra}</p>
//         <p><strong>PF:</strong> {financial.pf}</p>
//         <p><strong>Medical Allowances:</strong> {financial.medicalAllowances}</p>
//         <p><strong>Food Allowances:</strong> {financial.foodAllowances}</p>
//         <p><strong>Net Salary:</strong> {financial.netSalary}</p>
//         <p><strong>Bonus:</strong> {financial.bonus}</p>
//         <p><strong>Tax Deductions:</strong> {financial.taxDeductions}</p>
//         <p><strong>Net Salary After Tax:</strong> {financial.netSalaryAfterTax}</p>
//         <p><strong>Salary Month:</strong> {financial.salaryMonth}</p>
//         <p><strong>Date of Payment:</strong> {new Date(financial.dateOfPayment).toLocaleDateString()}</p>
//         <p><strong>Payment Method:</strong> {financial.paymentMethod}</p>
//       </div>
//     </div>
//   );
// };

// export default ViewFinancial;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const ViewFinancial = () => {
//   const { id } = useParams();
//   const [financial, setFinancial] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFinancial = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4200/financials/${id}`);
//         setFinancial(response.data);
//       } catch (error) {
//         console.error('Error fetching financial record:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFinancial();
//   }, [id]);

//   if (loading) return <p>Loading financial data...</p>;
//   if (!financial) return <p>Financial record not found.</p>;

//   return (
//     <div style={{ textAlign: 'center' }}>
//       <h2>Financial Record Details</h2>
//       <p><strong>ID:</strong> {financial.id}</p>
//       <p><strong>Bank Name:</strong> {financial.bankName}</p>
//       <p><strong>Bank Account:</strong> {financial.bankAccount}</p>
//       <p><strong>Bank IFSC:</strong> {financial.bankIFSC}</p>
//       <p><strong>Basic Salary:</strong> {financial.basicSalary}</p>
//       <p><strong>HRA:</strong> {financial.hra}</p>
//       <p><strong>PF:</strong> {financial.pf}</p>
//       <p><strong>Medical Allowances:</strong> {financial.medicalAllowances}</p>
//       <p><strong>Food Allowances:</strong> {financial.foodAllowances}</p>
//       <p><strong>Net Salary:</strong> {financial.netSalary}</p>
//       <p><strong>Bonus:</strong> {financial.bonus}</p>
//       <p><strong>Tax Deductions:</strong> {financial.taxDeductions}</p>
//       <p><strong>Net Salary After Tax:</strong> {financial.netSalaryAfterTax}</p>
//       <p><strong>Salary Month:</strong> {financial.salaryMonth}</p>
//       <p><strong>Date of Payment:</strong> {new Date(financial.dateOfPayment).toLocaleDateString()}</p>
//       <p><strong>Payment Method:</strong> {financial.paymentMethod}</p>
//       <p><strong>Company Logo:</strong> <img src={financial.compLogo} alt="Company Logo" style={{ width: '100px' }} /></p>
//       <p><strong>User ID:</strong> {financial.user.id}</p>
//     </div>
//   );
// };

// export default ViewFinancial;
