/**
 * Created by marcelsm on 2017-08-14.
 */
export class EmployeeNetflix{
  id: number;
  department: string;
  name: string;
  employeeId: string;
  picture: string;
  title: string;
  occupancyRate: number;

  constructor(id,department,name,employeeId,picture,title,occupancyRate) {
    this.id = id;
    this.department = department;
    this.name = name;
    this.employeeId = employeeId;
    this.picture = picture;
    this.title = title;
    this.occupancyRate = occupancyRate;
  }
}
