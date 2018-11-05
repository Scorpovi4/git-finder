"use strict";

import Github from './github.js';

// Rendering class
export default class UI {

	constructor () {
		this.container = document.getElementById('info-container');
	}

	render(data) {
		console.log(data);
		this.container.classList.add('border', 'p-3');
		let accoundFounded = data.user.created_at.split('T');
		this.container.innerHTML = `<h1>${data.user.login? data.user.login : 'unknown user'}</h1>
		<div class="row">
			<div class="col-12 col-sm-4 text-center">
				<div class="row justify-content-center">
					<div class="col-6 col-sm-12 pb-3">
						<img class="img-fluid" src="${data.user.avatar_url? data.user.avatar_url : './assets/images/no-image.jpg'}" alt="">
					</div>
					<div class="col-12 pb-3">
						<a class="btn btn-primary text-white" style="cursor: pointer; ${data.user.html_url? '' : 'pointer-events: none;'}" href="${data.user.html_url}" target="blank">Follow profile</a>
					</div>
				</div>
			</div>
			<div class="col-12 col-sm-8 text-center text-sm-left">
				<span class="badge badge-primary">Public repos: ${data.user.public_repos? data.user.public_repos: 0}</span>
				<span class="badge badge-success">Public Gists: ${data.user.public_gists? data.user.public_gists : 0}</span>
				<span class="badge badge-danger">Followers: ${data.user.followers? data.user.followers : 0}</span>
				<span class="badge badge-info">Following: ${data.user.following? data.user.following : 0}</span>
				<ul class="list-group pt-3 text-left">
					<li class="list-group-item">Name: ${data.user.name? data.user.name : ''}</li>
					<li class="list-group-item">Company: ${data.user.company? data.user.company : ''}</li>
					<li class="list-group-item">E-mail: ${data.user.email? data.user.email : ''}</li>
					<li class="list-group-item">Location: ${data.user.location? data.user.location : ''}</li>
					<li class="list-group-item">Member since: ${data.user.created_at? accoundFounded[0] : ''}</li>
				</ul>
			</div>
		</div>`
		if(data.repos.length > 0) {
			for(let i = 0; i < data.repos.length; i++) {
				let repoFounded = data.repos[i].created_at.split('T'),
				repoChanged = data.repos[i].pushed_at.split('T');
				let repo = `<ul class="list-group">
				<li class="list-group-item bg-dark mt-1 mb-1 repo-container">
					<div class="row">
						<div class="col-12">
							<div class="d-block p-2 bg-dark text-white">
									<div class="row">
										<div class="col-12 col-md-6">
											<h6><a target="_blank" href="${data.repos[i].html_url}" class="text-white">${data.repos[i].name}</a></h6>
										</div>
										<div class="col-12 col-md-6 text-sm-right">
											<span class="badge badge-danger">${data.repos[i].language? data.repos[i].language : 'Unknown'}</span>
											<span class="badge badge-info">Forks: ${data.repos[i].forks}</span>
											<span class="badge badge-secondary">Issues: ${data.repos[i].open_issues}</span>
											<span class="badge badge-primary"><a class="text-white js-fork" href="${data.repos[i].forks_url}">Fork <i class="fa fa-code-fork fa-lg"></i></a></span>
											<span class="badge badge-success"><a class="text-white js-clone" href="${data.repos[i].clone_url}">Clone <i class="fa fa-clone"></i></a></span>
										</div>
										<div class="col-12">
											<div class="pt-2 pb-2 mt-2 mb-2">${data.repos[i].description? data.repos[i].description : 'No description'}</div>
										</div>
										<div class="col-12 col-md-6">
											<span>Created at: ${repoFounded[0]}</span>
										</div>
										<div class="col-12 col-md-6 text-md-right">
											<span>Last changed: ${repoChanged[0]}</span>
											</div></span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</li>
				</ul>`
				this.container.innerHTML += repo;
			}
		}
	}

	noUser () {
		this.container.classList.add('p-0', 'rounded');
		this.container.innerHTML = '<div class="bg-danger p-2 text-white rounded"><h4>User doesn\'t exist</h4></div>';
	}

	clear () {
		this.container.classList.remove('border');
		this.container.innerHTML = '';

	}

	preloader () {
		// Preloader image
		const preloader = document.createElement('img');
		preloader.setAttribute('src', './assets/images/preloader.gif')
		preloader.classList.add('d-block', 'm-auto');

		this.container.appendChild(preloader);
	}

	alert (message, ancestor) {
		let alert = document.createElement('div');
					alert.classList.add('alert', 'alert-danger');
					alert.setAttribute('role', 'alert');
					alert.innerHTML = message;

		let checker = ancestor.querySelector('.alert');

		if(checker === null) {
			ancestor.prepend(alert);
		}
		setTimeout(() => {
			ancestor.removeChild(alert);
		}, 3000);
	}
}