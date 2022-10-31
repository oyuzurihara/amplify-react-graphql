import React from 'react';
import { AmplifyForgotPassword } from '@aws-amplify/ui-react-v1';

export function ForgotPassword(){
    return(
      <AmplifyForgotPassword
        slot="forgot-password"
        headerText="パスワードを忘れた"
        usernameAlias="email"
        formFields={[
          {
            type: "username",
            label: "ユーザ名を入力してください",
            placeholder: "ユーザ名",
          },
        ]}
        sendButtonText="送信"
        submitButtonText="送信"
      />
    );
}
