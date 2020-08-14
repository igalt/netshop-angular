export class Customer{
    constructor(public id: string, public name: string, public balance: number, public imageURL: string){
    }

    buy (amount: number): void{
        this.balance -= amount;
    }
}

