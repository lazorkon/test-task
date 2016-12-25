'use strict';

import routerFactory from '../../components/helpers/routerFactory';
import * as controller from './album.controller';

var router = routerFactory(controller, ['index']);

module.exports = router;
