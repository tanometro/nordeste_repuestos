// import { BASE_URL } from "../constants";
import axios from "axios";
import { UserInterface } from "../components/interfaces";

const getOneMechanic = async (sessionToken: string | undefined, parameter: string | number): Promise<UserInterface[]> => {

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/search?nameOrDni=${parameter}`, {
      headers: {
        Authorization: sessionToken,
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

