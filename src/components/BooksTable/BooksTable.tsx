import React, { FC, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import { BsFillInfoSquareFill } from 'react-icons/bs';
import { ToastContainer } from 'react-toastify';
import { IBook } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../hooks';
import styles from './BooksTable.module.scss';
import Button from '../UI/Button/Button';
import AddBookModal from '../AddBookModal/AddBookModal';
import { urls } from '../../constants';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import { booksActions } from '../../redux';

const BooksTable: FC = () => {
  const columnHelper = createColumnHelper<IBook>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const { books } = useAppSelector((state) => state.booksReducer);

  const handleAddModal = () => {
    setOpenAddModal((prevState) => !prevState);
  };

  const handleDeleteModal = () => {
    setOpenConfirmModal((prevState) => !prevState);
  };

  const navigateDetailsPage = (id:number) => {
    navigate(`${urls.books}/${id}`);
  };
  const columns = [
    columnHelper.accessor('name', {
      header: () => 'Name',
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('author', {
      header: () => 'Author',
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('year', {
      header: () => 'Published year',
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.display({
      id: 'actions',
      cell: (info) => (
        <div className={styles.table__btn__box}>
          <Button
            styleClass="btn__table__action"
            icon={<BsFillInfoSquareFill />}
            onClick={() => navigateDetailsPage(info.row.original.id)}
          />
          <Button
            styleClass="btn__table__action"
            icon={<AiFillEdit />}
            onClick={() => navigate(`${urls.books}/${info.row.original.id}${urls.edit}`)}
          />
          <Button
            styleClass="btn__table__action"
            icon={<MdOutlineDeleteOutline />}
            onClick={() => { handleDeleteModal(); dispatch(booksActions.getBookId(+info.row.original.id)); }}
          />
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: books,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className={styles.table}>
      <Button styleClass="btn__add" label="Add Book" onClick={handleAddModal} />
      <table className={styles.table__container}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className={styles.table__column} key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  className={styles.table__row}
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {openAddModal && <AddBookModal handleOpen={handleAddModal} />}
      {openConfirmModal && <ConfirmationModal handleDeleteModal={handleDeleteModal} />}
      <ToastContainer />
    </div>
  );
};

export default BooksTable;
