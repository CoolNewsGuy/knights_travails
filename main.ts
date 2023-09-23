class Spot {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    isEqualTo(other: Spot): boolean {
        return this.x === other.x && this.y === other.y;
    }

    isOutOfBoard(): boolean {
        return this.x > 7 || this.y > 7 || this.x < 0 || this.y < 0;
    }
}

class Node {
    data: Spot;
    nextPossibleMoves: Node[];
    score: number;

    constructor(data: Spot) {
        this.data = data;
        this.nextPossibleMoves = [];
        this.score = 0;
    }
}

class PossibleMovesTree {
    root: Node | null;

    constructor(root: Spot, goal: Spot) {
        this.root = this.buildTree(new Node(root), goal);
    }

    // Create a small tree of possible moves
    private buildTree(root: Node, goal: Spot, depth = 0): Node | null {
        if (root.data.isOutOfBoard()) {
            return null;
        }

        this.insertPossibleMoves(root);

        const isGoalFound = !!root.nextPossibleMoves.find((node) =>
            node.data.isEqualTo(goal)
        );

        // depth is less than 5 because the goal spot will never be of depth > 5
        if (depth < 5 && !isGoalFound) {
            for (let node of root.nextPossibleMoves) {
                node = this.buildTree(node, goal, depth + 1)!;
            }
        }

        return root;
    }

    // Get next possible moves for a node
    insertPossibleMoves(node: Node): void {
        const [x, y] = [node.data.x, node.data.y];

        // All possible moves with the ones of out board removed and then convert the rest to nodes
        node.nextPossibleMoves = [
            new Spot(x + 2, y + 1),
            new Spot(x + 2, y - 1),
            new Spot(x - 2, y + 1),
            new Spot(x - 2, y - 1),
            new Spot(x + 1, y + 2),
            new Spot(x - 1, y + 2),
            new Spot(x + 1, y - 2),
            new Spot(x - 1, y - 2),
        ]
            .filter((spot) => !spot.isOutOfBoard())
            .map((spot) => new Node(spot));
    }

    // Calculate height of each node except the root and set it as score
    evaluateScores(root: Node): void {
        if (root.nextPossibleMoves.length === 0) {
            root.score = 0;
            return;
        }

        const heights: number[] = [];

        for (const childNode of root.nextPossibleMoves) {
            this.evaluateScores(childNode);
            heights.push(childNode.score);
        }

        root.score = 1 + Math.min(...heights);
    }
}

function knightMoves(from: Spot, to: Spot): Spot[] {
    if (from.isOutOfBoard() || to.isOutOfBoard()) {
        return [];
    }

    if (from.isEqualTo(to)) {
        return [from];
    }

    const possibleMovesTree = new PossibleMovesTree(from, to);
    const shortestPath = [from];

    possibleMovesTree.evaluateScores(possibleMovesTree.root!);

    // Get the spot with the lowest score (or height)
    let bestNextSpotNode = possibleMovesTree.root!.nextPossibleMoves.sort(
        (a, b) => a.score - b.score
    )[0];

    while (bestNextSpotNode.nextPossibleMoves.length !== 0) {
        shortestPath.push(bestNextSpotNode.data);

        bestNextSpotNode = bestNextSpotNode.nextPossibleMoves.sort(
            (a, b) => a.score - b.score
        )[0];
    }

    shortestPath.push(to);

    return shortestPath;
}

export { Spot, knightMoves };
