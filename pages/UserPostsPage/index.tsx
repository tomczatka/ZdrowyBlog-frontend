import styles from './styles.module.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ArticleTile from '../../Components/ArticleTile/ArticleTile'
import Header from '../../Components/Header/Header'
import { getCookie } from 'cookies-next'
import router from 'next/router'

interface Post {
  data: any
}

const UserPostsPage = () => {
  const [posts, setPosts] = useState<Post>()

  useEffect(() => {
    axios.get('https://zdrowyblog-backend.herokuapp.com/api/posts?populate=*')
      .then(response => setPosts(response.data))
  }, [])

  async function handleDelete(id: number) {
    axios.delete(`https://zdrowyblog-backend.herokuapp.com/api/posts/${id}`)
    .then(response => {
      axios.get('https://zdrowyblog-backend.herokuapp.com/api/posts?populate=*')
      .then(response => setPosts(response.data))
    })
    .catch(error => {
      console.log('An error occurred:', error.response);
    });
  }

  return (
    <>
    <Header/>
      <div className= {styles.articleContainer}>
        {posts && posts.data.map((post: any) => (
          <div key={post.id}>
            {post.attributes.User.data.id == getCookie('userId')
              ? <ArticleTile
                  id={post.id}
                  title={post.attributes.Title}
                  content={post.attributes.Content}
                  author={post.attributes.User.data.attributes.username}
                  editable
                  handleDelete={()=>handleDelete(post.id)}
                />
              : null
            }
          </div>
        ))}
      </div>
    </>
  );
}

export default UserPostsPage