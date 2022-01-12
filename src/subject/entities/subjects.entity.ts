import { Subject } from 'rxjs';
import { Grade } from 'src/grade/entities/grade.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '../../core/entities/base.entity';

@Entity({ name: 'subjects' })
export class Subjects extends BaseEntity {
    constructor(partial: Partial<Subjects>) {
        super();
        Object.assign(this, partial);
    }

    @Column({ type: 'varchar', length: '200', nullable: false, default: 'Default Title' })
    title: string;

    @Column({ type: 'varchar', nullable: true, array: true })
    classes: string[];

    @ManyToMany((type) => User, (user) => user.subjects)
    users: User[];

    @OneToMany((type) => Grade, (grade) => grade.subject, { cascade: true, onDelete: "CASCADE" })
    grades: Grade[];
}
