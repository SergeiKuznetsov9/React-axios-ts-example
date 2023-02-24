import React, {FC, useEffect} from 'react'
import { createPosts, getPosts1, getPosts2 } from '../api/requests'

export const Posts: FC = () => {

  useEffect( () => {
    getPosts1
      .then(res => console.log(res))
      .catch(error => console.log(error));
    getPosts2();
    createPosts()    
  }, [])


  return <div>
    Posts
  </div>   

  
}
