import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FinancialForm = () => {
  const { id } = useParams(); // Get ID if editing
  const navigate = useNavigate();

  const [financial, setFinancial] = useState({
    user: { id: '' },  // Add user object to hold selected user ID
    bankName: '',
    bankAccount: '',
    bankIFSC: '',
    basicSalary: '',
    hra: '',
    pf: '',
    medicalAllowances: '',
    foodAllowances: '',
    netSalary: '',
    bonus: '',
    taxDeductions: '',
    netSalaryAfterTax: '',
    salaryMonth: '',
    dateOfPayment: '',
    paymentMethod: '',
    compLogo: ''
  });

  const [users, setUsers] = useState([]);  // State to hold the list of users

  // Fetch users for the dropdown
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4200/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchFinancial = async () => {
        try {
          const response = await axios.get(`http://localhost:4200/financials/${id}`);
          setFinancial(response.data);
        } catch (error) {
          console.error('Error fetching financial data:', error);
        }
      };
      fetchFinancial();
    }
  }, [id]);

  const handleChange = (e) => {
    setFinancial({ ...financial, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:4200/financials/${id}`, financial);
      } else {
        await axios.post('http://localhost:4200/financials', financial);
      }
      navigate('/financials');
    } catch (error) {
      console.error('Error saving financial record:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center',marginTop:'350px' }}>
      <h2>{id ? 'Edit Financial Record' : 'Add Financial Record'}</h2>
      <form onSubmit={handleSubmit}>

        {/* Select existing user */}
        <select
          name="user"
          value={financial.user.id}
          onChange={(e) => setFinancial({ ...financial, user: { id: e.target.value } })}  // Update user ID
          required
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.id}  {user.username}
            </option>
          ))}
        </select>

        <input 
          type="text" 
          name="bankName" 
          value={financial.bankName} 
          onChange={handleChange} 
          placeholder="Bank Name" 
          required 
        />
        <input 
          type="text" 
          name="bankAccount" 
          value={financial.bankAccount} 
          onChange={handleChange} 
          placeholder="Bank Account" 
          required 
        />
        <input 
          type="text" 
          name="bankIFSC" 
          value={financial.bankIFSC} 
          onChange={handleChange} 
          placeholder="Bank IFSC" 
        />
        <input 
          type="number" 
          name="basicSalary" 
          value={financial.basicSalary} 
          onChange={handleChange} 
          placeholder="Basic Salary" 
          required 
        />
        <input 
          type="number" 
          name="hra" 
          value={financial.hra} 
          onChange={handleChange} 
          placeholder="HRA" 
        />
        <input 
          type="number" 
          name="pf" 
          value={financial.pf} 
          onChange={handleChange} 
          placeholder="PF" 
        />
        <input 
          type="number" 
          name="medicalAllowances" 
          value={financial.medicalAllowances} 
          onChange={handleChange} 
          placeholder="Medical Allowances" 
        />
        <input 
          type="number" 
          name="foodAllowances" 
          value={financial.foodAllowances} 
          onChange={handleChange} 
          placeholder="Food Allowances" 
        />
        <input 
          type="number" 
          name="netSalary" 
          value={financial.netSalary} 
          onChange={handleChange} 
          placeholder="Net Salary" 
          required 
        />
        <input 
          type="number" 
          name="bonus" 
          value={financial.bonus} 
          onChange={handleChange} 
          placeholder="Bonus" 
        />
        <input 
          type="number" 
          name="taxDeductions" 
          value={financial.taxDeductions} 
          onChange={handleChange} 
          placeholder="Tax Deductions" 
        />
        <input 
          type="number" 
          name="netSalaryAfterTax" 
          value={financial.netSalaryAfterTax} 
          onChange={handleChange} 
          placeholder="Net Salary After Tax" 
        />
        <input 
          type="text" 
          name="salaryMonth" 
          value={financial.salaryMonth} 
          onChange={handleChange} 
          placeholder="Salary Month" 
        />
        <input 
          type="date" 
          name="dateOfPayment" 
          value={financial.dateOfPayment} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="paymentMethod" 
          value={financial.paymentMethod} 
          onChange={handleChange} 
          placeholder="Payment Method" 
        />
        <input 
          type="text" 
          name="compLogo" 
          value={financial.compLogo} 
          onChange={handleChange} 
          placeholder="Company Logo URL" 
        />
        <button type="submit">{id ? 'Update Financial' : 'Create Financial'}</button>
      </form>
    </div>
  );
};

export default FinancialForm;









