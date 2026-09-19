// ==UserScript==
// @name         AtCoder Header & Nav Toggle Button
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  AtCoderの問題ページでヘッダー・ナビゲーション・コンテスト情報を切り替えます
// @author       You
// @match        https://atcoder.jp/contests/*/custom_test
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function init() {
        var editorButtons = document.querySelector('.editor-buttons');
        if (!editorButtons || document.getElementById('btn-toggle-header-nav')) return;

        var button = document.createElement('button');
        button.id = 'btn-toggle-header-nav';
        button.type = 'button';
        button.className = 'btn btn-default btn-sm';
        button.innerHTML = '<span class="glyphicon glyphicon-eye-close" aria-hidden="true"></span> ナビ非表示';

        var isHidden = false;

        button.addEventListener('click', function() {
            // 非表示対象の要素を取得
            var topNav = document.querySelector('nav.navbar-fixed-top');
            var contestNavTabs = document.getElementById('contest-nav-tabs');
            var navbarHeader = document.querySelector('.navbar-header');

            isHidden = !isHidden;

            // 表示/非表示の切り替え処理
            if (topNav) topNav.style.display = isHidden ? 'none' : '';
            if (contestNavTabs) contestNavTabs.style.display = isHidden ? 'none' : '';
            if (navbarHeader) navbarHeader.style.display = isHidden ? 'none' : '';

            // ボタンの見た目を更新
            if (isHidden) {
                button.innerHTML = '<span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> ナビ表示';
                button.classList.remove('btn-default');
                button.classList.add('btn-warning');
            } else {
                button.innerHTML = '<span class="glyphicon glyphicon-eye-close" aria-hidden="true"></span> ナビ非表示';
                button.classList.remove('btn-warning');
                button.classList.add('btn-default');
            }
        });

        editorButtons.appendChild(button);
    }

    var observer = new MutationObserver(function() {
        init();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    init();
})();
