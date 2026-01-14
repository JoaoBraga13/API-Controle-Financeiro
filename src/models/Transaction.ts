import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'

import User from './User'

@Entity('transactions')
export default class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  description!: string

  @Column('decimal')
  value!: number

  @Column({
    type: 'enum',
    enum: ['income', 'expense'],
  })
  type!: 'income'|'expense'

  @Column()
  category!: string

  @Column()
  date!: Date

  @ManyToOne(() => User, user => user.transactions)
  user!: User
}


