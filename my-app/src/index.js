import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//   // constructor (props) {
//   //   super(props);
//   //   this.state = {
//   //     value: null
//   //   }
//   // }
//   render() {
//     return (
//       <button className="square" onClick={() => { this.props.onCli() }}>
//         {this.props.value}
//       </button>
//     );
//   }
// }

function Square(props) {
  return (
    <button className="square" onClick={props.onClickOne}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  // constructor (props) {
  //   super(props);
  //   this.state = {
  //     squares: Array(9).fill(null),
  //     xIsNext: true
  //   }
  // }

  // handleClick (i) {
  //   console.log(this.state.squares)
  //   // this.state.squares[i] = 'X';
  //   let squares = this.state.squares.slice()
  //   if (calculateWinner(squares) || squares[i]) {
  //     return
  //   }
  //   squares[i] = this.state.xIsNext? 'X' : 'O'
  //   this.setState({
  //     squares: squares,
  //     xIsNext: !this.state.xIsNext
  //   })
  // }

  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]}
        onClickOne={() => this.props.onClick(i)} />
    )
  }

  render() {
    // const winner = calculateWinner(this.state.squares);
    // let status 
    // if (winner) {
    //   status = 'Winner is ' + winner
    // } else {
    //   status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    // }

    return (
      <div>
        {/* <div className="status">{status}</div> */}
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0
    }
  }

  handleClick (i) {
    // console.log(this.state.squares)
    // this.state.squares[i] = 'X';
    // let squares = this.state.squares.slice()
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext? 'X' : 'O'
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    })
  }

  jumpTo (step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares);
    let status 
    if (winner) {
      status = 'Winner is ' + winner
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    const moves = history.map((step, move) => {
      const desc = move ? '这是第' + move + '步' : '开始游戏'
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const name = 'React'
const user = {
  name: 'Gping',
  age: 23
}
const element = (
  <h1>
    Hello {name}.
    I am {format(user)}
  </h1>
  )
function format(user) {
  return `age:${user.age},name:${user.name}`
}

function FormatDate (props) {
  return (
    <h2>
      It is {props.date.toLocaleTimeString()}.
    </h2>
  )
}

// 实现时钟的功能
class Clock extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      date: new Date()
    }
    this.handleCli = this.handleCli.bind(this);
  }

  componentDidMount () {
    this.timeId = setInterval(() => {
      this.tick()
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.timeId)
  }

  tick () {
    this.setState({
      date: new Date()
    })
  }

  // handleCli () {
  //   console.log(this)
  //   console.log(`click`)
  // }

  handleCli = () => {
    console.log(this)
  }

  render () {
    return (
      <div>
        <h1 onClick={this.handleCli}>Hello React!</h1>
        {/* <h2>Now is {this.state.date.toGMTString()}.</h2> */}
        <FormatDate date={this.state.date}></FormatDate>
      </div>
    )
  }
}


// 列表渲染

// const listItems = numbers.map((num) => {
//   return <li>{num * 2}</li>
// })

function NumberList (props) {
  const numbers = props.numbers;
  const listItems = numbers.map((num) => {
    return <li key={num.toString()}>{num * 3}</li>
  })
  return (
    <ul>
      {listItems}
    </ul>
  )
}

function App () {
  return (
    <div>
      {/* <Clock></Clock>
      <Clock></Clock> */}
      <Clock></Clock>
    </div>
  )
}

const numbers = [1,2,3,4,5,6]

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    // this.state = {temperature: ''};
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value)
    // this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />

        {/* <BoilingVerdict
          celsius={parseFloat(temperature)} /> */}

      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor (props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {
      temperature: '',
      scale: 'c'
    }
  }

  handleCelsiusChange (temperature) {
    this.setState({scale: 'c', temperature})
  }

  handleFahrenheitChange (temperature) {
    this.setState({scale: 'f', temperature})
  }

  render () {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius): temperature
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit): temperature
    return (
      <div>
        <TemperatureInput 
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput 
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />

        <BoilingVerdict
          celsius={parseFloat(celsius)}></BoilingVerdict>
      </div>
    )
  }
}

ReactDOM.render(
  // <Game />,
  // <Clock></Clock>,
  // <App></App>,
  // <Ul></Ul>,
  // <NumberList numbers={numbers}></NumberList>,
  <Calculator></Calculator>,
  document.getElementById('root')
);


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}