import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { BASE_URL } from '@/app/components/constants';
import { UserInterface } from '@/src/app/components/interfaces';

const getToken = () => {
  return localStorage.getItem('token');
};

// Definición del tipo para el objeto userApi
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getToken();
      if (token) {
        headers.set('Authorization', `${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<UserInterface[], null>({
      query: () => 'user/list',
    }),
    getUserById: builder.query<UserInterface, { id: number }>({
      query: ({ id }) => `/user/detail/${id}`,
    }),
    deleteUser: builder.mutation<UserInterface, { id: number }>({
      query: ({ id }) => ({
        url: `user/deactivate/${id}`,
        method: 'PATCH',
      }),
    }),
    editUser: builder.mutation({
      query: () => ({
        
      })
    })
  }),
});

// Exporta el tipo completo de userApi
export type UserApi = typeof userApi;

// Exporta las funciones generadas automáticamente por createApi
export const { useGetUsersQuery, useGetUserByIdQuery, useDeleteUserMutation } = userApi;
