
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