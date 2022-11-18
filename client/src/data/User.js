import create from "zustand";

const useUserStore = create((set) => ({
  userId: "",
  nickname: "",
  setUserId: (userId) => set({ userId }),
  setNickname: (nickname) => set({ nickname }),
}));

export default useUserStore;
