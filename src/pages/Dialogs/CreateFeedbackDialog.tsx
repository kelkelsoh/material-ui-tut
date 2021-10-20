import React, { useState } from 'react'
import { makeStyles, TextField, Typography, Container, Button, Dialog } from "@material-ui/core/";
import RatingComponent from '@mui/material/Rating';

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
    hidden: {
      display: 'none'
    },
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

  let [rating, setRating] = useState(1);
  
  return (
    <Dialog
    open={CreateDialogState}
    onClose={AbortCreateDialog}
    >
      <Container component="main" maxWidth="xs">
        <Container className={classes.paper}>
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
              className={classes.hidden}
              required
              value={rating}
              id="rating"
              label="Rating"
              name="rating"
              autoComplete="rating"
            />
            <Typography component="legend">
              Rating:
            </Typography>
            <RatingComponent
             defaultValue={1}
             onChange={(event, newValue) => {
                if(Number(newValue) < 1) {
                  newValue = 1;
                }
                setRating(Number(newValue));
              }}
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
        </Container>
      </Container>
    </Dialog>
  )
}
export default CreateFeedbackDialog


