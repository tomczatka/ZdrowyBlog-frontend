import styles from './styles.module.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ArticleTile from '../../Components/ArticleTile/ArticleTile'
import Header from '../../Components/Header/Header'
import { getCookie } from 'cookies-next'
import router from 'next/router'
import { Typography } from '@mui/material'

interface Post {
  data: any
}

const UserPostsPage = () => {
  const [posts, setPosts] = useState<Post>()

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?populate=*&sort=id:desc&filters[User][id][$eq]=${getCookie('userId')}`)
      .then(response => setPosts(response.data))
  }, [])

  async function handleDelete(id: number) {
    axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`)
    .then(response => {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?populate=*&sort=id:desc`)
      .then(response => setPosts(response.data))
    })
    .catch(error => {
      console.log('An error occurred:', error.response);
    });
  }

  return (
    <>
    <Header/>
      <div className={styles.pageTitle}>
        Twoje posty
      </div>
      <div className= {styles.articleContainer}>
        {posts && posts.data.map((post: any) => (
          <div key={post.id}>
            <ArticleTile
              id={post.id}
              title={post.attributes.Title}
              content={post.attributes.Content}
              author={post.attributes.User.data.attributes.username}
              editable
              handleDelete={()=>handleDelete(post.id)}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default UserPostsPage