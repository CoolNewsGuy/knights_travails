export class Spot {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    isOutOfBoard(): boolean {
        return this.x < 0 || this.x > 7 || this.y < 0 || this.y > 7;
    }
}

class Node {
    coordinates: Spot;
    nextPossibleMoves: Spot[] | null;

    constructor(coordinates: Spot) {
        this.coordinates = coordinates;
        this.nextPossibleMoves = null;
    }
}

export class PossibleMovesTree {
    currentPosition: Node | null;

    constructor(currentPosition: Spot | null = null) {
        this.currentPosition =
            currentPosition === null ? null : new Node(currentPosition);
    }

    getPossibleMoves(): Node[] | null {
        if (
            this.currentPosition === null ||
            this.currentPosition.isOutOfBoard()
        ) {
            return null;
        }

        const [currentX, currentY] = [
            this.currentPosition.data.x,
            this.currentPosition.data.y,
        ];
        const possibleMoves: Node[] = [
            {
                x: currentX + 2,
                y: currentY + 1,
            },
            {
                x: currentX + 2,
                y: currentY - 1,
            },
            {
                x: currentX - 2,
                y: currentY + 1,
            },
            {
                x: currentX - 2,
                y: currentY - 1,
            },
            {
                y: currentX + 2,
                x: currentY + 1,
            },
            {
                y: currentX + 2,
                x: currentY - 1,
            },
            {
                y: currentX - 2,
                x: currentY + 1,
            },
            {
                y: currentX - 2,
                x: currentY - 1,
            },
        ].map((spot) => new Node(spot));

        return possibleMoves.filter((spot) => !spot.isOutOfBoard());
    }
}
