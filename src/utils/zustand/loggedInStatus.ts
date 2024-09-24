import { create } from 'zustand';

interface isLoggedIn {
  isLoggedInStatus: boolean;
}

interface isLoggedInAction {
  setIsLoggedInStatus: (isLoggedIn: isLoggedIn['isLoggedInStatus']) => void;
}

export const loggedInStatusStore = create<isLoggedIn & isLoggedInAction>((set) => ({
  isLoggedInStatus: false,
  setIsLoggedInStatus: (isLoggedInStatus) => set({ isLoggedInStatus: isLoggedInStatus })
}))