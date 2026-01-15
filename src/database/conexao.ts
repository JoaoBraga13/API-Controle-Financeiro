import 'reflect-metadata'
const {DataSource} = require('typeorm')
const dotenv = require('dotenv')
import User from '../models/User'
import Transaction from '../models/Transaction'

dotenv.config()

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  logging: false,
  entities: [
    User,
    Transaction
  ],
  migrations: ['src/database/migrations/*.{ts,js}']
})


export default AppDataSource
//module.exports = AppDataSource
