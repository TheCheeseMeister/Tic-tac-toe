const gameFlow = (function () {
    const player1 = createPlayer("Me", "X");
    const player2 = createPlayer("Not Me", "O");

    return { player1, player2 };
})();

const gameBoard = (function () {
    const board = [["", "", ""],
                   ["", "", ""],
                   ["", "", ""]];
    
    const addSymbol = (function (symbol, position) {
        if (board[position-1] == '') {
            board[position-1] = symbol;
        }

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

let testBoard = [["A", "O", "O"],
                ["-", "O", "O"],
                ["O", "X", "A"]];

console.log(gameBoard.checkWin(testBoard));