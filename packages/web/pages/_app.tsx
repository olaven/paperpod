import type { AppProps } from "next/app";
import { UserContextProvider } from "../components/authentication/authentication";

function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  );
}

export default App;
