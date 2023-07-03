import { Lib } from './lib.js'

var SELF, M, OBJ = {}
export default class extends React.Component {
  constructor(props) {
    super(props)
    SELF = this
    M = SELF.methods
    M.data = { 
      path: props.location.pathname,
    }

    this.state = {
      dS: { isEnabled: 0, },
      dT: [],
    }

    Lib.bus.on('NavBar:sendname', name => { SELF.name = name })
    Lib.bus.trigger('Com:constructor', M.data.path)
  }
  
  componentDidMount() {
console.log(this.name + ' mount')

    Lib.style(SELF, M.data.div, 1)
    Lib.bus.trigger('Com:mounted', M.data.path)
    
    OBJ.input.value = '00:00'
    OBJ.input.select()
    OBJ.processId = 0 
  }

  methods = {

    settingOnInput() {
      var s0 = event.target.value, s1 = '', match
      if((match = /60(:00)?|[0-5]?[0-9](:[0-5]0)?/.exec(s0)) != null) {
        s1 = match[0]
      }
      // allow/not adding timer
      SELF.setState((prevState, prevProps) => { 
        return { dS: { 
          isEnabled: (!!s0 && s0 == s1 && !!s1.replace(/[:0]+/, '')), 
        }}
      })
    },
    
    addTimer(event) {
      if(!SELF.state.dS.isEnabled) return // not allow adding timer
      
      if(event.key === 'Enter' || event.type == 'click') {
        event.preventDefault()
      
        // set new timer
        var ar = OBJ.input.value.split(':'), // [min, sec]
            now = new Date(), // current date, time
            ar_T = { // new timer array set
              stop: now.getTime() + ar[0] * 60000 + (ar[1] ? ar[1] * 1000 : 0), // stop time (msec)
              m: ar[0], // min
              s: ar[1] ? ar[1] : '00', // sec
              ms: '000', // msec
              stopTime: '', // stop time viewing (' - 00:00:00')
            }
        
        
        SELF.state.dT.push(ar_T) // add new timer
        OBJ.input.select() // focus, select to inputbox
        if(OBJ.processId == 0) M.startTimers() // start all timers if idle
      }
    },
    
    // pad "0" from left (default len == 2)
    pad(val, len) {
      len = len || 2
      return new Array(len - ('' + val).length + 1).join('0') + val
    },
    
    // start all timers
    startTimers() {
      var diff, // remaining time of the current timer
          now, // current time
          activeCount, // count of active timers
          pad = this.pad, // formating
          ar // temp state array
          
      OBJ.processId = setInterval(() => {
        
        now = new Date()
        ar = SELF.state.dT
        activeCount = ar.length

        SELF.state.dT.map(timer => {
          diff = new Date(timer.stop - now.getTime())
          
          if(diff > 0) {
          // active
            Object.assign(timer, { m: pad(diff.getMinutes()), s: pad(diff.getSeconds()), ms: pad(diff.getMilliseconds(), 3) })
          }
          else {
          // deactive
            if(!timer.stopTime) {
            // stop moment
              Object.assign(timer, { ms: '000', stopTime: ' - ' + pad(now.getHours()) + ':' + 
                pad(now.getMinutes()) + ':' + pad(now.getSeconds()) })
            }
            
            if(--activeCount == 0) { clearInterval(OBJ.processId); OBJ.processId = 0 } // idle mode
          }
        })
        SELF.setState({ dT: ar })
        
      }, 10)
      
    },
    
    setStyle(com, elem) {
      var renderer = document.createElement('template')
      renderer.innerHTML = com.css
      elem.appendChild(renderer.content)
    },

  }
  
  render() {
// console.log(this.name + ' render')

    return Lib.reactelem(
      ['div', { id:"my-timer-wrapper", ref:elem => { M.data.div = elem } }, 
        ['div', null, 
          ['h1', null, SELF.name],
          ['p', null, 'This is ' + SELF.name.toLowerCase() + ' page'],
        ],

        ['div', { className:"input-container" },
          ['div', null, "Add timer (0 - 60min):"],
          ['div', { className:"input-group" },
            ['input', { ref:elem => { OBJ.input = elem }, type:"text", className:"form-control", 
                onKeyDown: M.addTimer,
                onInput: M.settingOnInput,
              }
            ],
            ['div', { className:"input-group-append" + (SELF.state.dS.isEnabled ? " input-group-append-enabled" : ""),
              onClick: M.addTimer,
            },
              ['span', null,
                ['svg', { xmlns:"http://www.w3.org/2000/svg", width:"16", viewBox:"0 0 24 24" },
                  ['path', { d:"M20 4V10.5C20 14.09 17.09 17 13.5 17H7.83L10.92 20.09L9.5 21.5L4 16L9.5 10.5L10.91 11.91L7.83 15H13.5C16 15 18 13 18 10.5V4H20Z" }, ""]
                ]
              ]
            ],
          ]
        ].concat(SELF.state.dT.map((t, index) =>
          ['div', null,
            '#' + (index + 1) + ' - ' + t.m  + ':' + t.s + '.' + t.ms + t.stopTime
          ]
        ))
      ],
    )
  }

  css = `
<style scoped>
  #my-timer-wrapper .input-container {
    margin-left:1rem;
    margin-top:2rem;
    text-align:left;
    max-width:14rem;
  }
  #my-timer-wrapper .input-group {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    flex-wrap: nowrap;
    margin-top:.2rem;
    margin-bottom:1rem;
  }  
  #my-timer-wrapper .form-control {
    border: 1px solid #ced4da;
    border-radius: .25rem;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;

    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    width: 1%;
    margin-bottom: 0;

    display: block;
    padding: .2rem .5rem;
    font-size: .875rem;
    line-height: 1.5;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    width: 100%;
    z-index:3;
  }
  #my-timer-wrapper .form-control:focus {
    border-color: #80bdff;
    box-shadow: 0 0 0 .2rem rgb(0 123 255 / .25);
    outline: 0;
  }
  #my-timer-wrapper .input-group-append {
    padding: 0.3rem 0.5rem 0 .5rem;
    background-color: #e9ecef;
    border:1px solid #ced4da;
    border-radius: 0.25rem;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    cursor:pointer;
    opacity: .3;
    pointer-events: none;
    margin-left: -1px;
  }
  #my-timer-wrapper .input-group-append-enabled {
    opacity: 1;
    pointer-events: auto;
  }
</style>
`
}
