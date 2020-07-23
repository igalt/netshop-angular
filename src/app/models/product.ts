const VAT = 1.17;

export class Product{
    constructor(public id: string, public name: string, private _price: number, public imageURL: string, public shippableTo: string[] , public category: string, public hasVAT: boolean = true){
        
    }

    get price(): number{
        if (this.hasVAT){
            return Math.round(this._price * VAT);
        }
        return this._price;
    }

    static fromJSON(json: {id: string, name: string, price: number, imageURL: string, shippableTo: string[], category: string, hasVAT: boolean}): Product{
        return new Product(json.id, json.name, json.price, json.imageURL, json.shippableTo, json.category, json.hasVAT);
    }
}

