import 'reflect-metadata'
const {DataSource} = require('typeorm')
const dotenv = require('dotenv')

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
  entities: ['src/models/*.{ts,js}'],
  migrations: ['src/database/migrations/*.{ts,js}']
})



module.exports = AppDataSource
