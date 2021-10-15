import React, {Fragment, useState} from 'react'
import {Field, Form, Formik} from 'formik'
import { makeStyles, Card, TextField, Typography, Container, Button } from "@material-ui/core/";
import FeedbackCard from '../components/Feedback'
import { useHistory } from "react-router-dom";
import CreateFeedbackDialog from './CreateFeedbackDialog';
import EditFeedbackDialog from './EditFeedbackDialog';
import DeleteFeedbackDialog from './DeleteFeedbackDialog';

const FeedbackPage: React.FC = () => {
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
    }
  }))
  const classes = useStyles();
  const history = useHistory();

  const navigate = async (path: string) => {
    history.push(path);
  }

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
  const [EditFormValues, setEditFormValues] = useState({})
  const [currentTitle, setCurrentTitle] = useState("")
  const [currentDescription, setCurrentDescription] = useState("")
  const [currentRating, setCurrentRating] = useState(1)


  const openEditFeedbackDialog = () => {
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
  
  return (
    <Fragment>
        <Container component="main" maxWidth="md">
          <div className={classes.paper}>
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
            Title={currentTitle}
            Description={currentDescription}
            Rating={currentRating}
            />
            <DeleteFeedbackDialog 
            deleteDialogState={DeleteFeedbackDialogState}
            closeDeleteDialog={closeDeleteFeedbackDialog}
            confirmDelete={deleteFormSubmitted}
            />
            <div className={classes.headerContainer}>
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
            </div>
            <FeedbackCard
              Title="Nature Around Us"
              Description="We are going to learn different kinds of species in nature that live together to form amazing environment."
              Rating={5.4}
              openEditDialog={openEditFeedbackDialog}
              closeEditDialog={closeEditFeedbackDialog}
              openDeleteDialog={openDeleteFeedbackDialog}
              closeDeleteDialog={closeDeleteFeedbackDialog}
            />
            <FeedbackCard
              Title="Nature Around Us"
              Description="We are going to learn different kinds of species in nature that live together to form amazing environment."
              Rating={5.4}
              openEditDialog={openEditFeedbackDialog}
              closeEditDialog={closeEditFeedbackDialog}
              openDeleteDialog={openDeleteFeedbackDialog}
              closeDeleteDialog={closeDeleteFeedbackDialog}
            />
          </div>
        </Container>
    </Fragment>
  )

  
}
export default FeedbackPage


