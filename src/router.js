import { Lib } from "./lib.js"
import Home from "./home.js"
import Share from "./share.js"
import Timers from "./timers.js"
import Cities from "./cities.js"
import { Offset } from "./offset.js"

// routes
export const routes = [
  { name: 'Weather', path: '/', exact: true, component: Home },
  { name: 'Timers', path: '/timers', component: Timers, },
  { name: 'Cities', path: '/cities', component: Cities },
  { name: 'Offset', path: '/offset', component: Offset },
  { name: 'Dropdown', path: '/dropdown' },
  { name: 'Action',  path: '/', exact: true, component: Share, child: 1, },
  { name: 'Another action', path: '/', component: Share, child: 1, },
  { name: 'Something else here', path: '/timers', component: Timers, child: 1, },
  { name: 'Separated link', path: '/', component: Share, child: 1, separated: 1, },
  { name: 'Dropdown1', path: '/dropdown1',  },
  { name: 'Action1', path: '/', exact: true, component: Share, child: 1, },
  { name: 'Another action1', path: '/offset', component: Offset, child: 1, },
  { name: 'Something else here1', path: '/timers', component: Timers, child: 1, },
  { name: 'Separated link1', path: '/', component: Share, child: 1, separated: 1, },
]

export const service = {
   
  f_menus: function(routes) {
    var i, ii, k = 0, res = []
    
    for(i = 0, ii = routes.length; i < ii; i++) {
      if(routes[i].child) {
        res[k - 1].data.push(routes[i])
      }
      else {
        res[k++] = { item: routes[i], data: [] }
      }
    }
    return res;
  },
  
  f_routes: function (routes) {
    var path, last_path = '', disp = Lib.sort(1)

    for(var i = 0, ii = routes.length; i < ii; i++){

      if(!routes[i].child) {
        last_path = ''
      }
      path = last_path + routes[i].path

      if(routes[i].component) {
        if(!disp.find(path)) {
          disp.add(path, { name:routes[i].name, path, exact:routes[i].exact, component:routes[i].component })
        }
      }
      else last_path = routes[i].path
      
    }
    return disp
  },
}
