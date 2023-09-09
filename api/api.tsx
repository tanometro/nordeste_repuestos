import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      try {
        const response = await fetch('http://89.117.33.196:8000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(req.body),
        });
        console.log("Response from external API:", response)
        if (response.ok) {
          const data = await response.json();
          res.status(200).json(data);
        } else {
          res.status(response.status).json({ message: 'Error en la solicitud' });
        }
      } catch (error) {
        console.error("Error in API call:", error);
        res.status(500).json({ message: 'Error interno del servidor' });
      }
    } else {
      res.status(405).json({ message: 'Método no permitido' });
    }
  }
  
