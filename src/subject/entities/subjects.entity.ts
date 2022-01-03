import { Subject } from 'rxjs';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, ManyToMany } from 'typeorm';
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
}
