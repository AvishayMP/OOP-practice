class Car {
    type: string;
    width: number;
    height: number;
    km: number;
    constructor(type: string, width: number, height: number) {
        this.type = type;
        this.width = width;
        this.height = height;
        this.km = 0;
    }
    move(): void {
        this.km++;
    }
}

class Mercedess extends Car {
    model: string;
    constructor(model: string, width: number, height: number) {
        super('Mercedess', width, height);
        this.model = model;
    }
    playMusic(): void {
        console.log('lalala');
        ;
    }
}