/**
 * O ! depois das propriedades serve para passar por cima do strict do typescript, sem isso, ele obriga a usar o constructor
 */

import {Entity, PrimaryGeneratedColumn, Column, OneToMany, TypeORMError} from 'typeorm'

import Transaction  from './Transaction'

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid') //chave primária
  id!: string

  @Column()
  name!: string

  @Column({unique: true})
  email!: string

  @Column()
  password!: string

  @OneToMany(() => Transaction, transaction => transaction.user)
  transactions!: Transaction[]
}


