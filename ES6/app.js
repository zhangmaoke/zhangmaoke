import React from "react";
import {createStore} from "redux";

let add_action=function(value){
    return {
      type:"add",
      data:value
    }
}

function reducer(prestate,action){
      switch(action.type){
          case "add":
              return {"goods":[...prestate.goods,action.data]}
          break;
          case "del":
            return prestate;
          break;
          default:return prestate
      }
}

let object_state={"goods":["牛奶","苹果"]}
let Store=createStore(reducer,object_state)


class App extends React.Component{
  constructor(){
    super()
    this.state={"good":Store.getState().goods}
  }
  render(){
     let g=this.state.good.map(function(value,index){
          return <li key={index}>{value}</li
     })
     return <div>
              <p>
                <input type="text" ref="g"/><button onClick={this.addGoods}>添加</button>
              </p>
              <ul>{g}</ul>
            </div>
  }
  addGoods=()=>{
      Store.dispatch(add_action(this.refs.g.value))
  }
  componentDidMount(){
    Store.subscribe(()=>{
      this.setState({"good":Store.getState().goods})
  })
  }
}
export default App;