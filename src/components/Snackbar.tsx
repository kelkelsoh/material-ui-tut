import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export interface SnackBarProps {
    snackbarDescription: string,
    openSnackbar: boolean,
    handleClose: () => void,
    error: boolean,
  }
  
const SnackbarAlert: React.FC<SnackBarProps> = ({
    snackbarDescription,
    openSnackbar,
    handleClose,
    error,
}) => {
    const msgType = error ? "error" : "success";
    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={msgType} sx={{ width: '100%' }}>
                    {snackbarDescription}
                </Alert>
            </Snackbar>
        </Stack>
    );
    }
export default SnackbarAlert;
  
