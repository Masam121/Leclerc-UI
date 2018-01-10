/**
 * Created by marcelsm on 2017-08-09.
 */
import { Task } from "./task";
import { Category } from "./category";
import { Serie } from "./serie";
import { EffortStatus } from "./effortStatus";

export class TaskInfo{
  tasks: Task[];
  categories: Category[];
  series: Serie[];
  effort: EffortStatus[];
}
