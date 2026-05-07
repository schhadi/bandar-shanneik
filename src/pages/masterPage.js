// API Reference: https://www.wix.com/velo/reference/api-overview/introduction

import { multilingual } from 'wix-window-frontend';

$w.onReady(function () {
    if (multilingual.isEnabled) {
        const code = (multilingual.currentLanguage || 'en').toLowerCase();
        $w("Page").customClassList.add(`lang-${code}`);
    }
});
