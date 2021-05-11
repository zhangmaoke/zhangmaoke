# 高阶组件和hooks

## 高阶组件

定义：高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件。

作用：高阶组件是react中对组件逻辑进行重用的高级技术。

高阶组件就是一个没有副作用的纯函数。

高阶组件就是把username通过props传递给目标组件了。目标组件只管从props里面拿来用就好了

```javascript
//高阶组件
import React, {Component} from 'react'
//在es6中只要有default可以不写函数名,如果别的文件需要引入这个函数,函数名可以随便写
export default (WrappedComponent) => {
    class NewComponent extends Component {
        constructor() {
            super();
            this.state = {
                username: ''
            }
        }
        componentWillMount() {
            let username = localStorage.getItem('username');
            this.setState({
                username: username
            })
        }
        render() {
            return <WrappedComponent username={this.state.username}/>
        }
    }
    return NewComponent//返回一个新的组件作为这个函数的返回值
}
```

```javascript
import React, {Component} from 'react';
import wrapWithUsername from 'wrapWithUsername';
//把welcome作为参数传给了函数,WrappedComponent相当于就是welcome
class Welcome extends Component {

    render() {
        return (
            <div>welcome {this.props.username}</div>
        )
    }
}

Welcomen = wrapWithUsername(Welcome);

export default Welcomen;
```

```javascript
//同welcome
import React, {Component} from 'react';
import wrapWithUsername from 'wrapWithUsername';

class Goodbye extends Component {

    render() {
        return (
            <div>goodbye {this.props.username}</div>
        )
    }
}

Goodbye = wrapWithUsername(Goodbye);

export default Goodbye;
```

## Hook

hook是react16.8的新增特性。可以在不编写class(类组件)的情况下使用state以及其他的react特性。

hooks本质：就是将类式组件中的操作进行了封装，通过hooks在函数中调用，在函数内部生成自己的状态，生命周期等，通过hook进行调用，这也是为什么hooks只能在函数中使用，不能再类式组件中使用的原因（类式组件有自己的生命周期）

hooks没有破坏性改动

hooks是完全可选的、100%向后兼容、现在可用、没有计划从react中移除class。

### Hook和函数组件

react的函数组件是这样的：

```javascript
function	Example(props){
	//可以在这使用hook
    return <div />
}
```

**hook是什么？**

hook是特殊的函数，它可以让你“钩入”react的特性

**什么时候使用hook？**

如果在编写函数组件并意识到需要向其添加一些state，以前的做法是必须将其它转化为class。现在可以在现有的函数组件使用hook。

**hooks的原理：**

涉及到状态的hook都需要定义两个参数，即状态本身和修改状态的方法，在组件节点中，他们都是以数组的结构存储，每次的修改实际上向结构中添加内容并修改指针的指向

### 使用state hook

在函数组件中声明state变量，在class中，我们通过在构造函数中设置this.state为{count:0}来初始化count state为0，在函数式组件中，我们没有this，所以我们不能分配或读取this.state。我们直接在组件中调用useState Hook;

```javascript
import React{useState} from 'react'
function Example(){
    //声明一个叫count的state变量
    const[count,setCount]=useState(0)
}
```

我们声明了一个叫count的state变量，然后把它设为0.react会在重复渲染时记住它当前的值，并且提供最新的值给我们的函数。我们可以通过调用setCount来更新当前的count。对状态的读取和修改实际上是在改变。

**调用useState方法的时候做了什么？**

它定义一个"state"变量。我们的变量叫count，但是我们可以叫他任何名字，这是一种在函数调用时保存变量的方式———useState是一种新方法，它与class里面的this.state提供的功能完全相同。state中的变量会被react保留。

**useState需要哪些参数？**

useState()方法里面唯一的参数就是初始state。不同于class的是，我们需要使用数组或字符串对其进行赋值，而不一定是对象。

**useState方法的返回值是什么？**

返回值为：当前state以及更新state的函数。与class里面this.state.count和this.setState类似。需要成对的获取它们，我们采用的是数组解构方式获取的。

**读取State**

在class中显示当前的count，我们读取this.state.count:

```javascript
<p>{this.state.count}</p>
```

在函数中，我们可以直接用count

```javascript
<p>{count}</p>
```

**更新State**

在class中，我们需要调用this.setState()来更新count值

```javascript
<button onClick={()=>this.setState({count:this.state.count+1})}>
    
</button>
```

在函数中，我们已经有了setCount和count变量，所以我们不需要this

```javascript
<button onClick={()=>setState(count+1)}>
    
</button>
```

## 使用Effect Hook

作用：Effect Hook可以让你在函数组件中执行副作用操作。

可以把use Effect Hook看作componentDidMount、componentDidUpdate和componentWillUnmount这三个函数的组合，也就是在组件加载以后要做的操作。

在react组件中两种常见副作用操作：需要清除的和不需要清除的。

**useeffect做了什么？**

通过使用这个hook，可以告诉react组件需要渲染后执行某些操作。react会保存你传递的函数（我们将它称之为effect），并且在执行DOM更新之后调用它。

**为什么在组件内部调用useEffect?**

将useEffect放在组件内部我们可以在effect中直接访问count state变量（或其他props）。我们不需要特殊的API来读取它——它已经保存在函数作用域中。

**useeffect会在每次渲染后执行吗？**

是的，默认情况下，它在第一次渲染之后和每次更新之后都会执行。

**为什么要在effect中返回一个函数？**

这是effect可选的清除机制，每个effect都可以返回一个清除函数。

**react何时清除effect？**

react会在组件卸载的时候执行清除操作。

**注意：**

并不是必须为effect中返回的函数命名。其实也可以返回一个箭头函数或者给起一个别的名字

你可能认为需要单独的effect来执行清除操作。但由于添加和删除订阅的代码的紧密性,所以 useEffect的设计是在同一个地方执行。如果你的effect返回一个函数, React将会在执行清除操作时调用它：

```javascript
useEffect((=>{
        1=setlnterval(function()0.1000);
		return function clear(){
            clearlnterval(1)
        }
})
```

 **useEffect()还有第二个参数(可选参数)**
如果没有传入第二个参数，那么组件的初始化和更新都会执行该方法
**如果传入了第二个参数(一个空数组),那么只在初始化调用一次之后不再执行,相当于componentDdMount,**
传入第二个参数只有一个值,该值有变化就执行.传入第二个参数,有多个值的数组,会比较每一个值,有一个不相等就执行

## Hook规则

Hook本质就是JavaScript 函数，但是在使用它时需要遵循两条规则。
**1.只在最顶层使用Hook**
不要在循环,条件或嵌套函数中调用 Hook,确保总是在你的React 函数的最顶层调用他们。遵守这条规则,你就能确保Hook在每一次渲染中都按照同样的顺序被调用。这让React 能够在多次的useState和 useEffect 调用之间保持hook状态的正确。
**2.只在React函数中调用Hook**
不要在普通的JavaScript函数中调用Hook。