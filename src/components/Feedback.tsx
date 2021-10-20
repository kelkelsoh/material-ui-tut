import React, { Fragment } from 'react'
import { LinearProgress, makeStyles, Card, Typography, Container, Button, CardContent, CircularProgress } from "@material-ui/core/";

import {Edit, DeleteOutline} from "@material-ui/icons";
import RatingComponent from '@mui/material/Rating';

export interface FeedbackBoxProps {
  Title: string,
  Description: string,
  Rating: number,
  openEditDialog: (title: string, desc: string, rating: number) => void,
  openDeleteDialog: () => void,
  isLoading: boolean,
}

const Feedback: React.FC<FeedbackBoxProps> = ({
  Title,
  Description,
  Rating,
  openEditDialog,
  openDeleteDialog,
  isLoading
}) => {
  const setEditValues = () => {
    openEditDialog(Title, Description, Rating);
  }

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
    rating: {
      marginRight: "16px"
    },
    loading: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    }
  }))

  const classes = useStyles();
  
  return isLoading ? (
    <Fragment>
        <Container component="main" maxWidth="lg">
            <Card className={classes.feedbackContainer}>
              <CardContent className={classes.loading}>
                <CircularProgress color="primary"/>
              </CardContent>
              <CardContent className={classes.rightContent}>
                <CardContent>
                  <Button>
                  <CircularProgress
                    size={20}
                    color="inherit" 
                  />
                  </Button>
                  <Button>
                  <CircularProgress
                    size={20}
                    color="inherit" 
                  />
                  </Button>
                </CardContent>
                <LinearProgress />
              </CardContent>
            </Card>
         </Container>
    </Fragment>
  ) : (
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
                  <Button>
                    <Edit onClick={setEditValues}/>
                  </Button>
                  <Button>
                    <DeleteOutline onClick={openDeleteDialog}/>
                  </Button>
                </CardContent>
                <RatingComponent className={classes.rating} value={Rating} readOnly />
              </CardContent>
            </Card>
         </Container>
    </Fragment>
  )
}
export default Feedback


