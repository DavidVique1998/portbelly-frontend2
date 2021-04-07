import { Schedulle } from "./schedulle";
import { Subject } from "./subject";
import { Teacher } from "./teacher";

export class SubjectNrc {
  id: number;
  nrc: string;
  quotas: string;
  subject: Subject;
  shceduller: Schedulle[];
  teacher: Teacher;
}
