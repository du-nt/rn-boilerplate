import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'

import useMutation from '../hooks/useMutation'
import useBoundStore from '../stores/bound_store'
import useUserStore from '../stores/user_store'

export default function Home() {
  const { t } = useTranslation()
  const user = useUserStore((state) => state.user)
  const unAuthenticate = useBoundStore((state) => state.unAuthenticate)

  const { mutate } = useMutation<undefined>({
    endpoint: 'v1/sessions/22265?app=client_app',
    config: {
      method: 'DELETE'
    },
    onSuccess: unAuthenticate,
    onError: unAuthenticate
  })

  const handleLogout = () => mutate(undefined)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {t('common.hello', { name: user?.name })}👋
      </Text>

      <Button mode='contained' onPress={handleLogout}>
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
