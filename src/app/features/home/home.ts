import { JsonPipe } from "@angular/common"
import { Component, inject, signal } from "@angular/core"
import { Product } from "../../model/product"
import { CartService } from "../../core/cart.service"
import { SettingsService } from "../../core/settings.service"


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    JsonPipe
  ],
  template: `
      <div class="flex gap-6 justify-center">
        @for (product of products(); track product.id) {
            <div class="card w-full bg-base-100 shadow-xl">
                <figure><img [src]="product.image" [alt]="product.name" /></figure>
                <div class="card-body">
                    <div class="flex justify-between">
                      <h2 
                        class="card-title"
                        [style.color]="settingsService.color()"
                      >{{product.name}}</h2>
                      <div class="card-title">€ {{product.cost}}</div>
                    </div>
                    <p>{{product.description}}</p>
                    <div class="card-actions justify-end">
                        @if (settingsService.isShopEnabled()) {
                            <button
                                    class="btn btn-primary"
                                    (click)="cartService.addToCart(product)"
                            >
                                Add to Cart
                            </button>
                        }
                    </div>
                </div>
            </div>
        }
      </div>
    
    <pre>{{cartService.items() | json}}</pre>
  `,
  styles: ``
})
export default class Home {
  products = signal<Product[]>(initialState)
  cartService = inject(CartService)
  settingsService = inject(SettingsService)
}



const initialState: Product[] = [
  {
    id: 1,
    name: "T-Shirt",
    image: "https://imagedelivery.net/FRI2OxIItakArmZObjbvJg/54f4429e-f166-4a42-7a9f-9d24a2621400/public",
    description: "lorem...",
    cost: 10
  },
  {
    id: 2,
    name: "Bullet",
    description: "lorem...",
    image: "https://imagedelivery.net/FRI2OxIItakArmZObjbvJg/54f4429e-f166-4a42-7a9f-9d24a2621400/public",
    cost: 5
  },
  {
    id: 3,
    name: "Pic",
    description: "lorem...",
    image: "https://imagedelivery.net/FRI2OxIItakArmZObjbvJg/4fb9a6d9-265d-4882-db4d-a47ee5772b00/public",
    cost: 2
  }
]