import {Partner} from "./partner";
/**
 * Created by marcelsm on 2017-10-13.
 */

export class Notification{
  projectName: string;
  id: string;
  description: string;
  creationDate: string;
  endDate: string;
  estEffort: string;
  actualEffort: string;
  completion: string;
  comparator: string;
  status: string;
  partners: Partner[];
}
