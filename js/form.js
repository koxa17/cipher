const body = document.body;
const copyBtn = document.querySelector('.copyWrappe');
const colorBtn = document.querySelectorAll('.bg-color');

function outFunc(e) {
    const tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Скопировать";
}

function myFunction() {
    const cipherMessage = document.querySelector('.cipherMessage').textContent.trim();
    navigator.clipboard.writeText(cipherMessage);

    const tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Текст скопирован";
}

function generationBg() {
    return colorBtn.forEach(btn => btn.style.backgroundColor = `#${Math.floor(Math.random() * 2 ** 24).toString(16)}`);
}
generationBg();

function bgColor(e) {
    let color = e.target.style.backgroundColor;
    body.style.backgroundColor = color;
}


copyBtn.addEventListener('click', myFunction);
copyBtn.addEventListener('mouseleave', outFunc);
colorBtn.forEach(btn => btn.addEventListener('click', e => bgColor(e)));


// ШИФРОВЩИК
class Сipher {
    constructor() {

        this.cipherMessage = document.querySelector('.cipherMessage');
        this.cipherTextArea = document.getElementById('cipher');
        this.btn = document.querySelectorAll('[data-action]');

    }

    init() {
        this.events();
    }

    events() {

        this.btn.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (e.target.dataset.action === 'cipher') {
                    this.cipherString(this.cipherTextArea.value);
                } else if (e.target.dataset.action === 'deCipher') {
                    this.deCipher(this.cipherTextArea.value);
                }
            })
        });

    }

    cipherString(string) {
        let res = '';
        for (let i = 0; i < string.length; i++) {
            res += i == string.length - 1 ? string.charCodeAt(i) : string.charCodeAt(i) + ',';
        }
        this.displayCipher(res, true);
        this.cipherTextArea.value = '';
        return res;
    }

    deCipher(cipher) {
        let cipherStr = cipher.split(',');
        let res = '';
        for (let i = 0; i < cipherStr.length; i++) {
            res += String.fromCharCode(cipherStr[i]);
        }
        res = res[0].toUpperCase() + res.slice(1);
        this.displayCipher(res, false);
        this.cipherTextArea.value = '';
        return res;
    }

    displayCipher(strCipher, scroll) {
        scroll = false;
        if (scroll === true) {
            this.cipherMessage.classList.add('scroll');
            this.cipherMessage.textContent = strCipher;
        } else {
            this.cipherMessage.classList.add('scroll');
            this.cipherMessage.textContent = strCipher;
        }
    }
}

let str = new Сipher();
str.init();