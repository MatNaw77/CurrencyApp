import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';

@Entity()
export class Exchange {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal', { precision: 10, scale: 2 })
    amountEur: number;

    @Column('decimal', { precision: 10, scale: 2 })
    amountPln: number;

    @Column('decimal', { precision: 10, scale: 4 })
    exchangeRate: number;

    @CreateDateColumn()
    createdAt: Date;
}
