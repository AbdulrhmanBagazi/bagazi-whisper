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
  DateTime: { input: any; output: any }
}

export type Add_Username_Result = NotAllowedError | UnknownError | Username

export enum Cd {
  Connect = 'connect',
  Disconnect = 'disconnect'
}

export type Comment = {
  __typename?: 'Comment'
  authorId: Scalars['String']['output']
  body: Scalars['String']['output']
  createdAt: Scalars['DateTime']['output']
  id: Scalars['String']['output']
  postId: Scalars['String']['output']
}

export type Create_Post_Result = Post | UnknownError

export type FeedMeta = {
  __typename?: 'FeedMeta'
  count: Scalars['Int']['output']
}

export type FeedPostCount = {
  __typename?: 'FeedPostCount'
  comments: Scalars['Int']['output']
  likes: Scalars['Int']['output']
  mylikes: Scalars['Int']['output']
}

export type FeedPosts = {
  __typename?: 'FeedPosts'
  _count: FeedPostCount
  authorId: Scalars['String']['output']
  body: Scalars['String']['output']
  createdAt: Scalars['String']['output']
  id: Scalars['String']['output']
}

export type Friend = {
  __typename?: 'Friend'
  id: Scalars['String']['output']
  username: Scalars['String']['output']
}

export type Mutation = {
  __typename?: 'Mutation'
  Add_Friend?: Maybe<Scalars['Boolean']['output']>
  Add_Username?: Maybe<Add_Username_Result>
  Create_Comment?: Maybe<Comment>
  Create_Post?: Maybe<Create_Post_Result>
  Decline_Friend?: Maybe<Scalars['Boolean']['output']>
  Like?: Maybe<FeedPosts>
  Remove_Friend?: Maybe<Scalars['Boolean']['output']>
  Seach_Friend?: Maybe<Seach_Friend_Result>
  Send_Friend_Request?: Maybe<Send_Friend_Request_Result>
}

export type MutationAdd_FriendArgs = {
  FriendId: Scalars['String']['input']
  RequestId: Scalars['String']['input']
}

export type MutationAdd_UsernameArgs = {
  username: Scalars['String']['input']
}

export type MutationCreate_CommentArgs = {
  body: Scalars['String']['input']
  post_id: Scalars['String']['input']
}

export type MutationCreate_PostArgs = {
  body: Scalars['String']['input']
}

export type MutationDecline_FriendArgs = {
  RequestId: Scalars['String']['input']
}

export type MutationLikeArgs = {
  id: Scalars['String']['input']
  type: Cd
}

export type MutationRemove_FriendArgs = {
  FriendId: Scalars['String']['input']
}

export type MutationSeach_FriendArgs = {
  Keyword: Scalars['String']['input']
}

export type MutationSend_Friend_RequestArgs = {
  FriendId: Scalars['String']['input']
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
  createdAt: Scalars['String']['output']
  id: Scalars['String']['output']
}

export type PostCount = {
  __typename?: 'PostCount'
  comments: Scalars['Int']['output']
  likes: Scalars['Int']['output']
}

export type Query = {
  __typename?: 'Query'
  Feed: Array<FeedPosts>
  Get_Comments: Array<Comment>
  Get_Friend_Request: Array<Requests>
  Get_Friends: MyFriends
  Post: Array<Post>
  test?: Maybe<Scalars['String']['output']>
}

export type QueryFeedArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>
  type: FeedRequest
}

export type QueryGet_CommentsArgs = {
  post_id: Scalars['String']['input']
}

export type QueryPostArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>
  type: PostsRequest
}

export type Request_Status = {
  __typename?: 'Request_Status'
  Status?: Maybe<Scalars['Boolean']['output']>
}

export type Requests = {
  __typename?: 'Requests'
  id: Scalars['String']['output']
  sender: Sender
  senderId: Scalars['String']['output']
}

export type Seach_Friend_Result = Seach_Users | UnknownError

export type Seach_Users = {
  __typename?: 'Seach_Users'
  Seach_Users: Array<Users>
}

