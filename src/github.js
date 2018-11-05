"use strict";

// Class access to Github through the API
export default class Github {
	// Required data to take access
	constructor () {
		this.client_id = '1daefedafc7766b1074a';
		this.client_secret = '3b65902742463d05d5e15fd92fcc50f4e9a2b337';
		this.token = 'a91b6042b5af043ae6b91fa2ad8c2560739e217b';
	}

	async connection (user) {
		// Async method access to Github for User info
		const userRequest = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
		const userInfo = await userRequest.json();

		// Async method access for User's repos
		const reposRequest = await fetch(`https://api.github.com/users/${user}/repos`);
		const reposInfo = await reposRequest.json();

		return {
			"user": userInfo,
			"repos": reposInfo
		};
	}
	// Async method to fork selected repo
	async fork (url) {
		const forkRepository = await fetch(url, {
			method: 'POST',
			headers: {
				'Authorization':`token ${this.token}`,
				'Content-Type': 'application/json'
			}
		});
		return forkRepository;
	}
}