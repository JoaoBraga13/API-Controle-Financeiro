const app = require('./app')
const AppDataSource = require('./src/database/conexao')

const port = 3333
try {
  AppDataSource.initialize()
    .then(() => {
      console.log('banco de dados conectado!!')
    })

  app.listen(port, () => {
    console.log('rodando na porta 3333!!! http://localhost:3333/')
  })
} catch(e) {
  console.log('Erro ao conectar o banco')
}
