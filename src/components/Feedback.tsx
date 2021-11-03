import React, { Fragment, useEffect, useState } from 'react'
import { LinearProgress, makeStyles, Card, Typography, Container, Button, CardContent, CircularProgress, Tooltip } from "@material-ui/core/";

import {Edit, DeleteOutline} from "@material-ui/icons";
import RatingComponent from '@mui/material/Rating';
import Collapse from '@mui/material/Collapse';

export interface FeedbackBoxProps {
  ID: number,
  Title: string,
  Description: string,
  Rating: number,
  openEditDialog: (id: number, title: string, desc: string, rating: number) => void,
  openDeleteDialog: (id: number) => void,
  isLoading: boolean,
}

const Feedback: React.FC<FeedbackBoxProps> = ({
  ID,
  Title,
  Description,
  Rating,
  openEditDialog,
  openDeleteDialog,
  isLoading
}) => {
  const setEditValues = () => {
    openEditDialog(ID, Title, Description, Rating);
  }

  const setDeleteValues = () => {
    openDeleteDialog(ID);
  }

  const useStyles = makeStyles((theme) => ({
    feedbackContainer: {
      display: "flex",
      marginTop: "5px",
      marginBottom: "5px",
      width: "100%",
      boxShadow: "5px 5px 15px 3px rgba(0,0,0,0.19);",
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

  const [collapseToggle, setCollapseToggle] = useState(false);
  useEffect(() => {
    setCollapseToggle(true);
  }, [isLoading]);

  const loadingElement = (
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
  )

  const successElement = (
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
                  <Tooltip title="Edit Feedback">
                    <Button>
                      <Edit onClick={setEditValues}/>
                    </Button>
                  </Tooltip>
                  <Tooltip title="Delete Feedback">
                  <Button>
                    <DeleteOutline onClick={setDeleteValues}/>
                  </Button>
                  </Tooltip>
                </CardContent>
                <RatingComponent className={classes.rating} value={Rating} readOnly />
              </CardContent>
            </Card>
         </Container>
    </Fragment>
  )
  
  return isLoading ? <div><Collapse in={collapseToggle}>{loadingElement}</Collapse></div>
   : <div><Collapse in={collapseToggle}>{successElement}</Collapse></div>
}
export default Feedback


