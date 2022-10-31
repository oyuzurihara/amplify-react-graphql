import React from 'react';
import { AmplifyRequireNewPassword } from '@aws-amplify/ui-react-v1';

export function ResetPassword(){

    return(
      <AmplifyRequireNewPassword
        headerText="新しいパスワードを入力"
        submitButtonText="送信"
        slot="require-new-password"
      />
    );
}

