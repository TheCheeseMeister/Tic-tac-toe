const display = (function () {
    const htmlBoard = document.querySelector("#board");

    const clearBoard = (function () {
        while (htmlBoard.firstChild) {
            htmlBoard.removeChild(htmlBoard.lastChild);
        }
    });

    const createBoard = (function (board) {
        let j = 0, k = 0; // jk for board

        while (j < 3) {
            for (k = 0; k < 3; k++) { // each column
                let temp = document.createElement("p");
                temp.classList.add("space");
                temp.textContent = board[j][k];
                temp.setAttribute('id', `${j}${k}`);
                temp.addEventListener("click", function() {
                    gameFlow.takeTurn(temp.getAttribute("id"));
                });
                htmlBoard.appendChild(temp);
            }
            j++; // next row
        }
    });

    const updateBoard = (function (board) {
        clearBoard();

        createBoard(board);
    });

    return { clearBoard, createBoard, updateBoard };
}) ();

const gameFlow = (function () {
    const player1 = createPlayer("Me", "X");
    const player2 = createPlayer("Not Me", "O");

    let turn = true; // true for player1, false for player2

    const takeTurn = (function (position) {
        // position - char 0 is row, char 1 is column
        let arr = position.split("").map(ele => parseInt(ele));
        let row = arr[0];
        let col = arr[1];

        if (turn) {
            gameBoard.addSymbol("X", row, col);
            turn = false;
        } else {
            gameBoard.addSymbol("O", row, col);
            turn = true;
        }
    });

    return { player1, player2, takeTurn };
})();

const gameBoard = (function () {
    const board = [["", "", ""],
                   ["", "", ""],
                   ["", "", ""]];
    
    const addSymbol = (function (symbol, row, col) {
        /*if (position >= 1 && position <= 3) {
            if (board[0][position-1] == '') {
                board[0][position-1] = symbol;
            }
        } else if (position >= 4 && position <= 6) {
            if (board[1][position-4] == '') {
                board[1][position-4] = symbol;
            }
        } else if (position >= 7 && position <= 9) {
            if (board[2][position-7] == '') {
                board[2][position-7] = symbol;
            }
        }*/
        if (board[row][col] == '') {
            board[row][col] = symbol;
        }

        display.updateBoard(board);

        return board;
    });

    const checkWin = (function (testyBoard) {
        // Check for match in row
        let match = true;
        let notedIndex = null;
        let notedSymbol = "";
        for (let i = 0; i < testyBoard.length; i++) {
            for (let j = 0; j < testyBoard.length; j++) {
                if (j == 0) {
                    notedSymbol = testyBoard[i][j];
                    continue;
                }

                if (testyBoard[i][j] != notedSymbol || testyBoard[i][j] == '') {
                    match = false;
                    notedIndex = null;
                    break;
                }
            }
            if (match) {
                notedIndex = i;
                break;
            }

            match = true;
        }

        if (match && notedIndex != null) return `poggers at ${notedIndex} for ${notedSymbol}`;

        // Check for match in column
        for (let i = 0; i < testyBoard.length; i++) {
            for (let j = 0; j < testyBoard.length; j++) {
                if (j == 0) {
                    notedSymbol = testyBoard[j][i];
                    continue;
                }

                if (testyBoard[j][i] != notedSymbol || testyBoard[j][i] == '') {
                    match = false;
                    notedIndex = null;
                    break;
                }
            }
            if (match) {
                notedIndex = i;
                break;
            }

            match = true;
        }

        if (match && notedIndex != null) return `poggers at ${notedIndex} for ${notedSymbol}`;

        // Check for match in diagonal
        // Top left -> bottom right
        let j = 0;
        match = true;
        for (let i = 0; i < testyBoard.length; i++) {
            if (i == 0) {
                notedSymbol = testyBoard[i][j];
                j++;
                continue;
            }

            if (testyBoard[j][i] != notedSymbol || testyBoard[j][i] == '') {
                match = false;
                break;
            }

            j++;
        }

        if (match) return `poggers on diagonal (TL->BR) for ${notedSymbol}`;
        
        // Top right -> bottom left
        j = 2;
        match = true;
        for (let i = 0; i < testyBoard.length; i++) {
            if (i == 0) {
                notedSymbol = testyBoard[i][j];
                j--;
                continue;
            }

            if (testyBoard[j][i] != notedSymbol || testyBoard[j][i] == '') {
                match = false;
                break;
            }

            j--;
        }

        if (match) return `poggers on diagonal (TR->BL) for ${notedSymbol}`;

        return "fuck";
    });

    return { board, addSymbol, checkWin };
})();

function createPlayer(name, symbol) {
    let score = 0;
    const incrementScore = () => score++;
    const getScore = () => score;
    return { name, symbol, incrementScore, getScore };
}

const player1 = createPlayer("Me", 'X');

let testBoard = [["", "", ""],
                ["", "", ""],
                ["", "", ""]];

display.createBoard(gameBoard.board);
gameBoard.addSymbol("O", 1);

display.updateBoard(gameBoard.board);