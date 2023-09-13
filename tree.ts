export type Spot = { x: number; y: number };

class Node {
    data: Spot;
    nextPossibleMoves: Spot[] | null;

    constructor(data: Spot) {
        this.data = data;
        this.nextPossibleMoves = null;
    }

    isOutOfBoard(): boolean {
        return (
            this.data.x < 0 ||
            this.data.x > 7 ||
            this.data.y < 0 ||
            this.data.y > 7
        );
    }
}

export class PossibleMovesTree {
    currentPosition: Node | null;

    constructor(currentPosition: Spot | null = null) {
        this.currentPosition =
            currentPosition === null ? null : new Node(currentPosition);
    }
}
