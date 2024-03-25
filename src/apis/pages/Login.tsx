import { Box, Button, FormControl, FormLabel, TextField } from "@mui/material";
import { Theme, useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { SubmitHandler, useForm } from "react-hook-form";
import FormSubmissionFooter from "../components/FormSubmissionFooter";
import PageContainer from "../components/PageContainer";

type Inputs = {
  email: string
  password: string
};

const useStyles = makeStyles((theme: Theme) => ({
  sidePanel: {
    background: 'radial-gradient(circle at 10% 20%, rgb(252, 251, 121) 0%, #ffb74d 90%)',
    height: '100%',
    width: '65%',
    boxShadow: '3px 0px 5px rgba(0, 0, 0, 0.25)'
  },
  corePanel: {
    gap: theme.spacing(2),
    width: '10%',
    minWidth: '400px',
    padding: '0px 7.5%',
    height: '100%',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }
}));

const LoginPage = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <PageContainer>
      <Box className={classes.sidePanel}/>
      <Box className={classes.corePanel}>
      
        <FormControl>
            <FormLabel>Email:</FormLabel>
            <TextField type="email" {...register("email")}/>
          </FormControl>
        
          <FormControl>
            <FormLabel>Password:</FormLabel>
            <TextField type="password" {...register("password")}/>
          </FormControl>

          <FormSubmissionFooter>
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>Sign in</Button>
          </FormSubmissionFooter>
      </Box>
    </PageContainer>
  )
}

export default LoginPage