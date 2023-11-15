import deleteAddress    from './endpoints/deleteAddress'
import deleteDimension  from './endpoints/deleteDimension'
import deleteUser       from './endpoints/deleteUser'
import getDimensionById from './endpoints/getDimensionById'
import getAddresses     from './endpoints/getAddresses'
import getAdminById     from './endpoints/getAdminById'
import getAdmins        from './endpoints/getAdmins'
import getCourierById   from './endpoints/getCourierById'
import getCouriers      from './endpoints/getCouriers'
import getCustomers     from './endpoints/getCustomers'
import getDigestSession from './endpoints/getDigestSession'
import getCustomerById  from './endpoints/getCustomerById'
import getDimensions    from './endpoints/getDimensions'
import insertAdmin      from './endpoints/insertAdmin'
import insertCourier    from './endpoints/insertCourier'
import insertCustomer   from './endpoints/insertCustomer'
import insertDimension  from './endpoints/insertDimension'
import login            from './endpoints/login'
import logout           from './endpoints/logout'
import registration     from './endpoints/registration'
import updateAdmin      from './endpoints/updateAdmin'
import updateCourier    from './endpoints/updateCourier'
import updateCustomer   from './endpoints/updateCustomer'
import updateDimension  from './endpoints/updateDimension'

const ajax = {
  deleteAddress,
  deleteDimension,
  deleteUser,
  getDimensionById,
  getAddresses,
  getAdminById,
  getAdmins,
  getCourierById,
  getCouriers,
  getCustomerById,
  getCustomers,
  getDigestSession,
  getDimensions,
  insertAdmin,
  insertCourier,
  insertCustomer,
  insertDimension,
  login,
  logout,
  registration,
  updateAdmin,
  updateCourier,
  updateCustomer,
  updateDimension
}

export default ajax
