import { fork } from 'redux-saga/effects';
import { Author } from '@redux/authors/types';
import { loadDataSaga, searchDataSaga
} from '@redux/common/table/sagasAuthors';
// import { removeDataSaga, addDataSaga, editDataSaga
// } from '@redux/common/table/sagasAuthors';


export function* loadAuthorsSaga(): IterableIterator<any> {
  yield fork(loadDataSaga, getSuccessPayload);
}

export function* searchAuthorSaga(): IterableIterator<any> {
  yield fork(searchDataSaga, getSuccessPayload);
}

// export function* removeAuthorSaga(): IterableIterator<any> {
//   yield fork(removeDataSaga, "@@authors", getSuccessPayload)
// }

// export function* addAuthorSaga(): IterableIterator<any> {
//   yield fork(addDataSaga, "@@authors", getSuccessPayload)
// }

// export function* editAuthorSaga(): IterableIterator<any> {
//   yield fork(editDataSaga, "@@authors", getSuccessPayload)
// }

const getSuccessPayload = (authors: Array<Author>) => {
  console.log(authors)
  return authors.map(( {_id, name, surname, dob, dod} : Author) => ({
    key: _id,
    name,
    surname,
    dob,
    dod
  }))
}