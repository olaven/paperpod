
import { useContext } from 'react';
import { UserContext, UserContextProvider } from '../components/UserContext';

// import App from 'next/app'

const TestRefreshUser = () => {

    const { user, refreshUser } = useContext(UserContext);
    return <button onClick={refreshUser}>
        Refresh user: {user}
    </button>
}

function MyApp({ Component, pageProps }) {
    return <UserContextProvider>
        <Component {...pageProps} />
        <TestRefreshUser />
    </UserContextProvider>
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp

