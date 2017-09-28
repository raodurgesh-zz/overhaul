import * as _lodash from 'lodash';

import * as _axios from 'axios';

export const lodash  = {
  install: function(Vue, name = '$_') {
    Object.defineProperty(Vue.prototype, name, { value: _lodash });
  }
}



export const axios =  {
  install: function(Vue,name = 'axios') {
    Object.defineProperty(Vue.prototype, name, { value: axios });
  }
}