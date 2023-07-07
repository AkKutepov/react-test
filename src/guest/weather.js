import { Lib } from "../lib.js"

var SELF, M, OBJ = {}
//
class weather extends React.Component {
  constructor(props) {
    super(props)
    SELF = this
    M = SELF.methods
    M.data = {}
        
    this.state = {
      data_W: [],
      data_ViewVisible: 0,
      data_SettingVisible: 0,
    }
  }
  
  // lifecycles hooks
  componentDidMount() {
    Lib.style(SELF, OBJ.div)

    OBJ.cityMoved = null
    OBJ.cityMovedIndex = -1
    OBJ.refreshTimeout = 0
    
    if(!M.refreshData()) {
      SELF.setState({ data_SettingVisible: 1 })
    }

    window.addEventListener('mouseup', M.winOnMouseup)
    window.addEventListener('touchend', M.winOnMouseup)
  }
  
  componentWillUnmount() {
    window.removeEventListener('mouseup', M.winOnMouseup)
    window.removeEventListener('touchend', M.winOnMouseup)
  }
  
  componentDidUpdate() {
    var elem
    
    M.orderCities()
    M.renewCities() // to local storage

    if(SELF.state.data_W.length) {
      if(SELF.state.data_ViewVisible) {

        elem = OBJ.div.querySelector('.city-container')
        if(elem) {
          elem.addEventListener('touchstart', M.cityOnMousedown, { passive: false })
          elem.addEventListener('touchmove', M.cityOnMousemove, { passive: false })
        }
      }
    }
        
    if(SELF.state.data_SettingVisible) {
      elem = OBJ.div.querySelector('.input-group').querySelector('input')
      if(elem) elem.focus()
    }
  }

