import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const fakeApi = "http://localhost:3333/";
export const commonApiCall = createApi({
  reducerPath: "commonApiCall",
  tagTypes: ["commonApiCall"],
  baseQuery: fetchBaseQuery({ baseUrl: fakeApi }),
  endpoints: (builder) => ({
    // getApiCall: builder.query({
    //   query: (url) => url,
    //   providesTags: ["commonApiCall"],
    // }),

    // createApiCall: builder.mutation({
    //   query: (args) => {
    //     const { createApiUrl, formData } = args;
    //     return {
    //       url: createApiUrl,
    //       method: "post",
    //       body: formData,
    //     };
    //   },
    // }),

    // register: builder.mutation({
    //   query: (credentials) => ({
    //     url: "register",
    //     method: "post",
    //     body: credentials,
    //   }),
    // }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signin",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetApiCallQuery,
  useCreateApiCallMutation,
  useLoginMutation,
} = commonApiCall;
