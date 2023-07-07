import { Lib } from "./lib.js"
import { routes, service } from "./router.js"

const Link = ReactRouterDOM.Link,
      Redirect = ReactRouterDOM.Redirect,
      Route = ReactRouterDOM.Route;

var SELF, M
export class Navbar extends React.Component {
  constructor(props) {
    super(props)
    SELF = this
    M = SELF.methods
    M.data = {}
    M.data.menus = service.f_menus(routes) 
    M.data.routes = service.f_routes(routes).v
    
    // send components name
    Lib.bus.on('Com:constructor', path => {
      var i
      if(~(i = M.data.routes.findIndex(item => path == item.path))) {
        Lib.bus.trigger('NavBar:sendname', M.data.routes[i].name)
      }
    })
    Lib.bus.on('Com:mounted', M.f_highlight_current.bind(M))
  }
    
  // lifecycles hooks
  componentDidMount() {
    Lib.style(SELF, M.data.div)
    window.addEventListener('dragstart', M.f_win_ondragstart)
  }
  componentWillUnmount() {
    window.removeEventListener('dragstart', M.f_win_ondragstart)
  }
  
  //
  // private functions
  //
  methods = {

    f_menu_onclick(event, path) {
      var elem = document.querySelector('#navbarSupportedContent')
      
      elem.classList.toggle('expand');
      if(!elem.classList.contains('expand')) {
        M.f_collapse_all(elem)
      }
    },
    f_menuitem_onclick(event, path) {
      M.f_collapse_all()
    },
    f_menusubitem_onclick() {
      M.f_collapse_all()
    },
    f_highlight_current(path) {
      var path_folder = path.substring(0, path.lastIndexOf('/')),
          i, elem_path, elems = M.data.div.querySelectorAll('.nav-link')
      
      M.f_unhightlight_all()
      //
      for(i = elems.length; i--;) {
        if(elems[i].href)
          elem_path = elems[i].href.substring(elems[i].href.indexOf('#') + 1)
        else if(elems[i].dataset.href)
          elem_path = elems[i].dataset.href

        if(path == elem_path || path_folder == elem_path) elems[i].classList.add('nav-link-active')
      }
    },
    f_unhightlight_all() {
      var i, elems = M.data.div.querySelectorAll('.nav-link');
      for(i = elems.length; i--;) {
        elems[i].classList.remove('nav-link-active')
      }
    },
    f_collapse_all(exclude_elem) {
      var i, elems = M.data.div.querySelectorAll('.dropdown-menu');

      for(i = elems.length; i--;) {
        if(exclude_elem != elems[i]) {
          M.f_dropdown_onclick(null, elems[i], 1)
        }
      }
    },
    f_dropdown_onclick(event, ul, b_collapse) {
      var target, elem;
      
      if(event) {
        target = event.target || event.srcElement
        elem = target.nextElementSibling
        M.f_collapse_all(elem)
      }
      
      if(ul) elem = ul;
      else {
        var target = event.target || event.srcElement;
        elem = target.nextElementSibling
      }
      if(!b_collapse) elem.classList.toggle('expand')
      else elem.classList.remove('expand')
    },
    f_win_ondragstart() {
      event.preventDefault()
    },
    
  }

