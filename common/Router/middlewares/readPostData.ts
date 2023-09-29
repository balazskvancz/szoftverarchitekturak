import Middleware from '../Middleware'

import matcher    from './utils/postData/matcher'
import middleware from './utils/postData/middleware'

const readPostData = new Middleware(middleware, matcher)

export default readPostData
