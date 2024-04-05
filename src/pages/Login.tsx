import { yupResolver } from "@hookform/resolvers/yup"
import { Box, Button, FormControl, FormLabel, TextField } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { useContext } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import * as yup from "yup"
import { API } from '../apis/API'
import FormSubmissionFooter from '../components/FormSubmissionFooter'
import PageContainer from '../components/PageContainer'
import { AuthContext } from '../context/AuthContext'

const useStyles = makeStyles(() => ({
  sidePanel: {
    background: process.env.PUBLIC_URL !== '/prod' ? 'radial-gradient(circle at 10% 20%, rgb(46, 204, 113) 0%, rgb(52, 152, 219) 90%)' : 'radial-gradient(circle at 10% 20%, rgb(252, 251, 121) 0%, #ffb74d 90%)',
    minHeight: '100vh',
    width: '65%',
    boxShadow: '3px 0px 5px rgba(0, 0, 0, 0.25)'
  },
  corePanel: {
    gap: '24px',
    width: '10%',
    minWidth: '400px',
    padding: '0px 7.5%', 
    minHeight: '100vh',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }
}))

const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().required()
}).required();


const LoginPage = () => {
  const classes = useStyles()

  const { setUser } = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: {errors},
    setError
  } = useForm<UserLogin>({
    resolver: yupResolver(schema),
  })
  const onSubmit: SubmitHandler<UserLogin> = async (data) => {
    try {
      const user = await API.postLogin(data);
      setUser(user);
      
    } catch {
      setError("password", {message: "Email or password is incorrect"});
      setError("email", {message: "Email or password is incorrect"});
    }
  }

  return (
    <PageContainer>
      <Box className={classes.sidePanel}/>
      <Box className={classes.corePanel} component="form">

        <FormControl>
            <FormLabel>Email:</FormLabel>
            <TextField 
            type="email" 
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email')}/>
          </FormControl>

          <FormControl>
            <FormLabel>Password:</FormLabel>
            <TextField 
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
             {...register('password')}/>
          </FormControl>

          <FormSubmissionFooter>
            <Button variant="contained" type="submit" onClick={handleSubmit(onSubmit)}>Sign in</Button>
          </FormSubmissionFooter>
      </Box>
    </PageContainer>
  )
}

export default LoginPage
