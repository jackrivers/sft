//fretboard api
var api;


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
    routes: routes,
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
                onHomePageInit();
            }

            switch(page.route.name) {
                case 'options':

                    onOptionsPageInit();
                    break;
                case 'first_frets':

                   onFristFrestsPageInit();
                    break;
                case 'musical_alphabet':

                    onMusicalAlphabetPageInit();
                    break;
                default:

            }
        }
    }
    // ... other parameters
});

var mainView = app.views.create('.view-main');

var $$ = Dom7;


//var userTrainerOptions;

function onDeviceReady() {
    console.log('--- onDeviceReady ---');
}

function onHomePageInit(){
    console.log('--- onHomePageInit ---');
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

function onOptionsPageInit(){
    console.log('--- onOptionsPageInit ---');

    loadOptions();
}

function onFristFrestsPageInit(){
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
}

function onMusicalAlphabetPageInit(){

    $(".my-fretboard-js-a").fretboard({
        numFrets: 13,
        noteLetters: noteLettersSharps,
        noteClickingDisabled: true,
        isChordMode: false
    });
    api = $(".my-fretboard-js-a").data('api');
    api.setClickedNotes(aString);
}
//Views




//Training


function loadOptions(){
    console.log('--- loadOptions ---');

    console.log('userTrainerOptions');
    console.log(userTrainerOptions);
    onShowFretboardChange(userTrainerOptions.showFretboard);
    $$('input[name="show-fretboard"]').on('change', function () {
        onShowFretboardChange(this.checked);
        console.log('userTrainerOptions');
        console.log(userTrainerOptions);
    });

    $$('[name=questionTime]').on('change', function(val){
        userTrainerOptions.questionTime = val.target.value;
        storage.setItem('questionTime', val.target.value);
        restartTraining();
    });
}

function onShowFretboardChange(show){
    if(show == "true" || show == true){
        console.log('---SHOW---');
//        $$('#fretboard-container').show();
        $$('#fretboard-container').css('opacity', 1);
        storage.setItem('showFretboard', true);
        userTrainerOptions.showFretboard = "true";

    } else {
        console.log('---HIDE---');
//        $$('#fretboard-container').hide();
        $$('#fretboard-container').css('opacity', 0);
        storage.setItem('showFretboard', false);
        userTrainerOptions.showFretboard = "false";
    }

}
function toggleTraining(){
    training = !training;
    if(training){
        startTraining();
    } else {
        stopTraining();
    }
}
function restartTraining(){
    if(training){
        stopTraining();
        startTraining();
    }
}

var tr_interval, tr_timeout;
function startTraining(){

    window.plugins.insomnia.keepAwake();
    $$('#start-text').hide();
    $$('.main-tiles div span.card-content').css('display', 'inline-block');
    lottery();
    tr_interval = setInterval(function(){
        lottery();
//        restartTraining();
    }, userTrainerOptions.questionTime*1000);

//        $$(e.target).html('Stop');
}

function stopTraining(){
    window.plugins.insomnia.allowSleepAgain();
    clearInterval(tr_interval);
    clearTimeout(tr_timeout);
    ToxProgress.reset();
//        $$(e.target).html('Start');
}

var currentNote;

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

        if(nuturalNotes.indexOf(note) > -1 && compareWithCurrentNote(drawnNote)){

            currentNote = drawnNote;

            $$('#sound').html(note);
            $$('#string').html(stringNumber + 1);

            console.log('userTrainerOptions.questionTime');
            console.log(userTrainerOptions.questionTime);
            ToxProgress.animate(userTrainerOptions.questionTime*1000);

            api.clearClickedNotes();
            if(showEmptyStringNotes){
                api.setClickedNotes(emptyStringsNotes);
            }
            tr_timeout = setTimeout(function(){
                if(training){
                    if(showEmptyStringNotes){
                        api.setClickedNotes(drawnNote.concat(emptyStringsNotes));
                    } else {
                        api.setClickedNotes(drawnNote);
                    }
                }
            }, (userTrainerOptions.questionTime - 1)*1000);

        } else {
            lottery();
        }
    }
}

function compareWithCurrentNote(drawnNote){
    if(currentNote === undefined ||  drawnNote[0].string != currentNote[0].string || drawnNote[0].notes[0].fret != currentNote[0].notes[0].fret)
        return true;
    return false;
}


//helpers
Template7.registerHelper('if_compare', function (a, operator, b, options) {  var match = false; if ( (operator === '==' && a == b) || (operator === '===' && a === b) || (operator === '!=' && a != b) || (operator === '>' && a > b) || (operator === '<' && a < b) || (operator === '>=' && a >= b) || (operator === '<=' && a <= b) ) { match = true; } if (match) return options.fn(this); else return options.inverse(this); });

