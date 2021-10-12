import React, {Fragment} from 'react'
import {Field, Form, Formik} from 'formik'
import { makeStyles, Card, TextField, Typography, Container, Button } from "@material-ui/core/";

interface MyFormValues {
  Title: string,
  Description: string,
  Rating: Number
}

const CreateFeedbackPage: React.FC = () => {
  const useStyles = makeStyles((theme) => ({
    form: {
      width: '100%', // Fix IE 11 issue.
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
  
  const initialValues: MyFormValues = { Title: '', Description: '', Rating: 0 };
  return (
    <Fragment>
      <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
      >
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Feedback Form
            </Typography>
            <Form className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
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
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="rating"
                label="Rating"
                name="rating"
                autoComplete="rating"
                autoFocus
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
            </Form>
          </div>
         </Container>
      </Formik>
    </Fragment>
  )

  
}
export default CreateFeedbackPage


