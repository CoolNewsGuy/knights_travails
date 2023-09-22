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
