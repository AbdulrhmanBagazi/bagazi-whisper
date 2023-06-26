import { Dimensions } from 'react-native'

export const windowWidth = Dimensions.get('window').width
export const windowHeight = Dimensions.get('window').height

//google auth
export const webClientId =
  '901377328281-7dbfms7cbummrl8p5n04n5slevp084nl.apps.googleusercontent.com'
export const iosClientId =
  '901377328281-57390vlc4oa7pa1g3dk3s9anjd7d2qj4.apps.googleusercontent.com'
export const androidClientId =
  '901377328281-c8c373ncl4elsnqu7asi2mnsh3msqoql.apps.googleusercontent.com'
export const expoClientId =
  '903376713954-fp9njcstn2p7j34rnv986ea2o49npt6l.apps.googleusercontent.com'

//api
export const AuthApi = 'http://192.168.100.11:4000/client'
export const GRAPHQL = 'http://192.168.100.11:4000/graphql/client'
export const PUBLIC_GRAPHQL = 'http://192.168.100.11:4000/graphql/public_client'
