const login = "http://localhost:3000/api/auth/register";

const options = {
    method: 'POST',
    body: JSON.stringify({
        username: "wseefsef",
        password: "uersefsg3Two"
    }),
    headers: {
        'Content-Type': 'application/json'
    }
}

fetch(login,options)
    .then(res => res.json())
    .then(res => console.log(res.token));