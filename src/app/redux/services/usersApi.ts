import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserInterface } from '@/src/types/interfaces';

const getToken = () => {
  return localStorage.getItem('token');
};

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
    editUser: builder.mutation<UserInterface, { id: number; data: Partial<UserInterface> }>({
      query: ({ id, data }) => ({
        url: `/user/edit/${id}`,
        method: 'PATCH',
        body: JSON.stringify(data), // Asegúrate de ajustar esto según la estructura esperada por tu API
        headers: {
          'Content-Type': 'application/json', // Asegúrate de ajustar los encabezados según lo requerido por tu API
        },
      }),
    }),
  }),
});

export type UserApi = typeof userApi;

export const { useGetUsersQuery, useGetUserByIdQuery, useDeleteUserMutation } = userApi;
