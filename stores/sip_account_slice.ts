import { StateCreator } from 'zustand'

import { SipAccount } from '../types'

import useUserStore from './user_store'

export type SipAccountState = {
  sipAccount: SipAccount | null
  setSipAccount: (sipAccount: SipAccount) => void
  unAuthenticate: () => void
}

const createSipAccountSlice: StateCreator<SipAccountState> = (set) => ({
  sipAccount: null,
  setSipAccount: (sipAccount: SipAccount) => set({ sipAccount }),
  unAuthenticate: () => {
    set({ sipAccount: null })
    useUserStore.getState().setUser(null)
    useUserStore.persist.clearStorage()
  }
})

export default createSipAccountSlice
