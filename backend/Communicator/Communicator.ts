import getDigestSession from './endpoints/getDigestSession'
import getSession       from './endpoints/getSession'
import getUserById      from './endpoints/getUserById'
import getIdByEmailPass from './endpoints/getUserIdByEmailPass'

const Communicator = {
  getDigestSession,
  getSession,
  getUserById,
  getIdByEmailPass
}

export default Communicator
