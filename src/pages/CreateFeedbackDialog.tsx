import React, {Fragment} from 'react'
import {Field, Form, Formik} from 'formik'
import { makeStyles, Card, TextField, Typography, Container, Button, Dialog, DialogContent } from "@material-ui/core/";

export interface CreateFeedbackDialogProps {
  CreateDialogState: boolean,
  AbortCreateDialog: () => void,
  setFormValues: (event: React.FormEvent<HTMLFormElement>) => void,
}

const CreateFeedbackDialog: React.FC <CreateFeedbackDialogProps> = ({
  CreateDialogState,
  AbortCreateDialog,
  setFormValues,
}) => {
  const useStyles = makeStyles((theme) => ({
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }))
  const classes = useStyles();
  
  return (
    <Dialog
    open={CreateDialogState}
    onClose={AbortCreateDialog}
    >
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Feedback Form
          </Typography>
          <form
          onSubmit={setFormValues}
          className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="titlestr"
              label="Title"
              name="titlestr"
              autoComplete="title"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              autoComplete="description"
            />
            <TextField
              type="number"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="rating"
              label="Rating"
              name="rating"
              autoComplete="rating"
              InputProps={{ inputProps: { min: 1, max: 5 } }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
        </div>
        </Container>
    </Dialog>
  )

  
}
export default CreateFeedbackDialog


