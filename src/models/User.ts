/**
 * O ! depois das propriedades serve para passar por cima do strict do typescript, sem isso, ele obriga a usar o constructor
 */

import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid') //chave primária
  id!: string

  @Column()
  name!: string

  @Column({unique: true})
  email!: string

  @Column()
  password!: string

}

module.exports = User
