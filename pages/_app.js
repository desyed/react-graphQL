import 'antd/dist/antd.css';
import '../styles/globals.css'
import { ApolloProvider } from "@apollo/client";
import client from "../core/graphQl/apollo-client";

function MyApp({ Component, pageProps }) {
  return (<ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>)
}

export default MyApp
