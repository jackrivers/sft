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

var defaultTrainerOptions = [{
    showFretboard : true
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

            onDeviceReady();


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

                loadOptions();
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

var storage;

function onDeviceReady() {
    storage = window.localStorage;
    var showFretboard = storage.getItem('showFretboard'); // Pass a key name to get its value.
    if(showFretboard === null)
        storage.setItem('showFretboard', true); // Pass a key name and its value to add or update that key.
//    storage.removeItem(key) // Pass a key name to remove that key from storage.
//    showFretboard = (showFretboard == 'true');
}










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


function loadOptions(){

    var options = {
        showFretboard: storage.getItem('showFretboard'),
        lastName: 'Doe'
    };

    var template = $$('#trainer-options').html();
    var compiledTemplate = Template7.compile(template);
    var html = compiledTemplate(options);

    $$('#trainer-options-container').html(html);

    onShowFretboardChange(options.showFretboard);
    $$('input[name="show-fretboard"]').on('change', function () {
        onShowFretboardChange(this.checked);
    });

}

function onShowFretboardChange(show){
    if(show == "true" || show == true){
        console.log('---SHOW---');
//        $$('#fretboard-container').show();
        $$('#fretboard-container').css('opacity', 1);
        storage.setItem('showFretboard', true);

    } else {
        console.log('---HIDE---');
//        $$('#fretboard-container').hide();
        $$('#fretboard-container').css('opacity', 0);
        storage.setItem('showFretboard', false);
    }

}
function toggleTraining(){

    training = !training;
    if(training){
        window.plugins.insomnia.keepAwake();
        $$('#start-text').hide();
        $$('.main-tiles div span.card-content').css('display', 'inline-block');
        lottery();
        t = setInterval(function(){
            lottery();
        }, 6000);
//        $$(e.target).html('Stop');
    } else {
        window.plugins.insomnia.allowSleepAgain();
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

            $$('#sound').html(note);
            $$('#string').html(stringNumber + 1);
            ToxProgress.animate();

            api.clearClickedNotes();
            if(showEmptyStringNotes){
                api.setClickedNotes(emptyStringsNotes);
            }
            setTimeout(function(){

                if(showEmptyStringNotes){
                    api.setClickedNotes(drawnNote.concat(emptyStringsNotes));
                } else {
                    api.setClickedNotes(drawnNote);
                }

            }, 5000);

        } else {
            lottery();
        }


    }
}



Template7.registerHelper('if_compare', function (a, operator, b, options) { var match = false; if ( (operator === '==' && a == b) || (operator === '===' && a === b) || (operator === '!=' && a != b) || (operator === '>' && a > b) || (operator === '<' && a < b) || (operator === '>=' && a >= b) || (operator === '<=' && a <= b) ) { match = true; } if (match) return options.fn(this); else return options.inverse(this); });