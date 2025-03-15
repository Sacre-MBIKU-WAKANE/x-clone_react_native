const users: {
	id: string;
	username: string;
	tagName: string;
	profile: string;
}[] = [
	{
		id: "David Mukeba",
		username: "David Mukeba",
		tagName: "@David_Mukeba",
		profile:
			"https://images.pexels.com/photos/28917763/pexels-photo-28917763/free-photo-of-femme-qui-travaille-sur-son-ordinateur.jpeg?auto=compress&cs=tinysrgb&w=1200",
	},
	{
		id: "Fernando tatangoy Kinkondja",
		username: "Fernando tatangoy Kinkondja",
		tagName: "@Fernando",
		profile:
			"https://images.pexels.com/photos/14705266/pexels-photo-14705266.jpeg?auto=compress&cs=tinysrgb&w=1200",
	},
	{
		id: "Exauce Tabala",
		username: "Exauce Tabala",
		tagName: "@Exauce_Tabala",
		profile:
			"https://images.pexels.com/photos/20903233/pexels-photo-20903233/free-photo-of-burundi-enfant-enfant-enfants.jpeg?auto=compress&cs=tinysrgb&w=1200",
	},
];

export const Tweets: {
	id: string;
	message: string;
	like: number;
	retweets: number;
	idUser: string;
}[] = [
	{
		id: "jkdehjkhdekhdehjdke",
		message:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
		like: 3,
		retweets: 1,
		idUser: users[0].id,
	},
	{
		id: "jkdehjkhdekhddjekdjekudjgiudeehjdke",
		message:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
		like: 13,
		retweets: 10,
		idUser: users[1].id,
	},
	{
		id: "jkdjekdejkljddjekudjgiudeehjdke",
		message:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
		like: 33,
		retweets: 110,
		idUser: users[2].id,
	},
	{
		id: "jkdehjkhdekhdehjdkedejkdiue",
		message:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
		like: 3,
		retweets: 1,
		idUser: users[0].id,
	},
	{
		id: "jkkhdekhddjekdjekudjgiudeehjdke",
		message:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
		like: 13,
		retweets: 10,
		idUser: users[1].id,
	},
	{
		id: "s)sjkdehjkhdekhddjekdejkljddjekudjgiudeehjdke",
		message:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
		like: 33,
		retweets: 110,
		idUser: users[2].id,
	},
];
