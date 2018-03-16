var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'Simple Fretboard Trainer',
    // App id
    id: 'rocks.guitarlearning.sft',
    // Enable swipe panel
    panel: {
        swipe: 'left'
    },
    // Add default routes
    routes: [
        {
            path: '/',
            url: 'index.html'
        },
        {
            path: '/about/',
            url: 'about.html'
        },
        {
            path: '/tips/',
            url: 'tips.html'
        },
    ],
    on: {
        init: function () {
            console.log('App initialized');
        },
        pageInit: function () {
            console.log('Page initialized');
            //todo if main
            $$('#mainToggle').click(function(e){
                toggleTraining(e);
            });
            ToxProgress.create();

        }
    }
    // ... other parameters
});

var mainView = app.views.create('.view-main');

var $$ = Dom7;

//Views

//Training
var sounds = ['A','B','C','D','E','F','G','A&#9837;','B&#9837;','C&#9837;','D&#9837;','E&#9837;','F&#9837;','G&#9837;','A&#9839;','B&#9839;','C&#9839;','D&#9839;','E&#9839;','F&#9839;','G&#9839;'];
var strings = [1,2,3,4,5,6];
var positions = ['0-3','3-7','7-10','10-13'];
var training = false;
var t;

function toggleTraining(e){

    training = !training;
    if(training){

        $$('#start-text').hide();
        $$('.main-tiles div span.card-content').css('display', 'inline-block');
        lottery();
        t = setInterval(function(){
            lottery();
        }, 6000);
//        $$(e.target).html('Stop');
    } else {
        clearInterval(t);
        ToxProgress.reset();
//        $$(e.target).html('Start');
    }
}

function lottery(){

    if(training){

        var sound = sounds[Math.floor(Math.random()*sounds.length)];
        var string = strings[Math.floor(Math.random()*strings.length)];

        $$('#sound').html(sound);
        $$('#string').html(string);
        ToxProgress.animate();
    }
}



