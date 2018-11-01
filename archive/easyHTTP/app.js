"use strict";

//Data object
const character = {
    name: "Dex Goodiny",
    username: "Archimond",
    email: "aru@mail.ru"
}

//Library
class easyHTTP {
    async get(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    async post(url) {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(character)
      }); 
      const data = await response.json();
      return data;
    }

    async put(url) {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(character)
      }); 
      const data = await response.json();
      return data;

    }

    async delete(url) {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      }); 
      const data = await 'Character deleted';
      return data;
    }
}

//Instance
const lib = new easyHTTP;

//Calls
/* lib.get('https://jsonplaceholder.typicode.com/posts')
.then(data => console.log(data))
.catch(err => console.log(err)); */

// lib.post('https://jsonplaceholder.typicode.com/posts')
// .then(data => console.log(data))
// .catch(err => console.log(err));

// lib.put('https://jsonplaceholder.typicode.com/posts/1')
// .then(data => console.log(data))
// .catch(err => console.log(err));

lib.delete('https://jsonplaceholder.typicode.com/posts/1')
.then(data => console.log(data))
.catch(err => console.log(err));
