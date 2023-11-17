import deleteAddress          from './endpoints/deleteAddress'
import deleteCustomerAddress  from './endpoints/deleteCustomerAddress'
import deleteDimension        from './endpoints/deleteDimension'
import deleteUser             from './endpoints/deleteUser'
import getAddresses           from './endpoints/getAddresses'
import getAdminById           from './endpoints/getAdminById'
import getAdmins              from './endpoints/getAdmins'
import getCourierById         from './endpoints/getCourierById'
import getCouriers            from './endpoints/getCouriers'
import getCustomerById        from './endpoints/getCustomerById'
import getCustomers           from './endpoints/getCustomers'
import getDigestSession       from './endpoints/getDigestSession'
import getDimensionById       from './endpoints/getDimensionById'
import getDimensions          from './endpoints/getDimensions'
import getPackageById         from './endpoints/getPackageById'
import getPackageLifeCycles   from './endpoints/getPackageLifeCycles'
import getPackagesByUser      from './endpoints/getPackagesByUser'
import insertAdmin            from './endpoints/insertAdmin'
import insertCourier          from './endpoints/insertCourier'
import insertCustomer         from './endpoints/insertCustomer'
import insertCustomerAddress  from './endpoints/insertCustomerAddress'
import insertDimension        from './endpoints/insertDimension'
import insertPackage          from './endpoints/insertPackage'
import login                  from './endpoints/login'
import logout                 from './endpoints/logout'
import registration           from './endpoints/registration'
import updateAdmin            from './endpoints/updateAdmin'
import updateCourier          from './endpoints/updateCourier'
import updateCustomer         from './endpoints/updateCustomer'
import updateDimension        from './endpoints/updateDimension'

const ajax = {
  deleteAddress,
  deleteCustomerAddress,
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
  getPackageById,
  getPackageLifeCycles,
  getPackagesByUser,
  insertAdmin,
  insertCourier,
  insertCustomer,
  insertCustomerAddress,
  insertDimension,
  insertPackage,
  login,
  logout,
  registration,
  updateAdmin,
  updateCourier,
  updateCustomer,
  updateDimension
}

export default ajax
