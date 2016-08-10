/**
 * Created by Вероника on 22.07.2016.
 */
;(function () {
    "use strict";

    // Инициализация переменных
    let btn = document.querySelector('#clickMe'),
        btnSave = document.querySelector('#saveMe'),
        offsetX = 0,
        offsetY = 0,
        activeElement;

    // Получение произвольного цвета
    let getRandomColor = () =>{
        let letters = '0123456789ABCDEF'.split(''),
            color = '#',
            colorLen = 6;

        for (let i = 0; i < colorLen; i++ ) {
            color += letters[Math.floor(Math.random() * letters.length)];
        }

        return color;
    },
    // Функция для события нажатия мыши
    mouseDwn = (e) => {
        activeElement = e.target;
        offsetX = e.offsetX;
        offsetY = e.offsetY;
    },
    // Функция для события передвижения мыши
    mouseMve = (e) => {
        if (activeElement) {
            activeElement.style.top = (e.clientY - offsetY) + 'px';
            activeElement.style.left = (e.clientX - offsetX) + 'px';
        }
    },
    // Функция для события отпускания кнопки мыши
    mouseUp = () => {
        activeElement = null;
    };

    // Событие по загрузке страницы
    window.addEventListener('load', function () {
        let cookie = document.cookie.split(';'),
            styles,
            len;

        // Проверить есть ли cookie с элементами и стилями
        for (let i = 0; i < cookie.length; i++){
            if(cookie[i].indexOf("squares=") > -1){
                styles = cookie[i].replace("squares=", "");
                break;
            }
        }

        // Если cookie существует
        if (styles) {
            styles = JSON.parse(styles);
            len = styles.length;

            // Пройтись по массиву со стилями и добавить для каждого div
            for (let i = 0; i < len; i++) {
                let element = document.createElement('div');

                // Назначить стили
                element.style.backgroundColor = styles[i]["background-color"];
                element.style.top = styles[i].top;
                element.style.left = styles[i].left;
                element.style.position = styles[i].position;
                element.style.width = styles[i].width;
                element.style.height = styles[i].height;
                element.setAttribute("class", 'square');
                document.body.appendChild(element);

                // Назначить обработчик для события
                element.addEventListener("mousedown", mouseDwn);
                element.addEventListener("mousemove", mouseMve);
                element.addEventListener("mouseup", mouseUp);
            }
        }
    });

    btn.addEventListener('click', function () {
        // По нажатию на кнопку создать div
        let element = document.createElement('div'),
            style ='position: absolute;width: 234px;height: 234px;top: 100px; left:100px';

        //Назначить div стиль
        style+=';background-color: '+ getRandomColor();
        element.setAttribute("style", style);
        element.setAttribute("class", 'square');
        document.body.appendChild(element);

        // Назначить обработчик для события
        element.addEventListener("mousedown", mouseDwn);
        element.addEventListener("mousemove", mouseMve);
        element.addEventListener("mouseup", mouseUp);
    });

    btnSave.addEventListener('click', function () {
        let squares = document.querySelectorAll('.square'),
            len = squares.length,
            arrSquares = [];

        // Создать массив из стилей
        for (let i = 0; i < len; i++){
            arrSquares.push({
                "top": squares[i].style.top,
                "left": squares[i].style.left,
                "height": squares[i].style.height,
                "width": squares[i].style.width,
                "position": "absolute",
                "background-color": squares[i].style.backgroundColor
            });
        }

        // Добавить cookie со стилями
        document.cookie = 'squares=' + JSON.stringify(arrSquares);
    });
})();
