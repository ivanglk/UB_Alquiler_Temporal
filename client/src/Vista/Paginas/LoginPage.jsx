import { useContext,useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import { UserContext } from "../../UserContext";

export default function LoginPage(){
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);
    async function handleloginsubmit(ev){
        ev.preventDefault();
        try{
            const {data} = await axios.post('/login', {email,password});
            setUser(data);
            alert('Inició Sesión');
            setRedirect(true);
        }catch(e){
            alert('Error en inicio de sesión');

        }
    };

    if (redirect){
        return <Navigate to ={'/'}/>
    }

    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">
                    Inicio Sesión
                </h1>
                <form className="max-w-md mx-auto " onSubmit={handleloginsubmit}>
                    <input type="email" placeholder={'usuario@dominio.com'} value ={email} onChange={ev => setEmail(ev.target.value)}/>
                    <input type="password" placeholder="Contraseña" value ={password} onChange={ev => setPassword(ev.target.value)}/>
                    <button className="primary">Inicio Sesión</button>
                    <div className="text-center py-2 text-gray-500">
                        ¿No tienes una cuenta todavia? <Link className="underline text-bn" to={'/registro'}>Registrate acá</Link>
                    </div>
                </form>
            </div>

        </div>
    );
}