import { useState,useEffect,useRef } from "react"; 
import { useForm } from "react-hook-form"; 
import { yupResolver } from "@hookform/resolvers/yup"; 
import * as yup from "yup"; 
import HCaptcha from '@hcaptcha/react-hcaptcha';

const ReactGutscheinForm = () => {

    const [varified, setVarified] = useState("");

    const schema = yup.object().shape({
        terminvorschlag: yup.string().required("Dieses Feld ist erforderlich."), 
        firstName: yup.string().required("Dieses Feld ist erforderlich."), 
        lastName: yup.string().required("Dieses Feld ist erforderlich."), 
        email: yup.string().email().required("Dieses Feld ist erforderlich."), 
        message: yup.string().min(8).max(600).required("Dieses Feld ist erforderlich."),
    }); 

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    }); 

    const onVerifyCaptcha = (token) => {
        //console.log("Verified: " + token);
        setVarified(token);
    };

 
    const onSubmit = (data) => {
        let emailcontent = 
        "Terminvorschlag: " + data.terminvorschlag + '</br>' +  
        "Name: " + data.firstName + '</br>' +  
        "Nachname: " + data.lastName + '</br>' +  
        "E-Mail: " + data.email + "<br>" + 
        "Nachricht: " + data.message;
      
        if (varified!="") {
            sendMail({
                from: 'mailtrap@klienten-info.com',
                to : 'ki@krenn.pro',
                subject: 'Gutschienformular - maerzinger.klienten-info.at',
                html: emailcontent,
                transport: { 
                  host: "live.smtp.mailtrap.io",
                  port: 2525,
                  auth: {
                    user: "api",
                    pass: "5a2b45fafaa69c84f083685614d07092"
                  }
                },
                consoleLog: false,
                callback: (error, result)=>{ 
                    if (error) {
                        window.location.replace('/kanzlei/sending-fehler');
                    } else {
                        window.location.replace('/kanzlei/danke');       
                       
                    };
                        //alert(error || result);
                    }
              });

        } else {
            window.location.replace('/kanzlei/captcha-fehler');
        }        
    }

 
    return <div className="max-w-l">
        <p>Wir bieten Ihnen eine kostenlose Erstberatung in unserer Kanzlei. Mit folgendem Formular können Sie einen Termin mit uns vereinbaren.</p>
        <p>Überzeugen Sie sich von der Qualität unserer Leistungen!</p>
        <p></p><br></br>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="relative z-0 w-full mb-3 group">
                <input type="text" name="terminvorschlag" {...register("terminvorschlag")} placeholder="Terminvorschlag" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"/>
                <p>{errors.terminvorschlag?.message}</p>
            </div>

            <div className="relative z-0 w-full mb-3 group">
                <input type="text" name="firstname" {...register("firstName")} placeholder="Vorname" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"/>
                <p>{errors.firstName?.message}</p>
            </div>
            <div className="relative z-0 w-full mb-3 group">
                <input type="text" name="lastname" {...register("lastName")} placeholder="Nachname" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" />
                <p>{errors.lastName?.message}</p>
            </div>
            <div className="relative z-0 w-full mb-3 group">
                <input type="email" name="email" {...register("email")}  placeholder="Email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"/>
                <p>{errors.email?.message}</p>
            </div>
            <div className="relative z-0 w-full mb-3 group">
                <textarea type="textarea" name="message" {...register("message")}  placeholder="Nachricht" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                <p>{errors.message?.message}</p>
            </div>
            <HCaptcha
                sitekey="c6c2a40a-351a-42dd-a91a-449b9b3943ed"
                onVerify={onVerifyCaptcha}
                />
            <div className="relative z-0 w-full mb-3 group">
                <input type="submit" value="Ansenden" className="font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-1 justify-center px-4 py-2 bg-ci-color-1 text-white hover:bg-ci-color-2 border-ci-color-2 border-2"/>              
            </div>
         </form>
    </div>; 
}

export default ReactGutscheinForm;