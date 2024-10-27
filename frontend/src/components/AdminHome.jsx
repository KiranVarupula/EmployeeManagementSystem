import { Link} from "react-router-dom";

let AdminHome = ()=>{
    return(
        <><img src="about-banner-3.jpeg" style={{zIndex:"-1",display:"flex",justifyItems:"center",alignItems:"center" , backgroundSize: 'cover', height: '100vh', width:"210.8vh" }} alt="" />

           <div className="container mt-4">
                <h1 style={{fontSize:"50px",marginTop:"-680px",textAlign:'center',color:'rgba(255, 255, 255, 0.5)'}}>Welcome to ADMIN's Portal</h1>
                <h3 style={{fontSize:"30px",textAlign:'center',color:'rgba(255, 255, 255, 0.7)'}}>Admin Access</h3>
           </div>
           <div className="container text-center mt-4">
            <div className="col">
            <Link to="/loginsignup" className="links" style={{textAlign:'center', backgroundColor:"#dd9440", padding:"15px",border:"solid #dd9440", borderRadius:"10px"}}>Login or Register</Link>
            </div>
           </div>

        </>
    )

}
export default AdminHome;