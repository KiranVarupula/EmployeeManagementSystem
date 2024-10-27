import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// User components
import UserList from './UserList';
import UserForm from './UserForm';
import ViewUser from './ViewUser'; 

// Project components
import ProjectList from './ProjectList'; 
import ProjectForm from './ProjectForm'; 
import ViewProject from './ViewProject'; 

// Financial components
import FinancialList from './FinancialList';
import FinancialForm from './FinancialForm';
import ViewFinancial from './ViewFinancial';

// Certification components
import CertificationForm from './CertificationForm';
import CertificationList from './CertificationList';
import ViewCertification from './ViewCertification';

const Home = () => {
  return (
    <Router>
      <div style={{ textAlign: 'center' }}>
        <nav style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#007BFF',
          color: '#fff',
          height: '10vh',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '0 20px',
        }}>
          {/* User Links */}
          <Link to="/users" style={{ color: '#fff', textDecoration: 'none' }}>User List</Link>
          <Link to="/user/new" style={{ color: '#fff', textDecoration: 'none' }}>Add User</Link>

          {/* Project Links */}
          <Link to="/projects" style={{ color: '#fff', textDecoration: 'none' }}>Project List</Link>
          <Link to="/project/new" style={{ color: '#fff', textDecoration: 'none' }}>Add Project</Link>

          {/* Certification Links */}
          <Link to="/certifications" style={{ color: '#fff', textDecoration: 'none' }}>Certification List</Link>
          <Link to="/certifications/add" style={{ color: '#fff', textDecoration: 'none' }}>Add Certification</Link>

          {/* Financial Links */}
          <Link to="/financials" style={{ color: '#fff', textDecoration: 'none' }}>Financial List</Link>
          <Link to="/financial/new" style={{ color: '#fff', textDecoration: 'none' }}>Add Financial</Link>
        </nav>

        {/* <h1 style={{ marginTop: '10vh' }}>Certification Management</h1> Added margin-top to avoid overlap with navbar */}

        <Routes>
          {/* Financial Routes */}
          <Route path="/financials" element={<FinancialList />} />
          <Route path="/financial/new" element={<FinancialForm />} />
          <Route path="/financial/edit/:id" element={<FinancialForm />} />
          <Route path="/financial/view/:id" element={<ViewFinancial />} />

          {/* User Routes */}
          <Route path="/users" element={<UserList />} />
          <Route path="/user/new" element={<UserForm />} />
          <Route path="/user/edit/:id" element={<UserForm />} />
          <Route path="/user/view/:id" element={<ViewUser />} />

          {/* Project Routes */}
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/project/new" element={<ProjectForm />} />
          <Route path="/project/edit/:id" element={<ProjectForm />} />
          <Route path="/project/view/:id" element={<ViewProject />} />

          {/* Certification Routes */}
          <Route path="/certifications" element={<CertificationList />} />
          <Route path="/certifications/add" element={<CertificationForm />} />
          <Route path="/certifications/edit/:id" element={<CertificationForm />} />
          <Route path="/certifications/view/:id" element={<ViewCertification />} />
          <Route path="/certificate/:id" element={<ViewCertification />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Home;




// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// // User components
// import UserList from './UserList';
// import UserForm from './UserForm';
// import ViewUser from './ViewUser'; 

// // Project components
// import ProjectList from './ProjectList'; 
// import ProjectForm from './ProjectForm'; 
// import ViewProject from './ViewProject'; 

// // Financial components
// import FinancialList from './FinancialList';
// import FinancialForm from './FinancialForm';
// import ViewFinancial from './ViewFinancial';

// // Certification components
// import CertificationForm from './CertificationForm';
// import CertificationList from './CertificationList';
// import ViewCertification from './ViewCertification';

// const Home = () => {
//   return (
//     <Router>
//       <div style={{ textAlign: 'center' }}>
//         <nav style={{
//           display: 'flex',
//           justifyContent: 'center',  // Center the nav items
//           flexWrap: 'wrap',  // Allow items to wrap in smaller screens
//           marginBottom: '20px', // Add some space below the nav
//         }}>
//           {/* User Links */}
//           <Link to="/users" style={{ margin: '0 15px' }}>User List</Link>
//           <Link to="/user/new" style={{ margin: '0 15px' }}>Add User</Link>

//           {/* Project Links */}
//           <Link to="/projects" style={{ margin: '0 15px' }}>Project List</Link>
//           <Link to="/project/new" style={{ margin: '0 15px' }}>Add Project</Link>

//           {/* Certification Links */}
//           <Link to="/certifications" style={{ margin: '0 15px' }}>Certification List</Link>
//           <Link to="/certifications/add" style={{ margin: '0 15px' }}>Add Certification</Link>

//           {/* Financial Links */}
//           <Link to="/financials" style={{ margin: '0 15px' }}>Financial List</Link>
//           <Link to="/financial/new" style={{ margin: '0 15px' }}>Add Financial</Link>
//         </nav>

//         <h1>Certification Management</h1>

//         <Routes>
//           {/* Financial Routes */}
//           <Route path="/financials" element={<FinancialList />} />
//           <Route path="/financial/new" element={<FinancialForm />} />
//           <Route path="/financial/edit/:id" element={<FinancialForm />} />
//           <Route path="/financial/view/:id" element={<ViewFinancial />} />

//           {/* User Routes */}
//           <Route path="/users" element={<UserList />} />
//           <Route path="/user/new" element={<UserForm />} />
//           <Route path="/user/edit/:id" element={<UserForm />} />
//           <Route path="/user/view/:id" element={<ViewUser />} />

//           {/* Project Routes */}
//           <Route path="/projects" element={<ProjectList />} />
//           <Route path="/project/new" element={<ProjectForm />} />
//           <Route path="/project/edit/:id" element={<ProjectForm />} />
//           <Route path="/project/view/:id" element={<ViewProject />} />

//           {/* Certification Routes */}
//           <Route path="/certifications" element={<CertificationList />} />
//           <Route path="/certifications/add" element={<CertificationForm />} />
//           <Route path="/certifications/edit/:id" element={<CertificationForm />} />
//           <Route path="/certifications/view/:id" element={<ViewCertification />} />
//           <Route path="/certificate/:id" element={<ViewCertification />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default Home;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// // User components
// import UserList from './UserList';
// import UserForm from './UserForm';
// import ViewUser from './ViewUser'; 

// // Project components
// import ProjectList from './ProjectList'; 
// import ProjectForm from './ProjectForm'; 
// import ViewProject from './ViewProject'; 

// // Financial components
// import FinancialList from './FinancialList';
// import FinancialForm from './FinancialForm';
// import ViewFinancial from './ViewFinancial';

// // Certification components
// import CertificationForm from './CertificationForm';
// import CertificationList from './CertificationList';
// import ViewCertification from './ViewCertification';

// const Home = () => {
//   return (
//     <Router>
//       <div style={{ textAlign: 'center' }}>
//         <nav>

//           {/* User Links */}
//           <Link to="/users">User List</Link>&nbsp;&nbsp;&nbsp;&nbsp;
//           <Link to="/user/new">Add User</Link>&nbsp;&nbsp;&nbsp;&nbsp;

//           {/* Project Links */}
//           <Link to="/projects">Project List</Link>&nbsp;&nbsp;&nbsp;&nbsp;
//           <Link to="/project/new">Add Project</Link>&nbsp;&nbsp;&nbsp;&nbsp;

//           {/* Certification Links */}
//           <Link to="/certifications">Certification List</Link>&nbsp;&nbsp;&nbsp;&nbsp;
//           <Link to="/certifications/add">Add Certification</Link>&nbsp;&nbsp;&nbsp;&nbsp;

//           {/* Financial Links */}
//           <Link to="/financials">Financial List</Link>&nbsp;&nbsp;&nbsp;&nbsp;
//           <Link to="/financial/new">Add Financial</Link>&nbsp;&nbsp;&nbsp;&nbsp;
//         </nav>

//         <h1>Certification Management</h1>

//         <Routes>
//           {/* Financial Routes */}
//           <Route path="/financials" element={<FinancialList />} />
//           <Route path="/financial/new" element={<FinancialForm />} />
//           <Route path="/financial/edit/:id" element={<FinancialForm />} />
//           <Route path="/financial/view/:id" element={<ViewFinancial />} />

//           {/* User Routes */}
//           <Route path="/users" element={<UserList />} />
//           <Route path="/user/new" element={<UserForm />} />
//           <Route path="/user/edit/:id" element={<UserForm />} />
//           <Route path="/user/view/:id" element={<ViewUser />} />

//           {/* Project Routes */}
//           <Route path="/projects" element={<ProjectList />} />
//           <Route path="/project/new" element={<ProjectForm />} />
//           <Route path="/project/edit/:id" element={<ProjectForm />} />
//           <Route path="/project/view/:id" element={<ViewProject />} />

//           {/* Certification Routes */}
//           <Route path="/certifications" element={<CertificationList />} />
//           <Route path="/certifications/add" element={<CertificationForm />} />
//           <Route path="/certifications/edit/:id" element={<CertificationForm />} />
//           <Route path="/certifications/view/:id" element={<ViewCertification />} />
//           <Route path="/certificate/:id" element={<ViewCertification />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default Home;



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// // User components
// import UserList from './UserList';
// import UserForm from './UserForm';
// import ViewUser from './ViewUser'; 

// // Project components
// import ProjectList from './ProjectList'; 
// import ProjectForm from './ProjectForm'; 
// import ViewProject from './ViewProject'; 

// // Financial components
// import FinancialList from './FinancialList';
// import FinancialForm from './FinancialForm';
// import ViewFinancial from './ViewFinancial';

// // Certification components
// import CertificationForm from './CertificationForm';
// import CertificationList from './CertificationList';
// import ViewCertification from './ViewCertification';

// const Home = () => {
//   return (
//     <Router>
//       <div style={{ textAlign: 'center' }}>
//       <nav>
//         {/* Financial Links */}
//         <Link to="/financials">Financial List</Link>&nbsp;&nbsp;&nbsp;&nbsp;
//         <Link to="/financial/new">Add Financial</Link>&nbsp;&nbsp;&nbsp;&nbsp;

//         {/* User Links */}
//         <Link to="/users">User List</Link>&nbsp;&nbsp;&nbsp;&nbsp;
//         <Link to="/user/new">Add User</Link>&nbsp;&nbsp;&nbsp;&nbsp;

//         {/* Project Links */}
//         <Link to="/projects">Project List</Link>&nbsp;&nbsp;&nbsp;&nbsp;
//         <Link to="/project/new">Add Project</Link>
      
//         <Link to="/certifications">Certification List</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//         <Route path="/certificate/:id" element={<ViewCertification />} />   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//         <Link to="/certifications/add">Add Certification</Link>
//         </nav>

//       <Routes>
//         {/* Financial Routes */}
//         <Route path="/financials" element={<FinancialList />} />
//         <Route path="/financial/new" element={<FinancialForm />} />
//         <Route path="/financial/edit/:id" element={<FinancialForm />} />
//         <Route path="/financial/view/:id" element={<ViewFinancial />} />

//         {/* User Routes */}
//         <Route path="/users" element={<UserList />} />
//         <Route path="/user/new" element={<UserForm />} />
//         <Route path="/user/edit/:id" element={<UserForm />} />
//         <Route path="/user/view/:id" element={<ViewUser />} />

//         {/* Project Routes */}
//         <Route path="/projects" element={<ProjectList />} />
//         <Route path="/project/new" element={<ProjectForm />} />
//         <Route path="/project/edit/:id" element={<ProjectForm />} />
//         <Route path="/project/view/:id" element={<ViewProject />} />
//       </Routes>
//       <div style={{ textAlign: 'center' }}>
//          <h1>Certification Management</h1>

//         <Routes>
//            <Route path="/certifications" element={<CertificationList />} />
//           <Route path="/certifications/add" element={<CertificationForm />} />
//          <Route path="/certifications/edit/:id" element={<CertificationForm />} />
//            <Route path="/certifications/view/:id" element={<ViewCertification />} />
//          </Routes>
//        </div>
//     </div>
//   </Router>
//   );
// };

// export default Home;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// // User components
// import UserList from './UserList';
// import UserForm from './UserForm';
// import ViewUser from './ViewUser'; 

// // Project components
// import ProjectList from './ProjectList'; 
// import ProjectForm from './ProjectForm'; 
// import ViewProject from './ViewProject'; 

// // Financial components
// import FinancialList from './FinancialList';
// import FinancialForm from './FinancialForm';
// import ViewFinancial from './ViewFinancial';

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import CertificationForm from './CertificationForm';
// import CertificationList from './CertificationList';
// import ViewCertification from './ViewCertification';

// const Home1 = () => {
//   return (
//     <Router>
//       <div style={{ textAlign: 'center' }}>
//         <h1>Certification Management</h1>
//         <nav>
//           <Link to="/certifications">Certification List</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//           <Link to="/certifications/add">Add Certification</Link>
//         </nav>

//         {/* Define your routes here, not inside nav */}
//         <Routes>
//           <Route path="/certifications" element={<CertificationList />} />
//           <Route path="/certifications/add" element={<CertificationForm />} />
//           <Route path="/certifications/edit/:id" element={<CertificationForm />} />
//           <Route path="/certifications/view/:id" element={<ViewCertification />} />
//           <Route path="/certificate/:id" element={<ViewCertification />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default Home1;


// const Home1 = () => {
//   return (
//     <Router>
//       <div style={{ textAlign: 'center' }}>
//         <nav>

//           {/* User Links */}
//           <Link to="/users">User List</Link>&nbsp;&nbsp;&nbsp;&nbsp;
//           <Link to="/user/new">Add User</Link>&nbsp;&nbsp;&nbsp;&nbsp;

//           {/* Project Links */}
//           <Link to="/projects">Project List</Link>&nbsp;&nbsp;&nbsp;&nbsp;
//           <Link to="/project/new">Add Project</Link>&nbsp;&nbsp;&nbsp;&nbsp;

//           {/* Financial Links */}
//           <Link to="/financials">Financial List</Link>&nbsp;&nbsp;&nbsp;&nbsp;
//           <Link to="/financial/new">Add Financial</Link>&nbsp;&nbsp;&nbsp;&nbsp;
//         </nav>

//         <Routes>
//           {/* Financial Routes */}
//           <Route path="/financials" element={<FinancialList />} />
//           <Route path="/financial/new" element={<FinancialForm />} />
//           <Route path="/financial/edit/:id" element={<FinancialForm />} />
//           <Route path="/financial/view/:id" element={<ViewFinancial />} />

//           {/* User Routes */}
//           <Route path="/users" element={<UserList />} />
//           <Route path="/user/new" element={<UserForm />} />
//           <Route path="/user/edit/:id" element={<UserForm />} />
//           <Route path="/user/view/:id" element={<ViewUser />} />

//           {/* Project Routes */}
//           <Route path="/projects" element={<ProjectList />} />
//           <Route path="/project/new" element={<ProjectForm />} />
//           <Route path="/project/edit/:id" element={<ProjectForm />} />
//           <Route path="/project/view/:id" element={<ViewProject />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default Home1;


// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import CertificationForm from './CertificationForm';
// import CertificationList from './CertificationList';
// import ViewCertification from './ViewCertification';

// const Home1 = () => {
//   return (
//     <Router>
//       <div style={{ textAlign: 'center' }}>
//         <h1>Certification Management</h1>
//         <nav>
//           <Link to="/certifications">Certification List</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//           <Route path="/certificate/:id" element={<ViewCertification />} />   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//           <Link to="/certifications/add">Add Certification</Link>
//         </nav>

//         <Routes>
//           <Route path="/certifications" element={<CertificationList />} />
//           <Route path="/certifications/add" element={<CertificationForm />} />
//           <Route path="/certifications/edit/:id" element={<CertificationForm />} />
//           <Route path="/certifications/view/:id" element={<ViewCertification />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default Home1;







































// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// // Financial components
// import FinancialList from './FinancialList';
// import FinancialForm from './FinancialForm';
// import ViewFinancial from './ViewFinancial';

// // User components
// import UserList from './UserList';
// import UserForm from './UserForm';
// import ViewUser from './ViewUser'; 

// // Project components
// import ProjectList from './ProjectList'; 
// import ProjectForm from './ProjectForm'; 
// import ViewProject from './ViewProject'; 

// const Home1 = () => {
//   return (
//     <Router>
//       <div style={{ textAlign: 'center' }}>
//         <nav>
//           {/* Financial Links */}
//           <Link to="/financials">Financial List</Link>&nbsp;&nbsp;&nbsp;&nbsp;
//           <Link to="/financial/new">Add Financial</Link>&nbsp;&nbsp;&nbsp;&nbsp;

//           {/* User Links */}
//           <Link to="/users">User List</Link>&nbsp;&nbsp;&nbsp;&nbsp;
//           <Link to="/user/new">Add User</Link>&nbsp;&nbsp;&nbsp;&nbsp;

//           {/* Project Links */}
//           <Link to="/projects">Project List</Link>&nbsp;&nbsp;&nbsp;&nbsp;
//           <Link to="/project/new">Add Project</Link>
//         </nav>

//         <Routes>
//           {/* Financial Routes */}
//           <Route path="/financials" element={<FinancialList />} />
//           <Route path="/financial/new" element={<FinancialForm />} />
//           <Route path="/financial/edit/:id" element={<FinancialForm />} />
//           <Route path="/financial/view/:id" element={<ViewFinancial />} />

//           {/* User Routes */}
//           <Route path="/users" element={<UserList />} />
//           <Route path="/user/new" element={<UserForm />} />
//           <Route path="/user/edit/:id" element={<UserForm />} />
//           <Route path="/user/view/:id" element={<ViewUser />} />

//           {/* Project Routes */}
//           <Route path="/projects" element={<ProjectList />} />
//           <Route path="/project/new" element={<ProjectForm />} />
//           <Route path="/project/edit/:id" element={<ProjectForm />} />
//           <Route path="/project/view/:id" element={<ViewProject />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default Home1;























// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import UserList from './UserList';
// import UserForm from './UserForm';
// import ViewUser from './ViewUser'; // Import ViewUser
// import ProjectList from './ProjectList'; // Import ProjectList
// import ProjectForm from './ProjectForm'; // Import ProjectForm
// import ViewProject from './ViewProject'; // Import ViewProject

// const Home1 = () => {
//   return (
//     <Router>
//       <div style={{ textAlign: 'center' }}>
//         <nav>
//           &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
//           <Link to="/users">User List</Link> &nbsp;&nbsp;&nbsp;&nbsp;
//           <Link to="/user/new">Add User</Link> &nbsp;&nbsp;&nbsp;&nbsp;
//           <Link to="/projects">Project List</Link> &nbsp;&nbsp;&nbsp;&nbsp; {/* New Link */}
//           <Link to="/project/new">Add Project</Link> {/* New Link */}
//         </nav>
//         <Routes>
//           <Route path="/users" element={<UserList />} />
//           <Route path="/user/new" element={<UserForm />} />
//           <Route path="/user/edit/:id" element={<UserForm />} />
//           <Route path="/user/view/:id" element={<ViewUser />} />
//           <Route path="/projects" element={<ProjectList />} /> {/* New Route */}
//           <Route path="/project/new" element={<ProjectForm />} /> {/* New Route */}
//           <Route path="/project/edit/:id" element={<ProjectForm />} /> {/* New Route */}
//           <Route path="/project/view/:id" element={<ViewProject />} /> {/* New Route */}
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default Home1;
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import FinancialList from './FinancialList';
// import FinancialForm from './FinancialForm';
// import ViewFinancial from './ViewFinancial';

// const Home1 = () => {
//   return (
//     <Router>
//       <div style={{ textAlign: 'center' }}>
//         <nav>
//           <Link to="/financials">Financial List</Link>&nbsp;&nbsp;&nbsp;&nbsp;
//           <Link to="/financial/new">Add Financial</Link>
//         </nav>
//         <Routes>
//           <Route path="/financials" element={<FinancialList />} />
//           <Route path="/financial/new" element={<FinancialForm />} />
//           <Route path="/financial/edit/:id" element={<FinancialForm />} />
//           <Route path="/financial/view/:id" element={<ViewFinancial />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default Home1;
















































// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import UserList from './UserList';
// import UserForm from './UserForm';
// import ViewUser from './ViewUser'; // Import ViewUser

// const Home1 = () => {
//   return (
//     <Router>
//       <div style={{ textAlign: 'center' }}>
//         {/* <h1>User Management</h1> */}
//         <nav>
//         &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
//           <Link to="/users">User List</Link> &nbsp;&nbsp;&nbsp;&nbsp;
//           <Link to="/user/new">Add User</Link>
//         </nav>
//         <Routes>
//           <Route path="/users" element={<UserList />} />
//           <Route path="/user/new" element={<UserForm />} />
//           <Route path="/user/edit/:id" element={<UserForm />} />
//           <Route path="/user/view/:id" element={<ViewUser />} /> {/* New Route */}
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default Home1;
