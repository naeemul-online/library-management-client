import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management-api-gold.vercel.app/api/",
  }),
  tagTypes: ["Book", "Borrow"],
  endpoints: (builder) => ({
    // get all book api endpoint
    getBooks: builder.query({
      query: () => "books",
      providesTags: ["Book"],
    }),

    // create a book api endpoint
    createBook: builder.mutation({
      query: (bookData) => ({
        url: "books",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["Book"],
    }),

    // single book api end point
    getBookById: builder.query({
      query: (id: string) => `books/${id}`,
      providesTags: ["Book"],
    }),

    // delete book api endpoint
    updateBook: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Book"],
    }),
    // delete book end point
    deleteBook: builder.mutation({
      query: (id: string) => ({
        url: `books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),

    // borrow book api endpoint
    addBorrow: builder.mutation({
      query: (borrowData) => ({
        url: "borrow",
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["Book", "Borrow"],
    }),

    // borrow all book summery api endpoint
    borrowBooks: builder.query({
      query: () => "borrow",
      providesTags: ["Borrow"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useCreateBookMutation,
  useGetBookByIdQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useAddBorrowMutation,
  useBorrowBooksQuery
} = bookApi;
