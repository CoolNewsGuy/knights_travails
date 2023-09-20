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

    equals(other: Spot): boolean {
        return this.x === other.x && this.y === other.y;
    }
}

class Node {
    coordinates: Spot;
    nextPossibleMoves: Node[];
    score: number;

    constructor(coordinates: Spot) {
        this.coordinates = coordinates;
        this.nextPossibleMoves = [];
        this.score = 0;
    }
}

export class PossibleMovesTree {
    currentPosition: Node | null;

    constructor(currentPosition: Spot | null = null) {
        this.currentPosition =
            currentPosition === null ? null : new Node(currentPosition);
    }

    getNextPossibleMoves(position: Node | null): void {
        if (position === null || position.coordinates.isOutOfBoard()) {
            return;
        }

        const [currentX, currentY] = [
            position.coordinates.x,
            position.coordinates.y,
        ];

        const possibleMoves: Node[] = [
            new Spot(currentX + 2, currentY + 1),
            new Spot(currentX + 2, currentY - 1),
            new Spot(currentX - 2, currentY + 1),
            new Spot(currentX - 2, currentY - 1),
            new Spot(currentX + 1, currentY + 2),
            new Spot(currentX + 1, currentY - 2),
            new Spot(currentX - 1, currentY + 2),
            new Spot(currentX - 1, currentY - 2),
        ]
            .filter((spot) => !spot.isOutOfBoard())
            .map((spot) => new Node(spot));

        position.nextPossibleMoves = possibleMoves;
    }
}
