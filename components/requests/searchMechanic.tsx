import { BASE_URL } from "../constants";
import axios from "axios";
import { UserInterface } from "../interfaces";

const getOneMechanic = async (parameter: string | number): Promise<UserInterface | null> => {
  const storedToken = localStorage.getItem('token');
  try {
    const response = await axios.get(`${BASE_URL}/user/search?nameOrDni=${parameter}`, {
      headers: {
        Authorization: storedToken,
      },
    });

    if (response.status !== 200) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const userData = response.data as UserInterface;

    return userData;
  } catch (error) {
    console.error("Error en obtener usuario mecánico", error);
    return null;
  }
};

export default getOneMechanic;

