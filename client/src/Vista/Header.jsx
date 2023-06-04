import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Header(){
    const {user} = useContext(UserContext);
    return(
      <header className='flex p-4 justify-between'> {/*header de logo: Se genera logo con nombre con referencia a heroicon para logo imagen.  */}
        <a href=""   className='flex items-center gap-1'> {/*logo */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-9 h-9">
        <path stroke-linecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
        </svg>
        <span className='font-bold text-xl'>
          AlquilerUB
        </span>
        </a>
        <div className='flex text-slate-500 gap-20 items-center border border-gray-300 rounded-full py-2 px-2 shadow-md shadow-gray-500'> {/* Barra de busqueda*/}
          <div>
            Busqueda
          </div>
          <div className="flex"></div>
          <button className='bg-primary text-white p-2 rounded-full'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </div>
        <Link to = {'/login'} className='flex items-center gap-2 border border-gray-300 rounded-full px-4 py-4 shadow-md shadow-gray-300'> {/*Inicio sesion header */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <div className='bg-gray-500 text-white rounded-full border border-gray-300 overflow-hidden'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            {!!user && (
              <div>
                {user.name}
              </div>
            )}
        </Link>
    
    </header>
    );
}