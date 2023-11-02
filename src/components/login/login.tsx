import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import logReq from "../requests/login";
import { signIn } from "next-auth/react";


export default function Login (){
  const router = useRouter();
  const [userData, setUserData] = useState({
      username: "", 
      password: "",
    });
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const [viewPass, setViewPass] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);

  // const handleSubmit = async (e: React.FormEvent) =>{
  //   e.preventDefault();
  //   try {
  //     await logReq(userData);
  //     router.replace('/dashboard');
  //   } catch (error) {
  //     setErrors('Credenciales incorrectas');
  //   }
  //   }
  const handleSubmit = async (e: React.FormEvent) =>{
    e.preventDefault();
    
    const responseNextAuth = await signIn('credentials', {
      username: userData.username,
      password: userData.password,
      redirect: false,
    })
    if(responseNextAuth?.error) {
      setErrors('Credenciales incorrectas');
    }
    router.push('/dashboard');
    }
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
    </div>
        {errors && (
      <div className="error-message text-white">
        {errors}
      </div>
        )}
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Recordarme</label>
        </div>
      </div>
      <button type="submit" className="w-2/4 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
        Ingresar
      </button>
  </form>
  )}