"use strict";

import Github from './github.js';
import UI from './ui.js';

// Instances of the main classes
const github = new Github;
const ui = new UI;

let timeout_id;
// Input field event
document.getElementById('searchField').addEventListener('keyup', (e) => {
	clearTimeout(timeout_id);
	// User's request
	timeout_id = setTimeout(() => {
		github.connection(e.target.value)
		.then(result => {
			if(e.target.value !== '') {
				ui.render(result);
			} else {
				ui.clear();
			}
		})
		.catch(error => ui.noUser());

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
				tempInput.value = 'git clone ' + value;
				document.body.appendChild(tempInput);
				tempInput.select();
				document.execCommand("copy");
				document.body.removeChild(tempInput);

				let alert = document.createElement('div');
					alert.classList.add('alert', 'alert-danger');
					alert.setAttribute('role', 'alert');
					alert.innerHTML = 'Copied to Clipboard';

				setTimeout(() => {
					ancestor.removeChild(alert);
				}, 3000)

				let ancestor = findAncestor (e.target, 'repo-container');

				let checker = ancestor.querySelector('.alert');

				if(checker === null) {
					ancestor.prepend(alert);
				}
			}
			// Fork repository
			if(e.target.classList.contains('js-fork')) {
				e.preventDefault();
				github.fork(e.target.href)
				.then(result => {
					console.log(result);
				})
				.catch(error => error);
			}
		});
	}, 500);
});