const login = "http://127.0.0.1:3000/api/auth/login";

const options = {
    method: 'POST',
    body: JSON.stringify({
        username: "Owais91",
        password: "userTwo"
    }),
    headers: {
        'Content-Type': 'application/json'
    }
}

fetch(login,options)
    .then(res => res.json())
    .then(res => console.log(res.token));
