import React from 'react';
import { AmplifySignUp } from '@aws-amplify/ui-react-v1';

export function SignUp(){

    return(
      <AmplifySignUp
        slot="sign-up"
        headerText="サインアップ"
        haveAccountText=""
        signInText="サインインに戻る"
        submitButtonText="アカウント作成"

        formFields={[
          {
            type: "username",
            label: "ユーザ名を入力してください",
            placeholder: "ユーザ名",
          },
          {
            type: "email",
            label: "メールアドレスを入力してください",
            placeholder: "メールアドレス",
          },
          {
            type: "password",
            label: "パスワードを入力してください",
            placeholder: "パスワード",
            inputProps: { required: true, autocomplete: "new-password" },
          },
        ]}
      />
    );
}

