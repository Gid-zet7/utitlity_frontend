import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/apiSlice/apiSlice";

const usersAdapter = createEntityAdapter({});

const initialSate = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users/usersList",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedUsers = responseData.users.map((user) => {
          user.id = user._id;
          return user;
        });
        return usersAdapter.setAll(initialSate, loadedUsers);
      },
    }),
    addNewUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/users/new",
        method: "POST",
        body: {
          ...initialUserData,
        },
      }),
    }),
    updateUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/users/update",
        method: "POST",
        body: {
          ...initialUserData,
        },
      }),
    }),
    deleteUser: builder.mutation({
      query: ({ id, user }) => ({
        url: "/users/delete",
        method: "POST",
        body: { id, user },
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUsersById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialSate);
