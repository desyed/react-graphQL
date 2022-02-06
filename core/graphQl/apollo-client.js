import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://api.apito.io/secured/graphql",
    cache: new InMemoryCache(),
    headers: {
        Authorization: 'Bearer 6rZvWY1K4jgvV6WNVR93c7RXxXeI6CwetOZv23K6sGbu3VhRIAEA2Zb3wlsDCqIaMAjkxyKA9ABNYIKKwl2HgxvQYSxtQqkGVlW0VuR4ugGHWx0LFQvCotao0jfaFIg8T0oBcyCvylRs5NRcAY5L3ho5wQObODx'
    }
});

export default client;