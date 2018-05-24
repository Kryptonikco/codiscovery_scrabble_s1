import React from 'react';

/////////
//
//
// APP - START
//
//
/////////

export default class App extends React.Component {
  state = {
    letters: []
  };

  componentDidMount() {
    const letters = this.getLetters();
    this.setState({
      letters
    });
  }

  getLetters() {
    const letters = [];

    while (letters.length < 7) {
      // console.log('---');
      const random = this.getRandomInt(65, 90);
      const letter = String.fromCharCode(random);
      // console.log(letter);
      letters.push(letter);
      // console.log(letters);
    }

    console.log(letters);
    return letters;
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <h1>Codiscovery Scrabble</h1>
        </div>
        <div className="row">
          <div className="col-8">
            <Board />
          </div>
          <div className="col-4">
            <LetterRack letters={this.state.letters} />
          </div>
        </div>
      </div>
    );
  }
}

/////////
//
//
// APP - END
// BOARD - START
//
//
/////////

class Board extends React.Component {
  tilesPerLine = 15;
  tileSize = 50;

  state = {
    grid: [{ type: 'base' }, { type: 'lt' }, { type: 'wt' }, { type: 'wd' }]
  };

  componentDidMount() {
    const grid = this.getGrid();
    this.setState({
      grid
    });
  }

  getGrid() {
    const grid = [];
    for (let ver = 0; ver < this.tilesPerLine; ver++) {
      for (let hor = 0; hor < this.tilesPerLine; hor++) {
        grid.push({
          type: 'base',
          x: ver,
          y: hor
        });
      }
    }
    return grid;
  }

  render() {
    const boardSize = this.tileSize * this.tilesPerLine;
    return (
      <div
        style={{
          backgroundColor: 'green',
          width: boardSize,
          height: boardSize
        }}
      >
        {this.state.grid.map((tile, index) => {
          return <Tile key={index} type={tile.type} tileSize={this.tileSize} />;
        })}
      </div>
    );
  }
}

const Tile = ({ type, tileSize }) => {
  const colorMap = {
    wt: 'red',
    wd: 'pink',
    lt: 'darkblue',
    ld: 'lightblue',
    base: 'white'
  };
  const tileColor = colorMap[type];
  return (
    <div
      style={{
        backgroundColor: tileColor,
        display: 'inline-block',
        width: tileSize - 2,
        height: tileSize - 2,
        color: tileColor,
        margin: 1
      }}
    >
      {type}
    </div>
  );
};

/////////
//
//
// BOARD - END
// LETTER - START
//
//
/////////

const LetterRack = ({ letters }) => {
  return (
    <div
      style={{
        backgroundColor: 'maroon',
        display: 'inline-block',
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5
      }}
    >
      {letters.map((letter, index) => {
        return <LetterTile letter={letter} key={index} />;
      })}
    </div>
  );
};

const LetterTile = ({ letter }) => {
  return (
    <div
      style={{
        display: 'inline-block',
        backgroundColor: 'wheat',
        fontSize: 30,
        width: 50,
        height: 50,
        marginRight: 1,
        textAlign: 'center',
        borderRadius: 5
      }}
    >
      {letter}
    </div>
  );
};
