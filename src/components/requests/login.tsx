import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';

async function logReq(userData: { username: string; password: string }) {
  //const router = useRouter();

  const formData = new FormData();
  formData.append('username', userData.username);
  formData.append('password', userData.password);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    
    if (response.status === 200) {
      // if(data.user.id === 1) {
      //   router.push('/')
      // }
      localStorage.setItem('token', data.token);
    } else {
      
      throw new Error('Credenciales incorrectas');
    }
  } catch (error) {
    throw new Error('Hubo un error en la solicitud de inicio de sesión');
  }
}

export default logReq;