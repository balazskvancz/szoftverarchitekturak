import deleteDimension  from './endpoints/deleteDimension'
import deleteUser       from './endpoints/deleteUser'
import getDimensionById from './endpoints/getDimensionById'
import getAdminById     from './endpoints/getAdminById'
import getAdmins        from './endpoints/getAdmins'
import getCourierById   from './endpoints/getCourierById'
import getCouriers      from './endpoints/getCouriers'
import getCustomers     from './endpoints/getCustomers'
import getCustomerById  from './endpoints/getCustomerById'
import getDimensions    from './endpoints/getDimensions'
import insertAdmin      from './endpoints/insertAdmin'
import insertCourier    from './endpoints/insertCourier'
import insertCustomer   from './endpoints/insertCustomer'
import insertDimension  from './endpoints/insertDimension'
import updateAdmin      from './endpoints/updateAdmin'
import updateCourier    from './endpoints/updateCourier'
import updateCustomer   from './endpoints/updateCustomer'
import updateDimension  from './endpoints/updateDimension'

const ajax = {
  deleteDimension,
  deleteUser,
  getDimensionById,
  getAdminById,
  getAdmins,
  getCourierById,
  getCouriers,
  getCustomerById,
  getCustomers,
  getDimensions,
  insertAdmin,
  insertCourier,
  insertCustomer,
  insertDimension,
  updateAdmin,
  updateCourier,
  updateCustomer,
  updateDimension
}

export default ajax
