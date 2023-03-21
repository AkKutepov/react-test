export const Lib = new function() {
  var SELF
  
  function trsort(_sort,_compare){if(_sort==null)_sort=0;_sort=_sort>0?1:(_sort<0?-1:0);if(_compare==null)_compare=0;_compare=_compare>0?1:(_compare<0?-1:0);var _ar_key=[],_ar_val=[],_index=-1;var f_cmp=(_compare==-1?function(int1,int2){return(int1>int2?1:(int1<int2?-1:0))}:function(str1,str2){if(_compare==1){str2=str2.toLowerCase()}return(str1>str2?1:(str1<str2?-1:0))});return{find:function(key_search){if(key_search==null)key_search=(_compare==-1?0:'');var res=false,i=0,i_first=0,i_harf=0,i_last=_ar_key.length-1,res_cmp,key_search_copy;if(_compare==-1)key_search_copy=key_search;else{if(_compare==1){key_search_copy=(key_search+'').toLowerCase()}else key_search_copy=key_search+''}if(_ar_key.length){if(_sort){while(true){i_harf=Math.floor(i_first+(i_last-i_first)/2);res_cmp=f_cmp(key_search_copy,_ar_key[i_harf]);if(res_cmp==0){_index=i_harf;res=true;i_first=++i_harf;if(i_first>i_last)break}else if(res_cmp==_sort){i_first=++i_harf;if(i_first>i_last)break}else{i_last=i_harf;if(i_first==i_last)break}}}else{for(i=0;i<_ar_key.length;i++){if(f_cmp(key_search_copy,_ar_key[i])==0){_index=i;res=true;break}}}}if(!res)_index=(_sort?i_first:i);return res},add:function(new_key,new_val,before){if(new_key==null)new_key=(_compare==-1?0:'');if(new_val==null)new_val=null;if(before!==undefined){if(before>=0&&before<=_ar_key.length){if(_compare==-1)_ar_key.splice(before,0,new_key);else _ar_key.splice(before,0,new_key+'');_ar_val.splice(before,0,new_val);_index=before}else{throw new Error('Error add before')}return}if(_sort){if(this.find(new_key))_index++;if(_compare==-1)_ar_key.splice(_index,0,new_key);else _ar_key.splice(_index,0,new_key+'');_ar_val.splice(_index,0,new_val)}else{_index=_ar_key.length;if(_compare==-1)_ar_key[_index]=new_key;else _ar_key[_index]=new_key+'';_ar_val[_index]=new_val}},rem:(index)=>{var res_key=null,res_val=null;if(index!=null);else index=_index;if(index>=0&&index<_ar_key.length){res_key=_ar_key.splice(index,1)[0];res_val=_ar_val.splice(index,1)[0];_index=-1}else{throw new Error('Error rem index')}return{key:res_key,val:res_val}},clear:()=>{_ar_key=[],_ar_val=[],_index=-1},get k(){return _ar_key},get v(){return _ar_val},get i(){return _index},get k1(){return _ar_key[_index]},get v1(){return _ar_val[_index]},get param(){return{sort:_sort,compare:_compare}}}};
  
  function trreactelem(ar) {
    var res = ''
      
    if(Array.isArray(ar)) {
      if(ar.length <= 2 || ar[2] === null || typeof ar[2] === 'string' || typeof ar[2] === 'number' || typeof ar[2] === 'bigint') {
        res = React.createElement.apply(this, ar)
      }
      else {
        res = React.createElement.apply(this, ar.map((item, i) => { 
          if(i > 1) return SELF.elem(item)  
          return item
        }))
      }
    }
    return res
  }
  
  function trstyle(com, elem) {
    var renderer = document.createElement('template')
    renderer.innerHTML = com.css
    elem.appendChild(renderer.content)
  }
  
  class trevent{
      constructor(){
        this.events = {}
      }

      on(eventName, fn) {
        this.events[eventName] = this.events[eventName] || [];
        if(!~this.events[eventName].findIndex((item) => item === fn)) {
          this.events[eventName].push(fn)
        }
      }

      off(eventName, fn) {
        var i
        if(this.events[eventName]) {
          if(~(i = this.events[eventName].findIndex((item) => item === fn))) {
            this.events[eventName].splice(i, 1)
          }
        }
      }

      trigger(eventName, data) {
        if(this.events[eventName]) {
          this.events[eventName].forEach(function(fn) {
            fn(data)
          })
        }
      }
  }
  
  return SELF = {
    elem: trreactelem,
    bus: new trevent(),
    sort: trsort,
    style: trstyle,
  }

}
