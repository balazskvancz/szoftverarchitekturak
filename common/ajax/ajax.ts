import deleteDimension  from './endpoints/deleteDimension'
import deleteUser       from './endpoints/deleteUser'
import getDimensionById from './endpoints/getDimensionById'
import getAdminById     from './endpoints/getAdminById'
import getAdmins        from './endpoints/getAdmins'
import getDimensions    from './endpoints/getDimensions'
import insertAdmin      from './endpoints/insertAdmin'
import insertDimension  from './endpoints/insertDimension'
import updateAdmin      from './endpoints/updateAdmin'
import updateDimension  from './endpoints/updateDimension'

const ajax = {
  deleteDimension,
  deleteUser,
  getDimensionById,
  getAdminById,
  getAdmins,
  getDimensions,
  insertAdmin,
  insertDimension,
  updateAdmin,
  updateDimension
}

export default ajax
