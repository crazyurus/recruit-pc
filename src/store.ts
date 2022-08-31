import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface Store {
  page: number;
  size: number;
  search: string;
  setCurrentPage(page: Store['page']): void;
  setPageSize(size: Store['size']): void;
  setSearch(search: Store['search']): void;
}

const useStore = create<Store, [['zustand/immer', never]]>(immer((set, get) => ({
  page: 1,
  size: 8,
  search: '',
  setCurrentPage(page) {
    set(state => {
      state.page = page;
    });
  },
  setPageSize(size) {
    set(state => {
      state.size = size;
    });
  },
  setSearch(search) {
    set(state => {
      state.search = search;
    });
  },
})));

export default useStore;
