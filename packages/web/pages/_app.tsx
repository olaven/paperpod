import type { AppProps } from "next/app";
import { useContext } from "react";
import {
  UserContext,
  UserContextProvider,
  Login,
  Logout,
  Signup,
} from "../components/authentication/authentication";

const TestNavigation = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <hr />
      <div>
        {!user && <Signup />}
        {!user && <Login />}

        {user && <>logged in as {user.email}</>}
        {user && <Logout />}
      </div>
    </>
  );
};

function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <Component {...pageProps} />
      <TestNavigation />
    </UserContextProvider>
  );
}

export default App;
