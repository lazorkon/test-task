'use strict';

import routerFactory from '../../components/helpers/routerFactory';
import * as controller from './user.controller';

var router = routerFactory(controller, ['index']);

module.exports = router;
