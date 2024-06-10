import { Tab } from "semantic-ui-react"
import ProfilePhotos from "./ProfilePhotos"
import { Profile } from "../../app/models/profile"
import { observer } from "mobx-react-lite";
import ProfileAbout from "./ProfileAbout";

interface Props {
  profile: Profile;
}

export default observer(function ProfileContent({profile} : Props) {
  const panes =[
    {menuItem: 'About', render: () => <ProfileAbout/>},
    {menuItem: 'Photos', render: () => <ProfilePhotos profile = {profile} />},
    {menuItem: 'Events', render: () => <Tab.Pane>Events content</Tab.Pane>},
    {menuItem: 'Followers', render: () => <Tab.Pane>Followers content</Tab.Pane>},
    {menuItem: 'Following', render: () => <Tab.Pane>Following content</Tab.Pane>},

  ]
  return (
      <Tab
      menu={{fluid: true, vertical: true}}
      menuPosition="right"
      panes={panes}
      />
  )
})