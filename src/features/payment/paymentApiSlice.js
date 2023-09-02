import { apiSlice } from "../../app/apiSlice/apiSlice";

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    pay: builder.mutation({
      query: (credentials) => ({
        url: "/payment/acceptpayment",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { usePayMutation } = paymentApiSlice;
