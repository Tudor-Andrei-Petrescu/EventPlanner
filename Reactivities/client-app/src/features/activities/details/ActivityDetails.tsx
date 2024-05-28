import React, { useEffect } from "react";
import { Button, ButtonContent, Card, CardContent, CardDescription, CardHeader, CardMeta, Icon, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";

export default observer(function ActivityDetails(){

  const {activityStore} = useStore();
  const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore;
  const {id} = useParams();

  useEffect( () =>{
    if(id) loadActivity(id);
  }, [id, loadActivity])

  if(loadingInitial || !activity) return <LoadingComponents/>;
 
  return (
        <Card fluid>
          <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
          <CardContent>
            <CardHeader>{activity.title}</CardHeader>
            <CardMeta>
              <span >{activity.date}</span>
            </CardMeta>
            <CardDescription>
              {activity.description}
            </CardDescription>
          </CardContent>
          <CardContent extra>
            <Button.Group widths='2'>
              <Button as={Link} to={`/manage/${activity.id}`} color='blue' content='Edit'/>
              <Button as={Link} to={'/activities'} color='grey' content='Cancel'/>
            </Button.Group>
          </CardContent>
      </Card>
  )
})