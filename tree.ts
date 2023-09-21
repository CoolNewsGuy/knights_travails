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
    root: Node;
    goal: Spot;

    constructor(root: Spot, goal: Spot) {
        this.goal = goal;
        this.root = this.buildTree(new Node(root));
    }

    private buildTree(root: Node, depth = 0): Node {
        if (root.coordinates.equals(this.goal)) {
            return root;
        }

        this.insertNextPossibleMoves(root);

        const isGoalFound = root.nextPossibleMoves.find((spotNode) =>
            spotNode.coordinates.equals(this.goal)
        );

        if (!isGoalFound && depth !== 7) {
            for (let node of root.nextPossibleMoves) {
                node = this.buildTree(node, depth + 1);
            }
        }

        return root;
    }

    insertNextPossibleMoves(position: Node | null): void {
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

    levelOrder(func: (node: Node) => unknown): void {
        const queue: Node[] = [this.root];

        while (queue.length !== 0) {
            const firstElement = queue.pop()!;
            func(firstElement);

            queue.unshift(...firstElement.nextPossibleMoves);
        }
    }
}
