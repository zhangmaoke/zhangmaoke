# React组件的三大属性

## React state

React的一大创新，就是将组件看成是一个状态机，一开始有一个初始状态，然后用户互动，导致状态变化，从而触发重新渲染UI

React里，只需更新组件的state，然后根据新的state重新渲染用户界面（不要操作DOM）

state是在组件实例对象中的，组件实例对象是由类生成的。所以只有在类式组件中才具有state。

**如何初始化 state？**

state是组件实例对象继承子react.Component的，所以要在当前组件的构造器函数进行初始化，默认值为null

```javascript
class Nav extends React.Component{
    constructor(){
        super()
        //初始化状态state
        this.state={"x":"nihao","date":"20210408"}
    }
    render(){
        //读取
        return <div>{this.state.x}{this.state.date}</div>
    }
}
```

**如何修改状态？**

调用setSate(data,callback)，这个方法会合并data到this.state，并重新渲染组件。它是一个异步操作

```javascript
class Nav extends React.Component{
    constructor(){
        super()
        //初始化状态state
        this.state={"x":"nihao","date":"20210408"}
    }
    render(){
        //读取
        //修改状态state
        return <div>{this.state.x}{this.state.date}<button onClick={this.changeSate}>修改</button></div>
    }
    //这里写成箭头函数来改变this指向
    changeSate=()=>{
        this.setState({"x":"lily"})
    }
}
```

setSate(data,callback)的异步体现，如果需要读取修改后的数据加回调函数

```java
class Nav extends React.Component{
    constructor(){
        super()
        //初始化状态state
        this.state={"x":"nihao","date":"20210408"}
    }
    render(){
        //读取
        // return <div>{this.state.x}{this.state.date}</div>
        //修改状态state
        return <div>{this.state.x}{this.state.date}<button onClick={this.changeSate}>修改</button></div>
    }
    //这里写成箭头函数来改变this指向
    // changeSate=()=>{
    //     this.setState({"x":"lily"})
    //     console.log(this.state)//{x: "nihao", date: "20210408"}   因为setState方法是异步的，如果需要读取修改后的数据加回调函数
    // }
    changeSate=()=>{
        this.setState({"x":"lily"},function(){
            console.log(this.state)//{x: "lily", date: "20210408"}   加了回调函数之后可以显示出修改之后的数据
        })
        
    }
}
```

**state的工作原理**

![](E:\笔记\react\state工作原理.png)

**初始化state的简写方式**

```javascript
calss yly extends React.Component{
    state={"name":"lily"}//因为有时constructor可省,所以可以直接写在类里
    render(){
        return <div></div>
    }
}
```



## React props

props相对于组件来说是外来属性，使用props可以从组件外部向组件内部传值，类似与函数的传参，它经常用于组件之间的传值，一种父级向子级传递数据的方式（父亲向儿子传）

**组件的状态state只在当前组件内部有效，别的组件不能调用，如果调用可以用props**

**父组件的状态传给子状态，传到子组件的props里**

**父亲向儿子传值原理：直接使用props传参即可**

```javascript
//父组件
class App3 extends React.Component{
  constructor(){
    super()
    this.state={"appdata":"testdata"}
  }
  render(){
    //ad是随便起的属性名，因为要在另一边接收
    return(<div>
      <h1>{this.state.appdata}</h1>
      
      <Nav ad={this.state.appdata} ts="hi"></Nav>
    </div>)
  }
}
//子组件
class Nav extends React.Component{
    constructor(){
        super()
    }
    render(){
        //调用对象名.属性名,因为props式对象
        return <div>
            <i>{this.props.ad} {this.props.ts}</i>
        </div>
    }
}
//函数式组件传值,传的方法和类式组件一样,接收是定义一个参数props来接收数据
function Nav(props){
    return <div>
        <i>{props.ad}</i>
    </div>
}
```

**父向更深的子**

