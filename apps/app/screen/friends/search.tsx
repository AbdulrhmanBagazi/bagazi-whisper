import { ActivityIndicator, View } from 'react-native'
import { Appbar, Searchbar, Text } from 'react-native-paper'
import { useCallback, useState } from 'react'
import { Users, useSeach_FriendMutation } from '../../graphql/generated'
import SeachList from './ui/searchlist'
import { useI18nHook } from '../../hook/i18n'
import { useNavigation } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import _debounce from 'lodash.debounce'

export default function SeachScreen() {
  const Navigation = useNavigation()
  const { I18n, Direction } = useI18nHook((state) => state)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchData, setSearchData] = useState<Users[]>([])
  const [mutateFunction, { loading }] = useSeach_FriendMutation()

  const handleDebounceFn = (query: string) => {
    return mutateFunction({
      variables: {
        Keyword: query
      },
      onCompleted(data) {
        if (data.Seach_Friend?.__typename === 'Seach_Users') {
          return setSearchData(data.Seach_Friend.Seach_Users)
        }
      }
    })
  }

  const debounceFn = useCallback(_debounce(handleDebounceFn, 500), [])

  const handleChange = (query: string) => {
    setSearchQuery(query)
    if (query.length === 0) {
      return setSearchData([])
    }

    return debounceFn(query)
  }

  return (
    <View style={{ flex: 1, padding: 5 }}>
      <Appbar.Header style={{ flexDirection: 'row' }}>
        <Appbar.Action
          onPress={() => Navigation.goBack()}
          icon={
            Direction === 'rtl'
              ? 'arrow-right-bold-circle'
              : 'arrow-left-bold-circle'
          }
          disabled={loading}
        />
        <Searchbar
          placeholder={I18n.Sreach.Placeholder}
          onChangeText={handleChange}
          value={searchQuery}
          style={{ marginHorizontal: 5, flex: 1 }}
          autoFocus
        />
      </Appbar.Header>
      <FlashList
        // showsVerticalScrollIndicator={false}
        data={searchData}
        contentContainerStyle={{ paddingBottom: 50 }}
        // alwaysBounceVertical={false}
        ListHeaderComponent={
          loading ? <ActivityIndicator style={{ marginVertical: 20 }} /> : null
        }
        ListEmptyComponent={
          loading ? null : (
            <View
              style={{
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text variant="labelMedium" style={{ color: 'gray' }}>
                {I18n.Sreach.NoResults}
              </Text>
            </View>
          )
        }
        renderItem={({ item }) => <SeachList user={item} />}
        estimatedItemSize={100}
      />
    </View>
  )
}
