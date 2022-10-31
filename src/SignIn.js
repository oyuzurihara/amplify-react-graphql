import React from 'react';
import { AmplifySignIn } from '@aws-amplify/ui-react-v1';

export function SignIn(){

    return(
      <AmplifySignIn
        slot="sign-in"
        headerText="サインイン画面"
        submitButtonText="サインイン"
        formFields={[
          {
            type: "username",
            label: "サインインID *",
            placeholder: "ユーザ名を入力",
            required: true,
          },
          {
            type: "password",
            label: "パスワード *",
            placeholder: "パスワードを入力",
            required: true,
          },
        ]}
      />
    );
}

