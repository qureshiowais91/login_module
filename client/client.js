const login = "http://127.0.0.1:3030/api/auth/login";
const register = "http://restnewapp123.herokuapp.com/api/auth/register";

const username = document.querySelector('#username');
const password = document.querySelector('#password');

const Myform = document.querySelector('.myform');

Myform.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(username.value);
    console.log(password.value);

    const options = {
        method: 'POST',
        body: JSON.stringify({
            username: username.value,
            password: password.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    fetch(register, options)
        .then(res => res.json())
        .then(res => document.write(res.token));
})


