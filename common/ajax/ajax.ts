import deleteDimension  from './endpoints/deleteDimension'
import getDimensionById from './endpoints/getDimensionById'
import getDimensions    from './endpoints/getDimensions'
import insertDimension  from './endpoints/insertDimension'
import updateDimension  from './endpoints/updateDimension'

const ajax = {
  deleteDimension,
  getDimensionById,
  getDimensions,
  insertDimension,
  updateDimension
}

export default ajax
