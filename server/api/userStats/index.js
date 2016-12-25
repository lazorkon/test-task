'use strict';

import routerFactory from '../../components/helpers/routerFactory';
import * as controller from './userStats.controller';

var router = routerFactory(controller, ['index']);

module.exports = router;
