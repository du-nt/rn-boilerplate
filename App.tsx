import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AuthStacks from './navigators/auth_stacks'
import MainTabs from './navigators/main_tabs'

const Stack = createNativeStackNavigator()

import { StatusBar, useColorScheme } from 'react-native'
// import NetworkLogger from 'react-native-network-logger'
import { PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import LottieSplashScreen from '@attarchi/react-native-lottie-splash-screen'
import { NavigationContainer } from '@react-navigation/native'
import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from './configs/query_client'
import { CombinedDarkTheme, CombinedDefaultTheme } from './configs/theme'
import { useQuery } from './hooks/useQuery'
import useBoundStore from './stores/bound_store'
import useUserStore from './stores/user_store'
import { SipAccount } from './types'

function App() {
  const colorScheme = useColorScheme()

  const sipAccount = useBoundStore((state) => state.sipAccount)
  const setSipAccount = useBoundStore((state) => state.setSipAccount)

  const user = useUserStore((state) => state.user)
  const hasHydrated: boolean = useUserStore((state) => state._hasHydrated)

  useQuery<SipAccount>({
    queryKey: ['user'],
    config: {
      url: `/v1/agents/users/${user?.username}/sip-account?customerId=${user?.agreementID}`
    },
    enabled: hasHydrated,
    onSuccess: (data: SipAccount) => {
      setSipAccount(data)
      LottieSplashScreen.hide()
    },
    onError: () => LottieSplashScreen.hide()
  })

  const isDarkTheme = colorScheme === 'dark'
  const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <StatusBar
          barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
          backgroundColor='transparent'
          translucent
        />

        <NavigationContainer theme={theme}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
          >
            {sipAccount ? (
              <Stack.Screen name='main' component={MainTabs} />
            ) : (
              <Stack.Screen name='auth' component={AuthStacks} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  )
}

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
      {/* <NetworkLogger /> */}
    </QueryClientProvider>
  )
}
