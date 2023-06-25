import { ApolloClient, InMemoryCache } from '@apollo/client'
import { environment } from '../config/environment.config'

const Client = new ApolloClient({
  uri: `${environment.apiUrl}/graphql/admin`,
  cache: new InMemoryCache(),
  credentials: 'include',
  //   typeDefs: [userDefInput],
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

// Error('Unauthorized')
