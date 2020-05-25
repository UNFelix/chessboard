const figures = {
  rook: { empty: "♖", filled: "♜" },
  knight: { empty: "♘", filled: "♞" },
  bishop: { empty: "♗", filled: "♝" },
  king: { empty: "♔", filled: "♚" },
  queen: { empty: "♕", filled: "♛" },
  pawn: { empty: "♙", filled: "♟" },
};
board
  .querySelectorAll("td")
  .forEach((cell) => (cell.onclick = () => setActive(cell)));
document.body.onclick = (e) => {
  if (e.target == document.body) setReady();
};
let state = [];
const startPos = "RNBKQBNR/PPPPPPPP/8/8/8/8/pppppppp/rnbkqbnr";
formState(startPos);
setFigures();
let turn = "white";
setReady();

function formState(posStr) {
  state = [];
  let row = [];
  for (const char of posStr) {
    const figure = {};
    if ("RNBKQP".includes(char)) figure.color = "white";
    else if ("rnbkqp".includes(char)) figure.color = "black";
    if ("12345678".includes(char)) {
      row = row.concat(Array(+char).fill(null));
      continue;
    } else if ("Rr".includes(char)) figure.name = "rook";
    else if ("Nn".includes(char)) figure.name = "knight";
    else if ("Bb".includes(char)) figure.name = "bishop";
    else if ("Kk".includes(char)) figure.name = "king";
    else if ("Qq".includes(char)) figure.name = "queen";
    else if ("Pp".includes(char)) figure.name = "pawn";
    else if (char == "/") {
      state.push(row);
      row = [];
      continue;
    }
    row.push(figure);
  }
  state.push(row);
}

function setFigure(row, col, figure) {
  if (!figure) return (board.rows[row].cells[col + 1].innerText = "");
  if ((row % 2 && col % 2) || (row % 2 == 0 && col % 2 == 0)) {
    var cell = "white";
  } else cell = "black";
  if (cell == figure.color) {
    var char = figures[figure.name].empty;
  } else char = figures[figure.name].filled;
  board.rows[row].cells[col + 1].innerText = char;
}

function setFigures() {
  state.forEach((row, i) => {
    row.forEach((figure, j) => setFigure(i, j, figure));
  });
  // for (let i = 0; i < 8; i++) {
  //   for (let j = 0; j < 8; j++) setFigure(i, j, state[i][j])
  // }
}

function setReady() {
  board
    .querySelectorAll(".ready, .active")
    .forEach((cell) => cell.classList.remove("ready", "active"));
  state.forEach((row, i) =>
    row.forEach((figure, j) => {
      if (figure?.color == turn) {
        board.rows[i].cells[j + 1].classList.add("ready");
      }
    })
  );
}

function setActive(cell) {
  if (cell.classList.contains("ready")) {
    board
      .querySelectorAll(".ready")
      .forEach((cell) => cell.classList.remove("ready"));
    cell.classList.add("active");
  }
}

function getFigure(cell) {
  const col = cell.cellIndex - 1;
  const row = cell.parentElement.rowIndex - 1;
  return state[row][col];
}

function getMoves(cell) {
  const figure = getFigure(cell);
  if (figure.name == "pawn") {
  }
}
// function fill(i, hue) {
//   i = ((i - 1) % 36) + 1;
//   const color = `hsl(${hue} 85% 90%)`;
//   const table = board.parentElement;
//   if (i <= 10) {
//     table.rows[0].cells[i - 1].style.background = color;
//   } else if (i < 19) {
//     board.rows[i - 11].cells[9].style.background = color;
//   } else if (i <= 28) {
//     table.rows[9].cells[28 - i].style.background = color;
//   } else {
//     board.rows[36 - i].cells[0].style.background = color;
//   }
// }

// for (let i = 1; i <= 1e3; i++) {
//   setTimeout(fill, 20 * i, i, i);
// }

// function write(i, letter) {
//   i = ((i - 1) % 36) + 1;
//   const table = board.parentElement;
//   if (i <= 10) {
//     table.rows[0].cells[i - 1].innerText = letter;
//   } else if (i < 19) {
//     board.rows[i - 11].cells[9].innerText = letter;
//   } else if (i <= 28) {
//     table.rows[9].cells[28 - i].innerText = letter;
//   } else {
//     board.rows[36 - i].cells[0].innerText = letter;
//   }
// }

// for (let i = 1; i < 1e3; i++) {
//   setTimeout(write, 500 * i, i, i);
// }
