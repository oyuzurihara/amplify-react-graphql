import React from "react";
import { AmplifyAuthenticator } from '@aws-amplify/ui-react-v1';
import { SignIn } from './SignIn.js';
import { ForgotPassword } from './ForgotPassword.js';
import { SignUp } from './SignUp.js';
import { ResetPassword } from './ResetPassword.js';
import { ConfirmSignUp } from './ConfirmSignUp.js';
import { NoteIndex } from '../View/NoteIndex.js';


export function Mix(){

    return(
      <AmplifyAuthenticator>
        <SignIn />
        <ForgotPassword />
        <SignUp />
        <ResetPassword />
        <ConfirmSignUp />
        <NoteIndex />
      </AmplifyAuthenticator>
    );
}
