import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const Register = createContext();
const initalstate = {
  user: [],
  isloading: false,
  error: "",
  islogin: false,
  iserror: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "register-request":
      return {
        ...state,
        isloading: true,
        error: null,
      };
    case "register-success":
      return {
        ...state,
        isloading: false,
      };
    case "register-error":
      return {
        ...state,
        isloading: false,
        error: action.payload,
        iserror: true,
      };
    case "incorect-data":
      return {
        ...state,
        islogin: true,
      };
    case "correct-data":
      return {
        ...state,
        islogin: false,
      };
    case "logout":
      return {
        state: initalstate,
      };
  }
}

function Registercontext({ children }) {
  const [state, dispatch] = useReducer(reducer, initalstate);
  const [apidata, setApidata] = useState([]);
  const [administrator, setAdministrator] = useState({
    username: "admin",
    password: "admin",
  });

  function login(userinfo) {
    const checkCredentials = (input) => {
      const { username, password } = input;

      return apidata.some(
        (student) =>
          student.username === username && student.password === password
      );
    };

    const credentials = userinfo;

    if (checkCredentials(credentials)) {
      dispatch({ type: "login" });
      const student = apidata.find((s) => s.username === credentials.username);
      dispatch({ type: "register-success", payload: student });
    }
  }

  useEffect(
    function () {
      async function fetchdata() {
        try {
          const res = await fetch("http://localhost:8000/students");
          const data = await res.json();
          setApidata(data);
        } catch (err) {
          console.log(err);
          dispatch({ type: "register-error", payload: err});
        }
      }
      fetchdata();
    },
    [setApidata]
  );

  return (
    <Register.Provider
      value={{
        dispatch,
        state,
        login,
        administrator,
      }}
    >
      {children}
    </Register.Provider>
  );
}

function useRegister() {
  const context = useContext(Register);
  if (context == undefined)
    throw new Error("Registercontext is out of provider");
  return context;
}
export { useRegister, Registercontext };
