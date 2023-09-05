
let ctx = null;
window.addEventListener("load", (event) => {
    let canvas = document.getElementById("canvas")
    ctx = canvas.getContext("2d")
    handleResize();

    createParticles();
    animate();

})

window.addEventListener("myevent",()=>{
    handleResize();


  })


let w
let midX
let h
let particles = [];


const Tau = Math.PI * 2,
    ConnectionDist = 50,
    maxParticles = 350,
    radius = 3,
    Msqrt = Math.sqrt,
    Mrandom = Math.random;

function handleResize() {
    // w = ctx.canvas.width = window.innerWidth;
    w = ctx.canvas.width = $(document).width();

    // h = ctx.canvas.height = window.innerHeight;
    h = ctx.canvas.height = $(document).height();

    midX = w * .5;
}
window.onresize = () => handleResize();

function createParticles() {
    let vRange = 1.5,
        vMin = .5,
        vx, vy;
    for (let i = 0; i < maxParticles; i++) {
        vx = Mrandom() * vRange + vMin;
        vy = Mrandom() * vRange + vMin;
        if (Mrandom() > .5) { vx *= -1; }
        if (Mrandom() > .5) { vy *= -1; }
        particles.push({
            x: Mrandom() * w - radius,
            y: Mrandom() * h - radius,
            xv: Mrandom() * vx,
            yv: Mrandom() * vy,
            strokeColour: { h: 0, s: 1 }
        });
    }
}

function update() {
    particles.forEach(p => {
        // move
        p.x += p.xv;
        p.y += p.yv;
        // keep in bounds
        if (p.x < 0) {
            p.x = 0;
            p.xv *= -1;
        }
        else if (p.x > w) {
            p.x = w;
            p.xv *= -1;
        }
        if (p.y < 0) {
            p.y = 0;
            p.yv *= -1;
        }
        else if (p.y > h) {
            p.y = h;
            p.yv *= -1;
        }
    });
}

function connect() {
    let p1, p2;
    for (let i = 0; i < maxParticles - 1; i++) {
        p1 = particles[i];
        for (let j = i + 1; j < maxParticles; j++) {
            p2 = particles[j];
            currentDist = getDistance(p2.x, p1.x, p2.y, p1.y);
            if (currentDist < ConnectionDist) {
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                // ctx.strokeStyle = 'hsla(' + p1.hue + ', 50%, 50%, ' + (1 - currentDist * 0.01) + ')';
                ctx.strokeStyle = 'hsla(' + p1.hue + ', 50%, 50%, ' + (1 - currentDist * 100 / ConnectionDist * 0.01) + ')';
                ctx.lineTo(p2.x, p2.y, p1.x, p1.y);
                ctx.stroke();
            }
        }
    }
}

function draw() {
    let d;
    particles.forEach(p => {
        d = getDistance(midX, p.x, h, p.y);
        p.hue = d;
        ctx.beginPath();
        ctx.fillStyle = 'hsla(' + d + ' , 50%, 30%, 1)';
        ctx.arc(p.x, p.y, radius, 0, Tau);
        ctx.fill();
    })
}

function getDistance(x1, x2, y1, y2) {
    let a = x1 - x2,
        b = y1 - y2;
    return Msqrt(a * a + b * b);
}

function animate() {
    canvas.width = w;
    update();
    // Draw connect lines first, so dots are on top
    connect();
    draw();
    requestAnimationFrame(animate);
}


// ////////////////////////////

// const selectSVG = id => {
//     const el = document.getElementById(id);
//     return new SVGElement(el);
// };

// const createSVG = type => {
//     const el = document.createElementNS('http://www.w3.org/2000/svg', type);
//     return new SVGElement(el);
// };

// class SVGElement {
//     constructor(element) {
//         this.element = element;
//     }

//     set(attributeName, value) {
//         this.element.setAttribute(attributeName, value);
//     }

//     style(property, value) {
//         this.element.style[property] = value;
//     }
// }

