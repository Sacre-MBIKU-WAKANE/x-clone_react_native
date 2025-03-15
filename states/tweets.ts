import { Tweets } from "@/constants/samples";
import { create } from "zustand";

const useTweets = create((set) => ({
	tweets: Tweets,
	createTweet: (tweet: {
		message: string;
		like: number;
		retweets: number;
		idUser: string;
	}) =>
		set((state: any) => ({
			tweets: [{ ...tweet, id: Math.random() }, ...state.tweets],
		})),
}));

export default useTweets;
