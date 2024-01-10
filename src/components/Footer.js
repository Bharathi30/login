import { useState } from 'react';
import '../App.css'


export default function ClockDate() {

    const [time, setTime] = useState(
        {
            day : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date().getDay()],
            month : ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "OCtober", "November", "December"][new Date().getMonth()],
            date : new Date().getDate(),
            year : new Date().getFullYear(),
            clock : new Date().toLocaleTimeString()
        }
    )

    /***** Every seconds Change Time  *********/

    setInterval(

        () => {

            setTime({ ...time, clock: new Date().toLocaleTimeString() });

        }, 1000);

    return (
        <>
            {/********* Time, day, date and month display footer of the page  ********/}
            <span align = "right">

                {time.day}, {time.month} {time.date}, {time.year} {time.clock}
                
            </span>
        </>
    )

}