import { apiSlice } from "../../apiSlict";

// Types for Placeholder API
export interface PlaceholderPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PlaceholderUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface PlaceholderComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface PlaceholderTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// Placeholder API endpoints using injectEndpoints
export const placeholderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all posts
    getPosts: builder.query<PlaceholderPost[], void>({
      query: () => "/posts",
      providesTags: ["Post"],
    }),

    // Get single post by ID
    getPost: builder.query<PlaceholderPost, number>({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),

    // Get all users
    getUsers: builder.query<PlaceholderUser[], void>({
      query: () => "/users",
      providesTags: ["User"],
    }),

    // Get single user by ID
    getUser: builder.query<PlaceholderUser, number>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    // Get comments for a post
    getPostComments: builder.query<PlaceholderComment[], number>({
      query: (postId) => `/posts/${postId}/comments`,
      providesTags: (result, error, postId) => [
        { type: "Comment", id: postId },
      ],
    }),

    // Get all comments
    getComments: builder.query<PlaceholderComment[], void>({
      query: () => "/comments",
      providesTags: ["Comment"],
    }),

    // Get todos
    getTodos: builder.query<PlaceholderTodo[], void>({
      query: () => "/todos",
      providesTags: ["Todo"],
    }),

    // Get todos by user ID
    getUserTodos: builder.query<PlaceholderTodo[], number>({
      query: (userId) => `/users/${userId}/todos`,
      providesTags: (result, error, userId) => [{ type: "Todo", id: userId }],
    }),

    // Create a new post
    createPost: builder.mutation<PlaceholderPost, Partial<PlaceholderPost>>({
      query: (newPost) => ({
        url: "/posts",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Post"],
    }),

    // Update a post
    updatePost: builder.mutation<
      PlaceholderPost,
      { id: number; data: Partial<PlaceholderPost> }
    >({
      query: ({ id, data }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
    }),

    // Delete a post
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Post", id }],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetUsersQuery,
  useGetUserQuery,
  useGetPostCommentsQuery,
  useGetCommentsQuery,
  useGetTodosQuery,
  useGetUserTodosQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = placeholderApi;

