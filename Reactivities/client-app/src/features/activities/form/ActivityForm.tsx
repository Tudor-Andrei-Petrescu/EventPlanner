import {  useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { Activity, ActivityFormValues } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import {v4 as uuid} from 'uuid';

export default observer(function ActivityForm(){

  const {activityStore} = useStore();

  const {createActivity, updateActivity} = activityStore;

  const { loading, loadActivity, loadingInitial} = activityStore;

  const {id} = useParams();

  const navigate = useNavigate();

  const [activity,setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

  const validationSchema = Yup.object({
    title: Yup.string().required("The event title is required"),
    description: Yup.string().required("The event description is required"),
    category: Yup.string().required("The event category is required"),
    city: Yup.string().required("The city of the event is required"),
    venue: Yup.string().required("The event venue is required"),
    date: Yup.string().required("The event date is required").nullable(),

  })

  useEffect(() => {
      if(id) loadActivity(id).then(activity => setActivity(new ActivityFormValues(activity)));
  }, [id, loadActivity]);


  function handleFormSubmit(activity: ActivityFormValues){
    if(!activity.id){
      activity.id = uuid();
      createActivity(activity).then(() => navigate(`/activities/${activity.id}`))
    }else {
      updateActivity(activity).then((() => navigate(`/activities/${activity.id}`)))
    }
  }



  if(loadingInitial) return <LoadingComponents content="Loading activity..."/>

  return (

    <Segment clearing>
      <Header content='Event Details' sub color="teal"/>
      <Formik 
              validationSchema={validationSchema}
              enableReinitialize 
              initialValues={activity} 
              onSubmit={values => handleFormSubmit(values)}>
          {({handleSubmit, isValid, isSubmitting, dirty}) => (
                        <Form className='ui form' onSubmit={handleSubmit} autoComplete = 'off'>
                        <MyTextInput placeholder ='Title'  name ='title'/>
                        <MyTextArea rows={3} placeholder ='Description' name ='description' />
                        <MySelectInput options={categoryOptions} placeholder ='Category' name ='category' />
                        <MyDateInput 
                        placeholderText ='Date'
                         name ='date' 
                         showTimeSelect
                         timeCaption="time"
                         dateFormat="MMMM d, yyyy h:mm aa"
                         />
                        <Header content='Location Details' sub color="teal" />
                        <MyTextInput placeholder ='City'  name ='city' />
                        <MyTextInput placeholder ='Venue' name ='venue' />
                        <Button 
                        disabled={isSubmitting || !dirty || !isValid}
                        loading = {isSubmitting} floated='right' positive type='submit' content='Submit'/>
                        <Button as = {Link} to = '/activities' floated='right'  type='submit' content='Cancel' />
                
                      </Form>
          )}
      </Formik>

    </Segment>
  )
})