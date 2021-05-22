import type { AppProps } from "next/app";
import { authentication } from "@paperpod/frontend";
import { Layout } from "../components/layout/layout";

function App({ Component, pageProps }: AppProps) {
  return (
    <authentication.UserContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </authentication.UserContextProvider>
  );
}

export default App;
