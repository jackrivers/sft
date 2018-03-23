var api;
var noteLettersSharps = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
var frets, dFrets = [1,2,3,4,5,6,7,8,9,10,11,12];
var nuturalNotes = ["A", "B", "C", "D", "E", "F", "G"];
var showEmptyStringNotes = false;
var emptyStringsNotes = [{
    string: {
        letter: "E",
        octave: 4
    }, notes: [{
        fret: 0,
        cssClass: "red"
    }]
}, {
    string: {
        letter: "B",
        octave: 3
    }, notes: [{
        fret: 0,
        cssClass: "red"
    }]
}, {
    string: {
        letter: "G",
        octave: 3
    }, notes: [{
        fret: 0,
        cssClass: "red"
    }]
}, {
    string: {
        letter: "D",
        octave: 3
    }, notes: [{
        fret: 0,
        cssClass: "red"
    }]
}, {
    string: {
        letter: "A",
        octave: 2
    }, notes: [{
        fret: 0,
        cssClass: "red"
    }]
}, {
    string: {
        letter: "E",
        octave: 2
    }, notes: [{
        fret: 0,
        cssClass: "red"
    }]
}];


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
            name: 'home',
            url: 'index.html'
        },
        {
            path: '/about/',
            url: './pages/about.html'
        },
        {
            path: '/tips/',
            url: './pages/tips.html'
        },
        {
            path: '/tutorial/',
            name: 'tutorial',
            url: './pages/tutorial/tutorial.html',
            routes: [
                {
                    path: 'learn_notes/',
                    name: 'learn_notes',
                    url: './pages/tutorial/learn_notes.html'
                }, {
                    path: 'first_frets/',
                    name: 'first_frets',
                    url: './pages/tutorial/first_frets.html'
                }

            ]
        }
//        {
//            path: '/learn_notes/',
//            url: './pages/tutorial/learn_notes.html'
//        }
    ],
    on: {
        init: function () {
            console.log('App initialized');
        },
        pageInit: function (page) {
            console.log(page.route.name + ' page initialized');
            console.log(page);

            if(training)
                toggleTraining();

            if(page.name == 'home'){
                frets = dFrets;
                showEmptyStringNotes = false;
                $$('#mainToggle').click(function(e){
                    toggleTraining();
                });
                ToxProgress.create();

                $(".my-fretboard-js").fretboard({
                    numFrets: 13,
                    noteLetters: noteLettersSharps,
                    noteClickingDisabled: true

                });
                api = $(".my-fretboard-js").data('api');

            }

            switch(page.route.name) {
                case 'home':

                    break;
                case 'first_frets':

                    frets = [1,2,3];
                    showEmptyStringNotes = true;
                    $$('#mainToggleFirstFrets').click(function(e){
                        toggleTraining();
                    });
                    ToxProgress.create();

                    $(".my-fretboard-js").fretboard({
                        numFrets: 4,
                        noteLetters: noteLettersSharps,
                        noteClickingDisabled: true,
                        isChordMode: false
                    });
                    api = $(".my-fretboard-js").data('api');
                    api.setClickedNotes(emptyStringsNotes);

                    break;
                default:

            }


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
var standardTuning = [{
    letter: "E",
    octave: 4
}, {
    letter: "B",
    octave: 3
}, {
    letter: "G",
    octave: 3
}, {
    letter: "D",
    octave: 3
}, {
    letter: "A",
    octave: 2
}, {
    letter: "E",
    octave: 2
}];



function toggleTraining(){

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

        api.clearClickedNotes();

//        var sound = sounds[Math.floor(Math.random()*sounds.length)];
        var fret = frets[Math.floor(Math.random()*frets.length)];

//        var string = strings[Math.floor(Math.random()*strings.length)];

        var stringNumber = Math.floor(Math.random()*standardTuning.length)
        var string = standardTuning[stringNumber];

        var drawnNote = [{
            string: string,
            notes: [{
                fret: fret,
                cssClass: "red"
            }]
        }];

        api.setClickedNotes(drawnNote);

        var clickedNotes = api.getClickedNotes();

        var note = clickedNotes[0].notes[0].letter;

        if(nuturalNotes.indexOf(note) > -1){
            if(showEmptyStringNotes){
                api.setClickedNotes(drawnNote.concat(emptyStringsNotes));
            }

            $$('#sound').html(note);
            $$('#string').html(stringNumber + 1);
            ToxProgress.animate();
        } else {
            lottery();
        }


    }
}



