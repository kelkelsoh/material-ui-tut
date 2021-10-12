import React, {Fragment} from 'react'
import {Field, Form, Formik} from 'formik'
import { makeStyles, Card, TextField, Typography, Container, Button, CardContent } from "@material-ui/core/";

export interface FeedbackBoxProps {
  Title: string,
  Description: string,
  Rating: Number
}

const Feedback: React.FC<FeedbackBoxProps> = ({
  Title,
  Description,
  Rating,
}) => {
  const useStyles = makeStyles((theme) => ({
    feedbackContainer: {
      display: "flex",
      marginTop: "5px",
      marginBottom: "5px",
      width: "100%",
      transition: "all .25s linear",
      boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.4)",

      "&:hover": {
        boxShadow: "-1px 10px 29px 0px rgba(0,0,0,0.6)"
      },
    },
    
    leftContent: {
      textAlign: "left",
      width: "100%"
    },
    rightContent: {
      textAlign: "right",
      width: "50%"
    },
  }))
  const classes = useStyles();
  
  return (
    <Fragment>
        <Container component="main" maxWidth="lg">
            <Card className={classes.feedbackContainer}>
              <CardContent className={classes.leftContent}>
                <Typography
                  className={"MuiTypography--heading"}
                  variant={"h6"}
                  gutterBottom
                >
                  {Title}
                </Typography>
                <Typography
                  className={"MuiTypography--subheading"}
                  variant={"caption"}
                >{Description}
                </Typography>
              </CardContent>
              <CardContent className={classes.rightContent}>
                <Typography component="h1" variant="caption">
                  {Rating}
                </Typography>
              </CardContent>
            </Card>
         </Container>
    </Fragment>
  )

  
}
export default Feedback


