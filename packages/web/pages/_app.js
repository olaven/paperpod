
import { useContext } from 'react';
import { UserContext, UserContextProvider } from '../components/UserContext';

// import App from 'next/app'

const TestNavigation = () => {

    const { user, refreshUser } = useContext(UserContext);
    return <>
        <br />
        <div style={{ display: "flex" }}>
            <button onClick={refreshUser}>
                Refresh user: {user}
            </button>
            <a href="/login">
                <button>login</button>
            </a>
            <a href="/signup">
                <button>signup</button>
            </a>
        </div>
    </>
}

function MyApp({ Component, pageProps }) {
    return <UserContextProvider>
        <Component {...pageProps} />
        <TestNavigation />
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

