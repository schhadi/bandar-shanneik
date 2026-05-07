// API Reference: https://www.wix.com/velo/reference/api-overview/introduction

import { multilingual } from 'wix-window-frontend';

$w.onReady(function () {
    const page = $w("Page");

    if (multilingual.isEnabled) {
        const code = (multilingual.currentLanguage || 'en').toLowerCase();
        page.customClassList.add(`lang-${code}`);
    }

    page.customClassList.add('hero-enter');
});
