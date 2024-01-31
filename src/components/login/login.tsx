import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useParams, useRouter, usePathname } from 'next/navigation';
import logReq from "../../requests/login";
import { signIn } from "next-auth/react";
import SubmitButton from "../buttons/submitButton";

export default function Login (){
  const router = useRouter();
  const { tokenExpired } = useParams();
  const [errors, setErrors] = useState<string[]>([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  const [viewPass, setViewPass] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
  
      if (response?.error) {
        setErrors(response.error.split(","));
      } else {
        const userRole = response?.user?.user?.roleId;
  
        if (userRole === 3) {
          router.push("/mechanicNotAuthorized");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
    }
  };
  
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
        value={username}
        placeholder="Ingresar aquí su DNI o NOMBRE DE USUARIO" 
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        required
        onChange={(event) => setUsername(event.target.value)}/>
    </div>
    <div>
      <input type={viewPass ? "text" : "password"} 
        name="password" 
        placeholder="Ingresar aquí su contraseña" 
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
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