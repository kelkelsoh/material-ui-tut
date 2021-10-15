import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles } from "@material-ui/core";
import React from "react";

export interface DeleteDialogProps {
  deleteDialogState: boolean,
  closeDeleteDialog: () => void,
  confirmDelete: () => void
}

const DeleteFeedbackDialog: React.FC<DeleteDialogProps> = ({
  deleteDialogState,
  closeDeleteDialog,
  confirmDelete
}) => {
  // css
  const classes = useStyles();
  
  return(
    <Dialog
      open={deleteDialogState}
      onClose={closeDeleteDialog}
      aria-labelledby="leave-confirmation-dialog-title"
      maxWidth={"xs"}>
      <DialogTitle
        id="leave-confirmation-dialog-title"
        classes={{ root: classes.dialogTitle }}>
        Leave Confirmation
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="leave-confirmation-description">
          Delete Comment?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={closeDeleteDialog}
          className={classes.formButton}
          variant="outlined">
          Cancel
        </Button>
        <Button
          className={classes.formButton}
          onClick={confirmDelete}
          color="primary"
          variant="contained"
          autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    color: theme.palette.primary.light,
  },
  formButton: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
}));

export default DeleteFeedbackDialog;