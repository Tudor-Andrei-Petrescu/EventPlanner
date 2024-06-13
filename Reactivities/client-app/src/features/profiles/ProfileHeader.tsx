import { Divider, Grid, Header, Item, ItemContent, Segment, Statistic } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";
import FollowButton from "./FollowButton";

interface Props {
  profile: Profile;
}

export default observer(function ProfileHeader({profile}: Props) {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
              <Item.Group>
                <Item>
                  <Item.Image avatar size="small" src={profile.image ||  '/assets/user.png'} />
                  <ItemContent verticalAlign="middle">
                      <Header as='h1' content={profile.displayName} />
                  </ItemContent>
                </Item>
              </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group widths={2}>
            <Statistic label='Followers' value ={profile.followersCount} />
            <Statistic label='Following' value ={profile.followingCount} />
          </Statistic.Group>
          <Divider />
          <FollowButton profile={profile}/>
        </Grid.Column>
      </Grid>
    </Segment>
  )
})