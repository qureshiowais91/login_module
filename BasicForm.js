import React,{useState} from 'react'


const BasicForm = () => {
    const [username,setUserName]=useState("");
    const [password,setPassword]=useState("");

    const submitForm = (e) => {
        e.preventDefault();

        const login = "https://logink123.herokuapp.com/api/auth/register";

        const options = {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password,
                role:"doctor"
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        fetch(login,options)
            .then(res => res.json())
            .then(res => console.log(res));
        
    }
  return (
    <>
        <form className='container' action='' onSubmit={submitForm}>
            <div>
                <label htmlFor='username'>UserName</label>
                <input type="text" name="username" id="username" autoComplete='off'
                value={username}
                onChange={(e) => setUserName(e.target.value)}/>
            </div>
            <div>
                <label htmlFor='password'>password</label>
                <input type="password" name="password" id="password" autoComplete='off'
                value={password}
                onChange={(p) => setPassword(p.target.value)}/>
            </div>
            <button type="submit">Login</button>

        </form>
    </>
  )

}

export default BasicForm