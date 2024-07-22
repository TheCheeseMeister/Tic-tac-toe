/* Choose who goes first function on click */

function select(event) {
    event.preventDefault();

    const check = document.getElementsByClassName("selected");

    if (check.length != 0) {
        check[0].classList.remove("selected");
    }

    event.target.classList.add("selected");
}

function start(event) {
    event.preventDefault();

    const choice = document.getElementsByClassName("selected")[0].textContent;

    if (choice == "X" || choice == "O") {
        gameFlow.setFirst(choice);
        display.clearDialog();
    }
}

/* Tic-Tac-Toe objects */

const display = (function () {
    const htmlBoard = document.querySelector("#board");
    const dialog = document.querySelector("#dialog");
    dialog.showModal();

    const clearDialog = (function () {
        dialog.close();
    });

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

    return { clearBoard, createBoard, updateBoard, clearDialog };
}) ();

const gameFlow = (function () {
    const player1 = createPlayer("Me", "X");
    const player2 = createPlayer("Not Me", "O");

    let turn = true; // true for player1, false for player2

    const setFirst = (function (symbol) {
        turn = symbol == 'X' ? true : false;
    });

    const takeTurn = (function (position) {
        // position - char 0 is row, char 1 is column
        let arr = position.split("").map(ele => parseInt(ele));
        let row = arr[0];
        let col = arr[1];

        if (turn) {
            let check = gameBoard.addSymbol("X", row, col);

            if (check != "taken") turn = false;
        } else {
            let check = gameBoard.addSymbol("O", row, col);
            
            if (check != "taken") turn = true;
        }
        
        if (gameBoard.checkWin() != null) {
            console.log("yummer");
        }
    });

    return { player1, player2, takeTurn, setFirst };
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
            display.updateBoard(board);
        } else {
            return "taken";
        }
    });

    const checkWin = (function () {
        // Check for match in row
        let match = true;
        let notedIndex = null;
        let notedSymbol = "";
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (j == 0) {
                    notedSymbol = board[i][j];
                    continue;
                }

                if (board[i][j] != notedSymbol || board[i][j] == '') {
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
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (j == 0) {
                    notedSymbol = board[j][i];
                    continue;
                }

                if (board[j][i] != notedSymbol || board[j][i] == '') {
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
        for (let i = 0; i < board.length; i++) {
            if (i == 0) {
                notedSymbol = board[i][j];
                j++;
                continue;
            }

            if (board[j][i] != notedSymbol || board[j][i] == '') {
                match = false;
                break;
            }

            j++;
        }

        if (match) return `poggers on diagonal (TL->BR) for ${notedSymbol}`;
        
        // Top right -> bottom left
        j = 2;
        match = true;
        for (let i = 0; i < board.length; i++) {
            if (i == 0) {
                notedSymbol = board[i][j];
                j--;
                continue;
            }

            if (board[j][i] != notedSymbol || board[j][i] == '') {
                match = false;
                break;
            }

            j--;
        }

        if (match) return `poggers on diagonal (TR->BL) for ${notedSymbol}`;

        return null;
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