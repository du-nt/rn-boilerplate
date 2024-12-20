import { StateCreator } from 'zustand'

import { BoundState } from '.'

export type AuthState = {
  unAuthenticate: () => void
}

export const createAuthSlice: StateCreator<BoundState, [], [], AuthState> = (
  set
) => ({
  unAuthenticate: () => set({ user: null, sipAccount: null })
})
