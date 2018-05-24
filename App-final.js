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

const TILE_SIZE = 50;
const TILE_PER_LINE = 15;

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: this.getGrid(),
      lettersPosition: []
    };
  }
  // Grid for beginners
  // Uncomment to see the code and comment the other one
  // It will only create the red squares for lisibility
  //
  getGrid() {
    const horTileNumber = TILE_PER_LINE;
    const verTileNumber = TILE_PER_LINE;

    const grid = [];

    const gridMap = this.getGridMap();

    for (let ver = 0; ver < verTileNumber; ver++) {
      grid[ver] = [];
      for (let hor = 0; hor < horTileNumber; hor++) {
        const tyleId = `${hor}-${ver}`;
        const type = gridMap[tyleId] || 'base';
        // console.log("tyleId", tyleId);
        // console.log("type", type);
        grid[ver][hor] = {
          size: TILE_SIZE,
          type,
          x: hor,
          y: ver
        };
        // center
        if (hor === 7 && ver === 7) {
          grid[ver][hor].type = 'wd';
        }
        // wt
        if (
          (hor === 0 && ver === 0) ||
          (hor === 7 && ver === 0) ||
          (hor === 14 && ver === 0) ||
          (hor === 0 && ver === 7) ||
          (hor === 14 && ver === 7) ||
          (hor === 0 && ver === 14) ||
          (hor === 7 && ver === 14) ||
          (hor === 14 && ver === 14)
        ) {
          grid[ver][hor].type = 'wt';
        }
      }
    }

    return grid;
  }

  //   // Advanced grid
  //   //
  //   // See method `getTypeFromTileId` for more details
  //   // See method `getGridMap` for more details
  //   // Comment and uncomment the previous one to see the basic grid
  //   getGrid() {
  //     const horTileNumber = TILE_PER_LINE;
  //     const verTileNumber = TILE_PER_LINE;

  //     const grid = [];

  //     for (let ver = 0; ver < verTileNumber; ver++) {
  //       grid[ver] = [];
  //       for (let hor = 0; hor < horTileNumber; hor++) {
  //         const tileId = `${String.fromCharCode(65 + hor)}${ver + 1}`;
  //         const type = this.getTypeFromTileId(tileId);
  //         // console.log("tileId", tileId);
  //         console.log('type', type);
  //         grid[ver][hor] = {
  //           key: tileId,
  //           size: TILE_SIZE,
  //           type,
  //           x: hor,
  //           y: ver
  //         };
  //       }
  //     }
  //     return grid;
  //   }

  getGridMap() {
    return {
      ld: [
        'D1',
        'L1',
        'G3',
        'I3',
        'A4',
        'H4',
        'O4',
        'C7',
        'G7',
        'I7',
        'M7',
        'D8',
        'L8',
        'C9',
        'G9',
        'I9',
        'M9',
        'A12',
        'H12',
        'O12',
        'G13',
        'I13',
        'D15',
        'L15'
      ],
      lt: [
        'F2',
        'J2',
        'B6',
        'F6',
        'J6',
        'N6',
        'B10',
        'F10',
        'J10',
        'N10',
        'F14',
        'J14'
      ],
      wd: [
        'B2',
        'N2',
        'C3',
        'M3',
        'D4',
        'L4',
        'E5',
        'K5',
        'E11',
        'K11',
        'H8',
        'D12',
        'L12',
        'C13',
        'M13',
        'B14',
        'N14'
      ],
      wt: ['A1', 'H1', 'O1', 'A8', 'O8', 'A15', 'H15', 'O15']
    };
  }

  getTypeFromTileId(tileId) {
    // console.log("tileId", tileId);
    const gridMap = this.getGridMap();
    const types = ['ld', 'lt', 'wd', 'wt'];
    let type = 'base';
    types.forEach(t => {
      if (gridMap[t].indexOf(tileId) >= 0) {
        type = t;
      }
    });
    return type;
  }

  render() {
    const { grid, lettersPosition } = this.state;
    const boardSize = TILE_PER_LINE * TILE_SIZE;
    const PADDING = 3;
    return (
      <div
        style={{
          backgroundColor: 'green',
          padding: PADDING,
          width: boardSize + PADDING * 2,
          height: boardSize + PADDING * 2
        }}
      >
        <div
          style={{
            backgroundColor: 'green',
            width: boardSize,
            height: boardSize
          }}
        >
          {grid.map((line, horIndex) => {
            return line.map((el, verIndex) => {
              return <Tile {...el} lettersPosition={lettersPosition} />;
            });
          })}
        </div>
      </div>
    );
  }
}

const Tile = ({ type, size }) => {
  const PADDING = 1;
  const colorMap = {
    base: 'white',
    ld: '#6cf',
    lt: '#06f',
    wd: '#f9f',
    wt: 'red',
    center: '#ffc14d'
  };
  return (
    <div
      style={{
        padding: PADDING,
        display: 'inline-block'
      }}
    >
      <div
        style={{
          width: size - PADDING * 2,
          height: size - PADDING * 2,
          textAlign: 'center',
          backgroundColor: colorMap[type],
          color: colorMap[type],
          userSelect: 'none'
        }}
      >
        {type}
      </div>
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
        backgroundColor: '#905000',
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
