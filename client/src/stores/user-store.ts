import { User } from '@/actions/session'
import { create } from 'zustand'

interface UserStore {
  user: User | null
  update: (user: User | null) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  update: (user: User | null) => set(() => ({ user })),
}))
