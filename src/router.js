import { Lib } from "./lib.js"
import weatherWrapper from "./guest/weather-wrapper.js"
import share from "./guest/share.js"
import timers from "./guest/timers.js"
import cities from "./guest/cities.js"
import paginators from "./guest/paginators.js"

// routes
export const routes = [
  { name: 'Weather', path: '/', exact: true, component: weatherWrapper },
  { name: 'Timers', path: '/timers', component: timers, },
  { name: 'Cities', path: '/cities', component: cities },
  { name: 'Paginators', path: '/paginators', component: paginators, },
  { name: 'Dropdown', path: '/dropdown' },
  { name: 'Datatable', path: '/dropdown/datatable', component: datatable, child: 1, },
  { name: 'Nothing',  path: '/dropdown/nothing', component: share, child: 1, },
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
