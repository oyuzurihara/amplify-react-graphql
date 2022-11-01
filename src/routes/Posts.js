import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export function Posts(){
    return(
      <>  
        <h2>Posts</h2>
        {/* <nav>
          <Link to="./Post">詳細</Link>
        </nav> */}

        <Outlet />
      </>
    );
}
