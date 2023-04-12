import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createBook, getAllBooks, getBookById } from './asyncActions';
import { IBook } from '../../../interfaces';

interface IBooksSliceState {
  books: IBook[];
  bookDetails: IBook;
  error: string | null;
  status: string;
  bookId: number;
}

const initialState: IBooksSliceState = {
  books: [],
  bookDetails: {} as IBook,
  error: null,
  status: '',
  bookId: 0,
};

const booksSlice = createSlice({
  name: 'booksSlice',
  initialState,
  reducers: {
    getBookId: (state, action: PayloadAction<number>) => {
      state.bookId = action.payload;
    },
    deleteBook: (state, action) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBooks.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(getAllBooks.fulfilled, (state, action:PayloadAction<IBook[]>) => {
        state.error = null;
        state.status = 'success';
        state.books = action.payload;
        state.bookDetails = {} as IBook;
      })
      .addCase(getAllBooks.rejected, (state, { payload }) => {
        if (payload) {
          state.error = payload;
          state.books = [];
        }
      })
      .addCase(getBookById.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(getBookById.fulfilled, (state, action:PayloadAction<IBook>) => {
        state.bookDetails = action.payload;
        state.error = null;
        state.status = 'success';
      })
      .addCase(getBookById.rejected, (state, { payload }) => {
        if (payload) {
          state.error = payload;
          state.books = [];
        }
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })
      .addCase(createBook.rejected, (state, { payload }) => {
        if (payload) {
          state.error = payload;
        }
      });
  },
});

const {
  reducer: booksReducer, actions: { deleteBook, getBookId },
} = booksSlice;
const booksActions = {
  deleteBook,
  getBookId,
};

export {
  booksReducer,
  booksActions,
};
