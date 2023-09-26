import {useEffect, useState} from 'react';
import Perks from "../Perks.jsx";
import PhotosUploader from "../../PhotosUploader.jsx";
import AccountNav from '../../AccountNav.jsx';
import {Navigate, useParams} from "react-router-dom";
import axios from "axios";

export default function PlacesFormPage(){
    const {id} = useParams();
    const[title, setTitle] = useState('');
    const[address, setAddress] = useState('');
    const[addedPhotos, setAddedPhotos] = useState([]);
    const[description,setDescription] = useState('');
    const[perks,setPerks] = useState([]);
    const[extrainfo,setExtraInfo] = useState('');
    const[checkIn,setCheckIn] = useState('');
    const[checkOut,setCheckOut] = useState('');
    const[maxGuests,setMaxGuest] = useState(1);
    const[price,setPrice] = useState(100);
    const[redirect,setRedirect] = useState(false);
    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/places/'+id).then(response => {
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extrainfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuest(data.maxGuests);
            setPrice(data.price);
            
        });
    },[id]);

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
    async function savePlace (ev){
        ev.preventDefault();
        const placeData = {title,address, addedPhotos, description, perks,
         extrainfo, checkIn, checkOut, maxGuests, price, };
        if (id){ 
            await axios.put('/places', {id, ...placeData});
            setRedirect(true);
            
        }else{
            await axios.post('/places', placeData);
            setRedirect(true);
        }
     }
     if(redirect){
        return <Navigate to={'/account/places'}/>
     }
    return(
        <div>
                <AccountNav />
                <form onSubmit={savePlace}>
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
                    <textarea value={extrainfo} onChange={ev => setExtraInfo(ev.target.value)}/>
                    {preInput('Check in & Check out, max huéspedes', 'Añadir fechas de check in y check out.')}
                    <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
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
                            <input type="number" value={maxGuests} onChange={ev => setMaxGuest(ev.target.value)}/>
                        </div>
                        <div>
                            <h3 className="mt-2 -mb-1">Precio por noche</h3>
                            <input type="number" value={price} onChange={ev => setPrice(ev.target.value)}/>
                        </div>
                        
                        
                    </div>
                        <button className="primary my-4">
                            Guardar
                        </button>
                </form>
            </div>
    );
}