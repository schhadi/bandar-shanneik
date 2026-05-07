// API Reference: https://www.wix.com/velo/reference/api-overview/introduction

import { multilingual } from 'wix-window-frontend';

$w.onReady(function () {
    if (multilingual.isEnabled && multilingual.currentLanguage === 'de') {
        ['#section1', '#group6', '#group7'].forEach(id => {
            const el = $w(id);
            if (el && el.customClassList) el.customClassList.add('compact-de');
        });
    }
});
