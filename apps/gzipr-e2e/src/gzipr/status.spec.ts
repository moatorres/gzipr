import axios, { AxiosError } from 'axios'

/**
 * Test the /status endpoint
 * Requires that the server is running.
 */
describe('GET /', () => {
  it('should return 404', async () => {
    let error: AxiosError
    try {
      await axios.get(`/`)
    } catch (e) {
      error = e
    }
    expect(error).toBeDefined()
    expect(error.response.status).toBe(404)
    expect(error.response.statusText).toBe('Not Found')
    expect(error.response.data).toEqual({
      status: 404,
      message:
        "The endpoint you're looking for doesn't exist or couldn't be found.",
    })
  })
})

describe('GET /status', () => {
  it('should return 200', async () => {
    const res = await axios.get(`/status`)
    expect(res.status).toBe(200)
    expect(res.statusText).toBe('OK')
    expect(res.data).toMatchObject({
      app: 'gzipr',
      version: '1.0.0',
    })
  })
})
