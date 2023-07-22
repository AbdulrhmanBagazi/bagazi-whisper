import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

export type Add_Username_Result = NotAllowedError | UnknownError | Username

export type Create_Post_Result = Post | UnknownError

export type Mutation = {
  __typename?: 'Mutation'
  Add_Friend?: Maybe<Scalars['Boolean']['output']>
  Add_Username?: Maybe<Add_Username_Result>
  Create_Post?: Maybe<Create_Post_Result>
  Remove_Friend?: Maybe<Scalars['Boolean']['output']>
}

export type MutationAdd_FriendArgs = {
  FreindId: Scalars['String']['input']
}

export type MutationAdd_UsernameArgs = {
  username: Scalars['String']['input']
}

export type MutationCreate_PostArgs = {
  body: Scalars['String']['input']
}

export type MutationRemove_FriendArgs = {
  userIdA: Scalars['String']['input']
  userIdB: Scalars['String']['input']
}

export type NotAllowedError = {
  __typename?: 'NotAllowedError'
  error: Scalars['String']['output']
}

export type Post = {
  __typename?: 'Post'
  _count: PostCount
  authorId: Scalars['String']['output']
  body: Scalars['String']['output']
  id: Scalars['String']['output']
}

export type PostCount = {
  __typename?: 'PostCount'
  likes: Scalars['Int']['output']
}

export type PostMeta = {
  __typename?: 'PostMeta'
  count: Scalars['Int']['output']
}

export type Query = {
  __typename?: 'Query'
  Get_More_Post: Array<Post>
  Get_Post: Array<Post>
  Get_Post_Meta: PostMeta
  test?: Maybe<Scalars['String']['output']>
}

export type QueryGet_More_PostArgs = {
  cursor: Scalars['String']['input']
}

export type UnknownError = {
  __typename?: 'UnknownError'
  error: Scalars['String']['output']
}

export type Username = {
  __typename?: 'Username'
  username: Scalars['String']['output']
}

export type PostQueryVariables = Exact<{ [key: string]: never }>

export type PostQuery = {
  __typename?: 'Query'
  Get_Post: Array<{
    __typename?: 'Post'
    id: string
    body: string
    authorId: string
    _count: { __typename?: 'PostCount'; likes: number }
  }>
  Get_Post_Meta: { __typename?: 'PostMeta'; count: number }
}

export type Get_More_PostQueryVariables = Exact<{
  cursor: Scalars['String']['input']
}>

export type Get_More_PostQuery = {
  __typename?: 'Query'
  Get_More_Post: Array<{
    __typename?: 'Post'
    id: string
    body: string
    authorId: string
    _count: { __typename?: 'PostCount'; likes: number }
  }>
}

export type Create_PostMutationVariables = Exact<{
  body: Scalars['String']['input']
}>

export type Create_PostMutation = {
  __typename?: 'Mutation'
  Create_Post?:
    | {
        __typename: 'Post'
        id: string
        body: string
        authorId: string
        _count: { __typename?: 'PostCount'; likes: number }
      }
    | { __typename: 'UnknownError'; error: string }
    | null
}

export type Add_UsernameMutationVariables = Exact<{
  username: Scalars['String']['input']
}>

export type Add_UsernameMutation = {
  __typename?: 'Mutation'
  Add_Username?:
    | { __typename: 'NotAllowedError'; error: string }
    | { __typename: 'UnknownError'; error: string }
    | { __typename: 'Username'; username: string }
    | null
}

export const PostDocument = gql`
  query Post {
    Get_Post {
      id
      body
      authorId
      _count {
        likes
      }
    }
    Get_Post_Meta {
      count
    }
  }
`

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostQuery(
  baseOptions?: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options)
}
export function usePostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(
    PostDocument,
    options
  )
}
export type PostQueryHookResult = ReturnType<typeof usePostQuery>
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>
export const Get_More_PostDocument = gql`
  query Get_More_Post($cursor: String!) {
    Get_More_Post(cursor: $cursor) {
      id
      body
      authorId
      _count {
        likes
      }
    }
  }
`

/**
 * __useGet_More_PostQuery__
 *
 * To run a query within a React component, call `useGet_More_PostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGet_More_PostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGet_More_PostQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGet_More_PostQuery(
  baseOptions: Apollo.QueryHookOptions<
    Get_More_PostQuery,
    Get_More_PostQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<Get_More_PostQuery, Get_More_PostQueryVariables>(
    Get_More_PostDocument,
    options
  )
}
export function useGet_More_PostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Get_More_PostQuery,
    Get_More_PostQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<Get_More_PostQuery, Get_More_PostQueryVariables>(
    Get_More_PostDocument,
    options
  )
}
export type Get_More_PostQueryHookResult = ReturnType<
  typeof useGet_More_PostQuery
>
export type Get_More_PostLazyQueryHookResult = ReturnType<
  typeof useGet_More_PostLazyQuery
>
export type Get_More_PostQueryResult = Apollo.QueryResult<
  Get_More_PostQuery,
  Get_More_PostQueryVariables
>
export const Create_PostDocument = gql`
  mutation Create_Post($body: String!) {
    Create_Post(body: $body) {
      __typename
      ... on Post {
        id
        body
        authorId
        _count {
          likes
        }
      }
      ... on UnknownError {
        error
      }
    }
  }
`
export type Create_PostMutationFn = Apollo.MutationFunction<
  Create_PostMutation,
  Create_PostMutationVariables
>

/**
 * __useCreate_PostMutation__
 *
 * To run a mutation, you first call `useCreate_PostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreate_PostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreate_PostMutation({
 *   variables: {
 *      body: // value for 'body'
 *   },
 * });
 */
export function useCreate_PostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Create_PostMutation,
    Create_PostMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<Create_PostMutation, Create_PostMutationVariables>(
    Create_PostDocument,
    options
  )
}
export type Create_PostMutationHookResult = ReturnType<
  typeof useCreate_PostMutation
>
export type Create_PostMutationResult =
  Apollo.MutationResult<Create_PostMutation>
export type Create_PostMutationOptions = Apollo.BaseMutationOptions<
  Create_PostMutation,
  Create_PostMutationVariables
>
export const Add_UsernameDocument = gql`
  mutation Add_Username($username: String!) {
    Add_Username(username: $username) {
      __typename
      ... on Username {
        username
      }
      ... on NotAllowedError {
        error
      }
      ... on UnknownError {
        error
      }
    }
  }
`
export type Add_UsernameMutationFn = Apollo.MutationFunction<
  Add_UsernameMutation,
  Add_UsernameMutationVariables
>

/**
 * __useAdd_UsernameMutation__
 *
 * To run a mutation, you first call `useAdd_UsernameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdd_UsernameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUsernameMutation, { data, loading, error }] = useAdd_UsernameMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useAdd_UsernameMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Add_UsernameMutation,
    Add_UsernameMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    Add_UsernameMutation,
    Add_UsernameMutationVariables
  >(Add_UsernameDocument, options)
}
export type Add_UsernameMutationHookResult = ReturnType<
  typeof useAdd_UsernameMutation
>
export type Add_UsernameMutationResult =
  Apollo.MutationResult<Add_UsernameMutation>
export type Add_UsernameMutationOptions = Apollo.BaseMutationOptions<
  Add_UsernameMutation,
  Add_UsernameMutationVariables
>
