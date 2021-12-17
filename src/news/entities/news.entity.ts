import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../core/entities/base.entity';

@Entity({ name: 'news' })
export class News extends BaseEntity {
    constructor(partial: Partial<News>) {
        super();
        Object.assign(this, partial);
    }

    @Column({ type: 'varchar', length: '200', nullable: false, default: 'Default Title' })
    title: string;

    @Column({ type: 'varchar', length: '4000', nullable: false, default: 'Default Description' })
    description: string;

    @Column({ type: 'uuid', nullable: true })
    createdByUserId?: string;
}