```javascript
//Nav的父亲是APP3，Newlist的父亲是Nav,把app3的值传到Newlist
//类式组件传值 父亲向更深的儿子 父组件
class App3 extends React.Component{
  constructor(){
    super()
    this.state={"appdata":"testdata"}
  }
  render(){
    //ad是随便起的属性名，因为要在另一边接收
    return(<div>
      <h1>{this.state.appdata}</h1>
      <Nav ad={this.state.appdata} ts="hi"></Nav>
    </div>)
  }
}
//子组件
//接受父亲传过来的值
class Nav extends React.Component{
    constructor(){
        super()
    }
    render(){
        //调用对象名.属性名,因为props式对象
        //再把从父亲里传递过来的值，在传给Nav的儿子Newlist
        return <div>
            <i>{this.props.ad} {this.props.ts}</i>
            
            <Newlist t={this.props.ts}></Newlist>
            
        </div>
    }
}
```

**儿子向父亲传值**

原理：父组件利用回调函数来进行传值的。父组件中定义一个函数用于接收子组件传过来的数据，然后使用props将该函数传递到子组件中，最后在子组件中调用该函数，同时传参

```javascript
//子向父，接受父亲传过来的值,子组件
class Nav extends React.Component{
    constructor(){
        super()
        this.state={"name":"lily"}
    }
    render(){
        return <div>
            <h2>子组件</h2>
            <button onClick={this.setData}>传值</button>
        </div>
    }
    setData=()=>{
        this.props.fn(this.state.name)//把子组件的状态传递给这个回调函数，然后这个状态作为参数传递回父组件
    }

}
//子向父 父组件
class App3 extends React.Component{
  constructor(){
    super()
    this.state={"name":""}
  }
  render(){
    //把这个函数用props传递到子组件中
    return(<div>
      <Nav fn={this.getData}></Nav>
    </div>)
  }
  //写一个箭头函数来改变this指向
  getData=(data)=>{//data接收从子元素的数据
    this.setState({"name":data})
    console.log(data)
  }
}
```

**有相同父组件的兄弟之间传值**

原理：一个子组件把值传给父组件，父组件利用props传给另一个组件。这两个组件是兄弟

```javascript
//Nav和Newlist相同的父组件是App3,然后把Nav的值传给父组件App3,然后父组件载把值传给它的另一个儿子Newlist.
//有相同父组件的兄弟之间的传值
class App3 extends React.Component{
  constructor(){
    super()
    this.state={"name":""}
  }
  render(){
    //把getNav函数用props传递到子组件Nav中
    //然后再把从Nav接收来的数据，传给Newlist就是Nav的兄弟
    return(<div>
      <Nav fn={this.getNav}></Nav>
      <Newlist gn={this.state.name}></Newlist>
    </div>)
  }
  //写一个箭头函数来改变this指向
  getNav=(data)=>{//data接收从Nav的数据
    this.setState({"name":data})
    console.log(data)
  }
}

//有相同父组件的兄弟之间的传值
class Nav extends React.Component{
    constructor(){
        super()
        this.state={"myname":["lily","tom"]}
    }
    render(){
        return <div>
            <h2>子组件</h2>
            <button onClick={this.setNav}>传值</button>
        </div>
    }
    setNav=()=>{
        this.props.fn(this.state.myname)//把子组件的状态传递给这个回调函数，然后这个状态作为参数传递回父组件
    }

}

//有相同父组件的兄弟之间的传值
class Newlist extends React.Component{
    constructor(){
      super()
    }
    render(){
      //接收父组件APP3的值
      return <div>另一个儿子{this.props.gn}</div>
    }
}
```

## refs属性

refs是组件实例对象中的一个属性，值是一个对象，只需要给vdom添加ref属性即可生成ref的指向，指向该dom，类似于原生js中通过id获取节点。

**作用：对render()返回的组件添加一个标记，可以方便的定位的这个组件的实例。**

**何时使用refs？**

处理foucs、文本选择或者媒体播放；触发强制动画；集成第三方DOM库

**不要过度使用refs**

**字符串形式的ref：**

可以将属性加在任何通过render()的返回组件中

