import * as React from 'react';
import FetchTable from './FetchTable';
import SearchBar from '@components/common/SearchBar/SearchBar';
import { Fetch, Pagination } from '@redux/fetch/types';

export interface FetchTableProps {
  fetchs: Array<Fetch>;
  pagination: Pagination;
  loading: boolean;
  error: string;
  loadFetchs: (pagination: Pagination) => any;
}

export interface SearchBarProps {
  [functionName: string]: (value: string) => any;
}

type FilterablePersonsTableProps = FetchTableProps & SearchBarProps;

export default class FilterableFetchTable extends React.Component<FilterablePersonsTableProps> {

  render() {
    const {
      fetchs,
      pagination,
      loading,
      error,
      loadFetchs,
      searchFetchs,
    } = this.props

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <SearchBar onSearch={searchFetchs} />
        <FetchTable
          fetchs={fetchs}
          pagination={pagination}
          loading={loading}
          error={error}
          loadFetchs={loadFetchs}
        />
      </div>
    )
  }
}