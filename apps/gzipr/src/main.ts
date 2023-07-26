import { notFound, server } from './app/server'
import { uploadRouter, downloadRouter } from './module/use-cases'

const app = server.getApp()

app.use('/upload', uploadRouter)
app.use('/download', downloadRouter)

app.get('*', notFound.getMiddleware())

server.start()
