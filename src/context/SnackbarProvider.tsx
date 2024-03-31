import { Alert, Snackbar } from "@mui/material";
import { createContext, useCallback, useState } from "react";

export const SnackbarContext = createContext<{queueMessage: any}>({
    queueMessage: null
  })

const SnackbarProvider = (props: any) => {

	const [open, setOpen] = useState<boolean>(false);
	const [message, setMessage] = useState<string>(null);
	
	const queueMessage = useCallback((message: string) => {
		setMessage(message);
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
          severity="success"
          variant="filled"
          >
          {message}
          </Alert>
        </Snackbar>
    </SnackbarContext.Provider>
  )
}

export default SnackbarProvider;