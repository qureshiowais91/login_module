// const login = "https://logink123.herokuapp.com/api/auth/register";

// const options = {
//     method: 'POST',
//     body: JSON.stringify({
//         username: "rgrgrrg",
//         password: "uerrsdrg3Two"
//     }),
//     headers: {
//         'Content-Type': 'application/json'
//     }
// }

// fetch(login,options)
//     .then(res => res.json())
//     .then(res => console.log(res.token));


let bob = function (num, str) {
    console.log('bob', num, str, this);
    return true;
}

let shop = {
    name: "shop",
    myMethod: function (fn) {
        fn(arguments[1],arguments[2]);
    }
}

// shop.myMethod(bob,1,"shop1");
bob.call(shop,1,"shop called");
