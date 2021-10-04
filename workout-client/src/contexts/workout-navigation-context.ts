import { createContext } from 'react';
import { FiltersOptions } from '../components/workout-list/components/topbar/topbar';

type Listener = () => void;

class WorkoutNavigationContext {
  static context = createContext(new WorkoutNavigationContext());

  private filterOptions: FiltersOptions = {selectedCategories: [], selectedMonth: '', page: 0};
  private filterOptionsListeners: Set<Listener> = new Set();

  addFilterOptionsListener(listener: Listener): () => void {
    if (this.filterOptionsListeners.has(listener)) {
      throw Error('[Workout List Context]: This listener is already listening to FilterOptions changes.');
    }

    this.filterOptionsListeners.add(listener);

    return () => {
      this.filterOptionsListeners.delete(listener);
    }
  }

  addOrUpdateFilterOptions(filterOptions: FiltersOptions): () => void {
    this.filterOptions = filterOptions;

    this.filterOptionsListeners.forEach((listener) => listener());

    return () => {
      this.filterOptions = {selectedCategories: [], selectedMonth: '', page: 0};
      this.filterOptionsListeners.forEach((listener) => listener());
    }
  }

  getFilterOptions(): FiltersOptions {
    return this.filterOptions;
  }

  addOrUpdatePage(page: number): () => void {
    this.filterOptions = { ...this.filterOptions, page };

    this.filterOptionsListeners.forEach((listener) => listener());

    return () => {
      this.filterOptions= { ...this.filterOptions, page: 0 };
      this.filterOptionsListeners.forEach((listener) => listener());
    }
  }

  getPage(): number {
    return this.filterOptions.page;
  }
}

export type {
  Listener,
};

export {
  WorkoutNavigationContext,
};