import React, {Fragment} from 'react'
import {Field, Form, Formik} from 'formik'
import { makeStyles, Card, TextField, Typography, Container, Button, CardContent } from "@material-ui/core/";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";

export interface FeedbackBoxProps {
  Title: string,
  Description: string,
  Rating: Number,
  openEditDialog: () => void,
  closeEditDialog: () => void,
  openDeleteDialog: () => void,
  closeDeleteDialog: () => void,
}

const Feedback: React.FC<FeedbackBoxProps> = ({
  Title,
  Description,
  Rating,
  openEditDialog,
  openDeleteDialog,
  closeEditDialog,
  closeDeleteDialog,
}) => {
  const useStyles = makeStyles((theme) => ({
    feedbackContainer: {
      display: "flex",
      marginTop: "5px",
      marginBottom: "5px",
      width: "100%",
    },
    
    leftContent: {
      textAlign: "left",
      width: "100%"
    },
    rightContent: {
      textAlign: "right",
      width: "50%"
    },
    icon: {
      margin: theme.spacing(1),
      fontSize: 32,
      transition: "all .25s linear",
      borderRadius: "5px",
      // boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.4)",
      marginRight: "5px",

      "&:hover": {
        boxShadow: "-1px 10px 29px 0px rgba(0,0,0,0.4)"
      },
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
                <CardContent>
                  <Edit className={classes.icon} onClick={openEditDialog}/>
                  <DeleteOutline className={classes.icon} onClick={openDeleteDialog}/>
                </CardContent>
                
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


