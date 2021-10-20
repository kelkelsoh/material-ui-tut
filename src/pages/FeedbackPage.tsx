import React, { Fragment, useEffect, useState } from 'react'
import { LinearProgress, CircularProgress, makeStyles, Typography, Container, Button, Grid } from "@material-ui/core/";
import FeedbackCard from '../components/Feedback'
import CreateFeedbackDialog from './Dialogs/CreateFeedbackDialog';
import EditFeedbackDialog from './Dialogs/EditFeedbackDialog';
import DeleteFeedbackDialog from './Dialogs/DeleteFeedbackDialog';
import FeedbackModel from '../model/FeedbackModel';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const FeedbackPage: React.FC = () => {
  const FEEDBACK_DEFAULT_VALUES : FeedbackModel = {
    id: 1,
    title: "",
    description:"",
    rating: 1
  }
  const [feedbackData, setFeedbackData] = useState<Array<FeedbackModel>>([FEEDBACK_DEFAULT_VALUES]);
  const [isLoading, setIsloading] = useState(false);

  const axiosConfig: AxiosRequestConfig = {
    method: 'get',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Credentials': 'true'}
  }
  const loadFeedbackData = async () => {
    const response = await axios.get('http://localhost:8080/feedback', axiosConfig)
    .catch((error) => {
      return error;
    });
    return response;
  }

  const useStyles = makeStyles((theme) => ({
    form: {
      width: '100%',
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
    },
    linearLoad: {
      justifyContent: "center",
      alignItems: "center",
    }
  }))
  const classes = useStyles();

  //Create Dialog
  const [CreateFeedbackDialogState, setCreateFeedbackDialogState] = useState(false);
  const [CreateFormValues, setCreateFormValues] = useState({})

  const openCreateFeedbackDialog = () => {
    setCreateFeedbackDialogState(true);
  }

  const closeCreateFeedbackDialog = () => {
    setCreateFeedbackDialogState(false);
  }

  const createFormSubmitted = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const title = event.currentTarget.titlestr.value;
    const description = event.currentTarget.description.value;
    const rating = event.currentTarget.rating.value

    const obj = {
      title: title,
      description: description,
      rating: rating
    }
    console.log(obj)
    try {
      //write to DB
      closeCreateFeedbackDialog();
    } catch (error) {
      
    }
  };

  //Edit Dialog
  const [EditFeedbackDialogState, setEditFeedbackDialogState] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("")
  const [currentDescription, setCurrentDescription] = useState("")
  const [currentRating, setCurrentRating] = useState(1)

  const openEditFeedbackDialog = (title: string, desc: string, rating: number) => {
    setCurrentTitle(title);
    setCurrentDescription(desc);
    setCurrentRating(rating);
    setEditFeedbackDialogState(true);
  }

  const closeEditFeedbackDialog = () => {
    setEditFeedbackDialogState(false);
  }

  const handleInputChange = (event: { target: any; }) => {
    const target = event.target;
    const name = target.name;

    if(name == "titlestr") {
      setCurrentTitle(target.value)
    } else if(name == "description") {
      setCurrentDescription(target.value)
    } else if(name == "rating") {
      setCurrentRating(target.value)
    }
  }

  const editFormSubmitted = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const title = event.currentTarget.titlestr.value;
    const description = event.currentTarget.description.value;
    const rating = event.currentTarget.rating.value

    const obj = {
      title: title,
      description: description,
      rating: rating
    }
    console.log(obj)
    try {
      //update to DB
      closeEditFeedbackDialog();
      alert("Comment Edited!")
    } catch (error) {
      
    }
  };

  //Delete Dialog
  const [DeleteFeedbackDialogState, setDeleteFeedbackDialogState] = useState(false);
  const [DeleteFormValues, setDeleteFormValues] = useState({})
  const openDeleteFeedbackDialog = () => {
    setDeleteFeedbackDialogState(true);
  }

  const closeDeleteFeedbackDialog = () => {
    setDeleteFeedbackDialogState(false);
  }

  const deleteFormSubmitted = async () => {
    try {
      //delete from DB
      closeDeleteFeedbackDialog();
      alert("Comment Deleted!")
    } catch (error) {
      
    }
  };

  useEffect(() => {
    setIsloading(true);
    loadFeedbackData().then((response) => {
      setFeedbackData(response.data)
      setIsloading(false);
    });
  }, [])
  
  return isLoading ? (
    <Fragment>
        <Container component="main" maxWidth="md">
          <Container className={classes.paper}>
          <Container className={classes.headerContainer}>
              <Grid
              container
              alignItems={'center'}
              >
                <Grid xs={6} item>
                  <LinearProgress />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                className={classes.submit}
              >
              <CircularProgress
                size={20}
                color="inherit" 
              />
              </Button>
            </Container>
            <FeedbackCard
                isLoading={isLoading}
                Title={""}
                Description={""}
                Rating={1}
                openEditDialog={openEditFeedbackDialog}
                openDeleteDialog={openDeleteFeedbackDialog}
            />
          </Container>
        </Container>
    </Fragment>
  )
  :  (
    <Fragment>
        <Container component="main" maxWidth="md">
          <Container className={classes.paper}>
            <CreateFeedbackDialog 
            CreateDialogState={CreateFeedbackDialogState}
            AbortCreateDialog={closeCreateFeedbackDialog}
            setFormValues={createFormSubmitted}
            />
            <EditFeedbackDialog 
            EditDialogState={EditFeedbackDialogState}
            AbortEditDialog={closeEditFeedbackDialog}
            handleInputchange={handleInputChange}
            setFormValues={editFormSubmitted}
            setRating={setCurrentRating}
            Title={currentTitle}
            Description={currentDescription}
            Rating={currentRating}
            />
            <DeleteFeedbackDialog 
            deleteDialogState={DeleteFeedbackDialogState}
            closeDeleteDialog={closeDeleteFeedbackDialog}
            confirmDelete={deleteFormSubmitted}
            />
            <Container className={classes.headerContainer}>
              <Typography className={classes.header} component="div" variant="h5">
                Feedback Home
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={openCreateFeedbackDialog}
              >
                Create
              </Button>
            </Container>
            {feedbackData.map((item)=>{
              return (
              <FeedbackCard
                key={item.id}
                isLoading={isLoading}
                Title={item.title}
                Description={item.description}
                Rating={item.rating}
                openEditDialog={openEditFeedbackDialog}
                openDeleteDialog={openDeleteFeedbackDialog}
              />)
            })}
          </Container>
        </Container>
    </Fragment>
  ) 
}
export default FeedbackPage


