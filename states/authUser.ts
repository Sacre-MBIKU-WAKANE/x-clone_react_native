import { create } from "zustand";

const useAuthUser = create((set) => ({
	username: "",
	password: "",
	isConnected: false,
	login: (username: string, password: string) =>
		set((state: any) => {
			if (username === "@retha" && password === "1234") {
				return {
					username: username,
					password,
					isConnected: true,
				};
			}
		}),
	logout: () => set((state: any) => ({ isConnected: false })),
}));

export default useAuthUser;
