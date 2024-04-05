import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, FormControl, FormHelperText, MenuItem, OutlinedInput, Select, styled, TextField } from "@mui/material";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { API } from "../apis/API";
import Backdrop from "../components/Backdrop";
import FormCard from "../components/FormCard";
import FormLabel from "../components/FormLabel";
import FormSubmissionFooter from "../components/FormSubmissionFooter";
import PageContainer from "../components/PageContainer";
import { AuthContext } from "../context/AuthContext";
import { SnackbarContext } from "../context/SnackbarProvider";

type CreateAgentForm = {
  designTime?: string,
  name?: string
  versionNumber?: string
}

const schema = yup.object({
  designTime: yup.string().matches(/^\d+$/, 'Design number must be a whole number').required("Design time is a required field"),
  name: yup.string()
  .matches(/^[a-zA-Z]+$/, "Agent name must be alphabetical")
  .min(6, "Agent name must be more than 6 characters")
  .max(32, "An agent name cannot be more than 64 characters")
  .required("Agent name is a required field"),
  versionNumber: yup.string().matches(/^\d+$/, 'Version number must be a whole number').required("Version number is a required field"),
});

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const AgentSubmission = () => {
  const { user } = useContext(AuthContext);
	const {queueMessage} = useContext(SnackbarContext);
  const navigate = useNavigate();

  const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<CreateAgentForm>({
		resolver: yupResolver(schema),
	})

  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [agentFile, setSelectedAgentFile] = useState(null);


  const handleAgentFileChange = (e) => {
    setSelectedAgentFile(e.target.files[0]);
  };

  const handleChooseMemberClick = (email: string) => {
    if (selectedUsers.includes(email)) {
      setSelectedUsers(prev => prev.filter(userEmail => userEmail !== email))
    } else {
      setSelectedUsers(prev => [...prev, email]);
    }
  }

  const onSubmit: SubmitHandler<CreateAgentForm> = async (data) => {
    if (agentFile == null) {return}
    const toSubmit = {
      ...data,
      emails: selectedUsers,
      file: agentFile
    }
		try {
			const result = await API.postAgent(toSubmit);
      const parsedDate = parseISO(result.nextRound);
      const timeTill = formatDistanceToNow(parsedDate);
      queueMessage(`Successfully submitted agent\nThe next round starts in ${timeTill}`);
			navigate("/home");
		} catch (error) {
      console.log(error);
      queueMessage("Invalid Agent Provided", "error");
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

  return (
    <PageContainer>
      <Backdrop>
        <FormCard component='form' sx={{width: '350px'}}>
          
        <FormControl>
          <Box sx={{display: 'flex', flexDirection: 'row', gap: '8px'}}>
            <OutlinedInput error={agentFile == null} value={agentFile == null ? '' : agentFile.name} sx={{flexGrow: '1'}} readOnly/>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              sx={{height: 'fit-content'}}
            >
              Pick
              <VisuallyHiddenInput type="file" onChange={handleAgentFileChange}/>
            </Button>
          </Box>
          <FormHelperText error={agentFile == null}>{agentFile == null ? "You must provide an agent" : ""}</FormHelperText>
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
            <FormLabel title={"Design Time"} tooltipMessage={"How many minutes did you spend working on the agent?"}/>
            <TextField
               error={!!errors.designTime}
               helperText={errors.designTime?.message}
               {...register('designTime')}/>
          </FormControl>
          
          <FormControl>
            <FormLabel title={"Other authors"} tooltipMessage={"Who did you work on this agent with?"}/>
            <Select 
            multiple
            value={selectedUsers}>
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