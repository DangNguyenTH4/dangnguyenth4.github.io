// Snow from https://codepen.io/radum/pen/xICAB
function dotSnow(tag) {

    var COUNT = 3000;
    var masthead = document.querySelector(tag);
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    // var width = masthead.clientWidth;
    // var height = masthead.clientHeight;
    var height = self.innerHeight;
    var width = self.innerWidth;
    console.log(height + "--" + width);
    var i = 0;
    var active = false;
    function setWidthHeight() {
        // width = masthead.clientWidth;
        // height = masthead.clientHeight;

        // width = document.body.scrollWidth;
        // height = document.body.scrollHeight;

        width = self.innerWidth;
        height = self.innerHeight;
        if(tag==="nav"){
            height=100;
        }
        
    }
    function onResize() {
        setWidthHeight();
        canvas.width = width;
        canvas.height = height;
        ctx.fillStyle = '#FFF';

        var wasActive = active;
        active = width > 600;

        if (!wasActive && active)
            requestAnimFrame(update);
    }

    var Snowflake = function () {
        this.x = 0;
        this.y = 0;
        this.vy = 0;
        this.vx = 0;
        this.r = 0;

        this.reset();
    }

    Snowflake.prototype.reset = function () {
        this.x = Math.random() * width;
        this.y = Math.random() * -height;
        this.vy = 1 + Math.random() * 3;
        this.vx = 0.5 - Math.random();
        this.r = 1 + Math.random() * 2;
        this.o = 0.5 + Math.random() * 0.5;
    }

    canvas.style.position = 'fixed';
    canvas.style.left = canvas.style.top = '0';
    // canvas.style.zIndex=9999;

    var snowflakes = [], snowflake;
    for (i = 0; i < COUNT; i++) {
        snowflake = new Snowflake();
        snowflake.reset();
        snowflakes.push(snowflake);
    }

    function update() {

        ctx.clearRect(0, 0, width, height);

        if (!active)
            return;

        for (i = 0; i < COUNT; i++) {
            snowflake = snowflakes[i];
            snowflake.y += snowflake.vy;
            snowflake.x += snowflake.vx;

            ctx.globalAlpha = snowflake.o;
            ctx.beginPath();
            ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fill();

            if (snowflake.y > height) {
                snowflake.reset();
            }
        }

        requestAnimFrame(update);
    }

    // shim layer with setTimeout fallback
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    onResize();
    window.addEventListener('resize', onResize, false);

    masthead.appendChild(canvas);
};
$(document).ready(function () {
    dotSnow("body");
    dotSnow("nav");
});
