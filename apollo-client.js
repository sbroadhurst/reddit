// ./apollo-client.js

import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: `${process.env.GRAPHQL_LINK}`,
  headers: {
    Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_KEY}`,
  },
  cache: new InMemoryCache(),
})

export default client
