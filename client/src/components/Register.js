import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";




const Register = (props) => {
  const [fields, setFields] = useState({ username: "", password: "" });
  const [warnning,setWarnning]=useState(null)

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value,
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch("/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });
    const data = await res.json();
    console.log(data);
    if(data.authorised){
    navigate("/marketplace")
  }else {
    console.log(data)
    setWarnning(data.msg)
  }


  };

  return (
    <div className="auth-wrapper">
    <div className="auth-inner">
    <form onSubmit={handleSubmit}>

      <h3>Register</h3>
      <div className='mb-3'>

        <label htmlFor="username">Username</label>
        <br></br>
        <input
          value={fields.username}
          onChange={handleChange}
          placeholder='Username'
          className='form-control'
          name="username"
          type="text"
          id="username"
        />
      </div>

      <div className='mb-3'>

        <label htmlFor="password">Password</label>
        <br></br>
        <input
          value={fields.password}
          onChange={handleChange}
          name="password"
          type="password"
          id="password"
          className='form-control'
          placeholder='Enter password'
        />

      </div>
      {warnning&&<p>{warnning}</p>}
      <div className='d-grid'>
      <input  type="submit" value="Register" />
      </div>

      <p className='forgot-password text-right'>

        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </form>
    </div>
        </div>
  );
};

export default Register;
