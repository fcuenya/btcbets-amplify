import { ReactNode } from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import outputs from "../../../../amplify_outputs.json";
import AppHeader from "./AppHeader";

type AuthProps = {
  children?: ReactNode;
};

const Auth = ({ children }: AuthProps) => {
  Amplify.configure(outputs);
  return (
    <Authenticator>
      {({ user, signOut }) => (
        <div className="flex flex-col grow">
          <header>
            <AppHeader
              loginId={user?.signInDetails?.loginId}
              signOut={signOut}
            />
          </header>
          <main className="flex flex-col grow flex-wrap">{children}</main>
        </div>
      )}
    </Authenticator>
  );
};

export default Auth;
