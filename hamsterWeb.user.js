// ==UserScript==
// @name         Hamster Kombat Web
// @namespace    
// @version      1.0
// @description  Запуск Hamster Kombat в браузере
// @author       
// @match        *://*.hamsterkombat.io/*
// @grant        none
// @icon         https://hamsterkombat.io/images/icons/hamster-coin.png
// @downloadURL  
// @updateURL   
// @homepage     
// ==/UserScript==

(function() {
    'use strict';

    // Функция для замены URL скрипта
    function replaceScriptUrl() {
        // Список URL-адресов для замены
        const urlsToReplace = [
            'https://hamsterkombat.io/js/telegram-web-app.js',
            'https://app.hamsterkombat.io/js/telegram-web-app.js'
        ];
        const newUrl = 'https://ktnff.tech/hamsterkombat/telegram-web-app.js';

        // Получаем все теги <script> на странице
        const scripts = document.getElementsByTagName('script');
        for (let script of scripts) {
            // Проверяем, содержит ли src один из URL-адресов для замены
            if (urlsToReplace.includes(script.src)) {
                // Создаем новый тег <script> с новым URL
                const newScript = document.createElement('script');
                newScript.src = newUrl;
                newScript.type = 'text/javascript';

                // Заменяем старый тег на новый
                script.parentNode.replaceChild(newScript, script);
                console.log('Script URL replaced:', newScript.src);
            }
        }
    }

    // Наблюдатель за изменениями в DOM
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                replaceScriptUrl();
            }
        });
    });

    // Настройки наблюдателя
    const config = {
        childList: true,
        subtree: true
    };

    // Начинаем наблюдение за изменениями в DOM
    observer.observe(document.body, config);

    // Первоначальный запуск замены URL
    replaceScriptUrl();
})();
