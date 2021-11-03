import React, { Fragment, useEffect, useState } from 'react'
import { LinearProgress, CircularProgress, makeStyles, Typography, Container, Button, Grid, Slide } from "@material-ui/core/";
import FeedbackCard from '../components/Feedback'
import SnackbarAlert from '../components/Snackbar'
import CreateFeedbackDialog from './Dialogs/CreateFeedbackDialog';
import EditFeedbackDialog from './Dialogs/EditFeedbackDialog';
import DeleteFeedbackDialog from './Dialogs/DeleteFeedbackDialog';
import FeedbackModel from '../model/FeedbackModel';
import FeedbackModelInput from '../model/FeedbackModelInput';
import axios, { AxiosRequestConfig } from 'axios';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

const FeedbackPage: React.FC = () => {
  //Snackbar Alert
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackBarType, setSnackBarType] = React.useState("");
  const [snackBarError, setSnackBarError] = React.useState(false);
  const handleCloseSnackBar = () => {
    setOpenSnackbar(false);
  }

  //API Calls
  const FEEDBACK_DEFAULT_VALUES : FeedbackModel = {
    id: 1,
    title: "",
    description:"",
    rating: 1
  }
  const [feedbackData, setFeedbackData] = useState<Array<FeedbackModel>>([FEEDBACK_DEFAULT_VALUES]);
  const [isLoading, setIsloading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [eventLogged, setEventLogged] = useState(0);

  const logEvent = (desc: string, error: boolean) => {
    if(error) {
      setSnackBarType(desc);
      setSnackBarError(error);
      setOpenSnackbar(true);
    } else {
      setSnackBarType(desc);
      setSnackBarError(error);
      setOpenSnackbar(true);
      setEventLogged(prevCount => prevCount + 1);
    }
  }

  const axiosConfig: AxiosRequestConfig = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Credentials': 'true'}
  }
  const loadFeedbackData = async () => {
    const response = await axios.get('http://localhost:8080/feedback', axiosConfig)
    .catch((error) => {
      return error.toJSON();
    });
    return response;
  }

  const createFeedbackData = async (feedback: FeedbackModelInput) => {
    const response = await axios.post('http://localhost:8080/feedback', feedback, axiosConfig)
    .catch((error) => {
      return error.toJSON();
    });
    console.log(response);
    return response;
  }

  const updateFeedbackData = async (deleteId: number, feedback: FeedbackModel) => {
    const response = await axios.put('http://localhost:8080/feedback/' + deleteId, feedback, axiosConfig)
    .catch((error) => {
      return error;
    });
    console.log(response);
    return response;
  }

  const deleteFeedbackData = async (deleteId: number) => {
    const response = await axios.delete('http://localhost:8080/feedback/' + deleteId , axiosConfig)
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
      background: "linear-gradient(0deg, rgba(255,255,255,0) 5%, rgb(0 0 0 / 54%) 45%)",
      borderRadius: "4px",
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
      color: "rgba(255,255,255,1)",
      margin: theme.spacing(3, 0, 2),
      //background: "#ffffff",
      //padding: "5px",
      //background: "linear-gradient(180deg, rgba(255,255,255,0) 45%, #FFD9D9 45%)",
    },
    linearLoad: {
      justifyContent: "center",
      alignItems: "center",
    },
    mainBox: {
      backgroundImage: `url(
        "https://images.unsplash.com/photo-1635326332448-1cb32649925d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=729&q=80"
        )`,
      borderRadius: "4px",
      paddingBottom: "20px",
      marginTop: "5px",
    }
  }))
  const classes = useStyles();

  //Create Dialog
  const [CreateFeedbackDialogState, setCreateFeedbackDialogState] = useState(false);

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

    try {
      const feedback : FeedbackModelInput = new FeedbackModelInput(title, description, rating);
      createFeedbackData(feedback).then((response) => {
        if(response?.data?.includes("successfully")) {
          //fix: Adjust according to response code
          logEvent("Feedback created successfully!", false);
          closeCreateFeedbackDialog();
        } else {
          logEvent("Error creating Feedback!", true);
          closeCreateFeedbackDialog();
        }
      });
    } catch (error) {
      
    }
  };

  //Edit Dialog
  const [EditFeedbackDialogState, setEditFeedbackDialogState] = useState(false);
  const [currentId, setCurrentId] = useState(0)
  const [currentTitle, setCurrentTitle] = useState("")
  const [currentDescription, setCurrentDescription] = useState("")
  const [currentRating, setCurrentRating] = useState(1)

  const openEditFeedbackDialog = (id: number, title: string, desc: string, rating: number) => {
    setCurrentId(id);
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

    try {
      const feedback : FeedbackModel = new FeedbackModel(0, title, description, rating);
      updateFeedbackData(currentId, feedback).then((response) => {
        if(response?.data?.includes("successfully")) {
          //fix: Adjust according to response code
          logEvent("Feedback updated successfully!", false);
          closeEditFeedbackDialog();
        } else {
          logEvent("Error updating Feedback!", true);
          closeEditFeedbackDialog();
        }
      });
    } catch (error) {
      
    }
  };

  //Delete Dialog
  const [DeleteFeedbackDialogState, setDeleteFeedbackDialogState] = useState(false);
  const openDeleteFeedbackDialog = (id: number) => {
    setCurrentId(id);
    setDeleteFeedbackDialogState(true);
  }

  const closeDeleteFeedbackDialog = () => {
    setDeleteFeedbackDialogState(false);
  }

  const deleteFormSubmitted = async () => {
    try {
      deleteFeedbackData(currentId).then((response) => {
        //fix: Adjust according to response code
        if(response?.data?.includes("successfully")) {
          logEvent("Feedback deleted successfully!", false);
          closeDeleteFeedbackDialog();
        } else {
          logEvent("Error deleting Feedback!", true);
          closeDeleteFeedbackDialog();
        }
      });
    } catch (error) {
      
    }
  };
  
  const delayLoading = () => {
    setTimeout(() => {
      setIsloading(false);
      setIsLoaded(true);
    }, 1000)
  }

  useEffect(() => {
    setIsloading(true);
    loadFeedbackData().then((response) => {
      //fix: Adjust according to response code
      if(!response?.message?.includes("Error") && response.data.length > 0) {
        setFeedbackData(response.data)
        delayLoading();
      } else {
        setIsloading(false);
        setIsLoaded(true);
      }
    });
  }, [eventLogged])

  const successElement = (
    <Fragment>
        <Container className={classes.mainBox}>
          <SnackbarAlert 
            snackbarDescription={snackBarType}
            openSnackbar={openSnackbar}
            handleClose={handleCloseSnackBar}
            error={snackBarError}
          />
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
                <Typography className={classes.header} component="div" variant="h4">
                  Feedback
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
              {JSON.stringify(feedbackData[0]) !== JSON.stringify(FEEDBACK_DEFAULT_VALUES)
                ? feedbackData.map((item)=>{
                  return (
                  <FeedbackCard
                    key={item.id}
                    ID={item.id}
                    isLoading={isLoading}
                    Title={item.title}
                    Description={item.description}
                    Rating={item.rating}
                    openEditDialog={openEditFeedbackDialog}
                    openDeleteDialog={openDeleteFeedbackDialog}
                  />) 
              })
              : <Alert severity="error">No feedbacks found, click create to add some!</Alert>}
            </Container>
          </Container>
        </Container>
    </Fragment>
  )
  const loadingElement = (
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
                ID={1}
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
  
  return isLoading ? loadingElement
  :  successElement
}
export default FeedbackPage


