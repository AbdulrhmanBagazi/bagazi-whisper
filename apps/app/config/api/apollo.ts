import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache
} from '@apollo/client'
import { GRAPHQL, PUBLIC_GRAPHQL } from '../config'

const public_client = new HttpLink({
  uri: PUBLIC_GRAPHQL,
  credentials: 'include'
})
const client = new HttpLink({
  uri: GRAPHQL,
  credentials: 'include'
})

const Client = new ApolloClient({
  link: ApolloLink.split(
    (operation) => operation.getContext().clientName === 'public_client',
    public_client,
    client
  ),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore'
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    }
  }
})

export default Client
