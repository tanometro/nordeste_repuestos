import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useParams, useRouter, usePathname } from 'next/navigation';
import logReq from "../requests/login";
import { signIn } from "next-auth/react";
import SubmitButton from "../buttons/submitButton";

export default function Login (){
  const router = useRouter();
  const { tokenExpired } = useParams();

  const [userData, setUserData] = useState({
      username: "", 
      password: "",
    });

  const [viewPass, setViewPass] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await signIn("credentials", {
        username: userData.username,
        password: userData.password,
      });
      
      console.log(response);
      
    } catch (error) {
      console.error("Error en el inicio de sesión: ", error);
      setErrors("Error en el inicio de sesión");
    }
  };
  
  

  const handleChange = (e: React.FormEvent) =>{
    const property = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;
    
    setUserData({...userData, [property]: value});
    // setErrors(validations({...userData, [property]: value}));
  } 
  
  //Ver o desver la pass
  const handleView = () => {
    if(viewPass == true){
      setViewPass(false);
    }
    else{
      setViewPass(true);
    }
  }
    
  return(
  <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
    <div>
      <input type="text" 
        name="username" 
        value={userData.username}
        placeholder="Ingresar aquí su DNI o NOMBRE DE USUARIO" 
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        required
        onChange={handleChange}/>
    </div>
    <div>
      <input type={viewPass ? "text" : "password"} 
        name="password" 
        placeholder="Ingresar aquí su contraseña" 
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        required
        value={userData.password}
        onChange={handleChange}
      />
    </div>
    <div>
      <button
        type="button"
        className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
        onClick={() => handleView()}>
          {viewPass ? <FaEyeSlash /> : <FaEye />}
      </button>
      <div>
      {tokenExpired && <p>El token ha expirado. Por favor, inicia sesión nuevamente.</p>}
      </div>
    </div>
        {errors && (
      <div className="error-message text-white">
        {errors}
      </div>
        )}
      <SubmitButton
      title='Ingresar'
      />
  </form>
  )}