export type Send_Friend_Request_Result = Request_Status | UnknownError

export type Sender = {
  __typename?: 'Sender'
  username: Scalars['String']['output']
}

export type UnknownError = {
  __typename?: 'UnknownError'
  error: Scalars['String']['output']
}

export type Username = {
  __typename?: 'Username'
  username: Scalars['String']['output']
}

export type Users = {
  __typename?: 'Users'
  id: Scalars['String']['output']
  username: Scalars['String']['output']
}

export enum FeedRequest {
  Inital = 'inital',
  More = 'more',
  New = 'new'
}

export type MyFriends = {
  __typename?: 'myFriends'
  friends: Array<Friend>
}

export type Mylikes = {
  __typename?: 'mylikes'
  id: Scalars['String']['output']
}

export enum PostsRequest {
  Inital = 'inital',
  More = 'more'
}

export type Get_CommentsQueryVariables = Exact<{
  post_id: Scalars['String']['input']
}>

export type Get_CommentsQuery = {
  __typename?: 'Query'
  Get_Comments: Array<{
    __typename?: 'Comment'
    id: string
    body: string
    createdAt: any
    authorId: string
    postId: string
  }>
}

export type Create_CommentMutationVariables = Exact<{
  post_id: Scalars['String']['input']
  body: Scalars['String']['input']
}>

export type Create_CommentMutation = {
  __typename?: 'Mutation'
  Create_Comment?: {
    __typename?: 'Comment'
    id: string
    body: string
    createdAt: any
    authorId: string
    postId: string
  } | null
}

export type FeedQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']['input']>
  type: FeedRequest
}>

export type FeedQuery = {
  __typename?: 'Query'
  Feed: Array<{
    __typename?: 'FeedPosts'
    id: string
    body: string
    authorId: string
    createdAt: string
    _count: {
      __typename?: 'FeedPostCount'
      likes: number
      comments: number
      mylikes: number
    }
  }>
}

export type FriendsQueryVariables = Exact<{ [key: string]: never }>

export type FriendsQuery = {
  __typename?: 'Query'
  Get_Friends: {
    __typename?: 'myFriends'
    friends: Array<{ __typename?: 'Friend'; id: string; username: string }>
  }
}

export type Friends_And_RequestesQueryVariables = Exact<{
  [key: string]: never
}>

export type Friends_And_RequestesQuery = {
  __typename?: 'Query'
  Get_Friends: {
    __typename?: 'myFriends'
    friends: Array<{ __typename?: 'Friend'; id: string; username: string }>
  }
  Get_Friend_Request: Array<{
    __typename?: 'Requests'
    id: string
    senderId: string
    sender: { __typename?: 'Sender'; username: string }
  }>
}

export type Add_FriendMutationVariables = Exact<{
  FriendId: Scalars['String']['input']
  RequestId: Scalars['String']['input']
}>

export type Add_FriendMutation = {
  __typename?: 'Mutation'
  Add_Friend?: boolean | null
}

export type Remove_FriendMutationVariables = Exact<{
  FriendId: Scalars['String']['input']
}>

export type Remove_FriendMutation = {
  __typename?: 'Mutation'
  Remove_Friend?: boolean | null
}

export type Decline_FriendMutationVariables = Exact<{
  RequestId: Scalars['String']['input']
}>

export type Decline_FriendMutation = {
  __typename?: 'Mutation'
  Decline_Friend?: boolean | null
}

export type Send_Friend_RequestMutationVariables = Exact<{
  FriendId: Scalars['String']['input']
}>

export type Send_Friend_RequestMutation = {
  __typename?: 'Mutation'
  Send_Friend_Request?:
    | { __typename: 'Request_Status'; Status?: boolean | null }
    | { __typename: 'UnknownError'; error: string }
    | null
}

export type Friend_RequestQueryVariables = Exact<{ [key: string]: never }>

export type Friend_RequestQuery = {
  __typename?: 'Query'
  Get_Friend_Request: Array<{
    __typename?: 'Requests'
    id: string
    senderId: string
    sender: { __typename?: 'Sender'; username: string }
  }>
}

