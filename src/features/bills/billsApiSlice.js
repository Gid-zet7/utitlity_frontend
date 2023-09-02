import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/apiSlice/apiSlice";

const billAdapter = createEntityAdapter({});

const initialSate = billAdapter.getInitialState();

export const billApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBills: builder.query({
      query: () => ({
        url: "/api/bills",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedPosts = responseData.bills.map((bill) => {
          bill.id = bill._id;
          return bill;
        });
        // console.log(loadedPosts);
        return billAdapter.setAll(initialSate, loadedPosts);
        // console.log(billAdapter.setAll(initialSate, loadedPosts));
      },
      // eslint-disable-next-line no-unused-vars
      // providesTags: (result, error, arg) => {
      //   if (result?.ids) {
      //     return [
      //       { type: "Post", id: "LIST" },
      //       ...result.ids.map((id) => ({ type: "Post", id })),
      //     ];
      //   } else return [{ type: "Post", id: "LIST" }];
      // },
    }),
    addNewBill: builder.mutation({
      query: (initialUserData) => ({
        url: "/api/bills/new",
        method: "POST",
        body: {
          ...initialUserData,
        },
      }),
      // invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    updateBill: builder.mutation({
      query: (initialUserData) => ({
        url: "/api/bills/update",
        method: "POST",
        body: {
          ...initialUserData,
        },
      }),
      // invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
    deleteBill: builder.mutation({
      query: ({ id }) => ({
        url: "/api/bills/delete",
        method: "POST",
        body: { id },
      }),
      // invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
  }),
});

export const {
  useGetBillsQuery,
  useAddNewBillMutation,
  useUpdateBillMutation,
  useDeleteBillMutation,
} = billApiSlice;

export const selectBillsResult = billApiSlice.endpoints.getBills.select();

const selectBillsData = createSelector(
  selectBillsResult,
  (billsResult) => billsResult.data
);

export const {
  selectAll: selectAllBills,
  selectById: selectBillById,
  selectIds: selectBillIds,
} = billAdapter.getSelectors((state) => selectBillsData(state) ?? initialSate);
