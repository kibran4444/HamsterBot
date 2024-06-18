// ==UserScript==
// @name         Hamster Bot
// @namespace    Violentmonkey Scripts
// @match        *://*.hamsterkombat.io/*
// @version      1.0
// @description  Тапалка для Хомяка
// @grant        none
// @icon
// @downloadURL  https://github.com/kibran4444/HamsterBot/raw/main/HamsterBot.user.js
// @updateURL    https://github.com/kibran4444/HamsterBot/raw/main/HamsterBot.user.js
// @homepage
// ==/UserScript==

(function () {
    // Конфигурация стилей для логов
    const styles = {
        success: 'background: #28a745; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
        starting: 'background: #8640ff; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
        error: 'background: #dc3545; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
        info: 'background: #007bff; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;'
    };
    const logPrefix = '%c[HamsterBot] ';

    // Перезапись функции console.log для добавления префикса и стилей
    const originalLog = console.log;
    console.log = function () {
        if (typeof arguments[0] === 'string' && arguments[0].includes('[HamsterBot]')) {
            originalLog.apply(console, arguments);
       }
    };

   //  Отключение остальных методов консоли для чистоты вывода
    console.error = console.warn = console.info = console.debug = () => { };

    // Очистка консоли и стартовые сообщения
    console.clear();
    console.log(`${logPrefix}Запуск`, styles.starting);
    console.log(`${logPrefix}Создан https://t.me/mifiliya`, styles.starting);


    // Настройки скрипта
    const settings = {
        minEnergy: 25, // Минимальная энергия, необходимая для нажатия на монету
        minInterval: 30, // Минимальный интервал между кликами в миллисекундах
        maxInterval: 100, // Максимальный интервал между кликами в миллисекундах
        minEnergyRefillDelay: 60000, // Минимальная задержка в миллисекундах для пополнения энергии (60 секунд)
        maxEnergyRefillDelay: 200000, // Максимальная задержка в миллисекундах для пополнения энергии (180 секунд)
        maxRetries: 10 // Максимальное количество попыток перед перезагрузкой страницы
    };

    let retryCount = 0;

    // Функция для получения местоположения элемента
    function getElementPosition(element) {
        let current_element = element;
        let top = 0, left = 0;
        do {
            top += current_element.offsetTop || 0;
            left += current_element.offsetLeft || 0;
            current_element = current_element.offsetParent;
        } while (current_element);
        return { top, left };
    }

    // Функция для генерации случайного числа в диапазоне
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Функция для выполнения клика с рандомными координатами
    function performRandomClick() {
        const energyElement = document.getElementsByClassName("user-tap-energy")[0];
        const buttonElement = document.getElementsByClassName('user-tap-button')[0];







        if (!energyElement || !buttonElement) {
            // Элемент не найден, попытка перезапустить скрипт
            console.log(`${logPrefix}Элемент не найден,обновление...`, styles.error);

          const buttonBooster = document.querySelector('.boost-item');
          const boostCountdown = document.querySelector('.boost-countdown');
          const buttonClose = document.querySelector('.btn-icon.popup-close');
          console.log('buttonClose');
            console.log(boostCountdown);
          if (buttonBooster){
          buttonBooster.click();
          }else if (boostCountdown){
            console.log('---');
            const buttonClose = document.querySelector('.btn-icon.popup-close');
            console.log('-------');
          }


            retryCount++;


           const buttonSheet = document.querySelector('.bottom-sheet-button.button.button-primary.button-large');
          console.log(`buttonSheet ${buttonSheet}`);
          if (buttonSheet){
            buttonSheet.click();
          }

            if (retryCount >= settings.maxRetries) {
                console.log(`${logPrefix}Max retries reached, reloading page...`, styles.error);
                location.reload();
            } else {
                // Добавляем задержку в 2 секунды перед следующей попыткой
                setTimeout(() => {
                    setTimeout(performRandomClick, getRandomNumber(settings.minInterval, settings.maxInterval));
                }, 2000);
            }
            return;
        }

        retryCount = 0; // Сбросить счетчик попыток при успешном обнаружении элементов

        const energy = parseInt(energyElement.getElementsByTagName("p")[0].textContent.split(" / ")[0]);

            // Генерация случайных координат, с учетом местоположения и размера кнопки
            let { top, left } = getElementPosition(buttonElement);

            const randomX = Math.floor(left + Math.random() * buttonElement.offsetWidth);
            const randomY = Math.floor(top + Math.random() * buttonElement.offsetHeight);




            // Создание событий клика в указанных координатах
            const pointerDownEvent = new PointerEvent('pointerdown', { clientX: randomX, clientY: randomY });
            const pointerUpEvent = new PointerEvent('pointerup', { clientX: randomX, clientY: randomY });
         if (energy > settings.minEnergy) {
            buttonElement.dispatchEvent(pointerDownEvent);
            buttonElement.dispatchEvent(pointerUpEvent);



           /
        } else {
            // Вывод сообщения о недостаточном уровне энергии в консоль
            console.log(`Недостаточно энергии, скрипт остановлен для пополнения энергии.`, styles.info);



            // Генерация случайного значения задержки для пополнения энергии
            const randomEnergyRefillDelay = getRandomNumber(settings.minEnergyRefillDelay, settings.maxEnergyRefillDelay);
            const delayInSeconds = randomEnergyRefillDelay / 1000;

            // Вывод информации о времени до следующего запуска в консоль
            console.log(`${logPrefix}Восстановление энергии в течении: ${delayInSeconds} сек.`, styles.info);


            document.querySelector('.user-tap-boost').click();






            //const buttonBoost = document.querySelector('.boost-item');
       // if (buttonBooster) {
           //buttonBooster.onclick();
           // console.log(`${logPrefix}Нажата кнопка ${buttonBooster[0]}`, styles.success);
          // }


            // Установка задержки перед следующей проверкой энергии
            setTimeout(performRandomClick, randomEnergyRefillDelay);
            return;
        }
        // Генерация следующего клика с рандомным интервалом
        const randomInterval = getRandomNumber(settings.minInterval, settings.maxInterval);
        setTimeout(performRandomClick, randomInterval);
    }

    // Функция для нажатия на кнопку "Спасибо"
    function clickThankYouBybitButton() {
        const thankYouButton = document.querySelector('.bottom-sheet-button.button.button-primary.button-large');
        if (thankYouButton) {
            thankYouButton.click();
            console.log(`${logPrefix}Нажата кнопка 'Спасибо'`, styles.success);

        }

      // Функция для нажатия на кнопку "Boost"
   // function clickBoostButton() {
       // const boostButton = document.querySelector('.user-tap-boost');
       // if (boostButton) {
         //  boostButton.click();
        //    console.log(`${logPrefix}Нажата кнопка 'Boost'`, styles.success);
       // }
    }

    // Запуск выполнения кликов с задержкой 5 секунд
    setTimeout(() => {
        console.log(`${logPrefix}Скрипт запустится через 5 секунд...`, styles.starting);
        clickThankYouBybitButton();
        performRandomClick();
    }, 5000); // Задержка 5 секунд
})();
