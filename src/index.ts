import { server } from './server/server'

server.listen(process.env.PORT || 3535, () => {
  console.log('Servidor Rodando!')
})
