import { Component, Renderer2 } from '@angular/core';
import { UIState, FeatureService, EnvironmentService, SettingsService, WalletManager, CommunicationService } from '../services';
import { Location } from '@angular/common'
import { Settings } from '../../shared/interfaces';
import { INDEXER_URL } from '../shared/constants';
import { TranslateService } from '@ngx-translate/core';
import { SettingStore } from '../../shared';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent {
  settings: Settings;
  theme: string = 'dark';
  themeColor: 'primary' | 'accent' | 'warn' = 'accent';
  isDark = false;

  constructor(
    public uiState: UIState,
    public translate: TranslateService,
    public feature: FeatureService,
    public env: EnvironmentService,
    private renderer: Renderer2,
    private walletManager: WalletManager,
    private communication: CommunicationService,
    private settingsService: SettingsService,
    private settingStore: SettingStore,
    private location: Location) {

    // The Settings UI can be opened from the "Extension options" link and then settings won't be loaded yet.
    if (!settingsService.values) {
      this.settings = JSON.parse(JSON.stringify(this.settingStore.defaultItem()));
    } else {
      // Clone the settings on load:
      this.settings = JSON.parse(JSON.stringify(settingsService.values));
    }

    // Reset to default if missing.
    if (!this.settings.indexer) {
      this.settings.indexer = INDEXER_URL;
    }

    this.uiState.title = 'Settings';
    this.uiState.showBackButton = true;
  }

  async save() {
    await this.settingsService.replace(this.settings);

    await this.walletManager.resetTimer();

    this.communication.send(this.communication.createMessage('settings:saved', this.settingsService.values));

    this.location.back();
  }

  onThemeChanged(event: any) {
    if (this.settings.theme === 'light') {
      this.renderer.removeClass(document.body, 'dark-theme');
    } else {
      this.renderer.addClass(document.body, 'dark-theme');
    }
  }

  onLanguageChanged(event: any) {
    this.translate.use(this.settings.language);

    // if (this.settings.theme === 'light') {
    //   this.renderer.removeClass(document.body, 'dark-theme');
    // } else {
    //   this.renderer.addClass(document.body, 'dark-theme');
    // }
  }

  onAccentChanged(event: any) {
    console.log(this.settings);
  }
}
