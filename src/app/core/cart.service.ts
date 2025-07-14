import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items = signal<Product[]>([])

  cartIsEmpty = computed(() => this.items().length === 0)
  totalCartItems = computed(() => this.items().length)
  totalCartCost = computed(
    () => this.items().reduce((acc, item) => acc + item.cost, 0)
  )


  addToCart(itemToAdd: Product) {
    const isInCart = this.items().find(item => item.id === itemToAdd.id)
    if (!isInCart)
      this.items.update(items => [...items, itemToAdd])
  }

  removeFromCart(itemToRemove: Product) {
    this.items.update(items => items.filter(item => item.id !== itemToRemove.id))
  }

  clearCart() {
    this.items.set([])
  }
}