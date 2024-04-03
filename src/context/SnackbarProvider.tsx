import { Alert, AlertProps, Snackbar } from "@mui/material";
import { createContext, useCallback, useState } from "react";

export const SnackbarContext = createContext<{queueMessage: (message: string, severity?: AlertProps["severity"]) => void}>({
    queueMessage: null
  })

const SnackbarProvider = (props: any) => {

	const [open, setOpen] = useState<boolean>(false);
	const [message, setMessage] = useState<string>(null);
  const [severity, setSeverity] = useState<AlertProps["severity"]>("success");
	
	const queueMessage = useCallback((message: string, severity: AlertProps["severity"] = 'success') => {
		setMessage(message);
    setSeverity(severity);
		setOpen(true);
	}, [setMessage, setOpen]);


  return (
    <SnackbarContext.Provider value={{queueMessage}}>
        {props.children}
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={() => {setOpen(false)}}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        >
          <Alert
          severity={severity}
          variant="filled"
          >
          {message}
          </Alert>
        </Snackbar>
    </SnackbarContext.Provider>
  )
}

export default SnackbarProvider;