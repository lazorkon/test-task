'use strict';

import routerFactory from '../../components/helpers/routerFactory';
import * as controller from './photo.controller';

var router = routerFactory(controller, ['index', 'show', 'create']);

module.exports = router;
