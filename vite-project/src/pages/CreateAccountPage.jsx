import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';


export default function CreateAccountPage(){
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmpass, setConfirmPass] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function createAccount(){
        if(pass !== confirmpass)
            {
                setError('Password and Confirm Password does not match');
                return;
            }
        try{
            await createUserWithEmailAndPassword(getAuth(), email, pass);
            navigate('/articles_list');
        }catch(e){
            setError(e.message);
        }
    }

    return (
        <>
        <h1>Create Account</h1>
        {error && <p>{error}</p>}
        <input type='email' placeholder="Your Email Addess" value={email} onChange = {e=> setEmail(e.target.value)} />
        <input type='password' placeholder="Password" value={pass} onChange = {e=> setPass(e.target.value)} />
        <input type='password' placeholder="Confirm Password" value={confirmpass} onChange = {e=> setConfirmPass(e.target.value)} />
        <button onClick={ createAccount }>Create Account </button>
        <Link to='/login'>Already have an account? Login </Link>

        </>
    );

    
}