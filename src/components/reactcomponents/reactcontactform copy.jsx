import {useState} from "react"; 
import { useForm } from "react-hook-form"; 
import { current } from "tailwindcss/colors";

const ReactForm = () => {

    const {register, handleSubmit} = useForm(); 




    const onSubmit = () => {
        console.log("hello world"); 
    }

    const [num, setNum] = useState(0); 

    const currentNumber = (event) => {
        setNum(event.target.value); 
    }
    const changeNumber = (event) => {
        console.log(num); 
    }
   
   
    return <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Contact Form</h1>
            <div className="relative z-0 w-full mb-3 group">
                <input type="text" name="vorname"  placeholder="Vorname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"/>
            </div>
            <div className="relative z-0 w-full mb-3 group">
                <input type="text" name="nachname" placeholder="Nachname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
            </div>
            <div className="relative z-0 w-full mb-3 group">
                <input type="email" name="email" placeholder="Email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"/>
            </div>
            <div className="relative z-0 w-full mb-3 group">
                <input type="submit" value="Ansenden" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"/>              
            </div>
         </form>


         <br></br><br></br><br></br><br></br>



        <input type="text" onChange={currentNumber}/>
        <button onClick={changeNumber}>Change</button>
        <h1>{num}</h1>
    </div>; 
}

export default ReactForm;