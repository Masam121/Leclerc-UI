/**
 * Created by marcelsm on 2017-08-09.
 */
import { Expense } from './expense';

export class ProjectNetflix{
  id: number;
  budgetId: number
  projectsClient: string;
  completionPercentage: number;
  department: string;
  description: string;
  estEndDate: Date;
  factory: string;
  priority: number;
  projectManagerId: number;
  projectName: string;
  projectOwnerId: number;
  projectSapId: number;
  projectStatus: string;
  startDate: Date;
  thumbnail: string;
  managerName: string;
  managerPicture: string;
  initialBudget: number;
  budgetSpent: number;
  budgetLeft: number;
  estWorkDay: number;
  expenses: Expense[];
  connexeProject: ProjectNetflix[];
}
