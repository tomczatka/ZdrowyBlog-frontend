import styles from './styles.module.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ArticleTile from '../../Components/ArticleTile/ArticleTile'
import Header from '../../Components/Header/Header'
import { Grid, Pagination } from '@mui/material'
import router from 'next/router'
import qs from 'qs'
import { number } from 'yup'


interface Post {
  data: any
}

interface Pagination{
    data: {}
    meta: {
      pagination:{
        page: number,
        pageSize: number, 
        pageCount:number, 
        total: number
      }
    }
}


const HomePage = () => {
  const [posts, setPosts] = useState<Post>()
  const [meta, setMeta] = useState<Pagination>()
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get(`https://zdrowyblog-backend.herokuapp.com/api/posts?sort=id:desc&populate=*&pagination[page]=${page}&pagination[pageSize]=10`)
      .then(response => {
        setPosts(response.data)
        setMeta(response.data)
      })
  }, [])


  const handleChange = (e: any, p: number) => {
    setPage(p);
    axios.get(`https://zdrowyblog-backend.herokuapp.com/api/posts?sort=id:desc&populate=*&pagination[page]=${p}&pagination[pageSize]=10`)
      .then(response => {
        setPosts(response.data)
        setMeta(response.data)
      })
    router.push('/HomePage')
  }

  return (
    <>
    <Header/>
      <div className= {styles.articleContainer}>
        {posts && posts.data.map((post: any) => (
          <div key={post.id}>
            <ArticleTile
              id={post.id}
              title={post.attributes.Title}
              content={post.attributes.Content}
              author={post.attributes.User?.data.attributes.username}
            />
          </div>
        ))}
        <Grid
          item
          container
          justifyContent={'center'}
          m={'20px'}
          width={'auto'}
        >
          <Pagination
            count={meta?.meta.pagination.pageCount}
            size="large"
            page={page}
            variant="outlined"
            onChange={handleChange}
          />
        </Grid>
      </div>
    </>
  );
}

export default HomePage