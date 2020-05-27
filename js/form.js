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

class TextScramble {
    constructor(el) {
        this.el = el
        this.chars = '!<>-_\\/[]{}—=+*^?#________'
        this.update = this.update.bind(this)
    }
    setText(newText) {
        const oldText = this.el.innerText
        const length = Math.max(oldText.length, newText.length)
        const promise = new Promise((resolve) => this.resolve = resolve)
        this.queue = []
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || ''
            const to = newText[i] || ''
            const start = Math.floor(Math.random() * 40)
            const end = start + Math.floor(Math.random() * 40)
            this.queue.push({ from, to, start, end })
        }
        cancelAnimationFrame(this.frameRequest)
        this.frame = 0
        this.update()
        return promise
    }
    update() {
        let output = ''
        let complete = 0
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i]
            if (this.frame >= end) {
                complete++
                output += to
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar()
                    this.queue[i].char = char
                }
                output += `<span class="dud">${char}</span>`
            } else {
                output += from
            }
        }
        this.el.innerHTML = output
        if (complete === this.queue.length) {
            this.resolve()
        } else {
            this.frameRequest = requestAnimationFrame(this.update)
            this.frame++
        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
}

const phrases = [
    'Привет',
    'никто не узнает',
    'твои секреты',
    'пиши о чем хочешь',
    'делись самым откровенным',
    'будь собой',
    'твой  C i p h e r K o x a '
]

const el = document.querySelector('.text')
const fx = new TextScramble(el)

let counter = 0
const next = () => {
    fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 2000)
    })
    counter = (counter + 1) % phrases.length
}

next()