import React from "react";
import { Button, ButtonContent, Card, CardContent, CardDescription, CardHeader, CardMeta, Icon, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponents from "../../../app/layout/LoadingComponents";

export default function ActivityDetails(){

  const {activityStore} = useStore();
  const {selectedActivity: activity, openForm, cancelSelectedActivity} = activityStore;

  if(!activity) return <LoadingComponents/>;
 
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
              <Button onClick = {()=> openForm(activity.id)} color='blue' content='Edit'/>
              <Button onClick = {cancelSelectedActivity} color='grey' content='Cancel'/>
            </Button.Group>
          </CardContent>
      </Card>
  )
}