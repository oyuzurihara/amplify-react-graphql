import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function Post(){

    const { postId } = useParams();
    const [post, setPost] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            const data = await res.json();
            setPost(data);    
        };
        fetchPost();
    }, [postId]);

    return(
      <>
        <h3>これは詳細 postId: { postId }</h3>
        <div>
          <p>ID: {post.id}</p>
          <p>TITLE: {post.title}</p>
          <p>DETAIL: {post.body}</p>
        </div>
      </>  
    );
    
}
