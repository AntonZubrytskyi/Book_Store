import { createAsyncThunk } from '@reduxjs/toolkit';
import { BookId, IBook } from '../../../interfaces';
import { booksService } from '../../../services';
import { booksActions } from './books.slice';

const getAllBooks = createAsyncThunk<IBook[], void, { rejectValue: string }>(
  'booksSlice/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await booksService.getAll();
      return data;
    } catch (error:any) {
      return rejectWithValue(error.response);
    }
  },
);

const getBookById = createAsyncThunk<IBook,
{ id: BookId }, { rejectValue: string }>(
  'booksSlice/getById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await booksService.getById(id);
      return data;
    } catch (error:any) {
      return rejectWithValue(error.response);
    }
  },
);
const createBook = createAsyncThunk<IBook, { book: IBook }, { rejectValue: string }>(
  'booksSlice/createBook',
  async ({ book }, { rejectWithValue }) => {
    try {
      const { data } = await booksService.create(book);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  },
);
const updateById = createAsyncThunk<IBook, { id: BookId; book: IBook }>(
  'booksSlice/updateById',
  async ({ id, book }, { rejectWithValue }) => {
    try {
      const { data } = await booksService.update(id, book);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  },
);
const deleteBookById = createAsyncThunk<void, { id: BookId }>(
  'booksSlice/deleteById',

  async ({ id }, { dispatch, rejectWithValue }) => {
    try {
      await booksService.deleteById(id);
      dispatch(booksActions.deleteBook(id));
    } catch (e: any) {
      return rejectWithValue(e.response);
    }
  },
);
export {
  getAllBooks,
  getBookById,
  deleteBookById,
  createBook,
  updateById,
};
