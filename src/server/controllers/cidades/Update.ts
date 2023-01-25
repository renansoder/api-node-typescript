import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

interface ICidade {
  nome: string
}

export const update = (req: Request<{}, {}, ICidade>, res: Response) => {
  return res.status(StatusCodes.OK).send(req.body)
}
