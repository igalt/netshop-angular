import { Product } from "./product";
import { Customer } from "./customer";

class ShoppingCart{
    products: Product[];
    checkedOut: boolean;

    constructor(products?: Product[], checkedOut?: boolean){
        if (products){
            this.products = products;
        } else {this.products = []}
        
        this.checkedOut = checkedOut ? checkedOut : false;
    }

    clearCart(): void{
        this.products = [];
        this.checkedOut = false;
    }

    addProduct(product: Product): void{
        this.products.push(product);
    }

    removeProduct(product: Product): void{
        let idx = this.products.findIndex(prod => prod.id === product.id);
        this.products.splice(idx, 1);
    }

    get totalPrice(): number{
        let sum = 0;
        this.products.forEach((product) =>{
          sum += product.price;
        });
        return sum;
    }


    checkout(customer: Customer): void{
        if (customer.balance >= this.totalPrice){
            customer.buy(this.totalPrice);
            this.checkedOut = true;
        }else{
            throw new Error("customer ain't got the money");
        }
    }

    ship(country: string): boolean{
        // checking if cart is already checkedOut
        if (this.checkedOut){
            // checking if all products are shippable to country
            this.products.forEach((product) =>{
                if(!product.shippableTo.includes(country)){
                    throw new Error (`can't ship ${product.name} to ${country}!`);
                } 
            });

            // If no exceptions thrown, all good
            // we clear the shopping cart
            this.clearCart();
            
            return true;
        } else{
            throw new Error ("Cart isn't checked out!");
        }
    }

    static fromJSON(jsonCart: {checkedOut: boolean, products: any[]}): ShoppingCart{
       let cart = new ShoppingCart([], jsonCart.checkedOut );

        if (jsonCart.products && jsonCart.products.length > 0){
        
            // Loading the products' classes 
            jsonCart.products.forEach(prod => {
                let newProd = new Product(prod.id, prod.name, prod.price, prod.imageURL, prod.shippableTo, prod.category, prod.hasVAT);
                cart.addProduct(newProd);
            });
        }
        
        return cart;            
    } 
}

//let sp = new ShoppingCart();
//console.log('yey');