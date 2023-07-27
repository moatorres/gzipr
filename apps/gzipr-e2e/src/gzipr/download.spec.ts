import axios from 'axios'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

/**
 * Test the /download/:filename endpoint.
 * Requires that the server is running.
 */
describe('GET /download/:filename', () => {
  it('should return the uploaded gzip file', async () => {
    const filename = 'hello.gz'

    const res = await axios.get(`/download/${filename}`, {
      responseType: 'arraybuffer', // this is important
      headers: {
        'Content-Type': 'application/gzip',
      },
    })

    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toBe('application/octet-stream')

    // save the downloaded file to disk
    const downloadedFile = path.resolve('apps/gzipr-e2e/src/data/downloaded.gz')
    fs.writeFileSync(downloadedFile, Buffer.from(res.data))

    // check that the downloaded file is the same as the original file
    const originalFile = path.resolve('apps/gzipr-e2e/src/data/hello.gz')
    expect(sha1sum(originalFile)).toBe(sha1sum(downloadedFile))
  })
})

/**
 * Calculate the sha1sum of a file.
 * @param filePath The path to the file.
 */
function sha1sum(filePath: string) {
  const data = fs.readFileSync(filePath)
  return crypto.createHash('sha1').update(data).digest('hex')
}
