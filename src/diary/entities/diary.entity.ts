import { User } from 'src/user/entities/user.entity';
import { Entity, JoinTable, OneToOne } from 'typeorm';
import { BaseEntity } from '../../core/entities/base.entity';

@Entity({ name: 'diary' })
export class Diary extends BaseEntity {
    constructor(partial: Partial<Diary>) {
        super();
        Object.assign(this, partial);
    }

     @OneToOne((type) => User, (user) => user.dairyId)
     @JoinTable()
    user: User;
}
