import type { AppProps } from "next/app";
import {
  authentication,
  FrontendContext,
  FrontendContextProvider,
} from "@paperpod/frontend";
import { Layout } from "../components/layout/layout";

function App({ Component, pageProps }: AppProps) {
  return (
    <FrontendContextProvider serverHostname={""}>
      <authentication.UserContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </authentication.UserContextProvider>
    </FrontendContextProvider>
  );
}

export default App;
