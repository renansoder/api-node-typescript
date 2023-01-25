import { Router } from 'express'
import { CidadesController } from '../controllers'

const route = Router()

route.get('/', (_, res) => {
  return res.send('Oi, tudo bemm!!!!')
})

route.post('/cidades', CidadesController.create)

export { route }
