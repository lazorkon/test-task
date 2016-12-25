'use strict';

import Wrapper from '../../components/jsonplaceholder';

class Model extends Wrapper {
  constructor() {
    super();
    this.resource = 'photos';
  }
}

export default Model;
