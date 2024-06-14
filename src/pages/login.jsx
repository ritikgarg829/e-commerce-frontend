import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import toast from 'react-hot-toast';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase-Auth/firebaseAuth.js";
import { useLoginMutation } from "../redux/api/user-api.js";
import { useNavigate } from 'react-router-dom';

import "../Styles/login.css";

const Login = () => {
    const [gender, setGender] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [login] = useLoginMutation();
    const navigate = useNavigate();

    const loginHandler = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const { user } = await signInWithPopup(auth, provider);
            const res = await login({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
                gender: gender,
                role: "user",
                dob: birthdate,
                _id: user.uid,
            });

            if ("data" in res) {
                toast.success(res.data.message);
                navigate('/');  // Redirect to the home page
            } else {
                const error = res.error;
                const message = (error.data).message;
                toast.error(message);
            }
        } catch (error) {
            toast.error("Sign in failed");
        }
    };

    return (
        <div className="login">
            <main>
                <h1 className="heading">Login</h1>
                <div className="form">
                    <label>Gender</label>
                    <select required value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>

                    <label>Date Of Birth</label>
                    <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
                </div>
                <div>
                    <p>Already Signed in Once</p>
                    <button onClick={loginHandler}>
                        <FcGoogle />
                        <span>Sign in With Google</span>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Login;
