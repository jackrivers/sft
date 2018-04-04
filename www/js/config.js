
var training = false;
var userTrainerOptions;

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


//trainer options
var showFretboard, questionTime;

var defaultTrainerOptions = {
    showFretboard : true,
    questionTime : 6
};


var sounds = ['A','B','C','D','E','F','G','A&#9837;','B&#9837;','C&#9837;','D&#9837;','E&#9837;','F&#9837;','G&#9837;','A&#9839;','B&#9839;','C&#9839;','D&#9839;','E&#9839;','F&#9839;','G&#9839;'];
var strings = [1,2,3,4,5,6];
var positions = ['0-3','3-7','7-10','10-13'];

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

var aString = [ {
    string: {
        letter: "A",
        octave: 2
    }, notes: [{
        fret: 0,
        cssClass: "small"
    }]
},{
    string: {
        letter: "A",
        octave: 2
    }, notes: [{
        fret: 2,
        cssClass: "small"
    }]
},{
    string: {
        letter: "A",
        octave: 2
    }, notes: [{
        fret: 3,
        cssClass: "small"
    }]
},{
    string: {
        letter: "A",
        octave: 2
    }, notes: [{
        fret: 5,
        cssClass: "small"
    }]
},{
    string: {
        letter: "A",
        octave: 2
    }, notes: [{
        fret: 7,
        cssClass: "small"
    }]
},{
    string: {
        letter: "A",
        octave: 2
    }, notes: [{
        fret: 8,
        cssClass: "small"
    }]
},{
    string: {
        letter: "A",
        octave: 2
    }, notes: [{
        fret: 10,
        cssClass: "small"
    }]
},{
    string: {
        letter: "A",
        octave: 2
    }, notes: [{
        fret: 12,
        cssClass: "small"
    }]
} ];
var storage = window.localStorage;

userTrainerOptions = getUserTrainerOptions();

function getUserTrainerOptions(){
    var showFretboard = storage.getItem('showFretboard'); // Pass a key name to get its value.
    var questionTime = storage.getItem('questionTime'); // Pass a key name to get its value.

    if(showFretboard === null)
        showFretboard = defaultTrainerOptions.showFretboard;
    if(questionTime === null)
        questionTime - defaultTrainerOptions.questionTime;
//    storage.removeItem(key) // Pass a key name to remove that key from storage.

    var options = {
        showFretboard : showFretboard,
        questionTime : questionTime
    }

    console.log('options');
    console.log(options);

    return options;
}