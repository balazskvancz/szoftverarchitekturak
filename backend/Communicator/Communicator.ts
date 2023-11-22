import getActionablePackages  from './endpoints/getActionablePackages'
import getAddresses           from './endpoints/getAddresses'
import getDigestSession       from './endpoints/getDigestSession'
import getPackageById         from './endpoints/getPackageById'
import getSession             from './endpoints/getSession'
import getUserById            from './endpoints/getUserById'
import getIdByEmailPass       from './endpoints/getUserIdByEmailPass'
import getWorkingCouriers     from './endpoints/getWorkingCouriers'
import insertAddress          from './endpoints/insertAddress'
import insertPackageLifeCycle from './endpoints/insertPackageLifeCycle'

const Communicator = {
  getActionablePackages,
  getAddresses,
  getDigestSession,
  getPackageById,
  getSession,
  getUserById,
  getIdByEmailPass,
  getWorkingCouriers,
  insertAddress,
  insertPackageLifeCycle
}

export default Communicator
