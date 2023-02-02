import tokenService from "./tokenService";
const BASE_URL = '/api/posts/';

export function create(data){
	return fetch(BASE_URL, { 
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			Authorization: "Bearer " + tokenService.getToken(),
            'Content-Type': 'application/json' 
            
			//this is how we grab the token from local storage
		}

	}).then((responseFromTheServer) =>{
		if(responseFromTheServer.ok) return responseFromTheServer.json() // return if everything okay

		// this is the return if there was an error from the server
		return responseFromTheServer.json().then(res => {
			console.log(res, ' <- this is the response in Posts create function in your utils folder')
			throw new Error('Something went wrong in create Post'); // < this goes to the catch block
			// when you call the create function (in handleAddPost in the feed page)
		})
	})
}

export function deletePost(data){
    return fetch(`${BASE_URL},/${post._id}` {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers:{
            Authorization: "Bearer" = tokenService.getToken(),
            'Content-Type': 'application/json'
        }
    }).then((responseFromTheServer) => {
        if(responseFromTheServer.ok) return responseFromTheServer.json()

        return responseFromTheServer.json().then(res => {
            console.log(res, "<---- this is the resonst for the delete posts function in the utils folder ")
            throw new Error('error deleting a post, check the erver terminal')
        })
    })
}


export function getAll() {
	return fetch(BASE_URL, {
	  headers: {
		'Authorization': 'Bearer ' + tokenService.getToken()
	  }
	})
	.then(res => res.json());
  }