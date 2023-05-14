import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const Api = "http://localhost:3333/";
export const commonApiCall = createApi({
  reducerPath: "commonApiCall",
  tagTypes: ["commonApiCall"],
  baseQuery: fetchBaseQuery({
    baseUrl: Api,
  }),

  endpoints: (builder) => ({
    getUsersApi: builder.query({
      query: (url) => ({
        url,
        method: "GET",
        providesTags: ["commonApiCall"],
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),

    getUser: builder.query({
      query: (url) => ({
        url,
        method: "GET",
        providesTags: ["commonApiCall"],
        headers: {
          Authorization: `Bearer ${localStorage.getItem("rememberMeToken")}`,
        },
      }),
    }),
    // createUserApi: builder.mutation({
    //   query: (formData) => {
    //     return {
    //       url: "auth/signin",
    //       method: "post",
    //       body: formData,
    //     };
    //   },
    // }),

    register: builder.mutation({
      query: (args) => {
        const { url, formData } = args;
        return {
          url,
          method: "POST",
          body: formData,
        };
      },
    }),

    login: builder.mutation({
      query: (args) => {
        const { url, formData } = args;
        return {
          url,
          method: "post",
          body: formData,
        };
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetUsersApiQuery ,useGetUserQuery} =
  commonApiCall;
