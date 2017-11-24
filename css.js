/* "css" in the file name stands for "clock simulation script" */

'use strict';

(function() {
    var mainColor = '#000', bgColor = '#fff', c, ctx;
    
    function init() {
        c = document.createElement('canvas');
        c.width = 1000;
        c.height = 1000;
        document.body.appendChild(c);
        ctx = c.getContext('2d');
        ctx.translate(500,500);
        ctx.lineCap = 'round';
        document.addEventListener('mousedown', swapColors);
        requestAnimationFrame(drawClock);
    }
    
    function swapColors() {
        var temp = mainColor;
        mainColor = bgColor;
        bgColor = temp;
        document.body.style.backgroundColor = bgColor;
    }
    
    function drawFace() {
        ctx.strokeStyle = mainColor;
        for (var i = 0; i < 60; i++) {
            ctx.save();
            ctx.rotate(Math.PI * (i / 30));
            if (i % 5) {
                ctx.lineWidth = 5;
                ctx.beginPath();
                ctx.moveTo(0, -475);
            } else {
                ctx.lineWidth = 10;
                ctx.beginPath();
                ctx.moveTo(0, -450);
            }
            ctx.lineTo(0, -500);
            ctx.stroke();
            ctx.restore();
        }
    }
    
    function drawHand(rotation, color, width, length) {
        ctx.save();
        ctx.rotate(Math.PI * rotation);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -length);
        ctx.stroke();
        ctx.restore();
    }
    
    function drawClock() {
        ctx.clearRect(-500, -500, 1000, 1000);
        var d = new Date();
        drawFace();
        var timeS = d.getSeconds() + d.getMilliseconds() / 1000;
        var timeM = d.getMinutes() + timeS / 60;
        var timeH = d.getHours() + timeM / 60;
        drawHand(timeH / 6, mainColor, 15, 350);
        drawHand(timeM / 30, mainColor, 10, 450);
        drawHand(timeS / 30, '#f00', 5, 475);
        requestAnimationFrame(drawClock);
    }
    
    window.addEventListener('load', init);
})();
