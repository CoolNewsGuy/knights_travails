function generateChessBoard(): number[][] {
    const board = [];
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7];

    for (const x of numbers) {
        for (const y of numbers) {
            board.push([x, y]);
        }
    }

    return board;
}

const board = generateChessBoard();
