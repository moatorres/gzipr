import fs from 'fs'
import axios, { AxiosError } from 'axios'
import FormData from 'form-data'

describe('GET /upload', () => {
  it('should return 404', async () => {
    let error: AxiosError
    try {
      await axios.get(`/upload`)
    } catch (e) {
      error = e
    }

    expect(error).toBeDefined()
    expect(error.response.status).toBe(404)
    expect(error.response.statusText).toBe('Not Found')
    expect(error.response.data).toEqual({
      status: 404,
      message:
        'Are you trying to upload a file? Try POSTing to /upload/:filename instead.',
    })
  })
})

describe('POST /upload/:filename', () => {
  it('should return 404 if file is not provided', async () => {
    let error: AxiosError
    try {
      await axios.post(`/upload`)
    } catch (e) {
      error = e
    }

    expect(error).toBeDefined()
    expect(error.response.status).toBe(404)
    expect(error.response.statusText).toBe('Not Found')
    expect(error.response.data).toEqual({
      status: 404,
      message:
        'Are you trying to upload a file? Try POSTing to /upload/:filename instead.',
    })
  })

  it('should return 500 if the content-type is not allowed', async () => {
    let error: AxiosError
    try {
      await axios.post(`/upload/hello`, {
        file: 'hello',
      })
    } catch (e) {
      error = e
    }

    expect(error).toBeDefined()
    expect(error.response.status).toBe(500)
    expect(error.response.statusText).toBe('Internal Server Error')
    expect(error.response.data).toEqual({
      status: 500,
      message: 'Error: Unsupported content type: application/json',
    })
  })

  it('should return 201 if file is a valid gzip', async () => {
    const form = new FormData()
    const data = fs.createReadStream('apps/gzipr-e2e/src/data/hello.gz')

    form.append('file', data)
    const res = await axios
      .post(`/upload/hello.gz`, form, {
        headers: form.getHeaders(),
      })
      .catch((error) => {
        fail(
          `Request failed with status ${error.response.status} and message ${error.response.data}`
        )
      })

    expect(res.status).toBe(201)
    expect(res.statusText).toBe('Created')
    expect(res.data).toEqual({ status: 201 })
  })
})
