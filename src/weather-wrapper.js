import { Lib } from "./lib.js"
// import "./weather.js"

var SELF, M
export default class extends React.Component {
  constructor(props) {
    super(props)
    SELF = this
    M = SELF.methods
    M.data = { 
      path: props.location.pathname,
    }

    Lib.bus.on('NavBar:sendname', name => { SELF.name = name })
    Lib.bus.trigger('Com:constructor', M.data.path)
  }

  // lifecycles hooks
  componentDidMount() {
    Lib.bus.trigger('Com:mounted', M.data.path)
  }
    
  methods = {
  }
  
  render() {
console.log(this.name + ' render')

    return Lib.elem(
      ['div', null, 
        ['h1', null, SELF.name],
        ['p', null, 'This is ' + SELF.name.toLowerCase() + ' page'],
        
        ['com-weather', null, ""]
      ],
    )
  }

}