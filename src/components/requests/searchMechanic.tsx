// import { BASE_URL } from "../constants";
import axios from "axios";
import { UserInterface } from "../interfaces";

const getOneMechanic = async (parameter: string | number): Promise<UserInterface[]> => {
  const storedToken = localStorage.getItem('token');
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/search?nameOrDni=${parameter}`, {
      headers: {
        Authorization: storedToken,
      },
    });

    if (response.status !== 200) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const data = response.data;

    return data; 
  } catch (error) {
    console.error("Error en obtener usuario mecánico", error);
    return []; 
  }
};


export default getOneMechanic;

