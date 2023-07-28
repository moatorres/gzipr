import { check } from './ExpressValidator'

describe('ExpressValidator', () => {
  describe('check', () => {
    describe('sanitize', () => {
      it('should sanitize the value', async () => {
        const value = 'foo/bar'
        const req = { body: { value } }
        const result = await check('value').sanitize().run(req)
        const errors = result.array()
        expect(errors).toHaveLength(0)
        expect(req.body.value).toEqual('foo_bar')
      })

      it('should be chainable', async () => {
        const value = ''
        const req = { body: { value } }
        const result = await check('value')
          .sanitize()
          .isValidFilename()
          .withMessage('Invalid filename')
          .run(req)
        const errors = result.array()
        expect(errors).toHaveLength(1)
        expect(errors[0].msg).toEqual('Invalid filename')
      })
    })

    describe('isValidFilename', () => {
      it('should return an error if the value is not a string', async () => {
        const value = 123
        const req = { body: { value } }
        const result = await check('value').isValidFilename().run(req)
        const errors = result.array()
        expect(errors).toHaveLength(1)
        expect(errors[0].msg).toEqual('Invalid value')
      })

      it('should return an error if the value is an empty string', async () => {
        const value = ''
        const req = { body: { value } }
        const result = await check('value').isValidFilename().run(req)
        const errors = result.array()
        expect(errors).toHaveLength(1)
        expect(errors[0].msg).toEqual('Invalid value')
      })

      it('should return an error if the value is a string with more than 255 characters', async () => {
        const value = 'a'.repeat(256)
        const req = { body: { value } }
        const result = await check('value').isValidFilename().run(req)
        const errors = result.array()
        expect(errors).toHaveLength(1)
        expect(errors[0].msg).toEqual('Invalid value')
      })

      it('should return an error if the value is a string with less than 1 character', async () => {
        const value = 'a'.repeat(0)
        const req = { body: { value } }
        const result = await check('value').isValidFilename().run(req)
        const errors = result.array()
        expect(errors).toHaveLength(1)
        expect(errors[0].msg).toEqual('Invalid value')
      })

      it('should return no error if the value is a string with 1 character', async () => {
        const value = 'a'
        const req = { body: { value } }
        const result = await check('value').isValidFilename().run(req)
        const errors = result.array()
        expect(errors).toHaveLength(0)
      })

      it('should return no error if the value is a string with 255 characters', async () => {
        const value = 'a'.repeat(255)
        const req = { body: { value } }
        const result = await check('value').isValidFilename().run(req)
        const errors = result.array()
        expect(errors).toHaveLength(0)
      })
    })
  })
})
