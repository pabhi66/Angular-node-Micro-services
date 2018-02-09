import { IPage } from './page.interface';

export interface IPages {
  pages: IPage[];
  getPagesInProgress: boolean;
  getPagesFailed: boolean;
}
