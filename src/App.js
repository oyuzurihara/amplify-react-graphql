import React from 'react';
import './App.css';
import { AmplifyAuthenticator } from '@aws-amplify/ui-react-v1';
import { dictionary } from './features/dictionary/dictionary.js';
import { I18n } from 'aws-amplify';
import { SignIn } from './features/Auth/SignIn.js';
import { ForgotPassword } from './features/Auth/ForgotPassword.js';
import { SignUp } from './features/Auth/SignUp.js';
import { ResetPassword } from './features/Auth/ResetPassword.js';
import { ConfirmSignUp } from './features/Auth/ConfirmSignUp.js';
import { MainView } from './features/View/MainView.js';

function App() {

  I18n.putVocabularies(dictionary);
  I18n.setLanguage("ja");

  return (
    <AmplifyAuthenticator>
      <SignIn />
      <ForgotPassword />
      <SignUp />
      <ResetPassword />
      <ConfirmSignUp />
      <MainView />
    </AmplifyAuthenticator>
  );
}

export default App;
