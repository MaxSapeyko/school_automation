import { BaseEntity } from "src/core/entities/base.entity";
import { Subjects } from "src/subject/entities/subjects.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity({name: 'grade'})
export class Grade extends BaseEntity{
  constructor(partial: Partial<Grade>) {
      super();
      Object.assign(this, partial);
  }

  @Column({type: 'integer', nullable: true})
  grade: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', })
  date: Date;

  @ManyToOne((type) => User, (user) => user.grades)
  user: User;
  
  @ManyToOne((type) => Subjects, (subject) => subject.grades)
  subject: Subjects;
}
