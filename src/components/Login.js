import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../App.css"

import axios from 'axios'

const LoginForm = () => {


    const [inputValue, setInputValue] = useState(
        {
            emailoruser: '',
            password: '',
            isToggled: false,
            emailoruserError: '',
            passwordError: '',
            emailoruserStatus: '',
            passwordStatus: ''
        }
    )

    const [userInfo, updateUserInfo] = useState([])

    const [popupStyle, showPopup] = useState("hide")

    useEffect(
        () => {
            getUserInfo();
        }
    )

    useEffect(
        () => {

        }, [userInfo]
    )

    useEffect(
        () => { }, [inputValue]
    )


/******* Get userInfo from fakestoreapi website *******/
    let api = axios.create(
        {
            baseURL: 'https://fakestoreapi.com'
        }
    )

    async function getUserInfo() {

        let res = await api.get('/users');

        updateUserInfo(res.data)

    }

    /*********  Function to handle input change *************/
    const handleInputChange = (event, ele) => {

        if (ele === 'user') {

            setInputValue({ ...inputValue, emailoruser: event.target.value, emailoruserStatus: '' });

        }

        if (ele === 'password') {

            setInputValue({ ...inputValue, password: event.target.value, passwordStatus: '' });

        }

    };

    /********** Function to check if a user exists with given username, email, and password **********/

    const userExists = (input) => {

        return userInfo.some(user => {

            if (user.username === input || user.email === input) {

                return user.username === input || user.email === input

            } else {

                return user.password === input
            }

        });

    }

    const userValidation = userExists(inputValue.emailoruser);

    const passwordValidation = userExists(inputValue.password);

    /**************** Function to handle focus out *****************/

    const handleFocusOut = (ele) => {

        if (ele === 'user') {

            if (inputValue.emailoruser.trim() === '') {

                setInputValue({ ...inputValue, emailoruserError: "Enter User", emailoruserStatus: 'failure' });

            } else if (!userValidation) {

                setInputValue({ ...inputValue, emailoruserError: "Enter Valid Username/Email", emailoruserStatus: 'failure' });

            } else {

                setInputValue({ ...inputValue, emailoruserError: '', emailoruserStatus: 'success' });

            }
        } if (ele === 'password') {

            if (inputValue.password.trim() === '') {

                setInputValue({ ...inputValue, passwordError: "Enter Password", passwordStatus: 'failure' });;

            } else if (!passwordValidation) {

                setInputValue({ ...inputValue, passwordError: "Enter Valid Password", passwordStatus: 'failure' });

            } else {

                setInputValue({ ...inputValue, passwordError: '', passwordStatus: 'success' });

            }

        };
    }

    /***************** Function to handle focus in ********************/
    const handleFocusIn = (ele) => {

        if (ele === 'user') {

            setInputValue({ ...inputValue, emailoruserError: '', emailoruserStatus: '' });;

        } if (ele === 'password') {

            setInputValue({ ...inputValue, passwordError: '', passwordStatus: '' });

        }

    };

    /************* Function to handle to check user is valid or not ***********/
    const handleSubmit = (e) => {

        e.preventDefault();


        if (userValidation && passwordValidation) {

            console.log("User Logged In Successfully");

            showPopup("login-popupSuccess")

            setTimeout(() => showPopup("hide"), 2500);

            setInputValue({ ...inputValue, emailoruserStatus: 'success', emailoruserError: '' });

        } else {

            console.log("please check you username or Email");

            showPopup("login-popup")

            setTimeout(() => showPopup("hide"), 2500);

        }

    };

    return (

        <>
            
            <div className = "page d-flex justify-content-center align-items-center">

                 {/*** Login Page background card  ***/ }
              
                <div className = "cover" align = "center">

                    {/*** Login Heading and dashed lines move under   ****/}
                  
                    <h4 className = "active-animation" align = "center">Login</h4>

                    {/************************ EMAIL Or USER  *******************************/}
                    
                    <div className = "wrapper">
                       
                        {/*** Email or Username Label *****/}

                        <div className = "labelStyle"> Email or Username</div>

                        {/*** User Icon Inside texbox  and Icon color Change after validation *****/}
                      
                        <div className = {inputValue.emailoruserStatus === 'success' ? 'iconSuccess' : inputValue.emailoruserStatus === 'failure' ? 'iconSuccess' : 'icon'}>

                            <FontAwesomeIcon icon = {["fas", "user"]} />

                        </div>

                        {/*** User textbox and validation ***/}

                        <div>

                            <input type = "text"
                                className  = {inputValue.emailoruserStatus === 'success' ? 'userTextboxSuccess' : inputValue.emailoruserStatus === 'failure' ? 'userTextboxFailure' : 'userTextbox'}
                                defaultValue = {inputValue.emailoruser}
                                onChange = {(e) => { handleInputChange(e, 'user') }}
                                onBlur = {() => { handleFocusOut('user') }}
                                onFocus = {() => { handleFocusIn('user') }}
                            />

                        </div>

                        {/**** Error Message *****/}

                        {
                            inputValue.emailoruserError != null &&

                            <div className = "ErrorMsg">

                                {inputValue.emailoruserError}

                            </div>
                        }

                    </div>

                    {/********************** PASSWORD ************************/}
                    
                    {
                        inputValue.isToggled ?

                            <>

                                {/****************** Password Visible TextBox *****************/}

                                <div className = "wrapper" >

                                    {/*********** Password Label ****************/}

                                    <div className = "labelStyle">Password</div>

                                    {/************* Lock Icon  Inside Textbox *************/}

                                    <div className = {inputValue.passwordStatus === 'success' ? 'iconSuccess' : inputValue.passwordStatus === 'failure' ? 'iconSuccess' : 'icon'}>

                                        <FontAwesomeIcon icon={["fas", "lock"]} />

                                    </div>

                                    {/************* Password Visible Textbox,validation  *************/}

                                    <div>
                                        <input type="text"
                                            className = {inputValue.passwordStatus === 'success' ? 'userTextboxSuccess' : inputValue.passwordStatus === 'failure' ? 'userTextboxFailure' : 'userTextbox'}
                                            defaultValue = {inputValue.password}
                                            onChange = {(e) => { handleInputChange(e, 'password') }}
                                            onBlur = {() => { handleFocusOut('password') }}
                                            onFocus = {() => { handleFocusIn('password') }}
                                            id = "password" />

                                    </div>

                                    <div className = {inputValue.passwordStatus === 'success' ? 'icon1Success' : inputValue.passwordStatus === 'failure' ? 'icon1Success' : 'icon1'}

                                        onClick = {

                                            () => {

                                                setInputValue({ ...inputValue, isToggled: false })

                                            }
                                        }>
                                    
                                        {/******** Eye Icon Inside texbox placed at right side ******/}

                                        <FontAwesomeIcon icon = {["fas", "eye"]} />

                                    </div>

                                     {/************* Error Message ************/}

                                    {
                                        inputValue.passwordError !== null &&

                                        <div className = "ErrorMsg">

                                            {inputValue.passwordError}

                                        </div>
                                    }
                                </div>

                            </> :
                            <>

                                 {/************* Password Invisible Textbox,validation  *************/}

                                <div className = "wrapper" >

                                     {/************* Password Label  *************/}

                                    <div className = "labelStyle">Password</div>

                                     {/************* Lock Icon  *************/}

                                    <div className ={inputValue.passwordStatus === 'success' ? 'iconSuccess' : inputValue.passwordStatus === 'failure' ? 'iconSuccess' : 'icon'}>


                                        <FontAwesomeIcon icon = {["fas", "lock"]} />

                                    </div>

                                     {/************* Password invisible Textbox,validation  *************/}

                                    <div>

                                        <input type = "password"
                                            className = {inputValue.passwordStatus === 'success' ? 'userTextboxSuccess' : inputValue.passwordStatus === 'failure' ? 'userTextboxFailure' : 'userTextbox'}
                                            defaultValue = {inputValue.password}
                                            onChange = {(e) => { handleInputChange(e, 'password') }}
                                            onBlur = {() => { handleFocusOut('password') }}
                                            onFocus = {() => { handleFocusIn('password') }}
                                            id = "password" />

                                    </div>

                                     {/*** Eye Slash icon inside textbox placed at right side***/}

                                    <div className = {inputValue.passwordStatus === 'success' ? 'icon1Success' : inputValue.passwordStatus === 'failure' ? 'icon1Success' : 'icon1'}

                                        onClick = {

                                            () => {

                                                setInputValue({ ...inputValue, isToggled: true })

                                            }

                                        }>

                                        <FontAwesomeIcon icon = {["fas", "eye-slash"]} />

                                    </div>

                                     {/************* Error Message *************/}

                                    {inputValue.passwordError !== null && <div className = "ErrorMsg">{inputValue.passwordError}</div>}

                                </div>

                            </>
                    }

                    {/********* Login Button ***********/}
                    <button
                        className = "login-btn "
                        onClick = {handleSubmit}>
                        Login
                    </button>

                    {/******** Popup  Login Success /Failure after click Login Button  ********/}

                    {inputValue.emailoruserStatus === 'success' && inputValue.passwordStatus === 'success' ?

                        <div className = {popupStyle}>

                            <p> Dear User Loggeded In Successfully</p>

                        </div> :

                        
                        <div className = {popupStyle}>

                            <p>Login Failed</p>

                            <p align = "center">Username or password incorrect</p>

                        </div>

                    }

                </div>
            </div>



        </>

    )
}

export default LoginForm