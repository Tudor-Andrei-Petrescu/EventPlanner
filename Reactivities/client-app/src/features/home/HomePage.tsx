import { Link } from "react-router-dom";
import { Container, Header, Segment,Image, Button } from "semantic-ui-react";

export default function HomePage() {
  return(
    <Segment inverted textAlign="center" vertical className="masthead">
        <Container text>
            <Header as="h1" inverted>
              <Image size="massive" src="/assets/logo.png" alt="logo" style={{marginBottom: 12}} />
              GatherUp
            </Header>
            <Header as="h2" content="Welcome to GatherUp"/>
            <Button as={Link} to="/activities" size="huge" inverted>
              Take me to GatherUp
            </Button>
        </Container>
    </Segment>
  )
}