  methods = {
    refreshData() {
      var ar, s = localStorage.getItem('trWeather') || '[]'
      if(s == '[]') s = '[{"name":"Havana","country":"CU"},{"name":"Dubai","country":"AE"}]'
      ar = JSON.parse(s).map(item => item.name + ', ' + item.country)
      M.getWeather(ar)
      return 1
    },
    settingMode() {
      SELF.setState({ data_SettingVisible: !SELF.state.data_SettingVisible })
    },
    cityOnInput(event) {
      var s0, s1 = '', match
      
      s0 = event.target.value
      //
      if((match = /[a-z .-]+,?[a-z]{0,2}/i.exec(s0)) != null) {
        s1 = match[0];
      }
      if(s0 != s1) {
        event.target.value = s1
      }
    },
    addCityOnEnter(event) {
      if (event.key === 'Enter' || event.type == 'click') {
        event.preventDefault();
        
        var elem = event.target.closest('.input-group').querySelector('input'),
            s = elem.value
            
        if(s.length > 2) {
          // s = s.split(',').map(item => item.trim()).join(',')
          s = s.toLowerCase()      
          M.getWeather([s])        
          elem.select()
        }
      }
    },
    
    // get index of city
    getIndex(elem) {
      var i, res = -1, elems = OBJ.div.querySelectorAll('.city')
      for(i = 0; i < elems.length; i++) {
        if(elems[i] == elem) { res = i; break; }
      }
      return res;
    },
    renewCities() {
      // renew array of sities
      var i, ar = []
      for(i = 0; i < SELF.state.data_W.length; i++) {
        ar[i] = { name: SELF.state.data_W[i].name, country: SELF.state.data_W[i].sys.country }
      }
      localStorage.setItem('trWeather', JSON.stringify(ar));
    },
    
    winOnMouseup(event) {
      var elem, elems, index_old = OBJ.cityMovedIndex, index
        
      if(elem = OBJ.cityMoved) {
        index = M.getIndex(elem)
        elem.style.zIndex = 'inherit'
        elem.style.opacity = 1
        OBJ.cityMoved.style.cursor = 'pointer';
        OBJ.cityMoved = null
        M.orderCities()
        
        if(index == index_old) return
        elems = OBJ.div.querySelectorAll('.city')

        // retutn elem to old place
        if(index_old < index) {
          elem.parentNode.insertBefore(elem, elems[index_old])
        }
        else {
          elem.parentNode.insertBefore(elem, elems[index_old + 1])
        }
// console.log(index, index_old)
        
        // place element in array
        setTimeout(() => {
          var ar = SELF.state.data_W
          ar.splice(index, 0, ar.splice(index_old, 1)[0])
          SELF.setState({ data_W: ar });
        }, 200)
      }
    },
    cityOnMousedown(event) {
      event.preventDefault()

      var i, target = event.target || event.srcElement

      if(target.dataset.name == 'move' || target.parentNode.dataset.name == 'move') {
        var elem = OBJ.cityMoved = target.closest('.city')
        
        elem.style.cursor = 'move'
        elem.style.zIndex = 10
        elem.style.opacity = 0.5
        OBJ.bounds = OBJ.cityMoved.closest('.city-container').getBoundingClientRect()
        
        // get index of city
        OBJ.cityMovedIndex = M.getIndex(elem)
        
        var boundsC = target.getBoundingClientRect(),
            boundsP = target.parentNode.getBoundingClientRect()
            
        if(event.type == 'touchstart') {
          var touch = event.touches[0] || event.changedTouches[0];
          OBJ.offsetY = boundsC.height * 3 / 4 + (boundsC.y - boundsP.y)
        }
        else if(event.type == 'mousedown') {
          OBJ.offsetY = event.nativeEvent.offsetY + (boundsC.y - boundsP.y)
        }
      }
      else if(target.dataset.name == 'bin' || target.parentNode.dataset.name == 'bin') {
        var i, elem = target.closest('.city'),
            s = elem.querySelector('.city-name').innerHTML,
            name = s.substring(0, s.indexOf(',')),
            country = s.substring(s.indexOf(',') + 1).trim()
          
        // delete from data_W
        if(~(i = SELF.state.data_W.findIndex(item => item.name == name && item.sys.country == country))) {
          elem.style.opacity = 0
          
          //
          setTimeout(() => {
            var ar = SELF.state.data_W.filter((item, j) => j != i)
            SELF.setState({ data_W: ar })
            
            if(i < SELF.state.data_W.length) {
              var transition = window.getComputedStyle(elem).getPropertyValue('transition')
              elem.style.transition = 'none'
              elem.style.opacity = 1
              elem.style.transition = transition
            }
          }, 500)
        }
      }
    },
    cityOnMousemove(event) {
      event.preventDefault()
        
      if(OBJ.cityMoved) {
        var elem = OBJ.cityMoved, elems = OBJ.div.querySelectorAll('.city'),
            mouse = {}, container = OBJ.cityMoved.closest('.city-container')
        
        if(event.type == 'touchmove') {
          var touch = event.touches[0] || event.changedTouches[0]
          mouse.y = touch.pageY - OBJ.bounds.top - document.documentElement.scrollTop
        }
        else if(event.type == 'mousemove') {
          mouse.y = event.pageY - OBJ.bounds.top - document.documentElement.scrollTop
        }
                
        var elem_array = [...elems],
            cur_index = elem_array.findIndex(item => item == elem)
// console.log(mouse.y, OBJ.offsetY, elem.offsetHeight)      

        if(mouse.y - OBJ.offsetY + elem.offsetHeight < OBJ.bounds.height &&
          mouse.y - OBJ.offsetY > 0) {
          
          var top = mouse.y - OBJ.offsetY,
            cur = OBJ.cityMoved,
            prev = cur.previousElementSibling,
            next = cur.nextElementSibling;
          
          if(!OBJ.reorderTimer) {
            if(prev && cur.offsetTop <= prev.offsetTop + 10) {
              cur.parentNode.insertBefore(cur, prev) // no swap in the DOM !
              M.orderCities() // reorder
            }
            else if(next && cur.offsetTop + cur.offsetHeight >= next.offsetTop + next.offsetHeight - 10) {
              cur.parentNode.insertBefore(next, cur) // no swap in the DOM !
              M.orderCities() // reorder
            }
          }
          
          elem.style.top = mouse.y - OBJ.offsetY + 'px'
        }
      }
    },
    
    orderCities() {
      var i, h = 0, elem, elems = OBJ.div.querySelectorAll('.city')
      
      if(elems.length) {
        const marginBottom = '.3rem'
  // console.log(elems)

        for(i = 0; i < elems.length; i++) {
          if(i == 0) {
            h = elems[i].offsetHeight
            elems[i].style.top = 0;
          }
          else {
            elems[i].style.top = 'calc(' + h + 'px + ' + marginBottom + ')'
            h = elems[i].offsetTop + elems[i].offsetHeight
          }
        }
        elem = OBJ.div.querySelector('.city-container')
        elem.style.maxHeight = h + 'px'
        if(elem.offsetHeight < h) elem.style.height = h + 'px'
      }
    },
    ms2kmh(speed) {
      return speed * 3600 / 1000;
    },
    wind2words(speed) {
      var i, ar = [
        { name:'Calm', speed:2 },
        { name:'Light air', speed:6 },
        { name:'Light breeze', speed:11 },
        { name:'Gentle breeze', speed:19 },
        { name:'Moderate breeze', speed:30 },
        { name:'Fresh breeze', speed:39 },
        { name:'Strong breeze', speed:50 },
        { name:'Moderate gale', speed:61 },
        { name:'Fresh gale', speed:74 },
        { name:'Strong gale', speed:87 },
        { name:'Whole gale', speed:102 },
        { name:'Storm', speed:117 },
        { name:'Hurricane', speed:1000000 },
      ]
      
      if(~(i = ar.findIndex(item => item.speed > speed))) {
        return ar[i].name + '.'
      }
    },
    deg2words(deg) {
      var val = Math.floor((deg / 22.5) + 0.5),
          arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
      return arr[(val % 16)]
    },
    kelvin2Celsius(kelv) {
      return +(kelv - 273.15).toFixed(1)
    },
    dewPoint(temp, hum) {
      if(M.kelvin2Celsius(temp) > 0 && M.kelvin2Celsius(temp) < 60) {
        const a = 17.271, b = 237.7
        var c = (a * M.kelvin2Celsius(temp)) / (b + M.kelvin2Celsius(temp)) + Math.log(hum / 100)
        return ((b * c) / (a - c)).toFixed(1) + '℃' // C - &#8451;
      }
      else {
        return '-'
      }
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    
    getWeather(cities) {
      var w_data = []
      
      if(OBJ.refreshTimeout) clearTimeout(OBJ.refreshTimeout)
      OBJ.refreshTimeout = setTimeout(() => {
        M.refreshData()
      }, 30 * 60 * 1000) // 30 min
      
      if(cities.length) fn(0)
        
      function fn(i) {
      // get city weather

        var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cities[i] + '&limit=5&appid=65d3d0a48fb24bcee34d1d3c38ff4d4c'
        //
        Lib.fetchReq(url, null, { method: 'GET', headers: null })
        .then(res => getData(res))

        function getData(data) {
          // console.log(response)
   
          w_data[i++] = data
          //
          if(w_data[i - 1].local_name && w_data[i - 1].local_name.en) {
            w_data[i - 1].name = w_data[i - 1].local_name.en
          }
          //
          if(i == cities.length) {
            SELF.setState({ data_ViewVisible: 1, })
            
            // weather data
            if(cities.length != 1 || (SELF.state.data_W.length == 1 && 
                (SELF.state.data_W[0].name == w_data[0].name && 
                SELF.state.data_W[0].sys.country == w_data[0].sys.country))) {
              
                SELF.setState({ data_W: w_data, }) // replace
            }
            else {
              // find doubles
              if(!~(SELF.state.data_W.findIndex(item => {
                // console.log(item, SELF.state.data_W, w_data)          
                var name = item.name,
                    country = item.sys.country,
                    new_name = w_data[0].name,
                    new_country = w_data[0].sys.country
                
                if(name == new_name && country == new_country) {
                  return 1;
                }
              }))) {
              // not found
                
                var ar = SELF.state.data_W
                SELF.setState({ data_W: ar.concat(w_data) }) // add
              }
              else {
              // found
              
                alert("Already on the list.")
                return
              }
            }
            
          }
          else fn(i)
        }
      }
    },
  }
  
  render() {
console.log('com Weather render')

    return Lib.reactelem(
['div', { ref:elem => { OBJ.div = elem } },
  
  ['div', { id:"my-weather-wrapper", }, 
  
    SELF.state.data_ViewVisible ?
    ['div',  { className:"view" },
    ].concat(SELF.state.data_W.map((w, index) =>
      ['div', { className:"card mb-3", key: w.name + ', ' + w.sys.country },
        ['div', { className:"card-header" },
          ['p', null, w.name + ', ' + w.sys.country ],
          
          !index && !SELF.state.data_SettingVisible ?
          ['svg', { onClick:M.settingMode, className:"bi bi-gear", xmlns:"http://www.w3.org/2000/svg", width:"18", height:"18", fill:"currentColor", viewBox:"0 0 16 16" },
            ['path', { d:"M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" }],
            ['path', { d:"M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" }],
          ]
          : [React.Fragment, null],
          
        ],
        ['div', { className:"card-body" },
          ['div', null,
            ['img', { src: 'https://openweathermap.org/img/wn/' + w.weather[0].icon + '@2x.png' }],
            ['h4', null, M.kelvin2Celsius(w.main.temp) + '℃']
          ],
          ['div', { className:"card-text" },
            ['div', null,
              'Feels like ' + M.kelvin2Celsius(w.main.feels_like) + '℃. ' +
              M.capitalizeFirstLetter(w.weather[0].description) + '. ' +
              M.wind2words(M.ms2kmh(w.wind.speed))
            ],
            ['div', null, 
              ['div', { className:'weather-params' },
                ['svg', { transform:"rotate(" + w.wind.deg + ")", xmlns:"http://www.w3.org/2000/svg", viewBox:"0 0 24 24" },
                  ['path', { d:"M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z" }]
                ],
                ['div', null, '\u00A0' + w.wind.speed.toFixed(1) + 'm/s ' + M.deg2words(w.wind.deg)]
              ],
              ['div', { className:'weather-params right' },
                ['svg', { xmlns:"http://www.w3.org/2000/svg", viewBox:"0 0 24 24" },
                  ['path', { d:"M12,16A3,3 0 0,1 9,13C9,11.88 9.61,10.9 10.5,10.39L20.21,4.77L14.68,14.35C14.18,15.33 13.17,16 12,16M12,3C13.81,3 15.5,3.5 16.97,4.32L14.87,5.53C14,5.19 13,5 12,5A8,8 0 0,0 4,13C4,15.21 4.89,17.21 6.34,18.65H6.35C6.74,19.04 6.74,19.67 6.35,20.06C5.96,20.45 5.32,20.45 4.93,20.07V20.07C3.12,18.26 2,15.76 2,13A10,10 0 0,1 12,3M22,13C22,15.76 20.88,18.26 19.07,20.07V20.07C18.68,20.45 18.05,20.45 17.66,20.06C17.27,19.67 17.27,19.04 17.66,18.65V18.65C19.11,17.2 20,15.21 20,13C20,12 19.81,11 19.46,10.1L20.67,8C21.5,9.5 22,11.18 22,13Z" }]
                ],
                ['div', null, '\u00A0' + w.main.pressure + 'hPa' ]
              ]
            ],
            ['div', null, 
              ['div', { className:'weather-params' },
                'Humidity: ' + w.main.humidity + '%'
              ],
              ['div', { className:'weather-params right' },
                'Dew point: ' + M.dewPoint(w.main.temp, w.main.humidity)
              ],
            ],
            ['div', null, 
              ['div', { className:'weather-params' },
                'Visibility: ' + (w.visibility / 1000).toFixed(1) + 'km'
              ],
            ]
          ]
        ]
      ]
    )) : [React.Fragment, null],
    
    SELF.state.data_SettingVisible ?
    ['div', { className:"card mb-3 setting" }, 
      ['div', { className:"card-header" },
        ['p', null, 'Setting'],
        
        SELF.state.data_W.length ?
        ['svg', { className:"bi bi-x-lg", xmlns:"http://www.w3.org/2000/svg", width:"18", height:"18", fill:"currentColor", viewBox:"0 0 16 16",
          onClick:M.settingMode, 
        },
          ['path', { d:"M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" }]
        ]
        : [React.Fragment, null]
      ],
      
      ['div', { className:"card-body text-dark" },

        SELF.state.data_W.length ?
        ['div', { className:"city-container",
            onMouseDown: M.cityOnMousedown, 
            onMouseMove: M.cityOnMousemove,
            onTouchStart: M.cityOnMousedown, 
            onTouchMove: M.cityOnMousemove, 
          }, 
        ].concat(SELF.state.data_W.map(w =>
          ['div', { className:"city" },
            ['svg', { className:"bi bi-list", 'data-name':"move", xmlns:"http://www.w3.org/2000/svg", width:"24", height:"24", fill:"currentColor", viewBox:"0 0 16 16", },
              ['path', { fillRule:"evenodd", d:"M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" }]
            ],
            ['div', { className:"city-name", 'data-name':w.name },
              w.name + ', ' + w.sys.country
            ],
            ['svg', { className:"bi bi-trash3" ,'data-name':"bin", xmlns:"http://www.w3.org/2000/svg", width:"16", height:"16", fill:"currentColor", viewBox:"0 0 16 16" },
              ['path', { d:"M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" }]
            ]
          ]
        ))
        : [React.Fragment, null],
    
        ['div', { className:"input-container" },
          ['div', null, 'Add location:'],
          ['div', { className:"input-group input-group-sm mb-3" },
            ['input', { className:"form-control", type:"text", 'aria-label':"Small", 'aria-describedby':"inputGroup-sizing-sm",
                onInput: M.cityOnInput,
                onKeyDown: M.addCityOnEnter
              }
            ],
            ['div', { className:"input-group-append" },
              ['span', { onClick: M.addCityOnEnter, className:"input-group-text", id:"inputGroup-sizing-sm" },
                ['svg', { xmlns:"http://www.w3.org/2000/svg", width:"16", viewBox:"0 0 24 24" },
                  ['path', { d:"M20 4V10.5C20 14.09 17.09 17 13.5 17H7.83L10.92 20.09L9.5 21.5L4 16L9.5 10.5L10.91 11.91L7.83 15H13.5C16 15 18 13 18 10.5V4H20Z" }]
                ]
              ]
            ]
          ]
        ]

      ]
    ]
    : [React.Fragment, null]

  ]

]
      
    )
  }
  
  css = `
<style scoped>
  #my-weather-wrapper {
    font-family: Roboto Condensed, Arial;

    display: inline-flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    flex-direction: row;
  }
  #my-weather-wrapper .card {
    border:none;
    max-width:50vw;
    width:12rem;
  }
  .card {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
  }
  .card > .list-group:first-child .list-group-item:first-child {
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
  }
  .card > .list-group:last-child .list-group-item:last-child {
    border-bottom-right-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
  }
  .card-body {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 1.25rem;
  }
  
  #my-weather-wrapper .card-header {
    border:none;
    display:flex;
    justify-content: space-between;
    font-size:.8em;
    font-weight:700;
    padding:.5rem .5rem;
  }
  .card-header {
    padding: 0.75rem 1.25rem;
    margin-bottom: 0;
    background-color: rgba(0, 0, 0, 0.03);
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  }
  #my-weather-wrapper .card-header p {
    margin-top:0;
    margin-bottom:0;
    text-align:left;
    height: 18px;
    width:calc(100% - 18px)
  }
  #my-weather-wrapper .card-header svg {
     cursor:pointer;
  }
  #my-weather-wrapper .card-body {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding:0 .75rem .75rem .75rem;
  }
  #my-weather-wrapper h4 {
    font-size: 1.5rem;
    margin-top: 0;
    margin-bottom: 0;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.2;
    color: inherit;  
  }
  
  #my-weather-wrapper .card-body img {
    height:5rem;
  }
  #my-weather-wrapper .view .card-body > div:nth-child(1) {
    display:flex;
    align-items: center;
  }
  #my-weather-wrapper .view .card-body > div:nth-child(n+2) {
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  #my-weather-wrapper h4 {
    margin-bottom:0;
  }
  #my-weather-wrapper .card-text > div {
    font-size:.8em;
  }
  #my-weather-wrapper .card-text > div:nth-child(1) {
     margin-bottom:.5rem;
  }
  #my-weather-wrapper .card-text > div:nth-child(n+2) {
    display:flex;
    justify-content: space-between;
  }
  #my-weather-wrapper .weather-params {
    display:flex;
    align-items: center;
    font-size:.95em;
    width:53%;
    white-space:nowrap;
  }
  #my-weather-wrapper .weather-params.right {
    width:47%;
  }
  #my-weather-wrapper .weather-params svg {
    width: 1em;
  }
  
  #my-weather-wrapper .setting .card-body {
    padding:.75rem;
  }
  #my-weather-wrapper .city-container {
    position:relative;
    transition:max-height .25s linear .25s;
    
    -ms-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
  }
  #my-weather-wrapper .city {
    background:rgb(240 240 240 / 1);
    border-radius:.2rem;
    /* box-sizing: border-box; */
    display:flex;
    justify-content: space-between;
    align-items: center;
    font-size:.85rem;
    padding:.2rem .4rem .3rem .4rem;
    position:absolute;
    width:100%;
    transition:opacity .25s linear 0s;
  }
  
  *, *::before, *::after {
    box-sizing: border-box;
  }
  #my-weather-wrapper .city-name {
    width: calc(100% - 40px);
  }
  #my-weather-wrapper .bi-list {
    cursor:pointer;
  }
  #my-weather-wrapper .bi-trash3 {
    cursor:pointer;
  }
  #my-weather-wrapper .input-container {
    margin-top:2rem;
    text-align:left;
  }
  #my-weather-wrapper .input-container svg {
    cursor:pointer;
  }

  #my-weather-wrapper .mb-3 {
    margin-bottom: 1rem !important;
  }
  #my-weather-wrapper .input-group {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
  }  
  #my-weather-wrapper .form-control {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    width: 1%;
    margin-bottom: 0;

    display: block;
    width: 100%;
    padding: 0.2rem 0.5rem;
    font-family: inherit;
    font-size: .875rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  #my-weather-wrapper .form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    z-index: 3;
  }
  #my-weather-wrapper .input-group-append {
    padding: 0.35rem 0.5rem 0 0.5rem;
    line-height: 1.5;
    background-color: #e9ecef;
    border:1px solid #ced4da;
    border-radius: 0.25rem;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-left: -1px;
  }
</style>
`
}

window.customElements.define('com-weather',
  class extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = '';
    }
    connectedCallback() {
      this.initShadowDOM();
    }
    
    initShadowDOM() {
      let shadowRoot = this.attachShadow({ mode: "open" });
      const Weather = React.createElement(weather)
      ReactDOM.createRoot(shadowRoot).render(Weather);
    }
  }
);
