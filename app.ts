//import express from 'express'
//import routes from './routes'

const express = require('express')
const routes = require('./routes.ts')


const app = express()

app.use(express.json())
app.use(routes)

module.exports = app
