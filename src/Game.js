import React, { Component } from 'react';
import logo from './logo.svg';
import './Game.css';

// class Square extends React.Component {
//   render() {
//     return (
//       <button className="square" onClick={this.props.onClick}>{this.props.value}</button>
//     );
//   }
// }
function Square(props) {
  return(
    <button className="square" data-pro={props.value} onClick={props.onClick}>{props.value}</button>
  );
}


class Board extends React.Component {
  renderSquare(i) {
    return <Square className="square" value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />
  }

  renderBoard() {
    const sizeOfBoard = Math.sqrt(this.props.squares.length);
    const board = Array(sizeOfBoard).fill(null);
    for (let i = 0; i < sizeOfBoard; i++) {
      const squares = Array(sizeOfBoard).fill(null);
      for (let j = 0; j < sizeOfBoard; j++) {
        var squareKey = i * sizeOfBoard + j;
        squares.push(<span key={squareKey}>{this.renderSquare(squareKey)}</span>);
      }
      board.push(<div key={i}>{squares}</div>);
    }
    return board;
  }

  render() {
    return (
      <div>

        <div>{this.renderBoard()}</div>
      </div>
    );
  }
}



class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(400).fill(null),
      xIsNext: true,

    };
  }

  restartClick() {
    const squares = Array(400).fill(null);
    this.setState({squares: squares, xIsNext: true});
    
  }
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,

    });

  }

  render() {
    const squares = this.state.squares.slice();
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
     
      status = "Winner is: " + winner ;
      
    } else {
      
      status = "Next player is: " + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div>
        <div className="row">
          <div className="col-4 status" id="status">
              {status}
          </div>
          <div className="col-4">
          <button className="btn btn-sm btn-outline-success" type="button" onClick={() => this.restartClick()}>Restart</button>
          </div>

        </div>
        <div className="game"><Board squares={squares} onClick={i => this.handleClick(i)} /></div>

      </div>
    );
  }
}



function calculateWinner(squares) {
  const size = Math.sqrt(squares.length);
  const numOfElement = 5; //The number of same element to win
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const index = i * size + j;


      if (((index < (i + 1) * size - 5) && (squares[index - 1] === null || squares[index + 5] === null) && squares[index] && squares[index] === squares[index + 1] && squares[index] === squares[index + 2] && squares[index] === squares[index+3] && squares[index]===squares[index+4])
        || ((squares[index - size] === null || squares[index + 5 * size] === null) && squares[index] && squares[index] === squares[index + size * 1] && squares[index] === squares[index + size * 2] && squares[index] === squares[index + size * 3] && squares[index] === squares[index + size * 4])
        || ((squares[index - size * 1 - 1] === null || squares[index + size * 5 + 5] === null) && squares[index] && squares[index] === squares[index + size * 1 + 1] && squares[index] === squares[index + size * 2 + 2] && squares[index] === squares[index + size * 3 + 3] && squares[index] === squares[index + size * 4 + 4])
        || ((squares[index - size * 1 + 1] === null || squares[index + size * 5 - 5] === null) && squares[index] && squares[index] === squares[index + size * 1 - 1] && squares[index] === squares[index + size * 2 - 2] && squares[index] === squares[index + size * 3 - 3] && squares[index] === squares[index + size * 4 - 4])) {
        return squares[index];
      }

    }

  }
  return null;
}





export default Game;
