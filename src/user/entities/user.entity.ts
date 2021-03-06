import { Entity, Column, OneToOne, ManyToMany, JoinTable, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../core/entities/base.entity';
import { Exclude } from 'class-transformer';
import { Diary } from 'src/diary/entities/diary.entity';
import { Sex } from 'src/core/enums/sex.enum';
import { Subjects } from 'src/subject/entities/subjects.entity';
import { Subject } from 'rxjs';
import { Grade } from 'src/grade/entities/grade.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
    constructor(partial: Partial<User>) {
        super();
        Object.assign(this, partial);
    }

    @Column({ type: 'varchar', length: '200', nullable: false })
    role: 'student' | 'teacher' | 'administrator';

    @Column({ type: 'varchar', length: '200', nullable: false, unique: true })
    email: string;

    @Exclude()
    @Exclude({ toPlainOnly: true })
    @Column({ type: 'varchar', length: '4000', nullable: true })
    password: string;

    @Column({ type: 'varchar', length: '200', nullable: true })
    name: string;

    @Column({ type: 'varchar', length: '200', nullable: true })
    lastname: string;
    
    @Column({ type: 'varchar', length: '200', nullable: true })
    surname: string;

    @Column({ type: 'varchar', length: '200', nullable: true })
    phone: string;

    @Column({ type: 'varchar', length: '200', nullable: true })
    parentName: string;

    @Column({ type: 'varchar', length: '200', nullable: true })
    parentLastname: string;
    
    @Column({ type: 'varchar', length: '200', nullable: true })
    parentSurname: string;

    @Column({ type: 'varchar', length: '200', nullable: true })
    parentPhone: string;
    
    @Column({ type: 'varchar', length: '10', nullable: true })
    class: string;
    
    @Column({ type: 'varchar', length: '10', nullable: true })
    photoUrl: string;

    @Column({ type: 'varchar', length: '10', nullable: true })
    education: string;

    @Column({ type: 'varchar', length: '10', nullable: true })
    position: string;
    
    @Column({ type: 'varchar', length: '10', nullable: true })
    specialization: string;
    
    @Column({ type: 'varchar', length: '10', nullable: true, array: true })
    classes: string[];
    
    @Column({ type: 'varchar', length: '10', nullable: true })
    universityAddress: string;
    
    @Column({ type: 'varchar', length: '20', nullable: true })
    sex: 'man' | 'woman';

    @Column({ type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP', })
    dateOfBirth: Date;

    @OneToOne((type) => Diary, (diary) => diary.id)
    dairyId: string;

    @ManyToMany((type) => Subjects, (subject) => subject.users)
    @JoinTable()
    subjects: Subjects[];

    @OneToMany((type) => Grade, (grade) => grade.user)
    grades: Grade[];

}
