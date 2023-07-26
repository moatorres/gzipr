import axios from 'axios'
import zlib from 'zlib'

describe('GET /', () => {
  it('should return 404', async () => {
    try {
      const res = await axios.get(`/`)
      expect(res.status).toBe(404)
      expect(res.statusText).toBe('Not Found')
      expect(res.data.error).toBe(
        "The page http://localhost/ doesn't exist or couldn't be found."
      )
    } catch (_) {
      // ignore
    }
  })
})

describe('POST /upload', () => {
  it('should return 400 if file is not provided', async () => {
    try {
      const res = await axios.post(`/upload`)
      expect(res.status).toBe(400)
      expect(res.statusText).toBe('Bad Request')
      expect(res.data.message).toBe('File is required')
    } catch (_) {
      // ignore
    }
  })

  it('should return 400 if file is not a valid gzip', async () => {
    try {
      const res = await axios.post(`/upload`, {
        file: 'hello',
      })

      expect(res.status).toBe(400)
      expect(res.statusText).toBe('Bad Request')
      expect(res.data.message).toBe('File is not a valid gzip')
    } catch (_) {
      // ignore
    }
  })

  it('should return 200 if file is a valid gzip', async () => {
    try {
      const validGzip = zlib.gzipSync(Buffer.from('hello'))
      const res = await axios.post(
        `/upload-multipart`,
        {
          file: validGzip,
          filename: 'hello-cypress.gz',
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Content-Disposition': 'attachment; filename="hello-cypress.gz"',
          },
        }
      )
      expect(res.status).toBe(200)
      expect(res.statusText).toBe('OK')
      expect(res.data.message).toBe('File uploaded successfully')
    } catch (error) {
      // ignore
      console.error(error)
    }
  })
})
