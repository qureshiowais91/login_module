
const login = "https://logink123.herokuapp.com/api/auth/login/";
const register = "https://logink123.herokuapp.com/api/auth/register/";
const allaccounts = "https://logink123.herokuapp.com/api/doctor/account/";

const username = document.querySelector('#username');
const password = document.querySelector('#password');
const Myform = document.querySelector('.myform');


const loginfun = async (e) => {
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

    return fetch(login, options);

}

const getAccountInfo = async (e, token) => {

    const options = {
        method: 'GET',

        headers: {
            'Content-Type': 'application/json',
            'autherization': `Bearer ${token}`
        }

    }
    return fetch(allaccounts, options);
}


Myform.addEventListener('submit', (e) => {
    loginfun(e)
        .then(res => res.json())
        .then(res => getAccountInfo(e, res.token).then(res=>console.log(res)))
       

});

