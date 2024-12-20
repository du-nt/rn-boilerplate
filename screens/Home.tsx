import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'

import useBoundStore from '../stores'

export default function Home() {
  const { t } = useTranslation()
  const user = useBoundStore((state) => state.user)
  const logout = useBoundStore((state) => state.unAuthenticate)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {t('common.hello', { name: user?.name })}👋
      </Text>

      <Button mode='contained' onPress={logout}>
        Logout
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: 'red'
  }
})
