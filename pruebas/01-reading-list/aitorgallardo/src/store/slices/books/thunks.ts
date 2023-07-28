import { AppThunk } from '../..';
import { Book } from '../../../types';
import { setAvailableList, setBooksList, setReadingList, setSelectedBooks } from './booksSlice'

const BASE_URL = 'src/assets/books.json';

export const initBooks = (): AppThunk => async (dispatch) => {
  try {
    const response = await fetch(BASE_URL); 
    const { library } = await response.json(); 
    const booksArray: Book[] = []
    library.forEach(({ book }: { book: Book }) => {
      booksArray.push(book)
    })

    const selectedBooks = JSON.parse(localStorage.getItem('selectedBooks') || '[]')
    const availableList =  selectedBooks.length > 0 ? JSON.parse(localStorage.getItem('availableList') || '[]') : booksArray
    const readingList = JSON.parse(localStorage.getItem('readingList') || '[]')

    dispatch(setBooksList(booksArray));
    dispatch(setSelectedBooks(selectedBooks));
    dispatch(setAvailableList(availableList));
    dispatch(setReadingList(readingList));

  } catch (error) {
    console.log('ThunkError: ', error);
  }
};
