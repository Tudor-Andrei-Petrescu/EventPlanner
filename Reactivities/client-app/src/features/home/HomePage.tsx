import { Link } from "react-router-dom";
import { Container, Header, Segment,Image, Button, Divider } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";
import FacebookLogin, { FailResponse, SuccessResponse } from "@greatsumini/react-facebook-login";

export default observer(function HomePage() {

  const {userStore, modalStore} = useStore();
  return(
    <Segment inverted textAlign="center" vertical className="masthead">
        <Container text>
            <Header as="h1" inverted>
              <Image size="massive" src="/assets/logo.png" alt="logo" style={{marginBottom: 12}} />
              GatherUp
            </Header>
            {userStore.isLoggedIn ? (
              <>
              <Header as="h2" content="Welcome to GatherUp"/>
              <Button as={Link} to="/activities" size="huge" inverted>
                Go to GatherUP
              </Button>
              </>
            ):(
                  <>

                  <Button onClick={() => modalStore.openModal(<LoginForm/>)} size="huge" inverted>
                      Login
                  </Button>
                  <Button onClick={() => modalStore.openModal(<RegisterForm/>)} size="huge" inverted>
                      Register
                  </Button>
                  <Divider  horizontal inverted>OR</Divider>
                  <FacebookLogin
                  appId="307635072422122"
                  onSuccess={(response: SuccessResponse) => {
                    //console.log('Login successful', response);
                    userStore.fbLogin(response.accessToken);
                  }}
                  onFail={(response: FailResponse) => {
                    console.log('Login failed', response);
                  }}
                  className={`ui button facebook huge inverted ${userStore.fbLoading && 'loading'} `}
                  />
                  </>
            )}
          
        </Container>
    </Segment>
  )
})