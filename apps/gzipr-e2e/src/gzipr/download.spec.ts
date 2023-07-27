import axios from 'axios'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

// calculate the sha1sum of a file
function sha1sum(filePath: string) {
  const data = fs.readFileSync(filePath)
  return crypto.createHash('sha1').update(data).digest('hex')
}
/**
 * Test the /download/:filename endpoint
 * Requires that the file `hello.gz` exists in the `<root>/uploads` folder.
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
