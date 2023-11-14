import getDigestSession from './endpoints/getDigestSession'
import getSession       from './endpoints/getSession'
import getUserById      from './endpoints/getUserById'
import getIdByEmailPass from './endpoints/getUserIdByEmailPass'
import insertAddress    from './endpoints/insertAddress'

const Communicator = {
  getDigestSession,
  getSession,
  getUserById,
  getIdByEmailPass,
  insertAddress
}

export default Communicator
