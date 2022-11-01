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
import { Routes, Route, Link, NavLink, BrowserRouter } from 'react-router-dom';
import { Home } from './routes/Home.js';
import { TmpView } from './routes/TmpView.js';
import { NotFound } from './routes/NotFound.js';
import { Posts } from './routes/Posts.js';
import { Post } from './routes/Post.js';

function App() {

  I18n.putVocabularies(dictionary);
  I18n.setLanguage("ja");

  return (
    <>
      {/* <AmplifyAuthenticator>
        <SignIn />
        <ForgotPassword />
        <SignUp />
        <ResetPassword />
        <ConfirmSignUp />
        <MainView />
      </AmplifyAuthenticator> */}
      <BrowserRouter>
        <h1>メモ帳（←は共通表示）</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Posts">Posts</Link></li>
            <li><Link to="/TmpView">TmpView</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route index element={<Home message='This is Home' />} />
          <Route path="/Posts" element={<Posts />}>
            <Route path="Post" element={<Post />} />
          </Route >
          <Route path="/TmpView" element={<TmpView />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
