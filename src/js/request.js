// function Request

const sendRequest = () => {
    let inputValue = document.getElementById("input1").value;
    let inputLenght = document.getElementById("input1").value.length;

    // console.log('inputValue',inputValue);

    if (inputLenght >= 3 && inputLenght < 21) { /* условие на длину запроса*/

        /* замена пробела на + */
        const valueInputRequest = document.getElementById("input1").value.replace(/ /g, '+');

        /* сборка запроса */
        const outputRequest = 'https://pixabay.com/api/?key=14466891-825cbc5bd7840ef3d724d53b3&q=' + valueInputRequest + '&image_type=photo';

        // console.log('outputRequest', outputRequest);

        /* удаление ошибки*/

        let removeError = document.querySelector('.js-errorRequest');
        if (removeError != null) {
            removeError.remove();
        }

        /* запрос */

        const getResourse = async (url) => {
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`Could not fetch ${url}` + `, received ${res.status}`)
            }
            const body = await res.json();
            return body;
        };

        getResourse(outputRequest)
            .then((body) => {
                if (body.totalHits >= 6) {

                    /* дом - элементы */

                    let Row = document.querySelector('.services__list'),
                        Col = document.querySelector('.services__item');

                    /* удаление блоков с картинками */

                    // while (Row.firstChild) {
                    //     Row.removeChild(Row.firstChild);
                    // }

                    Row.innerHTML = "";

                    /* добавление блоков с картинками*/

                    for (let i = 0; i < 6; i++) {

                        Row.insertAdjacentHTML("beforeend", '<li class="services__item"><a href="#" class="services__link"><div class="services__inner"></div></a></li>');

                        // console.log('data_url', data.hits[i].webformatURL);

                        let pathSrc = body.hits[i].webformatURL.toString();
                        let pathAlt = body.hits[i].tags.toString();

                        let ColInner = document.querySelectorAll('.services__inner'),
                            ColInnerLast = ColInner[ColInner.length - 1];

                        ColInnerLast.innerHTML = '<img src="' + pathSrc + '" alt="' + pathAlt + '" class="services__img" />'

                    }

                    /* скролл в начало блока с картинками */

                    let toTop = document.getElementById("js-toTop");
                    toTop.scrollIntoView({ block: "start", behavior: "smooth" });

                } else {

                    let form = document.getElementById("form1");
                    form.insertAdjacentHTML("beforeend", '<span class="js-errorRequest title_home title_home-footer">По данному запросу нет изображений...</span>');
                }
            });


    };

};

//request btn

document.getElementById("btn1").addEventListener("click", sendRequest);

//request input enter

document.getElementById("input1").addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        sendRequest();
    } else {
        let inputStyle = document.getElementById("input1");
        inputStyle.classList.add('js-inputError');

    }
}, false);
