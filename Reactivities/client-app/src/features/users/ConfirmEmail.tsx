import { useEffect, useState } from "react";
import { useStore } from "../../app/stores/store";
import useQuery from "../../app/util/hooks";
import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import LoginForm from "./LoginForm";

export default function ConfirmEmail() {
  const {modalStore} = useStore();
  const email = useQuery().get('email') as string;
  const token = useQuery().get('token') as string;

  const Status = {
    Verifying : 'Verifying',
    Failed: 'Failed',
    Success: 'Success'
  }

  const [status, setSatus] = useState(Status.Verifying);

  function handleConfirmEmailResend() {
    agent.Account.resendEmailConfirm(email).then(() => {
      toast.success("Verification email resent- please check your email")
    }).catch(error => console.log(error));
  }

  
  useEffect(() => {
    agent.Account.verifyEmail(token,email).then(()=>{
      setSatus(Status.Success);
    } ).catch(() => {
      setSatus(Status.Failed);
    })
  },[Status.Failed,Status.Success,email,token])

  function getBody() {
    switch (status){
      case Status.Verifying:
        return <p>Verifying...</p>
      case Status.Failed:
        return (
          <div>
              <p>Verification failed - You can resending the verify link to your email</p>
              <Button primary onClick={handleConfirmEmailResend} size="huge" content="Resend email" />
        </div>
        )
        case Status.Success:
          return (
            <div>
              <p>Your email has been verified - You can now log in</p>
              <Button primary onClick={() => modalStore.openModal(<LoginForm/>)} size="huge" content='Login' />
            </div>
          )
    }
  }

  return (
    <Segment placeholder textAlign="center">
        <Header icon >
          <Icon name="envelope" />
          Email verification
        </Header>

        <Segment.Inline>
          {getBody()}
        </Segment.Inline>
    </Segment>
  )
}