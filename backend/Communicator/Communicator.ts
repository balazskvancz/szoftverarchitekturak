import getActionablePackages  from './endpoints/getActionablePackages'
import getAddresses           from './endpoints/getAddresses'
import getDigestSession       from './endpoints/getDigestSession'
import getSession             from './endpoints/getSession'
import getUserById            from './endpoints/getUserById'
import getIdByEmailPass       from './endpoints/getUserIdByEmailPass'
import getWorkingCouriers     from './endpoints/getWorkingCouriers'
import insertAddress          from './endpoints/insertAddress'

const Communicator = {
  getActionablePackages,
  getAddresses,
  getDigestSession,
  getSession,
  getUserById,
  getIdByEmailPass,
  getWorkingCouriers,
  insertAddress
}

export default Communicator
