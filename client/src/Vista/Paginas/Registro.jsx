import { Link } from "react-router-dom";
import {useState} from 'react';
import axios from 'axios';
/*verificar paquetes*/


export default function Registro(){
    const [name,setName] = useState('');
    const [document,setDocument] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    async function RegistrarUsuario(ev){
        /* axios es una paquete que ayuda a manejar los requests*/
        ev.preventDefault(); /* no vuelve a cargar la pagina*/
        try{
            await axios.post('/register',{
                name,
                document,
                email,
                password,
    
            });
            alert('¡Registro exitoso, podés iniciar sesión!');
        }catch(e){

            alert('Error en registro, intente más tarde.')
        }
        
       
    };
    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">
                    Registrar Usuario
                </h1>
                <form className="max-w-md mx-auto " onSubmit={RegistrarUsuario}>
                    <input type="text" placeholder={'Nombre y Apellido'} value={name} onChange={ev => setName(ev.target.value)} />
                    <input type="text" placeholder={'Documento de identidad'} value={document} onChange={ev => setDocument(ev.target.value)}/>
                    <input type="email" placeholder={'usuario@dominio.com'} value={email} onChange={ev => setEmail(ev.target.value)}/>
                    <input type="password" placeholder="Contraseña" value={password} onChange={ev => setPassword(ev.target.value)}/>
                    <button className="primary">Registrarse</button>
                    <div className="text-center py-2 text-gray-500">
                        ¿Ya sos miembro? <Link className="underline text-bn" to={'/login'}>Iniciar Sesión</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}