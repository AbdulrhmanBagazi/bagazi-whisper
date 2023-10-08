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
      fetchPolicy: 'cache-first',
      errorPolicy: 'ignore',
      notifyOnNetworkStatusChange: true
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true
    }
  }
})

export default Client
