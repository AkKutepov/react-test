import { Lib } from "./lib.js"

var SELF, M, OBJ = {}
export default class extends React.Component {
  constructor(props) {
    super(props)
    SELF = this
    M = SELF.methods
    M.data = { 
      path: props.location.pathname,
    }
    
    SELF.state = {
      cities: [],
    }

    Lib.bus.on('NavBar:sendname', name => { SELF.name = name })
    Lib.bus.trigger('Com:constructor', M.data.path)
  }

  // lifecycles hooks
  componentDidMount() {
    Lib.bus.trigger('Com:mounted', M.data.path)
    Lib.style(SELF, OBJ.div)

    if(window.attachEvent) {
      SELF.observe = function(element, event, handler) {
        element.attachEvent('on'+event, handler)
      }
    }
    else {
      SELF.observe = function(element, event, handler) {
        element.addEventListener(event, handler, false)
      }
    }
    M.init()
  }
    
  methods = {
    
    init() {
      var text = OBJ.input
      function resize () {
        OBJ.input.style.height = 'auto';
        OBJ.input.style.height = OBJ.input.scrollHeight + 'px';
      }
      /* 0-timeout to get the already changed text */
      function delayedResize () {
        window.setTimeout(resize, 0);
      }
      SELF.observe(text, 'change',  resize);
      SELF.observe(text, 'cut',     delayedResize);
      SELF.observe(text, 'paste',   delayedResize);
      SELF.observe(text, 'drop',    delayedResize);
      SELF.observe(text, 'keydown', delayedResize);
      // text.focus();
      // text.select();
      resize();
    },
    
    //
    // Игра в города
    //

    // Есть список городов. Надо определить все возможные (1й возможный вариант) 
    // построения цепочки для игры в города

    // ar_cities - cities array
    // all_variants - 0 (get first variant), 1 (get all varaints)
    // return variants and count of variants
    async cityGame() {
      var i, start_city, // start city
          ar_res = [], // result array
          res_count = 0, // count of variants
          all_variants = 1,
          ar_cities = OBJ.input.value.trim().replace(/[, ]$/, '').split(","),
          count = ar_cities.length // cities count

      await SELF.setState({ cities: [] })
      
      // find result
      for(i = ar_cities.length; i--;) {
        ar_cities[i] = ar_cities[i].replace(/^\s+|\s+$/g, '')
      }
      for(i = 0; i < ar_cities.length; i++) {
        start_city = ar_cities[i]

        // prepare res
        ar_res = [start_city]
        // remove from src
        ar_cities.splice(i, 1)
        
        await check() // check chain from start_city
        
        if(ar_res.length == count) {
           // ok
          if(!all_variants) break
        }
        
        // return to src
        ar_cities.splice(i, 0, start_city)
      }
      
      return res_count
      
      // check chain from start_city	
      async function check() {
        var res = -1,
            start = ar_res.at(-1), // last city in chain
            s = start.at(-1) // last symbol in last city
        // correct symbol
        if(s == 'ь' || s == 'ъ') {
          s = start.at(-2)
        }
        s = s.toUpperCase()
        
        // for all cities from the remaining
        for(let i = 0; i < ar_cities.length; i++) {
          
          // check criteria
          if(ar_cities[i][0] == s) { // 1st symbol of the current city == last symbol of last city in chain
            
            start = ar_cities[i]
            // add to res
            ar_res.push(start)
            // remove from src
            ar_cities.splice(i, 1)
            
            if(ar_res.length < count) {
            // chain length < count of cities
              
              // next check
              res = await check()
            }
            else {
              await SELF.setState((prevState, prevProps) => {
                let ar = prevState.cities
                ar.push({ key: res_count, res: ar_res.slice() })

                res_count++
                res = 1
                return { cities: ar }
              })
              
            }
            
            if(res == 1) {
              if(!all_variants) break // 1st found - return
            }
            
            // remove from res
            ar_res.pop() 
            // add to src
            ar_cities.splice(i, 0, start)
            
          }
        }
        
        return res
      }
    },
    
  }
  
  render() {
console.log(this.name + ' render')

    return Lib.elem(
      ['div', { id: "my-cities-wrapper", ref:elem => { OBJ.div = elem } }, 
        ['h1', null, SELF.name],
        ['p', null, 'This is ' + SELF.name.toLowerCase() + ' page'],
        
        ['br', null],
        ['p', null, 'Игра в города'],
        ['textarea', { ref:elem => { OBJ.input = elem }, defaultValue:
`Геленджик,
Домодедово,
Каунас,
Актюбинск,
Казань,
Йошкар-ола,
Липецк,
Нижний Новгород,
Орёл,
Санкт-Петербург,
Кустанай,`
        }, null],
        ['div', { style:{ display:'flex', justifyContent:'flex-end'} },
          ['button', { className:'input-button', onClick:M.cityGame }, 'Start'],
        ]
      ].concat(SELF.state.cities.map((c, index) => 
        ['p', { style:{ textAlign:'justify', width:'100%'} },
          '#' + (index + 1) + ' ' + c.res.join(', ')
        ]
      ))
    )}

  css = `
<style scoped>
  #my-cities-wrapper {
    padding:0 2rem;
  }
  #my-cities-wrapper textarea {
    background: rgb(250 250 250 / 1);
    border: 0 none white;
    margin-bottom:1rem;
    outline: none;
    overflow: hidden;
    padding: 2rem;
    width:100%;
  }
  #my-cities-wrapper .input-button {
    display:block;
    padding: 0.3rem 0.5rem;
    background-color: #e9ecef;
    border:1px solid #ced4da;
    border-radius: 0.25rem;
    cursor:pointer;
    outline:none;
    margin-bottom:2rem;
    width:20rem;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  }
  #my-cities-wrapper .input-button:active {
    box-shadow:none;
  }
</style>
`
}