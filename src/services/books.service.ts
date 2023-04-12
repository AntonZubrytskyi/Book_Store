import { axiosService, Response } from './axios.service';
import { urls } from '../constants';
import { BookId, IBook } from '../interfaces';

const booksService = {
  getAll: (): Response<IBook[]> => axiosService.get(urls.books),
  getById: (
    id: BookId,
  ): Response<IBook> => axiosService.get(`${urls.books}/${id}`),
  deleteById: (
    id: BookId,
  ) => axiosService.delete(`${urls.books}/${id}`),
  update: (
    id: BookId,
    book: IBook,
  ): Response<IBook> => axiosService.patch(`${urls.books}/${id}`, book),
  create: (book: IBook):Response<IBook> => axiosService.post(urls.books, book),
};

export {
  booksService,
};
