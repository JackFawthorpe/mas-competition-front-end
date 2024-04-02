import { Box, Button, FormControl, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useState } from "react";
import Backdrop from "../components/Backdrop";
import FormCard from "../components/FormCard";
import FormLabel from "../components/FormLabel";
import FormSubmissionFooter from "../components/FormSubmissionFooter";
import PageContainer from "../components/PageContainer";


const dummyNames = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const AgentSubmission = () => {

  const [otherAuthors, setOtherAuthors] = useState<string[]>([]);

  const handleAuthorChange = (event: SelectChangeEvent<typeof otherAuthors>) => {
    const {
      target: { value },
    } = event;
    setOtherAuthors(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const [file, setFile] = useState(null);

  const handleChooseFile = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <PageContainer>
      <Backdrop>
        <FormCard component='form'>
          
        <FormControl>
            <FormLabel title={"Upload your agent"}/>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
              <TextField sx={{flexGrow: '1', paddingRight: '4px', height: '100%'}} disabled={true} value={file?.name ?? ''}/>
              <Box>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: 'none' }}
                  onChange={handleChooseFile}
                />
                <Button variant="contained" sx={{height: 'calc(1.4375em + 16px)'}} onClick={handleButtonClick}>
                  Pick agent
                </Button>
              </Box>
            </Box>
          </FormControl>

          <FormControl>
            <FormLabel title={"Agent name"} tooltipMessage={"What is the class name of your agent? etc: DefaultController"}/>
            <TextField/>
          </FormControl>
  
          <FormControl>
            <FormLabel title={"Version Number"} tooltipMessage={"What version of the agent is this?"}/>
            <TextField/>
          </FormControl>
          
          <FormControl>
            <FormLabel title={"Authors"} tooltipMessage={"Who did you work on this agent with?"}/>
            <Select 
            multiple
            value={otherAuthors}
            onChange={handleAuthorChange}>
            {dummyNames.map((name) => (
              <MenuItem
                key={name}
                value={name}
              >
                {name}
              </MenuItem>
          ))}
            </Select>
          </FormControl>
          
          <FormControl>
            <FormLabel title={"Design Time"} tooltipMessage={"How many minutes did you spend working on the agent?"}/>
            <TextField/>
          </FormControl>

          <FormSubmissionFooter>
            <Button variant="contained">
              Submit
            </Button>
          </FormSubmissionFooter>

        </FormCard>
      </Backdrop>
    </PageContainer>
  )
}

export default AgentSubmission;