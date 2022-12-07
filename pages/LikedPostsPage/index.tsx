import styles from './styles.module.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ArticleTile from '../../Components/ArticleTile/ArticleTile'
import Header from '../../Components/Header/Header'
import { getCookie } from 'cookies-next'

interface Post {
  data: any
}

const LikedPostsPage = () => {
  const [likes, setLikes] = useState<Post>()

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/likes?populate=*&sort=id:desc&filters[user][id][$eq]=${getCookie('userId')}`)
      .then(response => setLikes(response.data))
  }, [])

  return (
    <>
    <Header/>
      <div className={styles.pageTitle}>
        Twoje polubione posty
      </div>
      <div className= {styles.articleContainer}>
        {likes && likes.data.map((like: any) => (
          <div key={like.id}>
            <ArticleTile
              id={like.attributes.post.data.id}
              title={like.attributes.post.data.attributes.Title}
              content={like.attributes.post.data.attributes.Content}
              author={like.attributes.post.data.attributes.User?.data.attributes.username}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default LikedPostsPage