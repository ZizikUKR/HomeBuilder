import { StateEnum } from '../enums/state-enum';

/* tslint:disable */
export interface ToDoTaskGetAllViewItem {
  id?: number;
  creationDate?: string;
  toDo?: string;
  description?: string;
  information?: string;
  isComppleted?: boolean;
  state?: StateEnum
}
