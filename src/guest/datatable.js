import { Lib } from '../lib.js'

export default class extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      AR: {}, // data arrays
      OBJ: {}, // data other
    }
    
    this.S = this.state // alias
    this.M = this.methods // alias
    this.M.data = { 
      path: props.location.pathname,
    }
    Lib.bindAll(this.M, this)

    Lib.bus.on('NavBar:sendname', name => { this.name = name })
    Lib.bus.trigger('Com:constructor', this.M.data.path)
        
    this.S.OBJ.url = 'https://api.coincap.io/v2/assets'
    this.S.OBJ.waiting = 'data:image/gif;base64,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'
    this.S.OBJ.hash = window.location.hash
    this.S.OBJ.sortDirection = 0

    // hdata, data
    this.S.AR.hdata = { ready: 0, }
    this.S.AR.data = localStorage.getItem('trDataTableState') || ''
    
    if(this.S.AR.data) { 
      this.S.AR.data = JSON.parse(this.S.AR.data)

      if(this.S.AR.data.length) {
        this.S.AR.dataSort = this.S.AR.data.slice() // copy
        this.M.dataColumns() // prepare columns array
        this.S.AR.hdata.ready = 1
      }
    }
    else this.S.AR.data = []
    
    this.S.AR.numbers = ['rank', 'supply']
  }
    
  componentDidMount() {
    console.log(this.name + ' mounted')
    
    // css
    Lib.style(this, this.S.OBJ.div, 1)
    // highlight, view
    Lib.bus.trigger('Com:mounted', location.hash.substring(1));

    this.S.AR.hdata.waiting = 0
    this.setState({ AR:this.S.AR })
  }

  componentDidUpdate() {
    console.log(this.name + ' updated')
  }

  methods = {

    dataColumns() {
      var i = 0
      this.S.AR.columns = []
      for(let key in this.S.AR.data[0]) {
        this.S.AR.columns[i] = { column: key.at(0).toUpperCase() + key.slice(1) }
        if(++i >= 5) break
      }
      // 0 <-> 1 (rank <-> id)
      [this.S.AR.columns[0], this.S.AR.columns[1]] = [this.S.AR.columns[1], this.S.AR.columns[0]]
    },
    saveData() {
      localStorage.setItem('trDataTableState', JSON.stringify(this.S.AR.data))
    },

    async getOnClick() {
      // console.log(this)

      // this.S.AR.data = []
      this.S.AR.hdata.waiting = 1
      // this.S.OBJ.sortDirection = 0
      await this.setState({ AR:this.S.AR })
      
      Lib.fetchReq(this.S.OBJ.url, null, { method: 'GET' })
      .then(res => { viewData(res) })

      var viewData = (res) => {
        this.S.AR.data = res.data

        // get columns
        if(this.S.AR.data.length) {
          this.S.AR.dataSort = this.S.AR.data.slice()
          this.M.dataColumns()
          
          for(let i = this.S.AR.data.length; i--;) {
            this.S.AR.data[i]['supply'] = (+this.S.AR.data[i]['supply']).toFixed(2)
          }
        }

        if(this.S.AR.hdata.waiting) {
          this.S.AR.hdata.waiting = 0
          this.S.AR.hdata.ready = 1
          
          this.M.setArrow()
          this.M.saveData()
        }

        this.setState({ AR:this.S.AR })
      }  
    },
    clearOnClick() {
      this.S.AR.hdata.ready = 0
      this.setState({ AR:this.S.AR })
      localStorage.removeItem('trDataTableState')
    },

    async headOnClick() {
      // get sort column
      var target = event.target || event.srcElement
      , innerText = target.innerText
      , colName = innerText.toLowerCase()

      if(!colName) return

      // return value (if in AR.numbers, return number) for sorting
      const getValue = (x, colName) => {
        return this.S.AR.numbers.find(item => item == colName) ? +x[colName] : x[colName]
      }
      
      // sort direction
      if(this.S.OBJ.sortColName != colName) {
        this.S.OBJ.sortColName = colName
        this.S.OBJ.sortDirection = 1
      }
      else this.S.OBJ.sortDirection = [0, 1, -1][this.S.OBJ.sortDirection + 1]
      
      this.S.AR.hdata.notransition = 1

      this.S.AR.dataSort = !this.S.OBJ.sortDirection 
      ? this.S.AR.data.slice() 
      : this.S.AR.data.slice().sort((a, b) => (getValue(a, colName) > getValue(b, colName)) ? this.S.OBJ.sortDirection : ((getValue(b, colName) > getValue(a, colName)) ? -this.S.OBJ.sortDirection : 0))
      
      await this.setState({ AR:this.S.AR })

      this.M.setArrow(target)
      
      setTimeout(() => {
        this.S.AR.hdata.notransition = 0
      }, 100);
    },

    setArrow(target) {
      var innerText
      , elems = this.S.OBJ.div.querySelectorAll('.table-view thead th')
      , cell
      , use
      , arrow = ''
      
      if(target) {
        innerText = target.innerText
        cell = [...elems].find(el => el.innerText === innerText)
      }

      if(this.S.OBJ.sortDirection == 1) arrow = 'my-datatable_arrow_asc'
      else if(this.S.OBJ.sortDirection == -1) arrow = 'my-datatable_arrow_desc'
      
      // set arrows
      elems.forEach(el => {
        use = el.querySelector('use')
        if(use) use.setAttribute('href', el === cell ? '#' + arrow : '')
      })
    },

    binOnClick() {
      var i
      , target = event.target || event.srcElement
      , tr = target.closest('tr')
      , tdKey = tr.querySelector('td[my-key]')
      
      // find rank, remove row from data
      if(~(i = this.S.AR.data.findIndex(item => item.rank == tdKey.innerText))) {
        this.S.AR.data.splice(i, 1)
      }
      // find rank, collapse row from dataSort
      if(~(i = this.S.AR.dataSort.findIndex(item => item.rank == tdKey.innerText))) {
        this.S.AR.dataSort[i].collapsed = 1
      }

      this.setState({ AR:this.S.AR })
      this.M.saveData()
    },
  }
      
  render() {
// console.log(this.name + ' render')

    return Lib.reactelem(
      ['div', { id:"my-datatable", ref:elem => { this.S.OBJ.div = elem }},
        ['svg', { style:{ display:'none' }},
          ['defs', null,
            ['path', { id:"my-datatable_arrow_asc", style:{ transform: "translate(20px,20px) rotate(180deg)" }, preserveAspectRatio:"xMinYMin meet", fill:"none", stroke:"var(--my-datatable-svg-stroke)", strokeWidth:"2", strokeLinecap:"round", strokeLinejoin:"round", d:"M10 17V4m-7 6l7-7 7 7" }, ""],
            ['path', { id:"my-datatable_arrow_desc", preserveAspectRatio:"xMinYMin meet", fill:"none", stroke:"var(--my-datatable-svg-stroke)", strokeWidth:"2", strokeLinecap:"round", strokeLinejoin:"round", d:"M10 17V4m-7 6l7-7 7 7" }],
            ['path', { id:"my-datatable_bin", d:"M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" }],
          ],
        ],

        ['h1', null, this.name],
        ['p', null, 'This is ' + this.name.toLowerCase() + ' page'],

        ['div', { id:"my-datatable-buttons" },
          ['span', { className:"input-button", onClick:this.M.getOnClick }, 'Загрузить'],
          ['span', { className:"input-button", onClick:this.M.clearOnClick }, 'Очистить'],
        ],

        this.S.AR.hdata.waiting ?
        ['div', { id:"waiting" },
          ['img', { src:this.S.OBJ.waiting, style:{ height:"5rem" }}]
        ]
        : '',
        
        !this.S.AR.hdata.ready ?
        ['div', null, 'Empty...']
        : '',

        ['div', { className:"scrollable" },

          this.S.AR.hdata.ready ?
          ['table', { className:"table-view" },

            ['thead', null,
              ['tr', { onClick:this.M.headOnClick },
              ].concat(this.S.AR.columns.map(item => 
                ['th', null,
                  ['div', null, 
                    // ['', null, item.column],
                    ['div', null, item.column],
                    ['div', { className:"direction" }, ['svg', { viewBox:"0 0 18 18" }, ['use', { href:"#"}]]]
                  ]
                ])
              ).concat([['th', null, '']]), // last - empty th
            ],

            ['tbody', null,
            ].concat(this.S.AR.dataSort.map(row =>
              ['tr', { className:row.collapsed ? "collapsed" : "" + this.S.AR.hdata.notransition ? " notransition" : "" },
                ['td', { 'my-key':'' }, row.rank],
                ['td', null, row.id],
                ['td', null, row.symbol],
                ['td', null, row.name],
                ['td', { style:{ textAlign:"right", paddingRight:"2rem" }}, row.supply],
                ['td', null,
                  ['div', null, ['svg', { onClick:this.M.binOnClick, viewBox:"0 0 18 18"}, ['use', { href:"#my-datatable_bin" }]]]
                ],
              ],
            )),

          ]
          : '',

        ]
      ]
    )
  }

  css = `
<style>
:root {
  --my-datatable-base-scale: calc(100vw / 75);
  --my-datatable-font-size: max(calc(1.1rem * .7), min(calc(1.1rem * .9), calc(var(--my-datatable-base-scale) * .9)));
  --my-datatable-svg-stroke: rgb(150 150 150 / 1);
}

#my-datatable {
  font-size: var(--my-datatable-font-size)
}
#my-datatable span {
  background: #ccc;
  padding: .5rem 1rem;
}
#my-datatable-buttons {
  margin-bottom: 2rem;
}
#my-datatable .input-button {
  padding: 0.5rem 2rem;
  background-color: #e9ecef;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  cursor: pointer;
  outline: none;
  margin-bottom: 2rem;
  width: 20rem;
  box-shadow: rgb(0 0 0 / .16) 0px 1px 4px;
  user-select: none;
}
#my-datatable .input-button:last-child {
  margin-left: .3rem;
}
#my-datatable .input-button:active {
  box-shadow:none;
}
#my-datatable #waiting {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 20rem);
  width: 100%;
  max-width: 1200px;
  position: absolute;
}

#my-datatable .scrollable {
  overflow-y: scroll;
  overflow-x: auto;
  max-height: calc(90vh - 210px);
  width:100%;
}
#my-datatable .scrollable::-webkit-scrollbar {
  width: 12px;
}
#my-datatable .scrollable::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgb(0 0 0 / 0.3); 
  border-radius: 10px;
}
#my-datatable .scrollable::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgb(0 0 0 / 0.3); 
}

#my-datatable .table-view {
  border-collapse: separate; /* Don't collapse */
  border-spacing: 0;
  width:max(100%, 800px);
}
#my-datatable .table-view thead th {
  cursor: pointer;
  background: rgb(230 230 230 / 1);
  font-weight: 700;

  position: sticky;
  top: 0;
  z-index: 1;
  user-select: none;
}
#my-datatable .table-view thead th:last-child {
  cursor: default;
}

#my-datatable .table-view thead th {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-width: 1px 0 1px 1px;
  box-sizing: border-box;
  width: 19.3%;
}
#my-datatable .table-view thead th > div {
  display: flex;
  justify-content: center;
  margin-left:1.7em;
}
#my-datatable .table-view thead th .direction {
  margin-left: 1em;
  pointer-events: none;
  height: .7em;
  width: .7em;
}

#my-datatable .table-view tbody tr {
  transition: font-size .3s ease, line-height .3s ease;
}
#my-datatable .table-view tbody tr.notransition {
  transition: none;
}
#my-datatable .table-view tbody tr.collapsed {
  font-size: 0;
  line-height: 0;
}
#my-datatable .table-view tbody tr.collapsed > td {
  border-width: 0;
  padding-top: 0;
  padding-bottom: 0;
}
#my-datatable .table-view tbody td {
  border: 1px solid #dee2e6;
  border-width: 0 0 1px 1px;
  box-sizing: border-box;
}
#my-datatable .table-view tbody td div {
  cursor: pointer;
  height: 1em;
  width: 1em;
  opacity: .7;
}
#my-datatable .table-view tbody td:last-child > div {
  margin: 0 auto;
}
#my-datatable .table-view svg {
  vertical-align: inherit;
}
</style>
`
}

