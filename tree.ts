export type Spot = { x: number; y: number };

class Node {
    data: Spot;
    nextPossibleMoves: Spot[] | null;

    constructor(data: Spot) {
        this.data = data;
        this.nextPossibleMoves = null;
    }
}

export class PossibleMovesTree {
    currentPosition: Node | null;

    constructor(currentPosition: Spot | null = null) {
        this.currentPosition =
            currentPosition === null ? null : new Node(currentPosition);
    }
}