  render() {
console.log('Navbar render')

    var loc = '/' + window.location.href.split('/').at(-1)

    return Lib.reactelem(
      [ReactRouterDOM.HashRouter, null,
          ['div', { className:"container-fluid" },
          ['nav', { className:"navbar navbar-expand-sm navbar-light", style:{ backgroundColor:'#e3f2fd' }, ref:elem => { M.data.div = elem } },
            ['a', { className:"navbar-brand", href:"#", onClick:() => {}, style:{ cursor:'default' }},
              ['img', { alt:"logo", src:"/test/img/favicon.png", height:"40" }]
            ],
            ['button', { className:"navbar-toggler", type:"button", onClick:(e) => M.f_menu_onclick(e) },
              ['span', { className:"navbar-toggler-icon" }, '']
            ],
            ['div', { id:"navbarSupportedContent", className:"navbar-collapse" },
              ['ul', { className:"navbar-nav me-auto mb-2 mb-lg-0" },              
              ].concat(M.data.menus.map(obj => 
                !obj.data.length
                ? ['li', null, [Link, { className:loc == obj.item.path ? "nav-link nav-link-active" : "nav-link", onClick:(e) => M.f_menuitem_onclick(e, obj.item.path), to: obj.item.path }, obj.item.name]]
                : ['li', { className:"nav-item dropdown" },
                  ['a', { className:"nav-link dropdown-toggle", 'data-href':obj.item.path, onClick:(e) => M.f_dropdown_onclick(e, 0), style:{cursor:'pointer'} }, 
                    obj.item.name
                  ],
                  ['div', { className:"dropdown-menu" },
                    ['ul', { className:"dropdown-menu-inner" },
                    ].concat(... obj.data.map(subobj => {
                      var i = 0, ar = []
                      if(subobj.separated) ar[i++] = 
                      ['div', { className:"dropdown-divider"}, '']
                      ar[i++] = ['li', { className:"dropdown-item" }, 
                        [Link, { className:loc == subobj.path ? "nav-link nav-link-active" : "nav-link", to: (obj.item.path + subobj.path), onClick:(e) => M.f_menusubitem_onclick(e, subobj.path) }, subobj.name]
                      ]
                      return ar
                    }))
                  ]
                ]
              ))
            ]
          ],
          ['div', { className:"text-center", style:{marginTop: '20px'} },
          ].concat(M.data.routes.map(obj => {
            return [Route, obj]
          })),
        ],
      ],
    )
  }

  css = `
<style scoped>
  body {
    margin:0;
    padding:0;
    overflow-y:scroll;
  }
  body::-webkit-scrollbar {
    width: 12px;
  }
  body::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    border-radius: 10px;
  }
  body::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
  }

  .container-fluid {
    padding-left: 0;
    padding-right: 0;
    max-width:1200px;
  }
  
  .navbar {
    border: 1px solid #dee2e6;
    border-radius: 6px;
    user-select: none;
  }
  .navbar-brand {
    cursor: default;
    margin-right: 0.5rem;
    margin-bottom: 0.2rem;
    padding-top: 0;
    padding-bottom: 0;
  }

  .navbar > button:focus {
    outline: 1px solid var(--orange);
  }
  
  #navbarSupportedContent {
    max-height: 0;
    overflow: hidden;
    transition: max-height .75s linear;
  }
  #navbarSupportedContent.expand {
    max-height: 700px;
    transition-delay: .5s;
  }
  #navbarSupportedContent .dropdown-menu {
    border: none;
    display: block;
    max-height: 0;
    overflow: hidden;
    padding: 0;
    transition: max-height .75s linear, padding .25s linear .5s, margin-bottom .25s linear .5s;
  }
  #navbarSupportedContent .dropdown-menu.expand {
    max-height: 700px;
    margin-bottom: .5rem;
    transition-delay: .5s;
  }
  #navbarSupportedContent .dropdown-menu-inner {
    border: 1px solid rgba(0,0,0,.15);
    border-radius: 0.25rem;
    padding: .5rem 0;
  }
  
  #navbarSupportedContent .dropdown-menu li:active {
    background: rgb(220 220 220 / 1);
    color: inherit;
  }
  #navbarSupportedContent .dropdown-menu a {
    color: rgb(0 0 0 / .5);
  }
  
  .mb-2 {
    margin-bottom: 0!important;
  }
  .nav-link-active {
    color: black !important;
  }
  
  @media (min-width: 576px) {
    #navbarSupportedContent {
      max-height: 700px!important;
      overflow: visible!important;
    }
    .nav-link {
      padding: 0.5rem 1rem .4rem;
    }
  }
</style>
  `
}


