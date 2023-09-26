import { differenceInCalendarDays } from "date-fns";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function BookingWidget({place}){
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [mobil, setMobil] = useState('');
    let numberOfNights = 0;
    if(checkIn && checkOut){
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }
    return(
        <div className="bg-white shadow p-4 rounded-2xl">
                        <div className="text-2xl text-center">
                            Precio: {place.price} / por noche
                        </div>
                        <div className="border rounded-2xl mt-4">
                            <div className="flex">
                                <div className="py-3 px-4">
                                    <label >Check in: </label>
                                    <input type="date" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} />
                                </div>
                                <div className="py-3 px-4 border-l">
                                    <label >Check out: </label>
                                    <input type="date" value={checkOut} onChange={ev => setCheckOut(ev.target.value)}/>
                                </div>
                            </div>
                            <div className="py-3 px-4 border-t">
                                <label >Número de huéspedes: </label>
                                <input type="number" value={numberOfGuests} onChange={ev => setNumberOfGuests(ev.target.value)}/>
                            </div>
                            {numberOfNights>0 && (
                            <div className="py-3 px-4 border-t">
                                <label >Nombre Completo: </label>
                                <input type="text" value={name} onChange={ev => setName(ev.target.value)}/>
                                <label >Tel: </label>
                                <input type="tel" value={mobil} onChange={ev => setMobil(ev.target.value)}/>
                            </div>
                    
                            )}
                        </div>
                        <button className="primary mt-4">
                            Reservar
                            {numberOfNights > 0 && (
                                <span> ${numberOfNights * (place.price)}</span>
                            )}
                        </button>
                    </div>
    );
}