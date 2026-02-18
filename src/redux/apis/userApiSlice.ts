import { API_METHODS, API_ROUTES } from "@/utils/constants/API_ROUTES";
import { apiSlice } from "./apiSlice";

let tempIdCounter = -1;

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: API_ROUTES.users.getAll(),
        method: API_METHODS.GET,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      providesTags: (result) => {
        if (result) {
          return [
            { type: "User", id: "LIST" },
            ...result.map((user: User) => ({
              type: "User" as const,
              id: user.id,
            })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),
    getUserById: builder.query({
      query: (id: number) => ({
        url: API_ROUTES.users.getById(id),
        method: API_METHODS.GET,
      }),
    }),
    createUser: builder.mutation({
      query: (user: Omit<User, "id">) => ({
        url: API_ROUTES.users.create(),
        method: API_METHODS.POST,
        body: user,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const tempId = tempIdCounter--;

        const optimisticUser: User = {
          id: tempId,
          ...arg,
        };

        const patchResult = dispatch(
          userApiSlice.util.updateQueryData(
            "getAllUsers",
            "usersList",
            (draft: User[]) => {
              draft.push(optimisticUser);
            },
          ),
        );

        // console.log("create optimistic update");
        // await sleep(3000);
        // console.log("wait 3 seconds");

        try {
          const { data: createdUser } = await queryFulfilled;

          dispatch(
            userApiSlice.util.updateQueryData(
              "getAllUsers",
              "usersList",
              (draft: User[]) => {
                const index = draft.findIndex((user) => user.id === tempId);
                if (index !== -1) {
                  draft[index] = createdUser;
                }
              },
            ),
          );

          // console.log("create done");
        } catch {
          patchResult.undo();
        }
      },
    }),
    updateUser: builder.mutation({
      query: (user: User) => ({
        url: API_ROUTES.users.update(user.id),
        method: API_METHODS.PUT,
        body: user,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          userApiSlice.util.updateQueryData(
            "getAllUsers",
            "usersList",
            (draft: User[]) => {
              const user = draft.find((user) => user.id === arg.id);
              if (user) {
                Object.assign(user, arg);
              }
            },
          ),
        );

        // console.log("update optimistic update");
        // await sleep(3000);
        // console.log("wait 3 seconds");

        try {
          await queryFulfilled;
          // console.log("update done");
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteUser: builder.mutation({
      query: (id: number) => ({
        url: API_ROUTES.users.delete(id),
        method: API_METHODS.DELETE,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          userApiSlice.util.updateQueryData(
            "getAllUsers",
            "usersList",
            (draft: User[]) => {
              return draft.filter((user) => user.id !== id);
            },
          ),
        );

        // console.log("delete optimistic update");
        // await sleep(3000);
        // console.log("wait 3 seconds");

        try {
          await queryFulfilled;
          // console.log("delete done");
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApiSlice;
