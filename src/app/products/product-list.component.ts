import { Component, OnDestroy, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { StarComponent } from "../shared/star.component";
import { ProductService } from "./product.service";
import { Subscription } from "rxjs";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

    private _productService: ProductService;
    constructor(productService: ProductService) {
        this._productService = productService;
    }

    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = true;
    errorMessage: string = '';
    sub!: Subscription;

    private _listFilter: string = '';
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        console.log("In setter: " + this._listFilter);
        this.filteredProducts = this.performFilter(this._listFilter);
    }

    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().includes(filterBy));
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.sub = this._productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    onRatingClicked(message: string): void {
        alert(message);
    }
}