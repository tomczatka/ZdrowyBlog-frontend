import styles from './styles.module.scss'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import axios from 'axios'
import router from 'next/router'
import React from 'react'
import { Dayjs } from 'dayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material'

const Register = () => {
  const [open, setOpen] = React.useState(false);
  const [errorText, setErrorText] = React.useState()
  const [value, setValue] = React.useState<Dayjs | null>(null);

  const handleClose = () => {
    setOpen(false);
  };
  
  // async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
    
  //   axios
  //     .post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`, {
  //       username: data.get('username'),
  //       email: data.get('email'),
  //       password: data.get('password'),
  //     })
  //     .then(()=> {
  //       router.push('/Auth/LoginPage')
  //     })
  //     .catch(error => {
  //       setErrorText(error.response.data.error.message) 
  //       setOpen(true)
  //       console.log('An error occurred:', error.response);
  //     });
  // };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(value?.format('DDMMYYYY'))
    
    axios
      .get(`https://hdt.hipokrates.org/?pwz=${data.get('pwz')}&data_ur=${value?.format('DDMMYYYY')}&format=json`, {
      })
      .then((response)=> {
        console.log(response)
        // axios
        //   .post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`, {
        //     username: data.get('username'),
        //     email: data.get('email'),
        //     password: data.get('password'),
        //     PwzNumber: data.get('pwz'),
        //     dateOfBirth: value?.format('DD/MM/YYYY')
        //   })
        //   .then(()=> {
        //     router.push('/Auth/LoginPage')
        //   })
        //   .catch(error => {
        //     setErrorText(error.response.data.error.message) 
        //     setOpen(true)
        //     console.log('An error occurred:', error.response);
        //   });
      })
      .catch(error => {
        // setErrorText(error.response.data.error.message) 
        // setOpen(true)
        // console.log('An error occurred:', error.response);
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
      <div className={styles.registerTitle}>
        Rejestracja
      </div>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Imię i Nazwisko"
          name="username"
          autoComplete="email"
          autoFocus
          className={styles.textField}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="E-mail"
          name="email"
          type="email"
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
        <TextField
          margin="normal"
          required
          id="pwz"
          label="Numer PWZ"
          name="PwzNumber"
          autoFocus
          className={styles.textField}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Data urodzenia *"
            value={value}
            onChange={(newValue: any) => {
              setValue(newValue);
            }}
            renderInput={(params: any) => <TextField {...params} />}
            className={styles.datePicker}
          />
        </LocalizationProvider>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Zarejestruj się
        </Button>
      </Box>
    </div>
  )
}

export default Register