```javascript
//字符串形式的ref
class App4 extends React.Component{
  constructor(){
    super()
  }
  render(){
    return <div>
      <p>用户名：<input type="text" ref="username"/></p>
      <p>密码：<input type="password" ref="userpwd"/></p>
      <p><button onClick={this.login}>登录</button></p>
    </div>
  }
  login=()=>{
    let user=this.refs.username.value;
    let pwd=this.refs.userpwd.value;
    console.log(user,pwd)
  }
}
```

**回调函数形式的ref**

ref属性的值除了是一个字符串，还可以是一个函数，这个函数是一个回调函数，在组件初始化或更新时由react调用，这个回调函数会得到一个参数，即当前的节点对象，我们可以将得到的节点对象挂在到组件的实例对象上。

```javascript
//回调函数形式的ref
class App4 extends React.Component{
  constructor(){
    super()
  }
  showData=()=>{
    let data=this.setText;
    alert(data.value)
  }
  //登陆时触发,element是当前节点
  render(){
    return <div>
      <p>用户名：<input type="text" ref={(element)=>(this.setText=element)} /></p>
      <p><button onClick={this.showData}>登录</button></p>
    </div>
  }
```

**关于回调ref中回调执行次数的问题：**

如果ref回调函数是以内联函数的方式定义的，在更新过程中它会被执行两次，第一次传入参数null，然后第二次会出入参数DOM元素。这是因为在每次渲染时会创建一个新的函数实例，所以React清空旧的ref并且设置新的。

为了保证更新之后得到的是更新之后的dom所以会先将该回调函数的参数赋值成null以此保证每次都将之前的清除掉了。

通过将ref的回调函数定义成class的绑定函数的方式可以避免上述问题，但是大多数情况下它是无关紧要的。

**create形式的Ref**

```javascript
//createref
class App4 extends React.Component{
  constructor(){
    super()
    this.username=React.createRef()
    this.userpwd=React.createRef()
  }
  render(){
    return <div>
      <p>用户名：<input type="text" ref={this.username}/></p>
      <p>密码：<input type="password" ref={this.userpwd}/></p>
      <p><button onClick={this.login}>登录</button></p>
    </div>
  }
  login=()=>{
    let user=this.username.current.value;
    let pwd=this.userpwd.current.value;
    console.log(user,pwd)
  }
}
```

React16.3中修改了refs的使用方法，并且提供了Forwarding Refs用于在父组件中操作子组件中的dom节点。ref就是在父组件中直接操作子组件的节点，ref的方式，使其脱离了props传值，然后更新子组件的标准方法。

此外，同样的Ref所指向的节点可以是dom节点，也可以是类组件。

但是Ref属性指向的节点不能是函数组件（无状态组件）。因为我们通过ref获得的组件，包含了生命周期和state，因此ref所指向的组件不可以是函数组件

# 表单

**受控组件：**

在HTML中，表单元素之类的表单元素通常是自己维护state，并根据用户输入进行更新。而在React中，可变状态通常保存在组件的state属性中，并且只能通过使用setState()来更新。

**渲染表单的react组件还控制着用户输入过程中表单发生的操作。被react以这种方式控制取值的表单输入元素就叫做"受控组件"。**

```javascript
class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
      //改变一下this的指向
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {//event事件对象,
      this.setState({value: event.target.value});//event.target.value  input里输入的内容
    }
  
    handleSubmit(event) {
      alert('提交的名字: ' + this.state.value);
      event.preventDefault();//阻止表单提交
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            名字:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="提交" />
        </form>
      );
    }
  }
//由于在表单元素上设置了 value 属性，因此显示的值将始终为 this.state.value，
//这使得 React 的 state 成为唯一数据源。由于 handlechange 在每次按键时都会执行并更新 React 的 state，
//因此显示的值将随着用户输入而更新。
```

**非受控组件：**

受控组件的替代品

有时使用受控组件会很麻烦，因为需要为数据变化的每种方式都编写事件处理函数，并通过一个react组件传递所有输入state。非受控组件快速编写，减少代码量

![](E:\笔记\react\非受控组件.png)

