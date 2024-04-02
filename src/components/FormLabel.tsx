import { HelpOutline } from "@mui/icons-material";
import { Box, IconButton, FormLabel as MuiFormLabel, Tooltip } from "@mui/material";

type FormLabelProps = {
  title: string,
  tooltipMessage?: string
}

const FormLabel = (props: FormLabelProps) => {
  return (
    <Box sx={{display: 'flex', alignContent: 'center', paddingBottom: '4px'}}>
      <MuiFormLabel  sx={{paddingRight: '8px'}}>{props.title}:</MuiFormLabel>
      {props.tooltipMessage && 
      <Tooltip title={props.tooltipMessage} placement="top" sx={{padding: '0px', fontSize: '1.25rem'}}>
        <IconButton>
          <HelpOutline/>
        </IconButton>
      </Tooltip>
      }
    </Box>
  )
}

export default FormLabel;