import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="title">ReactLearn</div>
        <img src={logo} className="App-logo" alt="logo" />
        <p style={{ margin: "15px 0" }}>简单的React组件/逻辑</p>
        <div className="blockBox">
          <div className="block">
            <p className="blockTitle">定时器组件</p>
            <div className="blockComponent">
              <Clock />
            </div>
          </div>
          <div className="block">
            <p className="blockTitle">事件绑定 显示/隐藏</p>
            <div className="blockComponent">
              <ShowBlock />
            </div>
          </div>
          <div className="block">
            <p className="blockTitle">条件渲染</p>
            <div className="blockComponent">
              <LoginControl />
            </div>
          </div>
          <div className="block">
            <p className="blockTitle">与运算符 &&</p>
            <div className="blockComponent">
              <Mailbox unreadMessages={messages} />
            </div>
          </div>
          <div className="block">
            <p className="blockTitle">列表渲染/直接渲染</p>
            <div className="blockComponent">
              <ul>{listItems}</ul>
            </div>
          </div>
          <div className="block">
            <p className="blockTitle">列表渲染/列表组件渲染</p>
            <div className="blockComponent">
              <ul>
                <ListItemsCom />
              </ul>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
//定时器组件
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.tick();
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  tick() {
    this.setState({
      date: new Date(),
    });
  }
  render() {
    return (
      <div>
        <p>现在是 {this.state.date.toLocaleTimeString()}.</p>
      </div>
    );
  }
}
//事件绑定 显示/隐藏
class ShowBox extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (!this.props.show) {
      return null;
    }
    return <div className="warning">显示状态!</div>;
  }
}

class ShowBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: true };
    this.showClick = this.showClick.bind(this);
  }
  showClick() {
    this.setState((state) => ({
      show: !state.show,
    }));
  }
  render() {
    return (
      <div>
        <ShowBox show={this.state.show} />
        <button onClick={this.showClick}>
          {this.state.show ? "隐藏" : "显示"}
        </button>
      </div>
    );
  }
}
//条件渲染
function UserGreeting() {
  return <p>欢迎进入系统!</p>;
}
function GuestGreeting() {
  return <p>请点击登录!</p>;
}
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}
function LoginButton(props) {
  return <button onClick={props.onClick}>登录</button>;
}
function LogoutButton(props) {
  return <button onClick={props.onClick}>退出</button>;
}
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = { isLoggedIn: false };
  }

  handleLoginClick() {
    this.setState({ isLoggedIn: true });
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}
//与运算符 &&
const messages = ["消息", "消息", "消息"];
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      {unreadMessages.length > 0 && (
        <div>
          <p>当消息数组大于0会显示消息数量，条件成立&&运算后JSX显示</p>
          <p>你有 {unreadMessages.length} 条消息！</p>
        </div>
      )}
    </div>
  );
}
//列表渲染 直接渲染
const listArr = ["item1+索引", "item2+索引", "item3+索引"];
const listItems = listArr.map((item, index) => {
  return <li key={item}>{item + index}</li>;
});
//列表渲染 组件渲染
class ListItemsCom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listArrCom: ["组件item1+索引", "组件item2+索引", "组件item3+索引"],
      txt: "abcdefg",
    };
  }
  componentDidMount() {}
  componentWillUnmount() {}
  render() {
    const arr = this.state.listArrCom.map((item, index) => {
      return <li key={item}>{item + index}</li>;
    });
    return <div>{this.state.listArrCom}</div>;
  }
}
export default App;