export type Seach_FriendMutationVariables = Exact<{
  Keyword: Scalars['String']['input']
}>

export type Seach_FriendMutation = {
  __typename?: 'Mutation'
  Seach_Friend?:
    | {
        __typename: 'Seach_Users'
        Seach_Users: Array<{
          __typename?: 'Users'
          id: string
          username: string
        }>
      }
    | { __typename: 'UnknownError'; error: string }
    | null
}

export type LikeMutationVariables = Exact<{
  id: Scalars['String']['input']
  type: Cd
}>

export type LikeMutation = {
  __typename?: 'Mutation'
  Like?: {
    __typename?: 'FeedPosts'
    id: string
    body: string
    authorId: string
    createdAt: string
    _count: {
      __typename?: 'FeedPostCount'
      likes: number
      comments: number
      mylikes: number
    }
  } | null
}

export type PostQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']['input']>
  type: PostsRequest
}>

export type PostQuery = {
  __typename?: 'Query'
  Post: Array<{
    __typename?: 'Post'
    id: string
    body: string
    authorId: string
    createdAt: string
    _count: { __typename?: 'PostCount'; likes: number; comments: number }
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
        createdAt: string
        _count: { __typename?: 'PostCount'; likes: number; comments: number }
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

export const Get_CommentsDocument = gql`
  query Get_Comments($post_id: String!) {
    Get_Comments(post_id: $post_id) {
      id
      body
      createdAt
      authorId
      postId
    }
  }
`

/**
 * __useGet_CommentsQuery__
 *
 * To run a query within a React component, call `useGet_CommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGet_CommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGet_CommentsQuery({
 *   variables: {
 *      post_id: // value for 'post_id'
 *   },
 * });
 */
export function useGet_CommentsQuery(
  baseOptions: Apollo.QueryHookOptions<
    Get_CommentsQuery,
    Get_CommentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<Get_CommentsQuery, Get_CommentsQueryVariables>(
    Get_CommentsDocument,
    options
  )
}
export function useGet_CommentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Get_CommentsQuery,
    Get_CommentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<Get_CommentsQuery, Get_CommentsQueryVariables>(
    Get_CommentsDocument,
    options
  )
}
export type Get_CommentsQueryHookResult = ReturnType<
  typeof useGet_CommentsQuery
>
export type Get_CommentsLazyQueryHookResult = ReturnType<
  typeof useGet_CommentsLazyQuery
>
export type Get_CommentsQueryResult = Apollo.QueryResult<
  Get_CommentsQuery,
  Get_CommentsQueryVariables
>
export const Create_CommentDocument = gql`
  mutation Create_Comment($post_id: String!, $body: String!) {
    Create_Comment(post_id: $post_id, body: $body) {
      id
      body
      createdAt
      authorId
      postId
    }
  }
`
export type Create_CommentMutationFn = Apollo.MutationFunction<
  Create_CommentMutation,
  Create_CommentMutationVariables
>

/**
 * __useCreate_CommentMutation__
 *
 * To run a mutation, you first call `useCreate_CommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreate_CommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreate_CommentMutation({
 *   variables: {
 *      post_id: // value for 'post_id'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useCreate_CommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Create_CommentMutation,
    Create_CommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    Create_CommentMutation,
    Create_CommentMutationVariables
  >(Create_CommentDocument, options)
}
export type Create_CommentMutationHookResult = ReturnType<
  typeof useCreate_CommentMutation
>
export type Create_CommentMutationResult =
  Apollo.MutationResult<Create_CommentMutation>
export type Create_CommentMutationOptions = Apollo.BaseMutationOptions<
  Create_CommentMutation,
  Create_CommentMutationVariables
>
export const FeedDocument = gql`
  query Feed($cursor: String, $type: feedRequest!) {
    Feed(cursor: $cursor, type: $type) {
      id
      body
      authorId
      _count {
        likes
        comments
        mylikes
      }
      createdAt
    }
  }
`

/**
 * __useFeedQuery__
 *
 * To run a query within a React component, call `useFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useFeedQuery(
  baseOptions: Apollo.QueryHookOptions<FeedQuery, FeedQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options)
}
export function useFeedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FeedQuery, FeedQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<FeedQuery, FeedQueryVariables>(
    FeedDocument,
    options
  )
}
export type FeedQueryHookResult = ReturnType<typeof useFeedQuery>
export type FeedLazyQueryHookResult = ReturnType<typeof useFeedLazyQuery>
export type FeedQueryResult = Apollo.QueryResult<FeedQuery, FeedQueryVariables>
export const FriendsDocument = gql`
  query Friends {
    Get_Friends {
      friends {
        id
        username
      }
    }
  }
`

/**
 * __useFriendsQuery__
 *
 * To run a query within a React component, call `useFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFriendsQuery(
  baseOptions?: Apollo.QueryHookOptions<FriendsQuery, FriendsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<FriendsQuery, FriendsQueryVariables>(
    FriendsDocument,
    options
  )
}
export function useFriendsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FriendsQuery, FriendsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<FriendsQuery, FriendsQueryVariables>(
    FriendsDocument,
    options
  )
}
export type FriendsQueryHookResult = ReturnType<typeof useFriendsQuery>
export type FriendsLazyQueryHookResult = ReturnType<typeof useFriendsLazyQuery>
export type FriendsQueryResult = Apollo.QueryResult<
  FriendsQuery,
  FriendsQueryVariables
>
export const Friends_And_RequestesDocument = gql`
  query Friends_And_Requestes {
    Get_Friends {
      friends {
        id
        username
      }
    }
    Get_Friend_Request {
      id
      senderId
      sender {
        username
      }
    }
  }
`

/**
 * __useFriends_And_RequestesQuery__
 *
 * To run a query within a React component, call `useFriends_And_RequestesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriends_And_RequestesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriends_And_RequestesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFriends_And_RequestesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Friends_And_RequestesQuery,
    Friends_And_RequestesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    Friends_And_RequestesQuery,
    Friends_And_RequestesQueryVariables
  >(Friends_And_RequestesDocument, options)
}
export function useFriends_And_RequestesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Friends_And_RequestesQuery,
    Friends_And_RequestesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    Friends_And_RequestesQuery,
    Friends_And_RequestesQueryVariables
  >(Friends_And_RequestesDocument, options)
}
export type Friends_And_RequestesQueryHookResult = ReturnType<
  typeof useFriends_And_RequestesQuery
>
export type Friends_And_RequestesLazyQueryHookResult = ReturnType<
  typeof useFriends_And_RequestesLazyQuery
>
export type Friends_And_RequestesQueryResult = Apollo.QueryResult<
  Friends_And_RequestesQuery,
  Friends_And_RequestesQueryVariables
>
export const Add_FriendDocument = gql`
  mutation Add_Friend($FriendId: String!, $RequestId: String!) {
    Add_Friend(FriendId: $FriendId, RequestId: $RequestId)
  }
`
export type Add_FriendMutationFn = Apollo.MutationFunction<
  Add_FriendMutation,
  Add_FriendMutationVariables
>

/**
 * __useAdd_FriendMutation__
 *
 * To run a mutation, you first call `useAdd_FriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdd_FriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFriendMutation, { data, loading, error }] = useAdd_FriendMutation({
 *   variables: {
 *      FriendId: // value for 'FriendId'
 *      RequestId: // value for 'RequestId'
 *   },
 * });
 */
export function useAdd_FriendMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Add_FriendMutation,
    Add_FriendMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<Add_FriendMutation, Add_FriendMutationVariables>(
    Add_FriendDocument,
    options
  )
}
export type Add_FriendMutationHookResult = ReturnType<
  typeof useAdd_FriendMutation
