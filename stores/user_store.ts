import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { User } from '../types'

export type UserState = {
  user: User | null
  setUser: (user: User | null) => void
  _hasHydrated: boolean
  setHasHydrated: (state: boolean) => void
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      _hasHydrated: false,
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state
        })
      },
      user: null,
      setUser: (user: User | null) => {
        if (!user) {
          set({ user: null })
          return
        }

        const customerId =
          user.agreementID.startsWith('CRM') && user.infinitalkCustomerId
            ? user.infinitalkCustomerId
            : user.agreementID
        const serverNumber = customerId.slice(0, 3)

        set({ user: { ...user, customerId, serverNumber } })
      }
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true)
      }
    }
  )
)

export default useUserStore
