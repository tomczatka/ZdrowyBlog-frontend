import { Box, Button, TextField } from "@mui/material"
import Header from "../../Components/Header/Header"
import styles from './styles.module.scss'
import Typography from '@mui/material/Typography';
import axios from "axios";
import { getCookie } from "cookies-next";
import router from "next/router";
import { useEffect } from "react";


interface Post {
  data: any
}

const EditPostPage = (post: any) => {

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    axios
      .put(`https://zdrowyblog-backend.herokuapp.com/api/posts/${post.post.data.id}`, {
        data:{
          Title: data.get('title'),
          Content: data.get('content'),
        }
      })
      .then(response => {
        router.push('/UserPostsPage')
      })
      .catch(error => {
        console.log('An error occurred:', error.response);
      });
  };

  return (
    <>
      <Header/>
      <div className={styles.container}>
        <div className={styles.loginTitle}>
          Edytuj post
        </div>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Typography>Tytuł</Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            name="title"
            autoFocus
            className={styles.textField}
            defaultValue={post.post.data.attributes.Title}
          />
          <Typography>Treść</Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            name="content"
            id="content"
            multiline
            rows={10}
            className={styles.textField}
            defaultValue={post.post.data.attributes.Content}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Zatwierdź
          </Button>
        </Box>
      </div>
    </>
  )

}

export async function getServerSideProps(context: any) {
  const {id} = context.query
  const res = await fetch(`https://zdrowyblog-backend.herokuapp.com/api/posts/${id}`)
  const post = await res.json()
  return{
    props: {
      post
    }
  }
}

export default EditPostPage