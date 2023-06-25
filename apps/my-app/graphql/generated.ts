import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type Mutation = {
  __typename?: 'Mutation';
  Create_UserProfile?: Maybe<Profile>;
  Update_UserProfile?: Maybe<Profile>;
};


export type MutationCreate_UserProfileArgs = {
  age: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdate_UserProfileArgs = {
  age: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Profile = {
  __typename?: 'Profile';
  age?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  test?: Maybe<Scalars['String']['output']>;
};

export type Create_UserProfileMutationVariables = Exact<{
  name: Scalars['String']['input'];
  age: Scalars['String']['input'];
  gender: Scalars['String']['input'];
}>;


export type Create_UserProfileMutation = { __typename?: 'Mutation', Create_UserProfile?: { __typename?: 'Profile', id?: string | null, createdAt?: any | null, updatedAt?: any | null, userId?: string | null, name?: string | null, age?: string | null, gender?: string | null } | null };

export type Update_UserProfileMutationVariables = Exact<{
  name: Scalars['String']['input'];
  age: Scalars['String']['input'];
  gender: Scalars['String']['input'];
}>;


export type Update_UserProfileMutation = { __typename?: 'Mutation', Create_UserProfile?: { __typename?: 'Profile', id?: string | null, createdAt?: any | null, updatedAt?: any | null, userId?: string | null, name?: string | null, age?: string | null, gender?: string | null } | null };


export const Create_UserProfileDocument = gql`
    mutation Create_UserProfile($name: String!, $age: String!, $gender: String!) {
  Create_UserProfile(name: $name, age: $age, gender: $gender) {
    id
    createdAt
    updatedAt
    userId
    name
    age
    gender
  }
}
    `;
export type Create_UserProfileMutationFn = Apollo.MutationFunction<Create_UserProfileMutation, Create_UserProfileMutationVariables>;

/**
 * __useCreate_UserProfileMutation__
 *
 * To run a mutation, you first call `useCreate_UserProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreate_UserProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserProfileMutation, { data, loading, error }] = useCreate_UserProfileMutation({
 *   variables: {
 *      name: // value for 'name'
 *      age: // value for 'age'
 *      gender: // value for 'gender'
 *   },
 * });
 */
export function useCreate_UserProfileMutation(baseOptions?: Apollo.MutationHookOptions<Create_UserProfileMutation, Create_UserProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Create_UserProfileMutation, Create_UserProfileMutationVariables>(Create_UserProfileDocument, options);
      }
export type Create_UserProfileMutationHookResult = ReturnType<typeof useCreate_UserProfileMutation>;
export type Create_UserProfileMutationResult = Apollo.MutationResult<Create_UserProfileMutation>;
export type Create_UserProfileMutationOptions = Apollo.BaseMutationOptions<Create_UserProfileMutation, Create_UserProfileMutationVariables>;
export const Update_UserProfileDocument = gql`
    mutation Update_UserProfile($name: String!, $age: String!, $gender: String!) {
  Create_UserProfile(name: $name, age: $age, gender: $gender) {
    id
    createdAt
    updatedAt
    userId
    name
    age
    gender
  }
}
    `;
export type Update_UserProfileMutationFn = Apollo.MutationFunction<Update_UserProfileMutation, Update_UserProfileMutationVariables>;

/**
 * __useUpdate_UserProfileMutation__
 *
 * To run a mutation, you first call `useUpdate_UserProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdate_UserProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserProfileMutation, { data, loading, error }] = useUpdate_UserProfileMutation({
 *   variables: {
 *      name: // value for 'name'
 *      age: // value for 'age'
 *      gender: // value for 'gender'
 *   },
 * });
 */
export function useUpdate_UserProfileMutation(baseOptions?: Apollo.MutationHookOptions<Update_UserProfileMutation, Update_UserProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Update_UserProfileMutation, Update_UserProfileMutationVariables>(Update_UserProfileDocument, options);
      }
export type Update_UserProfileMutationHookResult = ReturnType<typeof useUpdate_UserProfileMutation>;
export type Update_UserProfileMutationResult = Apollo.MutationResult<Update_UserProfileMutation>;
export type Update_UserProfileMutationOptions = Apollo.BaseMutationOptions<Update_UserProfileMutation, Update_UserProfileMutationVariables>;