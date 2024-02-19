const Gameboard = (function () {
    const board = [
        [0, 0, 0], [0, 0, 0], [0, 0, 0]
    ];

    const makeMove = function (row, column, player) {
        board[row][column] = player
    };

    const printBoard = () => {
        console.log(board)
    }
    return { board, makeMove, printBoard };
})()



function gameController(playerOne, playerTwo) {
    playerOneName = playerOne
    playerTwoName = playerTwo

    const players = [
        {
            name: playerOneName,
            piece: 1
        },
        {
            name: playerTwoName,
            piece: 2
        }
    ]

    let activePlayer = players[0]

    const switchPlayerTurn = () => {
        if (activePlayer === players[0]) {
            activePlayer = players[1]
        } else {
            activePlayer = players[0]
        }
    }
    const getActivePlayer = () => {
        return activePlayer
    }

    const board = Gameboard

    const printRound = () => {
        board.printBoard()
        console.log(`It is ${activePlayer}'s turn.`)
    }

    const playRound = (row, column) => {

        getActivePlayer()
        printRound()
        board.makeMove(1, 1, activePlayer.piece)
        console.log(`${activePlayer.name} is making a move on row:${row} and column${column}`)



        switchPlayerTurn()
    }
    return { playRound }

}

let game = gameController("Danny1", "Luci2")
game.playRound()