import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';


const Login = () => {

const [isSignInForm, setIsSignInForm] = useState(true);
const [errorMessage , setErrorMessage] = useState(null);
const navigate = useNavigate();
const dispatch = useDispatch();

const name = useRef(null);
const email = useRef(null);
const password = useRef(null);

const handleButtonClick = () => {
  

  console.log(email.current.value);
  console.log(password.current.value);

  const message = checkValidData(
    name.current?.value || "", 
    email.current.value, 
    password.current.value, 
    isSignInForm
  );

  setErrorMessage(message);

  if(message) return;

  if(!isSignInForm){
    //SignUp Logic
    createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name.current.value, 
      photoURL: "https://occ-0-4994-2186.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229"
    }).then(() => {
      // Profile updated!
      const {uid , email, displayName, photoURL} = auth.currentUser;
      dispatch(addUser({uid:uid , email: email, displayName: displayName, photoURL: photoURL}));

      navigate("/browse");
    }).catch((error) => {
      // An error occurred
      setErrorMessage(error.message);
    });
    console.log(user);
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage);
  });
  }
  else{
    //SignIn Logic
    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    navigate("/browse");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage);
  });
  }

}

const toggleSignInForm = () =>{
  setIsSignInForm(!isSignInForm);
};
  

  return (
    <div>
      <Header />
      <div className='absolute'>
        <img 
          src="https://assets.nflxext.com/ffe/siteui/vlv3/36a4db5b-dec2-458a-a1c0-662fa60e7473/1115a02b-3062-4dcc-aae0-94028a0dcdff/IN-en-20240820-TRIFECTA-perspective_WEB_eeff8a6e-0384-4791-a703-31368aeac39f_medium.jpg"
          alt='logo'
        />
      </div>
      <form
        onSubmit={(e)=>e.preventDefault()} 
        className="w-3/12 absolute p-12 bg-black my-36 mx-auto left-0 right-0 text-white rounded-2xl bg-opacity-80">
        <h1 className='font-bold text-3xl py-4'>
          {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
        {!isSignInForm && <input 
          ref={name}
          type='text' 
          placeholder='Full Name' 
          className='p-4 my-2 w-full bg-gray-700'
        />}
        <input 
          ref={email}
          type='text' 
          placeholder='Email Address' 
          className='p-4 my-2 w-full bg-gray-700'
        />
        <input 
          ref={password}
          type='password' 
          placeholder='Password' 
          className='p-4 my-2 w-full bg-gray-700'
        />
        <p className='font-bold text-red-500 py-2 text-lg'>
          {errorMessage}
        </p>
        <button className='p-4 my-4 bg-red-600 w-full rounded-lg' onClick={handleButtonClick}>
         {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
        {isSignInForm ? "New to Netflix? Sign Up Now" : "Already Registered? Sign In Now"}
          
        </p>     
      </form>
    </div>
  )
}

export default Login;
