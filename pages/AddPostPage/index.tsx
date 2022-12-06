import { Box, Button, TextField } from "@mui/material"
import Header from "../../Components/Header/Header"
import styles from './styles.module.scss'
import Typography from '@mui/material/Typography';
import axios from "axios";
import { getCookie } from "cookies-next";
import router from "next/router";
import { useEffect } from "react";

const AddPostPage = () => {
  let user={}
  const id = getCookie('userId')

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_URL}/api/users/${id}`)
      .then(response=>{user = response.data})
  }, [])
  
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
   
    axios
      .post(`${process.env.NEXT_PUBLIC_URL}/api/posts`, {
        data:{
          Title: data.get('title'),
          Content: data.get('content'),
          User: user
        }
      })
      .then(response => {
        router.push('/HomePage')
      })
      .catch(error => {
        console.log('An error occurred:', error.response);
      });
  };

  return (
    <>
      <Header/>
      <div className={styles.container}>
      <div className={styles.pageTitle}>
        Dodaj nowy post
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
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Dodaj post
        </Button>
      </Box>
    </div>

    </>
  )

}

export default AddPostPage