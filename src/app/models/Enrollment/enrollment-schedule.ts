import { Period } from "./period";

export class EnrollmentSchedule {
  id: number;
  studentType: string;
  startDate: Date;
  endDate: Date;
  type: string;
  period: Period;
}
