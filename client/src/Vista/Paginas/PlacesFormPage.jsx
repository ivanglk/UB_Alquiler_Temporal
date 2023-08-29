import {useState} from 'react';
import Perks from "../Perks.jsx";
import PhotosUploader from "../../PhotosUploader.jsx";
import AccountNav from '../../AccountNav.jsx';

export default function PlacesFormPage(){
    const[title, setTitle] = useState('');
    const[address, setAddress] = useState('');
    const[addedPhotos, setAddedPhotos] = useState([]);
    const[description,setDescription] = useState('');
    const[perks,setPerks] = useState('');
    const[extraInfo,setExtraInfo] = useState('');
    const[checkIn,setCheckIn] = useState('');
    const[checkOut,setCheckOut] = useState('');
    const[maxGuest,setMaxGuest] = useState(1);
    const[redirect,setRedirect] = useState(false);

    function inputHeader(text){
        return(
            <h2 className="text-xl mt-4">{text}</h2>
        );
    }
    function inputDescription(text){
            return (
                <p className="text-gray-500 text-sm">{text}</p>
            );
        }
    function preInput(header,description){
        return (
            <>
             {inputHeader(header)}
             {inputDescription(description)}
            </>
        );
    
    }
    async function addNewPlace (ev){
        ev.preventDefault();
        await axios.post('/places', {title,address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuest});
        setRedirect(true);
     }
     if(redirect){
        return <Navigate to={'/account/places'}/>
     }
    return(
        <div>
                <AccountNav />
                <form onSubmit={addNewPlace}>
                    {preInput('Título', 'Título para su propiedad.')}
                    <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="Título de publicación." />
                    {preInput('Dirección', 'La dirección de tu propiedad.')}
                    <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="Dirección." />
                    {preInput('Imágenes', 'Inserte imagenes de su propiedad.')}
                    <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
                    {preInput('Descripción', 'Describa su propiedad.')}
                    <textarea value={description} onChange={ev => setDescription(ev.target.value)}></textarea>
                    {preInput('Amenities', 'Seleccione todos los amenities de su propiedad.')}
                    <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                        <Perks selected={perks} onChange={setPerks}/>
                    </div>
                    {preInput('Información', 'Normas de convivencia, etc.')}
                    <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>
                    {preInput('Check in & Check out, max huéspedes', 'Añadir fechas de check in y check out.')}
                    <div className="grid gap-2 sm:grid-cols-3">
                        <div>
                            <h3 className="mt-2 -mb-1">Check in</h3>
                            <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} placeholder="14"/>
                        </div>
                        <div>
                            <h3 className="mt-2 -mb-1">Check out</h3>
                            <input type="text" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} placeholder="11" />
                        </div>
                        <div>
                            <h3 className="mt-2 -mb-1">Número máximo Huéspedes</h3>
                            <input type="number" value={maxGuest} onChange={ev => setMaxGuest(ev.target.value)}/>
                        </div>
                        
                    </div>
                        <button className="primary my-4">
                            Guardar
                        </button>
                </form>
            </div>
    );
}