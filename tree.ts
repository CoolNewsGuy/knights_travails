export type Spot = { x: number; y: number };

class Node {
    data: Spot;
    nextPossibleMoves: Spot[] | null;

    constructor(data: Spot) {
        this.data = data;
        this.nextPossibleMoves = null;
    }
}
