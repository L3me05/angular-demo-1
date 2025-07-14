import { computed, Injectable, signal } from '@angular/core';

type Config = {
  title: string;
  color: string;
  enableShop: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  config = signal<Config>({
    title: 'Angular Shop',
    color: '#888888',
    enableShop: true
  })

  title = computed(() => this.config().title)
  color = computed(() => this.config().color)
  isShopEnabled = computed(() => this.config().enableShop)

  // setter generico
  set<K extends keyof Config>(propName: K, value: Config[K]) {
    this.config.update(cfg => ({ ...cfg, [propName]: value }))
  }

  setTitle(title: string) {
    this.config.update(cfg => ({ ...cfg, title }))
  }

  setColor(color: string) {
    this.config.update(cfg => ({ ...cfg, color }))
  }

  setEnableShop(enableShop: boolean) {
    this.config.update(cfg => ({ ...cfg, enableShop }))
  }
}