>
export type Add_FriendMutationResult = Apollo.MutationResult<Add_FriendMutation>
export type Add_FriendMutationOptions = Apollo.BaseMutationOptions<
  Add_FriendMutation,
  Add_FriendMutationVariables
>
export const Remove_FriendDocument = gql`
  mutation Remove_Friend($FriendId: String!) {
    Remove_Friend(FriendId: $FriendId)
  }
`
export type Remove_FriendMutationFn = Apollo.MutationFunction<
  Remove_FriendMutation,
  Remove_FriendMutationVariables
>

/**
 * __useRemove_FriendMutation__
 *
 * To run a mutation, you first call `useRemove_FriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemove_FriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFriendMutation, { data, loading, error }] = useRemove_FriendMutation({
 *   variables: {
 *      FriendId: // value for 'FriendId'
 *   },
 * });
 */
export function useRemove_FriendMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Remove_FriendMutation,
    Remove_FriendMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    Remove_FriendMutation,
    Remove_FriendMutationVariables
  >(Remove_FriendDocument, options)
}
export type Remove_FriendMutationHookResult = ReturnType<
  typeof useRemove_FriendMutation
>
export type Remove_FriendMutationResult =
  Apollo.MutationResult<Remove_FriendMutation>
export type Remove_FriendMutationOptions = Apollo.BaseMutationOptions<
  Remove_FriendMutation,
  Remove_FriendMutationVariables
