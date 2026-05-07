// API Reference: https://www.wix.com/velo/reference/api-overview/introduction

import { multilingual } from 'wix-window-frontend';

const COMPACT_DE_TARGETS = ['#section1', '#group6', '#group7'];
const TAG_HOST_TARGETS = ['#section1', '#group6', '#group7'];
const FADE_IN_TARGETS = [
    '#text8', '#text9', '#text10', '#text11', '#text14',
    '#text56', '#text57', '#text58', '#text59', '#text60',
    '#text61', '#text62', '#text63', '#text64', '#text65', '#text66',
    '#group6', '#group7'
];

function safeAddClass(id, className) {
    const el = $w(id);
    if (el && el.customClassList) el.customClassList.add(className);
    return el;
}

$w.onReady(function () {
    if (multilingual.isEnabled && multilingual.currentLanguage === 'de') {
        COMPACT_DE_TARGETS.forEach(id => safeAddClass(id, 'compact-de'));
    }

    TAG_HOST_TARGETS.forEach(id => safeAddClass(id, 'tag-host'));

    FADE_IN_TARGETS.forEach(id => {
        const el = safeAddClass(id, 'fade-in-scroll');
        if (el && typeof el.onViewportEnter === 'function') {
            el.onViewportEnter(() => {
                if (el.customClassList) el.customClassList.add('is-visible');
            });
        }
    });
});
