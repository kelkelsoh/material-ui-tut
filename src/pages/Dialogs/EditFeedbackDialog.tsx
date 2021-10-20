import React from 'react'
import { makeStyles, TextField, Typography, Container, Button, Dialog } from "@material-ui/core/";
import RatingComponent from '@mui/material/Rating';

export interface EditFeedbackDialogProps {
  EditDialogState: boolean,
  AbortEditDialog: () => void,
  handleInputchange: (event: any) => void,
  setFormValues: (event: React.FormEvent<HTMLFormElement>) => void,
  setRating: (newRating: number) => void,
  Title: string,
  Description: string,
  Rating: number,
}

const EditFeedbackDialog: React.FC <EditFeedbackDialogProps> = ({
  EditDialogState,
  AbortEditDialog,
  handleInputchange,
  setFormValues,
  setRating,
  Title,
  Description,
  Rating,
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
    btnHolder: {
      display: "flex",
      justifyContent: "space-evenly"
    },
  }))
  const classes = useStyles();
  
  return (
    <Dialog
    open={EditDialogState}
    onClose={AbortEditDialog}
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
              value={Title}
              onChange={handleInputchange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              id="description"
              label="Description"
              name="description"
              autoComplete="description"
              value={Description}
              onChange={handleInputchange}
            />
            <TextField
              className={classes.hidden}
              required
              id="rating"
              label="Rating"
              name="rating"
              autoComplete="rating"
              value={Rating}
              onChange={handleInputchange}
            />
            <Typography component="legend">
              Rating:
            </Typography>
            <RatingComponent
              value={Rating}
              onChange={(event, newValue) => {
                if(Number(newValue) < 1) {
                  newValue = 1;
                }
                setRating(Number(newValue));
              }}
            />
            <Container className={classes.btnHolder}>
              <Button
                onClick={AbortEditDialog}
                className={classes.submit}
                variant="outlined">
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Edit
              </Button>
            </Container>
          </form>
        </Container>
        </Container>
    </Dialog>
  ) 
}
export default EditFeedbackDialog


