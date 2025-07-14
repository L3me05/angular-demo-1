import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { SettingsService } from "../../core/settings.service";

@Component({
  selector: 'app-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  template: `
    <h1 class="text-xl my-6">Preview</h1>
    
    <div
      class="text-2xl"
      [style.color]="settingsService.color()"
    >
        {{settingsService.title()}}
    </div>

    @if (settingsService.isShopEnabled()) {
        <button
          class="btn btn-primary my-6"
        >
            Add To Cart
        </button>    
    }
    
    
    <!--<pre>{{settingsService.config() | json}}</pre>-->
  `,
  styles: ``
})
export class Preview {
  settingsService = inject(SettingsService)
}
