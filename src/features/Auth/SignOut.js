import React from 'react';
import { AmplifySignOut } from '@aws-amplify/ui-react-v1';

export function SignOut(){

    return(
      <AmplifySignOut
        slot="sign-out"
        buttonText="サインアウト"
      />
    );
}

