
// Task 3:
class Shape {
    info(): void {
        console.log("This is a Shape.");
    }

    // Task 5:
    drow(): void {
        console.log('Drowing a shape...');
    }
}

// Task 1:
class Rectangle extends Shape {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        super();
        this.width = width;
        this.height = height;
    }

    area(): number {
        return this.width * this.height;
    }
    // Task 3:
    info(): void {
        console.log("This is a Recktangle");
    }

    // Task 4:
    scale(sc: number): Rectangle {
        this.width * sc;
        this.height * sc;
        return this;
    }
    static scale(r1: Rectangle, r2: Rectangle): Square {
        let totalArea: number = r1.area() + r2.area();
        return new Square(Math.pow(totalArea, 0.5));
    }
}

// Task 2:
class Square extends Rectangle {
    constructor(edge: number) {
        super(edge, edge);
    }
    // Task 5:
    drow(): void {
        console.log('Drowing a Sqare...');
    }
}

// Task 3:
class ColoredRectangle extends Rectangle {
    color: string;

    constructor(width: number, height: number, color: string) {
        super(width, height);
        this.color = color;
    }
    // Task 3:
    info(): void {
        console.log("This is a Rectangle at color: " + this.color);
    }
}

// Task 4:
console.log(new Rectangle(5, 6).scale(4).scale(3).area());


// Task 5:
class Circle extends Shape {
    drow(): void {
        console.log('Drowing a Circle...');
    }
}

class Triangle extends Shape {
    drow(): void {
        console.log('Drowing a Triangle...');
    }
}

function renderShapes(sArr: Shape[]): void {
    sArr.forEach(el => {
        el.drow();
    });
}