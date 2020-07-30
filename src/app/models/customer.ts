export class Customer{
    constructor(public id: string, public name: string, public balance: number, public imageURL: string){
    }

    buy (amount: number): void{
        this.balance -= amount;
    }

    static fromJSON(json: {id: string, name: string, balance: number, imageURL: string}): Customer {
        return new Customer(json.id, json.name, json.balance, json.imageURL);
    }
}

