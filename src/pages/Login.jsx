import React, { useState } from "react";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
  }
  h1 {
    padding: 0 20rem;
  }
  .form {
    ${"" /* width: 60%; */}
    display: grid;
    padding: 1.8rem;
    border-radius: 0.5rem;
    ${
      "" /* grid-template-columns: ${({ showPassword }) =>
      showPassword ? "1fr 1fr" : "2fr 1fr"}; */
    }
  }
`;

function Login() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [view,setView]=useState(false)

  const handleLogIn = async () => {
    try {
      const { email, password } = formValues;
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      console.log(err);
    }

    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) navigate("/");
    });
  };

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="form flex-col items-center justify-center  bg-white ">
            <div className="title ">
              <div className="form gap-3">
              <h3 className="text-black text-[2rem] font-bold">Sign In</h3>
                <input
                  className="text-white bg-black opacity-60 text-[1.2rem] rounded px-8 py-2 border-2 border-solid border-black focus:outline-white"
                  type="email"
                  placeholder="Email Address"
                  value={formValues.email}
                  name="email"
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
                <input
                  className="text-white bg-black opacity-60 text-[1.2rem] px-8 py-2 rounded border-2 border-solid border-black focus:outline-white"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formValues.password}
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
                <button
                  className="bg-[#e50914] border-none cursor-pointer mt-4 text-white rounded font-bold text-[1.05rem]"
                  style={{ padding: ".5rem 1rem" }}
                  onClick={handleLogIn}
                >
                  login{" "}
                </button>
                <div className="flex my-3">
                  <p className="text-gray-500">New to Netflix? {" "}</p>
                  <Link href="/signup">
                    <p className="text-bold text-black">{" "}Sign up now.</p>
                  </Link>
                </div>
              <p className="text-gray-500 text-sm w-72">This page is protected by Google reCAPTCHA to ensure you're not a bot.{!view&&<span className="text-blue-400 cursor-pointer pl-1" onClick={()=>setView(true)}>view more</span> }</p>
              {view && <p className="text-gray-500 text-sm w-72">
              The information collected by Google reCAPTCHA is subject to the Google <span className="text-blue-400 font-semibold">Privacy Policy </span> and <span className="text-blue-400 font-semibold">Terms of Service</span>,
               and is used for providing, maintaining, and improving the reCAPTCHA service and for general security purposes 
               (it is not used for personalised advertising by Google).</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Login;
