const User = require('./User')

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('transaction')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  description!: string

  @Column()
  value!: number

  @Column()
  type!: 'income'|'expense'

  @Column()
  category!: string

  @Column()
  date!: Date

  @Column()
  userId!: string
}

module.exports = Transaction