>
export const Decline_FriendDocument = gql`
  mutation Decline_Friend($RequestId: String!) {
    Decline_Friend(RequestId: $RequestId)
  }
`
export type Decline_FriendMutationFn = Apollo.MutationFunction<
  Decline_FriendMutation,
  Decline_FriendMutationVariables
>

/**
 * __useDecline_FriendMutation__
 *
 * To run a mutation, you first call `useDecline_FriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDecline_FriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineFriendMutation, { data, loading, error }] = useDecline_FriendMutation({
 *   variables: {
 *      RequestId: // value for 'RequestId'
 *   },
 * });
 */
export function useDecline_FriendMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Decline_FriendMutation,
    Decline_FriendMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    Decline_FriendMutation,
    Decline_FriendMutationVariables
  >(Decline_FriendDocument, options)
}
export type Decline_FriendMutationHookResult = ReturnType<
  typeof useDecline_FriendMutation
>
export type Decline_FriendMutationResult =
  Apollo.MutationResult<Decline_FriendMutation>
export type Decline_FriendMutationOptions = Apollo.BaseMutationOptions<
  Decline_FriendMutation,
  Decline_FriendMutationVariables
>
export const Send_Friend_RequestDocument = gql`
  mutation Send_Friend_Request($FriendId: String!) {
    Send_Friend_Request(FriendId: $FriendId) {
      __typename
      ... on Request_Status {
        Status
      }
      ... on UnknownError {
        error
      }
    }
  }
`
export type Send_Friend_RequestMutationFn = Apollo.MutationFunction<
  Send_Friend_RequestMutation,
  Send_Friend_RequestMutationVariables
>

/**
 * __useSend_Friend_RequestMutation__
 *
 * To run a mutation, you first call `useSend_Friend_RequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSend_Friend_RequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendFriendRequestMutation, { data, loading, error }] = useSend_Friend_RequestMutation({
 *   variables: {
 *      FriendId: // value for 'FriendId'
 *   },
 * });
 */
export function useSend_Friend_RequestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Send_Friend_RequestMutation,
    Send_Friend_RequestMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    Send_Friend_RequestMutation,
    Send_Friend_RequestMutationVariables
  >(Send_Friend_RequestDocument, options)
}
export type Send_Friend_RequestMutationHookResult = ReturnType<
  typeof useSend_Friend_RequestMutation
>
export type Send_Friend_RequestMutationResult =
  Apollo.MutationResult<Send_Friend_RequestMutation>
export type Send_Friend_RequestMutationOptions = Apollo.BaseMutationOptions<
  Send_Friend_RequestMutation,
  Send_Friend_RequestMutationVariables
