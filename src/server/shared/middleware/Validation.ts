import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { SchemaOf, ValidationError } from 'yup'

type TProperty = 'body' | 'header' | 'params' | 'query'

type TAllSchemas = Record<TProperty, SchemaOf<any>>

type TValidation = (schemas: Partial<TAllSchemas>) => RequestHandler

export const validation: TValidation = (schemas) => async (req, res, next) => {
  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      schema.validate(req[key as TProperty], {
        abortEarly: false
      })
      return next()
    } catch (err) {
      const yupError = err as ValidationError
      const errors: Record<string, string> = {}

      yupError.inner.forEach((err) => {
        if (!err.path) return
        errors[err.path] = err.message
      })

      return res.status(StatusCodes.BAD_REQUEST).json({
        errors
      })
    }
  })
}
