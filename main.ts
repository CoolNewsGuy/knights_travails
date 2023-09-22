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

    constructor(root: Spot, goal?: Spot) {
        this.root = this.buildTree(new Node(root), goal);
    }

    private buildTree(root: Node, goal?: Spot, depth = 0): Node | null {
        if (root.data.isOutOfBoard()) {
            return null;
        }

        this.insertPossibleMoves(root);
        let isGoalFound = false;

        if (goal !== undefined) {
            isGoalFound = !!root.nextPossibleMoves.find((node) =>
                node.data.isEqualTo(goal)
            );
        }

        if (depth < 7 && !isGoalFound) {
            for (let node of root.nextPossibleMoves) {
                node = this.buildTree(node, goal, depth + 1)!;
            }
        }

        return root;
    }

    insertPossibleMoves(node: Node): void {
        const [x, y] = [node.data.x, node.data.y];

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
}
