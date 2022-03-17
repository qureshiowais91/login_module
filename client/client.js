const login = "https://logink123.herokuapp.com/api/auth/register";

const options = {
    method: 'POST',
    body: JSON.stringify({
        username: "rgrgrrg",
        password: "uerrsdrg3Two"
    }),
    headers: {
        'Content-Type': 'application/json'
    }
}

fetch(login,options)
    .then(res => res.json())
    .then(res => console.log(res.token));