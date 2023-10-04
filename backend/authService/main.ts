import Router from '@common/Router/Router'

import getConfig    from './getConfig'
import getServices  from './getServices'
import initDatabase from './initDatabase'

import addRoutes from './http/addRoutes'

const { db: dbConfig, http } = getConfig()
const { port } = http

const router = Router.getInstance({
  address: port,
  hasLogger: true
})

const db        = initDatabase(dbConfig)
const services  = getServices(db)

addRoutes(router, services)

router.listen()