>
export const Friend_RequestDocument = gql`
  query Friend_Request {
    Get_Friend_Request {
      id
      senderId
      sender {
        username
      }
    }
  }
`

/**
 * __useFriend_RequestQuery__
 *
 * To run a query within a React component, call `useFriend_RequestQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriend_RequestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriend_RequestQuery({
 *   variables: {
 *   },
 * });
 */
export function useFriend_RequestQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Friend_RequestQuery,
    Friend_RequestQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<Friend_RequestQuery, Friend_RequestQueryVariables>(
    Friend_RequestDocument,
    options
  )
}
export function useFriend_RequestLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Friend_RequestQuery,
    Friend_RequestQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<Friend_RequestQuery, Friend_RequestQueryVariables>(
    Friend_RequestDocument,
    options
  )
}
export type Friend_RequestQueryHookResult = ReturnType<
  typeof useFriend_RequestQuery
>
export type Friend_RequestLazyQueryHookResult = ReturnType<
  typeof useFriend_RequestLazyQuery
>
export type Friend_RequestQueryResult = Apollo.QueryResult<
  Friend_RequestQuery,
  Friend_RequestQueryVariables
>
export const Seach_FriendDocument = gql`
  mutation Seach_Friend($Keyword: String!) {
    Seach_Friend(Keyword: $Keyword) {
      __typename
      ... on Seach_Users {
        Seach_Users {
          id
          username
        }
      }
      ... on UnknownError {
        error
      }
    }
  }
`
export type Seach_FriendMutationFn = Apollo.MutationFunction<
  Seach_FriendMutation,
  Seach_FriendMutationVariables
>

/**
 * __useSeach_FriendMutation__
 *
 * To run a mutation, you first call `useSeach_FriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSeach_FriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [seachFriendMutation, { data, loading, error }] = useSeach_FriendMutation({
 *   variables: {
 *      Keyword: // value for 'Keyword'
 *   },
 * });
 */
export function useSeach_FriendMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Seach_FriendMutation,
    Seach_FriendMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    Seach_FriendMutation,
    Seach_FriendMutationVariables
  >(Seach_FriendDocument, options)
}
export type Seach_FriendMutationHookResult = ReturnType<
  typeof useSeach_FriendMutation
>
export type Seach_FriendMutationResult =
  Apollo.MutationResult<Seach_FriendMutation>
export type Seach_FriendMutationOptions = Apollo.BaseMutationOptions<
  Seach_FriendMutation,
  Seach_FriendMutationVariables
>
export const LikeDocument = gql`
  mutation Like($id: String!, $type: CD!) {
    Like(id: $id, type: $type) {
      id
      body
      authorId
      _count {
        likes
        comments
        mylikes
      }
      createdAt
    }
  }
`
export type LikeMutationFn = Apollo.MutationFunction<
  LikeMutation,
  LikeMutationVariables
>

/**
 * __useLikeMutation__
 *
 * To run a mutation, you first call `useLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeMutation, { data, loading, error }] = useLikeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useLikeMutation(
  baseOptions?: Apollo.MutationHookOptions<LikeMutation, LikeMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LikeMutation, LikeMutationVariables>(
    LikeDocument,
    options
  )
}
export type LikeMutationHookResult = ReturnType<typeof useLikeMutation>
export type LikeMutationResult = Apollo.MutationResult<LikeMutation>
export type LikeMutationOptions = Apollo.BaseMutationOptions<
  LikeMutation,
  LikeMutationVariables
>
export const PostDocument = gql`
  query Post($cursor: String, $type: postsRequest!) {
    Post(cursor: $cursor, type: $type) {
      id
      body
      authorId
      _count {
        likes
        comments
      }
      createdAt
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
 *      cursor: // value for 'cursor'
 *      type: // value for 'type'
 *   },
 * });
 */
export function usePostQuery(
  baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>
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
export const Create_PostDocument = gql`
  mutation Create_Post($body: String!) {
    Create_Post(body: $body) {
      __typename
      ... on Post {
        id
        body
        authorId
        createdAt
        _count {
          likes
          comments
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
