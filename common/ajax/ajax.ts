import deleteDimension  from './endpoints/deleteDimension'
import deleteUser       from './endpoints/deleteUser'
import getDimensionById from './endpoints/getDimensionById'
import getAdminById     from './endpoints/getAdminById'
import getAdmins        from './endpoints/getAdmins'
import getCustomers     from './endpoints/getCustomers'
import getCustomerById  from './endpoints/getCustomerById'
import getDimensions    from './endpoints/getDimensions'
import insertAdmin      from './endpoints/insertAdmin'
import insertCustomer   from './endpoints/insertCustomer'
import insertDimension  from './endpoints/insertDimension'
import updateAdmin      from './endpoints/updateAdmin'
import updateCustomer   from './endpoints/updateCustomer'
import updateDimension  from './endpoints/updateDimension'

const ajax = {
  deleteDimension,
  deleteUser,
  getDimensionById,
  getAdminById,
  getAdmins,
  getCustomerById,
  getCustomers,
  getDimensions,
  insertAdmin,
  insertCustomer,
  insertDimension,
  updateAdmin,
  updateCustomer,
  updateDimension
}

export default ajax
