var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

function createQuestsTree() {

    var quests = loadFromStorage('questsDB')
    console.log('quests', quests);

    if (!quests || quests.length === 0) {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
        quests = gQuestsTree;
        gPrevQuest = null;
    }

    gQuestsTree = quests
    gCurrQuest = quests
    saveQuestsToStorage() 
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    console.log(node);
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    // DONE: update the gPrevQuest, gCurrQuest global vars
    gPrevQuest = gCurrQuest
    gCurrQuest = gCurrQuest[res]

}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {

    // console.log('res', lastRes);
    // console.log('new quest', newQuestTxt);
    // console.log('new guess', newGuessTxt);

    var newQuest = createQuest(newQuestTxt)
    newQuest.yes = createQuest(newGuessTxt)
    newQuest.no = gCurrQuest
    console.log(newQuest.no);
    console.log('newQuest', newQuest);

    gPrevQuest[lastRes] = newQuest

    gCurrQuest = gQuestsTree;
    saveQuestsToStorage()

    // TODO: Create and Connect the 2 Quests to the quetsions tree
}

function saveQuestsToStorage(){
    // saveToStorage('questsDB', gCurrQuest)
    saveToStorage('questsDB', gQuestsTree)

    // console.log(loadFromStorage('questsDB'));
}

function getCurrQuest() {
    return gCurrQuest
}


function saveToStorage(key, val) {
    const json = JSON.stringify(val)
    localStorage.setItem(key, json)
}

function loadFromStorage(key) {
    const json = localStorage.getItem(key)
    console.log(json);
    const val = JSON.parse(json)
    return val
}

function restartGame(){
    createQuestsTree()
}
