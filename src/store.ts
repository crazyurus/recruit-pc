import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { School } from './types';

interface Store {
  school: School;
  page: number;
  size: number;
  search: string;
  title: string;
  setCurrentPage(page: Store['page']): void;
  setPageSize(size: Store['size']): void;
  setSearch(search: Store['search']): void;
  setSchool(school: Store['school']): void;
  setTitle(title: Store['title']): void;
}

const useStore = create<Store, [['zustand/immer', never]]>(
  immer(set => ({
    school: {
      id: 'b525083d-b83c-4c7e-892f-29909421d961',
      name: '武汉理工大学',
    },
    page: 1,
    size: 8,
    search: '',
    title: '',
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
    setSchool(school) {
      set(state => {
        state.school = school;
      });
    },
    setTitle(title) {
      document.title = title;
      set(state => {
        state.title = title;
      });
    },
  }))
);

export default useStore;
