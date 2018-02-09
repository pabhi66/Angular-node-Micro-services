import { IUser } from './user.interface';
import { IPages } from './pages.interface';
import { IPageContent } from './page-content.interface';

export interface IStore {
    userReducer: IUser;
    pagesReducer: IPages;
    pageReducer: IPageContent;
}
