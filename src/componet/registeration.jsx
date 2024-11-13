import { Link } from "react-router-dom";

function Registeration() {
  return (
    <div>
      <form>
      <label htmlFor="username">username</label>
      <input type="text" />
      <br />
      <label htmlFor="password">Password</label>
      <input type="password" />
      <br />
      <button>Register</button>
      </form>


      <div>
      <div>if you have an account </div>
        <button><Link to="/login" >login </Link></button>
      </div>
    </div>
  );
}

export default Registeration;
