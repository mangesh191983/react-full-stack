import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function logIn(){
        try{
            await signInWithEmailAndPassword(getAuth(), email, pass);
            navigate('/articles_list');
        }catch(e){
            setError(e.massage);
        }
    }

    return (
        <>
        <h1>Log In</h1>
        {error && <p>{error}</p>}
        <input type='email' placeholder="Your Email Addess" value={email} onChange = {e=> setEmail(e.target.value)} />
        <input type='password' placeholder="Password" value={pass} onChange = {e=> setPass(e.target.value)} />
        <button onClick={ logIn }>LogIn </button>
        <Link to='/create-account'>Dont have account? create one here</Link>

        </>
    );

    
}