'use strict';

import routerFactory from '../../components/helpers/routerFactory';
import * as controller from './photo.controller';

var router = routerFactory(controller, ['index', 'create']);

module.exports = router;
