import { useState } from 'react';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import React from 'react';

import './SignInPage.scss'
import { AppConstants } from '../../Constants/AppConstants';
import { AppUtil } from '../../Util/AppUtil';

function SignInPage(props: any) {

  const [justifyActive, setJustifyActive] = useState('tab1');
  const [signUpDisabled, setSignUpDisabled] = React.useState(true);
  const [invalidCredentialError, setInvalidCredentialError] = React.useState(false);

  const handleJustifyClick = (value: any) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  async function signUpButtonClick() {
    const nameElm = document.getElementById("SignUpName") as HTMLInputElement;
    const userNameElm = document.getElementById("SignUpUserName") as HTMLInputElement;
    const emailElm = document.getElementById("SignUpEmail") as HTMLInputElement;
    const passwordElm = document.getElementById("SignUpPassword") as HTMLInputElement;

    const name = nameElm.value;
    const userName = userNameElm.value;
    const email = emailElm.value;
    const password = passwordElm.value;

    if (name !== "" && userName !== "" && email !== "" && password !== "") {
      const response = await fetch(AppConstants.serverUrl+ '/UserService/signup?username=' + userName +'&password='+ password
                                    +'&name=' + name +'&email=' + email);
      
      let data = await response.text();
      data = AppUtil.getResponseBody(data)?.status?.status;
      if (data === 'Success') {
        handleJustifyClick('tab1')
        nameElm.value = "";
        userNameElm.value = "";
        emailElm.value = "";
        passwordElm.value = "";
        (document.getElementById('termsCheckDefault') as HTMLInputElement).checked = false;
        setSignUpDisabled(true);
      } else {
        alert("User could not be created. Please contact system administrator.");
      }
    }
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      signInButtonClick();
    }
  }
  
  async function signInButtonClick() {
    const userName = (document.getElementById("SignInUserName") as HTMLInputElement).value;
    const password = (document.getElementById("SignInPassword") as HTMLInputElement).value;

    if (userName !== "" && password !== "") {
      // server call
      const response = await fetch(AppConstants.serverUrl+ '/UserService/signin?username=' + userName +'&password=' + password);
      if (!response.body) {
        setInvalidCredentialError(true);
      } else {
        const data = await response.text();
        const user = AppUtil.getResponseBody(data)?.user;
        props.setUser(user);
        setInvalidCredentialError(false);
        props.setCurrentPage(AppUtil.isUserAdmin(user)? 'AdminPage' : 'DollSelection');
      }
    } else {
      console.log("Please enter username and password");
    }
  }

  function conditionsChecked(_value: React.ChangeEvent) {
    const name = (document.getElementById("SignUpName") as HTMLInputElement).value;
    const userName = (document.getElementById("SignUpUserName") as HTMLInputElement).value;
    const email = (document.getElementById("SignUpEmail") as HTMLInputElement).value;
    const password = (document.getElementById("SignUpPassword") as HTMLInputElement).value;

    if ((document.getElementById('termsCheckDefault') as HTMLInputElement).checked && name !== "" && userName !== "" && email !== "" && password !== "") {
      setSignUpDisabled(false);
    } else {
      setSignUpDisabled(true);
    }
  }

  return (
    <div className='sign-in-page-container'>

    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>

        <MDBTabsPane show={justifyActive === 'tab1'}>
          <MDBInput wrapperClass='mb-4' label='Username' id='SignInUserName' type='email'/>
          <MDBInput wrapperClass='mb-4' label='Password' id='SignInPassword' type='password' onKeyDown={handleKeyDown}/>
          {invalidCredentialError && <p className="text-center invalid-credentials-error">Invalid username and/or password.</p>}
          <MDBBtn className="mb-4 w-100" onClick={() => {signInButtonClick()}}>Sign in</MDBBtn>
          <p className="text-center">Not a member? <a href="#!" onClick={() => {setJustifyActive("tab2")}}>Register</a></p>
        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'tab2'}>
          <MDBInput wrapperClass='mb-4' label='Name' id='SignUpName' type='text'/>
          <MDBInput wrapperClass='mb-4' label='Username' id='SignUpUserName' type='text'/>
          <MDBInput wrapperClass='mb-4' label='Email' id='SignUpEmail' type='email'/>
          <MDBInput wrapperClass='mb-4' label='Password' id='SignUpPassword' type='password'/>
          <div className='d-flex justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='termsCheckDefault' onChange={(value) => conditionsChecked(value)} label='I have read and agree to the terms' />
          </div>

          <MDBBtn className="mb-4 w-100" disabled={signUpDisabled} onClick={() => {signUpButtonClick()}}>Sign up</MDBBtn>
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
    </div>
  );
}

const memo = React.memo(SignInPage);
export { memo as SignInPage };