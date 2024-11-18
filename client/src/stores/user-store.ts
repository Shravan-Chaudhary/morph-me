import { User } from '@/actions/session'
import { create } from 'zustand'

interface UserStore {
  user: User | null
  update: (user: User | null) => void
  updateCredits: (credits: number) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  update: (user: User | null) => set(() => ({ user })),
  updateCredits: (credits: number) =>
    set((state) => ({
      user: state.user ? { ...state.user, credits } : null,
    })),
}))