```javascript
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

**默认值**

在react渲染生命周期时，表单元素上的value将会覆盖DOM节点中的值，在非受控组件中，你经常希望react能赋予组件一个初始值，但是不去控制后续的更新。在这种情况下，你可以指定一个defaultValue属性，而不是value。

```javascript
<input type="text/checkbox/radio" defaultValue="BOb" ref={this.input}
```

# 高阶函数和函数柯里化

如果一个函数符合下面任何一个，那该函数就是高阶函数：

1、若函数接收的参数是一个函数，那么该函数就可以称之为高阶函数

2、若函数调用的返回值依然是一个函数，那么该函数就可以称之为高阶函数

```javascript
class Demo extends React.Component{
   state={
       "username":"",
       "password":""
   }
   saveFormData=(datatype)=>{  //高阶函数
       return (event)=>{      //onChange触发的是返回的函数
           this.setState({[datatype]:event.target.value})
       }
   }
   handleSubmit=(event)=>{
      event.preventDefault();
      const {username,password}=this.state;
      alert("用户名："+username+",密码:"+passworld)
   }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                用户名:<input name="username"  type="text" onChange={this.saveFormData('username')}/>
                密码:<input name="password"  type="text" onChange={this.saveFormData('password')}/>
                <button>登录</button>
            </form>
        )
    }
}
```

**函数的柯里化**

通过函数调用继续返回函数的方式，实现多次接受参数最后统一处理的函数，高阶函数就是函数柯里化的一种实现

# 事件绑定

1、通过onXXX属性指定时间处理函数，即小驼峰命名法

​		react使用的是自定义事件，而不是使用的原生dom事件

​		react中的事件是通过事件委托方式处理的

2、在事件处理函数中可以通过event.target得到事件发生时的dom元素

**React.createClass与React.Component区别**

函数this自绑定

react.createClass创建的组件，其每一个成员函数的this都有react自动绑定，任何时候使用，直接使用this.method即可，函数中的this会被正确设置。

```javascript
const Contacts=React.createClass({
    handleClick(){
        this.setState({name:"lily"})
    }
    render:function(){
    	return <div onClick={this.handleClick}>hello</div>
}
})
```

React.Compinent创建的组件，其成员不会自动绑定this，需要开发者手动绑定，否则this不能获取当前组件实例对象。

**外联样式设置**

1、使用className设置样式

```javascript
.sty1{//和普通CSS一样定义class选择器
    width:100px;
    height:100px;
}
<div className="sty1"></div>
```

2、使用react的行内样式设置样式

​		该方法定义的是一个样式对象，随意css定义的方法按照key:value的形式设置，之间使用","分隔

```javascript
let sy={
    width:100px;
    height:100px;
}
<div style={sy}></div>
//style={},这里的{}里面放的是对象
```

react推崇的是内联的方式定义样式。这样做的目的就在于让你的组件更加容易复用。和组件相关的内容聚合到一起，包括你的组件看起来是什么样的，是如何工作的。

### 条件渲染

在React中，你可以创建不同的组件来封装各种你需要的行为。然后，依据应用的不同状态，你可以只渲染对应状态下的部分内容。

React 中的条件渲染和JavaScript 中的一样，使用 JavaScript运算符if或者条件运算符去创建元素来表现当前的状态,然后让React根据它们来更新UI。

·例如:登录组件,登录前和登陆后渲染不同的组件;

##### if...else条件

![image-20210410141727682](C:\Users\zmk\AppData\Roaming\Typora\typora-user-images\image-20210410141727682.png)

![image-20210410141739164](C:\Users\zmk\AppData\Roaming\Typora\typora-user-images\image-20210410141739164.png)

##### 与运算符 &&

·通过花括号包裹代码，你可以在JSX中嵌入任何表达式。这也包括JavaScript中的逻辑与(&&)运算符。它可以很方便地进行元素的条件渲染。

之所以这样做是因为在javascript中，true && expression 总是会返回expression，而且false&&expression 总是会返回false



因此,如果条件是 true,&&右侧的元素就会被渲染,如果是false,React 会忽略并跳过它。

![image-20210410144738789](C:\Users\zmk\AppData\Roaming\Typora\typora-user-images\image-20210410144738789.png)

三目运算符  condition？true：false

![image-20210410145706922](C:\Users\zmk\AppData\Roaming\Typora\typora-user-images\image-20210410145706922.png)

### Map

map()是数组的一个方法，它创建一个新数组,其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。map()里面的处理函数接受两个参数,分别指代当前元素、当前元素的索引。

一个元素的key最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用来自数据的id作为元素的key， 当元素没有确定的id时，你可以使他的序列索引index作为key

 若元素没有重排，该方法效果不错，但重排会使得其变慢

![image-20210410152426125](C:\Users\zmk\AppData\Roaming\Typora\typora-user-images\image-20210410152426125.png)

## key的必要性

##### keys是react用于追踪哪些列表中元素被修改、被添加或被移除的辅助表识

在开发过程中，我们需要保证某个元素的key在其同级中具有唯一性。

在react diff 算法中react会借助元素的key值来判断该元素的是新近创建的还是被移动而来的元素，从而减少不必要的元素渲染

react还需要借助key值来判断元素与本地状态的关联

------



## 组件的生命周期

在组件的整个生命周期中，随着该组件的props或者state发生改变，它的DOM表现也将有相应的改变，一个组件就是一个状态，对于特定的输入，他总是会返回一致的输出

React为每一个组件提供了生命周期钩子函数去响应不同的时刻-----实例化期、存在期和销毁期



组件的生命周期，包含的主要几种方法？

​		组件被实例的时候

​		组件属性改变的时候

​		组件状态被改变的时候

​		组件被销毁的时候

#### 生命周期的方法

##### 实例化期：

​					第一次加载时

​					组件被实例化的时候

#### 实例化期

​	class 函数名  extends  React.Component{

​	static.defaultProps={}        //设置默认属性值

​		constructor（）{

​			super（）

​	this.state={“text” ：“  ”}     //初始化状态  

}

componentWillMount（）{

​	this.setState.text（{”text“：”你好“}）

}

render（）{

​	return（）{

​		<div>{this.state.text}</div>

}

}

}

##### componentWillMount 

条件：第一次渲染阶段在调用render方法前会被调用

作用：该方法在整个组件生命周期只会被调用一次，所以可以利用该方法做一些组件内部的初始化工作这个是在render方法调用前可修改state的最后一次机会。(不到导致组件重新渲染)

JSX通过这里,解析成对应的虚拟DOM,渲染成最终效果。

##### componentDidlMount 

条件：第一次渲染成功后，组件对应的DOM已将添加到页面后调用

作用：这个阶段表示组件对应的DOM已经存在，我们可以在这个时候做一些依赖DOM的操作或者其他的一些如请求数据，和第三方库整合的操作。如果嵌套了子组件，子组件会比父组件优先渲染,所以这个时候可以获取子组件对应的 DOM。(refs)

------

存在期：组件更新的过程 

销毁期：关闭或打开一个新的组件



#### 关于React中数据获取为什么一定要在componentDidMount里面调用?

------

 constructor()中获取数据的话，如果时间太长，或者出错，组件就渲染不出来,整个页面都没法渲染了。

constructor是作组件state初绐化工作,并不是设计来有加载数据的。

如果使用SSR(服务端渲染),componentWiIlMount会执行2次，一次在服务端，一次在客户端。而componentDidMount不会。

React16之后采用了Fiber架构，只有componentDidMount生命周期函数是确定被执行一次的，类似ComponentWillMount的生命周期钩子都有可能执行多次，所以不加以在这些生命周期中做有副作用的操作,比如请求数据之类。

componentDidMount方法中的代码，是在组件已经完全挂载到网页上才会调用被执行，所以可以保证

数据的加载。此外,在这方法中调用setState方法，会触发重渲染。所以,官方设计这个方法就是用来加载外部数据用的,或处理其他的副作用代码。

![image-20210411220257078](C:\Users\zmk\AppData\Roaming\Typora\typora-user-images\image-20210411220257078.png)