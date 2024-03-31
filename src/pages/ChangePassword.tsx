import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Card, FormControl, FormLabel, TextField } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { useContext } from "react"
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import * as yup from "yup"
import { API } from "../apis/API"
import Backdrop from '../components/Backdrop'
import FormSubmissionFooter from '../components/FormSubmissionFooter'
import PageContainer from '../components/PageContainer'
import { AuthContext } from "../context/AuthContext"
import { SnackbarContext } from "../context/SnackbarProvider"


const useStyles = makeStyles(() => ({
  formContainer: {
		margin: '32px',
		padding: '24px',
		display: 'flex',
		flexDirection: 'column',
		height: 'fit-content',
		gap: '24px',
		width: '350px',
		borderRadius: '20px'
	}
}))

const schema = yup.object({
  currentPassword: yup.string()
		.required("Current password is a required field"),
	newPassword: yup.string()
		.required("New password is a required field")
		.min(6, "New password must be between 6 and 20 characters")
		.max(20, "New password must be between 6 and 20 characters")
		.matches(/^(?=.*[A-Z])(?=.*[0-9])/, "New password must contain a capital letter and a number")
		.notOneOf([yup.ref('currentPassword')], "New password cannot match old password"),
  confirmPassword: yup.string()
	.required("Confirm password is a required field")
	.min(6, "Confirm password must be between 6 and 20 characters")
	.max(20, "Confirm password must be between 6 and 20 characters")
	.matches(/^(?=.*[A-Z])(?=.*[0-9])/, "Confirm password must contain a capital letter and a number")
	.oneOf([yup.ref('newPassword')], 'Passwords must match')
});


const ChangePasswordPage = () => {
	const classes = useStyles();

	const { user } = useContext(AuthContext);

	const {
		register,
		handleSubmit,
		formState: {errors},
    setError
	} = useForm<ChangePasswordForm>({
		resolver: yupResolver(schema),
	})

	const {queueMessage} = useContext(SnackbarContext);

	const navigate = useNavigate();


  const onSubmit: SubmitHandler<ChangePasswordForm> = async (data) => {
		try {
			await API.postChangePassword(data, user.id);
			queueMessage("Successfully changed password");
			navigate("/home");
		} catch {
			setError("currentPassword", {message: "Password provided is incorrect"});
		}
  }

  return (
    <PageContainer>
      <Backdrop>
				<Card className={classes.formContainer} component="form">
						<FormControl>
							<FormLabel>Current Password:</FormLabel>
							<TextField 
							type="password"
							error={!!errors.currentPassword}
							helperText={errors.currentPassword?.message}
							{...register('currentPassword')}/>
						</FormControl>

						<FormControl>
							<FormLabel>New Password:</FormLabel>
							<TextField 
							type="password"
							error={!!errors.newPassword}
							helperText={errors.newPassword?.message}
							{...register('newPassword')}/>
						</FormControl>

						<FormControl>
							<FormLabel>Confirm Password:</FormLabel>
							<TextField 
							type="password"
							error={!!errors.confirmPassword}
							helperText={errors.confirmPassword?.message}
							{...register('confirmPassword')}/>
						</FormControl>

						<FormSubmissionFooter>
							<Button variant="contained" type="submit" onClick={handleSubmit(onSubmit)}>Submit</Button>
						</FormSubmissionFooter>
				</Card>
			</Backdrop>
    </PageContainer>
  )
}

export default ChangePasswordPage