// const colors = [
//     { main: '#FBDB4A', shades: ['#FAE073', '#FCE790', '#FADD65', '#E4C650'] },
//     { main: '#F3934A', shades: ['#F7B989', '#F9CDAA', '#DD8644', '#F39C59'] },
//     { main: '#EB547D', shades: ['#EE7293', '#F191AB', '#D64D72', '#C04567'] },
//     { main: '#9F6AA7', shades: ['#B084B6', '#C19FC7', '#916198', '#82588A'] },
//     { main: '#5476B3', shades: ['#6382B9', '#829BC7', '#4D6CA3', '#3E5782'] },
//     { main: '#2BB19B', shades: ['#4DBFAD', '#73CDBF', '#27A18D', '#1F8171'] },
//     { main: '#70B984', shades: ['#7FBE90', '#98CBA6', '#68A87A', '#5E976E'] }
// ];

// let svg =null
// let input = null
// let text =null
// let offscreenText = null

// window.addEventListener("load", () => {
//     svg = selectSVG('svg');
//     input = document.getElementById('input');
//     text = document.getElementById('text');
//     offscreenText = document.getElementById('offscreen-text');
//     window.addEventListener('load', resizePage);

//     window.addEventListener('resize', resizePage);
//     input.addEventListener('keyup', keyup);
//     input.focus();
//     addPrompt(0);
// })



// let width = window.innerWidth;
// let height = window.innerHeight;
// let textSize = 0;
// let textCenter = 0;
// const letters = [];
// // const prompt = ['s', 't', 'a', 'r', 't', ' ', 't', 'y', 'p', 'i', 'n', 'g'];
// const prompt ="Has sido invitade a la fiesta \n de cumple/recibimiento/un poco de todo de MATIASSSSSS".split("")
// let runPrompt = true;

// const resizePage = () => {
//     width = window.innerWidth;
//     height = window.innerHeight;
//     svg.set('height', height);
//     svg.set('width', width);
//     svg.set('viewBox', `0 0 ${width} ${height}`);
//     resizeLetters();
// }

// const resizeLetters = () => {
//     textSize = width / (letters.length + 2);
//     if (textSize > 100) textSize = 100;
//     text.style.fontSize = `${textSize}px`;
//     text.style.height = `${textSize}px`;
//     text.style.lineHeight = `${textSize}px`;
//     offscreenText.style.fontSize = `${textSize}px`;
//     const textRect = text.getBoundingClientRect();
//     textCenter = textRect.top + textRect.height / 2;
//     positionLetters();
// };

// const positionLetters = () => {
//     letters.forEach(letter => {
//         const timing = letter.shift ? 0.1 : 0;
//         TweenLite.to(letter.onScreen, timing, { x: letter.offScreen.offsetLeft + 'px', ease: Power3.easeInOut });
//         letter.shift = true;
//     });
// }

// const animateLetterIn = letter => {
//     const yOffset = (0.5 + Math.random() * 0.5) * textSize;
//     TweenLite.fromTo(letter, 0.4, { scale: 0 }, { scale: 1, ease: Back.easeOut });
//     TweenLite.fromTo(letter, 0.4, { opacity: 0 }, { opacity: 1, ease: Power3.easeOut });
//     TweenLite.to(letter, 0.2, { y: -yOffset, ease: Power3.easeInOut });
//     TweenLite.to(letter, 0.2, { y: 0, ease: Power3.easeInOut, delay: 0.2 });
//     const rotation = -50 + Math.random() * 100;
//     TweenLite.to(letter, 0.2, { rotation: rotation, ease: Power3.easeInOut });
//     TweenLite.to(letter, 0.2, { rotation: 0, ease: Power3.easeInOut, delay: 0.2 });
// }

// const addDecor = (letter, color) => {
//     setTimeout(() => {
//         var rect = letter.getBoundingClientRect();
//         const x0 = letter.offsetLeft + letter.offsetWidth / 2;
//         const y0 = textCenter - textSize * 0.5;
//         const shade = color.shades[Math.floor(Math.random() * 4)];
//         for (var i = 0; i < 8; i++) addTri(x0, y0, shade);
//         for (var i = 0; i < 8; i++) addCirc(x0, y0);
//     }, 150);
// };

