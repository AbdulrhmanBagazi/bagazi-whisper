import React, { Ref, useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps
} from '@gorhom/bottom-sheet'
import { Portal, useTheme, Text, Divider } from 'react-native-paper'
import SheetFlatList from './sheetFlatList'
import CreateComment from './createComment'
import { useCommentHook } from '../../hook/comment'
import { useI18nHook } from '../../hook/i18n'

const CustomBackdrop = (props: BottomSheetBackdropProps) => {
  return (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
  )
}

const CustomBackground: React.FC<BottomSheetBackdropProps> = ({ style }) => {
  const theme = useTheme()

  return (
    <View
      pointerEvents="none"
      style={[
        style,
        {
          backgroundColor: theme.colors.background
        }
      ]}
    />
  )
}

const Sheet: React.FC<{ sheetRef: Ref<any> }> = ({ sheetRef }) => {
  // hooks
  const theme = useTheme()
  const { I18n } = useI18nHook()
  const snapPoints = useMemo(() => ['70%'], [])
  const [state, setstate] = useState(false)
  const { CloseComment } = useCommentHook()
  // callbacks
  const handleSheetChange = useCallback((index: any) => {
    if (index >= 0) return setstate(true)
    if (index <= 0) {
      setstate(false)
      return CloseComment()
    }
  }, [])

  return (
    <Portal>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        index={-1}
        enablePanDownToClose
        backdropComponent={CustomBackdrop}
        backgroundComponent={CustomBackground}
        handleIndicatorStyle={{
          backgroundColor: theme.colors.primary
        }}
        keyboardBehavior="fillParent"
      >
        <Text
          variant="headlineSmall"
          style={{ alignSelf: 'center', padding: 5 }}
        >
          {I18n.Home.Comments}
        </Text>
        <Divider />
        <SheetFlatList open={state} />
        <CreateComment />
      </BottomSheet>
    </Portal>
  )
}

export default Sheet
