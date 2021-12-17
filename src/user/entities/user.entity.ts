import { Entity, Column, OneToOne } from 'typeorm';
import { BaseEntity } from '../../core/entities/base.entity';
import { Exclude } from 'class-transformer';
import { Diary } from 'src/diary/entities/diary.entity';

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
    firstname: string;

    @Column({ type: 'varchar', length: '200', nullable: true })
    lastname: string;

    @OneToOne((type) => Diary, (diary) => diary.id)
    dairyId: string;
}