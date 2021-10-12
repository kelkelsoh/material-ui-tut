import React, {Fragment} from 'react'
import {Field, Form, Formik} from 'formik'
import { makeStyles, Card, TextField, Typography, Container, Button } from "@material-ui/core/";
import FeedbackCard from '../components/Feedback'

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
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    headerContainer: {
      display: "flex",
      justifyContent: "space-between",
      paddingLeft: "24px",
      paddingRight: "24px"
    },
    header: {
      fontWeight: "bold",
      margin: theme.spacing(3, 0, 2),
    }
  }))
  const classes = useStyles();
  
  // const initialValues: MyFormValues = { Title: '', Description: '', Rating: 0 };
  return (
    <Fragment>
        <Container component="main" maxWidth="md">
          <div className={classes.paper}>
            <div className={classes.headerContainer}>
              <Typography className={classes.header} component="div" variant="h5">
                Feedback Home
              </Typography>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Submit
              </Button>
            </div>
            <FeedbackCard
              Title="Nature Around Us"
              Description="We are going to learn different kinds of species in nature that live together to form amazing environment."
              Rating={5.4}
            />
            <FeedbackCard
              Title="Nature Around Us"
              Description="We are going to learn different kinds of species in nature that live together to form amazing environment."
              Rating={5.4}
            />
          </div>
        </Container>
    </Fragment>
  )

  
}
export default CreateFeedbackPage