// const addTri = (x0, y0, shade) => {
//     const tri = createSVG('polygon');
//     const a = Math.random();
//     const a2 = a + (-0.2 + Math.random() * 0.4);
//     const r = textSize * 0.52;
//     const r2 = r + textSize * Math.random() * 0.2;
//     const x = x0 + r * Math.cos(2 * Math.PI * a);
//     const y = y0 + r * Math.sin(2 * Math.PI * a);
//     const x2 = x0 + r2 * Math.cos(2 * Math.PI * a2);
//     const y2 = y0 + r2 * Math.sin(2 * Math.PI * a2);
//     const triSize = textSize * 0.1;
//     const scale = 0.3 + Math.random() * 0.7;
//     const offset = triSize * scale;
//     tri.set('points', `0,0 ${triSize * 2},0 ${triSize},${triSize * 2}`);
//     tri.style('fill', shade);
//     svg.element.appendChild(tri.element);
//     TweenLite.fromTo(tri.element, 0.6, { rotation: Math.random() * 360, scale: scale, x: x - offset, y: y - offset, opacity: 1 }, {
//         x: x2 - offset, y: y2 - offset, opacity: 0, ease: Power1.easeInOut, onComplete: () => {
//             svg.element.removeChild(tri.element);
//         }
//     });
// }

// const addCirc = (x0, y0) => {
//     const circ = createSVG('circle');
//     const a = Math.random();
//     const r = textSize * 0.52;
//     const r2 = r + textSize;
//     const x = x0 + r * Math.cos(2 * Math.PI * a);
//     const y = y0 + r * Math.sin(2 * Math.PI * a);
//     const x2 = x0 + r2 * Math.cos(2 * Math.PI * a);
//     const y2 = y0 + r2 * Math.sin(2 * Math.PI * a);
//     const circSize = textSize * 0.05 * Math.random();
//     circ.set('r', circSize);
//     circ.style('fill', '#eee');
//     svg.element.appendChild(circ.element);
//     TweenLite.fromTo(circ.element, 0.6, { x: x - circSize, y: y - circSize, opacity: 1 }, {
//         x: x2 - circSize, y: y2 - circSize, opacity: 0, ease: Power1.easeInOut, onComplete: () => {
//             svg.element.removeChild(circ.element);
//         }
//     });
// }

// const addLetter = (char, i) => {
//     const letter = document.createElement('span');
//     const oLetter = document.createElement('span');
//     letter.innerHTML = char;
//     oLetter.innerHTML = char;
//     text.appendChild(letter);
//     const color = colors[i % colors.length];
//     letter.style.color = color.main;
//     offscreenText.appendChild(oLetter);
//     letters[i] = { offScreen: oLetter, onScreen: letter, char: char };
//     animateLetterIn(letter);
//     addDecor(oLetter, color);
// }

// const addLetters = value => {
//     value.forEach((char, i) => {
//         if (letters[i] && letters[i].char !== char) {
//             letters[i].onScreen.innerHTML = char;
//             letters[i].offScreen.innerHTML = char;
//             letters[i].char = char;
//         }
//         if (letters[i] === undefined) {
//             addLetter(char, i);
//         }
//     });
// };

// const animateLetterOut = (letter, i) => {
//     TweenLite.to(letter.onScreen, 0.1, {
//         scale: 0, opacity: 0, ease: Power2.easeIn, onComplete: () => {
//             console.log('removing');
//             console.log(letter);
//             offscreenText.removeChild(letter.offScreen);
//             text.removeChild(letter.onScreen);
//             positionLetters();
//         }
//     });
//     letters.splice(i, 1);
// }

// const removeLetters = value => {
//     for (let i = letters.length - 1; i >= 0; i--) {
//         const letter = letters[i];
//         if (value[i] === undefined) {
//             animateLetterOut(letter, i)
//         }
//     }
// }

// const onInputChange = () => {
//     const value = input.value === '' ? [] : input.value.toLowerCase().split('');
//     addLetters(value);
//     removeLetters(value);
//     resizeLetters();
// };

// const keyup = (e) => {
//     if (runPrompt) {
//         input.value = '';
//         runPrompt = false;
//     };
//     onInputChange();
// }

// const addPrompt = (i) => {
//     setTimeout(() => {
//         if (runPrompt && prompt[i]) {
//             input.value = input.value + prompt[i];
//             onInputChange();
//             addPrompt(i + 1);
//         }
//     }, 300);
// }


// // resizePage();




