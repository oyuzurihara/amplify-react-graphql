import React from 'react';
import { AmplifyConfirmSignUp } from '@aws-amplify/ui-react-v1';

export function ConfirmSignUp(){

    return(
      <AmplifyConfirmSignUp
        headerText="確認コードを入力してください"
        submitButtonText="送信"
        slot="confirm-sign-up"
      />
    );
}

