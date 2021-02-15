import type { AppProps } from "next/app";
import { UserContextProvider } from "../components/authentication/authentication";
import { Layout } from "../components/layout/layout";

function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContextProvider>
  );
}

export default App;
