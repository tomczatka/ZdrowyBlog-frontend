import styles from './styles.module.scss'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import axios from 'axios';
import { useRouter } from 'next/router'
import { setCookie } from 'cookies-next'
import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material'


const Login = () => {
  const router = useRouter()
  const [open, setOpen] = React.useState(false);
  const [errorText, setErrorText] = React.useState()

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`, {
        identifier: data.get('email'),
        password: data.get('password'),
      })
      .then(response => {
        setCookie('jwt', response.data.jwt, {maxAge: 60 * 60 * 24})
        setCookie('userId', response.data.user.id, {maxAge: 60 * 60 * 24})
        router.push('/HomePage')
      })
      .catch(error => {
        setErrorText(error.response.data.error.message) 
        setOpen(true)
        console.log('An error occurred:', error.response);
      });
  };
  
  
  return(
    <div className={styles.container}>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <DialogContentText >
            {errorText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <div className={styles.loginTitle}>
        Zaloguj się
      </div>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            autoFocus
            className={styles.textField}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Hasło"
            type="password"
            id="password"
            autoComplete="current-password"
            className={styles.textField}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Zaloguj się
          </Button>
          <Grid item>
            <Link href="/Auth/RegisterPage" variant="body2">
              {"Nie masz konta? Zarejestruj się"}
            </Link>
          </Grid>
        </Box>
    </div>
  )
}

export default Login