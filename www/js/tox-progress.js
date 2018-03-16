var ToxProgressBar = function (element) {
    var s = element.offsetWidth;
    this.element = element;
//    this.size = +element.dataset.size;
    this.size = s;
    this.thickness = +element.dataset.thickness;
    this.color = element.dataset.color;
    this.backgroundColor = element.dataset.background;
    this.progress = element.dataset.progress;
    this.speed = +element.dataset.speed;
    this.progressBarHTML = "";
};

ToxProgressBar.prototype.create = function () {
    console.log('--- create ---');
    var content = this.element.querySelector('.tox-progress-content');
    this.element.style.width = this.size + 'px';
    this.element.style.height = this.size + 'px';

    this.progressBarHTML =
        '   <div class="radial-outer" style="background-color: ' + this.color + '; width: ' + this.size + 'px; height: ' + this.size + 'px"></div>' +
        '   <div class="radial-mask-1" style="border-top-left-radius: ' + ((this.size / 2) + 2) + 'px; border-top-right-radius: ' + ((this.size / 2) + 2) + 'px; background-color: ' + this.backgroundColor + '; width: ' + (this.size + 2) + 'px; height: ' + ((this.size / 2) + 2) + 'px; top: -' + ((this.size) + 2) + 'px;left:-1px;"></div>' +
        '   <div class="radial-mask-2" style="border-top-left-radius: ' + ((this.size / 2) + 2) + 'px; border-top-right-radius: ' + ((this.size / 2) + 2) + 'px; background-color: ' + this.backgroundColor + '; width: ' + (this.size + 2) + 'px; height: ' + ((this.size / 2) + 2) + 'px; top: -' + (((this.size) + this.size / 2) + 4) + 'px;left:-1px;"></div>' +
        '   <div class="radial-mask-3" style="visibility: hidden; border-top-left-radius: ' + ((this.size / 2) + 2) + 'px; border-top-right-radius: ' + ((this.size / 2) + 2) + 'px; background-color: ' + this.color + '; width: ' + this.size + 'px; height: ' + (this.size / 2) + 'px;top: -' + ((this.size * 2) + 4) + 'px;"></div>' +
        '   <div class="radial-inner" style="background-color: ' + this.backgroundColor + '; width: ' + (this.size - (this.thickness * 2)) + 'px; height: ' + (this.size - (this.thickness * 2) + 2) + 'px; top: -' + ((this.size) * 2.5 - this.thickness + 5) + 'px; left: ' + this.thickness + 'px"></div>';

    this.element.innerHTML =
        '<div id="abc" style="width:' + this.size + 'px;height:' + this.size + 'px;">' +
        this.progressBarHTML +
        '</div>' +
        (content ? (
        '<div class="' + content.className + '" data-vcenter="' + content.dataset.vcenter + '" style="' + (content.dataset.vcenter === 'true' ? ('display: flex; align-items: center;') : '') + 'top: ' + -this.size + 'px;width:' + this.size + 'px;height:' + this.size + 'px;">' +
        (content ? content.innerHTML : '') +
        '</div>') : '');
};

ToxProgressBar.prototype.reset = function(){
    document.getElementById('abc').innerHTML = this.progressBarHTML;
}

var t1,t2,t3;

ToxProgressBar.prototype.animate = function () {

    this.reset();
    var element = this.element;
    var speed = this.speed;
    var progress = this.progress;

    clearTimeout(t1);
    clearTimeout(t2);
    clearTimeout(t3);

    element.querySelector('.radial-mask-1').style.transition = 'transform ' + (speed / 2) + 'ms ease-in';
    element.querySelector('.radial-inner').style.transition = 'background-color ' + (400) + 'ms ease-in';
    element.querySelector('.radial-mask-2').style.transition = 'transform ' + (speed * ((progress - 50) / 100)) + 'ms ease-out';

    t1 = setTimeout(function () {
        if (training) {
            element.querySelector('.radial-mask-1').style.transform = 'rotate(270deg)';
            t2 = setTimeout(function () { // more then half round
                if(training){
                    element.querySelector('.radial-mask-1').style.visibility = 'hidden';
                    element.querySelector('.radial-mask-2').style.transform = 'rotate(' + (90 + (progress * 3.6)) + 'deg)';
                    element.querySelector('.radial-mask-3').style.visibility = 'visible';
                    t3 = setTimeout(function () {
                        if(training){
                            element.querySelector('.radial-inner').style.backgroundColor = '#fff';
                        }
                    }, (speed / 2) - 600 );
                }
            }, speed / 2);
        } else element.querySelector('.radial-mask-1').style.transform = 'rotate(' + (90 + (progress * 3.6)) + 'deg)';
    }, 50);
};

var ToxProgress = {
    toxProgressBars: [],
    init: function () {
        var toxProgressBars = this.toxProgressBars = [];
        var toxProgressElements = document.querySelectorAll('.tox-progress');

        [].forEach.call(toxProgressElements, function (element) {
            toxProgressBars.push(new ToxProgressBar(element));
        });
    },
    create: function () {
        this.init();
        var toxProgressBars = this.toxProgressBars;

        toxProgressBars.forEach(function (toxProgressBar) {
            toxProgressBar.create();
        });
    },
    animate: function () {
        var toxProgressBars = this.toxProgressBars;

        toxProgressBars.forEach(function (toxProgressBar) {
            toxProgressBar.animate();
        });
    },
    reset: function () {
        var toxProgressBars = this.toxProgressBars;

        toxProgressBars.forEach(function (toxProgressBar) {
            toxProgressBar.reset();
        });
    }
};