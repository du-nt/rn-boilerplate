import { create } from 'zustand'

import createSipAccountSlice, { SipAccountState } from './sip_account_slice'

export type BoundState = SipAccountState

const useBoundStore = create<BoundState>((...args) => ({
  ...createSipAccountSlice(...args)
}))

export default useBoundStore
