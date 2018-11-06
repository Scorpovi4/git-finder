"use strict";

import Github from './github.js';
import UI from './ui.js';

// Instances of the main classes
const github = new Github;
const ui = new UI;

let timeout_id;
const searchField = document.getElementById('searchField');
searchField.select();

// Input field event
searchField.addEventListener('keyup', (e) => {
	clearTimeout(timeout_id);
	// Preloader init
	if(e.target.value !== '') {
		ui.clear();
		ui.preloader();
	} else {
		ui.clear();
	}
	// User's request
	timeout_id = setTimeout(() => {
		github.connection(e.target.value)
		.then(result => {
				ui.render(result);
		})
		.catch(error => {
			if(e.target.value !== '') {
				ui.noUser();
			}
		});

		// Find ancestor from child
		function findAncestor (el, cls) {
			while ((el = el.parentElement) && !el.classList.contains(cls));
			return el;
		}

		// Copy to clipboard with alert
		document.querySelector('#info-container').addEventListener('click', (e) => {
			if(e.target.classList.contains('js-clone')) {
				e.preventDefault();
				let value = e.target.href;
				let tempInput = document.createElement("input");
					tempInput.style = "position: absolute; left: -1000px; top: -1000px";
					tempInput.value = `git clone ${value}`;
					document.body.appendChild(tempInput);
					tempInput.select();
					document.execCommand("copy");
					document.body.removeChild(tempInput);

				const ancestor = findAncestor (e.target, 'repo-container');
				ui.alert('Copied to Clipboard', ancestor);
			}
			// Fork repository
			if(e.target.classList.contains('js-fork')) {
				e.preventDefault();
				const ancestor = findAncestor (e.target, 'repo-container');
				github.fork(e.target.href)
				.then(result => {
					if (result.ok) {
						ui.alert('Forked', ancestor);
					} else {
						ui.alert('Hasn\'t forked', ancestor)
					}
				})
				.catch(error => error);
			}
		});
	}, 500);

});