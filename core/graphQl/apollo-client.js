import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://api.apito.io/secured/graphql",
    cache: new InMemoryCache(),
    headers: {
        Authorization: process.env.TOKEN

    }
});

export default client;