import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, FormControl, MenuItem, Select, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { API } from "../apis/API";
import Backdrop from "../components/Backdrop";
import FormCard from "../components/FormCard";
import FormLabel from "../components/FormLabel";
import FormSubmissionFooter from "../components/FormSubmissionFooter";
import PageContainer from "../components/PageContainer";
import { AuthContext } from "../context/AuthContext";
import { SnackbarContext } from "../context/SnackbarProvider";

const schema = yup.object({
  designTime: yup.string().matches(/^\d+$/, 'Design number must be a whole number').required("Design time is a required field"),
  name: yup.string()
  .matches(/^[a-zA-Z]+$/, "Agent name must be alphabetical")
  .min(6, "Agent name must be more than 6 characters")
  .max(64, "An agent name cannot be more than 64 characters")
  .required("Agent name is a required field"),
  versionNumber: yup.string().matches(/^\d+$/, 'Version number must be a whole number').required("Version number is a required field"),
  emails: yup.array()
  .of(yup.string().required("Email is a required field"))
  .required("Emails is a required field"),
  fileName: yup.string().required('Agent file is required'),
})

const AgentSubmission = () => {
  const { user } = useContext(AuthContext);
	const {queueMessage} = useContext(SnackbarContext);
  // const navigate = useNavigate();

  const {
		register,
		handleSubmit,
		formState: {errors},
    // setError
	} = useForm<CreateAgentForm>({
		resolver: yupResolver(schema),
	})

  //Agent Selection
  // const [file, setFile] = useState(null);
  // const [fileName, setFileName] = useState<string>("");

  // const handleChooseFile = (event) => {
  //   const selectedFile = event.target.files[0];
  //   setFileName(selectedFile.name);
  //   setFile(selectedFile);
  // };

  const handlePickAgentClick = () => {
    document.getElementById('fileInput').click();
  };

  
  // Author Selection
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);


  const handleChooseMemberClick = (email: string) => {
    if (selectedUsers.includes(email)) {
      setSelectedUsers(prev => prev.filter(userEmail => userEmail !== email))
    } else {
      setSelectedUsers(prev => [...prev, email]);
    }
  }

  useEffect(() => {
    const loadTeam = async () => {
      const team = await API.getTeam(user.teamId);
      const members = team.users.filter(teamMember => teamMember.id !== user.id);
      setTeamMembers(members);
    }

    loadTeam();
    setSelectedUsers([user.email]);
  }, [user]);


  const onSubmit: SubmitHandler<CreateAgentForm> = async (data) => {
		try {
      console.log(JSON.stringify(data));
			queueMessage("Successfully changed password");
			// navigate("/home");
		} catch (error) {
      console.log(JSON.stringify(error))
    }
  }


  return (
    <PageContainer>
      <Backdrop>
        <FormCard component='form'>
          
        <FormControl>
            <FormLabel title={"Upload your agent"}/>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
              <TextField
               sx={{flexGrow: '1', paddingRight: '4px', height: '100%'}}
               disabled={true} 
              //  value={fileName}
              //  error={file == null}
              //  helperText={file == null ? "You must provide an agent file" : ''}
               />
              <Box>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: 'none' }}
                />
                <Button variant="contained"onClick={handlePickAgentClick}>
                  Pick agent
                </Button>
              </Box>
            </Box>
          </FormControl>

          <FormControl>
            <FormLabel title={"Agent name"} tooltipMessage={"What is the class name of your agent? etc: DefaultController"}/>
            <TextField
               error={!!errors.name}
               helperText={errors.name?.message}
               {...register('name')}
               />
          </FormControl>
  
          <FormControl>
            <FormLabel title={"Version number"} tooltipMessage={"What version of the agent is this?"}/>
            <TextField
               error={!!errors.versionNumber}
               helperText={errors.versionNumber?.message}
               {...register('versionNumber')}
               />
          </FormControl>
          
          <FormControl>
            <FormLabel title={"Other authors"} tooltipMessage={"Who did you work on this agent with?"}/>
            <Select 
            multiple
            value={selectedUsers}
            onChange={() => {}}>
            {teamMembers.map((teamMember) => (
              <MenuItem
                key={teamMember.id}
                value={teamMember.email}
                onClick={() => {handleChooseMemberClick(teamMember.email)}}
              >
                {teamMember.email}
              </MenuItem>
          ))}
            </Select>
          </FormControl>
          
          <FormControl>
            <FormLabel title={"Design Time"} tooltipMessage={"How many minutes did you spend working on the agent?"}/>
            <TextField
               error={!!errors.designTime}
               helperText={errors.designTime?.message}
               {...register('designTime')}/>
          </FormControl>

          <FormSubmissionFooter>
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>
              Submit
            </Button>
          </FormSubmissionFooter>

        </FormCard>
      </Backdrop>
    </PageContainer>
  )
}

export default AgentSubmission;