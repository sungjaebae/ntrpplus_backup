import create from "zustand";

const useUserStore = create((set) => ({
  userId: "",
  setUserId: (userId) => set({ userId }),
}));

export default useUserStore;
