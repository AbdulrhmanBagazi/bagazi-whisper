import { Dimensions } from 'react-native'

export const windowWidth = Dimensions.get('window').width
export const windowHeight = Dimensions.get('window').height

//google auth
export const webClientId =
  '655983294636-n91u1rdtpfta4c9uisnehedf8mtjq2pa.apps.googleusercontent.com'
export const iosClientId =
  '655983294636-ask8k61r90ph1tngq2vh1gie5l7hjsl0.apps.googleusercontent.com'
export const androidClientId =
  '655983294636-ask8k61r90ph1tngq2vh1gie5l7hjsl0.apps.googleusercontent.com'

// const IP = '192.168.100.10'
// //api
// export const AuthApi = `http://${IP}:4000/client`
// export const GRAPHQL = `http://${IP}:4000/graphql/client`
// export const PUBLIC_GRAPHQL = `http://${IP}:4000/graphql/public_client`

const IP = 'baqazi-whisper-production.up.railway.app'
export const AuthApi = `https://${IP}/client`
export const GRAPHQL = `https://${IP}/graphql/client`
export const PUBLIC_GRAPHQL = `https://${IP}/graphql/public_client`
