import React from 'react';
import { Outlet } from 'react-router-dom';

export function Posts(){

    return(
      <>
        <h2>Posts</h2>
        <Outlet />
      </>
    );
}
