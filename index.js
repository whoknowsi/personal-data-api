import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { cors } from 'hono/cors'
const app = new Hono()

app.use('/*', cors())

app.get('/testing', (c) => {
  return c.json({
    ok: '200'
  })
})

app.get('/static/*', serveStatic({ root: './' }))

export default app
