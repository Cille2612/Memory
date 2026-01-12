// Anwendung:
var spielfeld = holeGemischteBilder();
console.log(spielfeld); // Jetzt sind die 24 Bilder wild durcheinander!

var auswahl1 = null;
var auswahl2 = null;
var id1 = null;
var id2 = null;

var treffer = 0; // Zählt die gefundenen Paare


$("img").click(function() {
    var geklickteId = $(this).attr("id");

    // 1. Verhindern, dass man eine bereits offene Karte klickt
    if (geklickteId === id1 || geklickteId === id2) return;

    // 2. Falls bereits zwei falsche Karten offen liegen: Umdrehen!
    if (auswahl1 && auswahl2) {
        if (auswahl1 !== auswahl2) {
            turnToCover(id1);
            turnToCover(id2);
        }
        // Variablen leeren für die neue Runde
        auswahl1 = null; id1 = null;
        auswahl2 = null; id2 = null;
    }

    // 3. Jetzt die neue Karte umdrehen
    turnToPicture(geklickteId, spielfeld);
    var bildInhalt = spielfeld[geklickteId - 1];

    if (!auswahl1) {
        auswahl1 = bildInhalt;
        id1 = geklickteId;
    } else {
        auswahl2 = bildInhalt;
        id2 = geklickteId;

        if (auswahl1 === auswahl2) {
            console.log("Paar gefunden! Blende aus...");
            treffer++; // Einen Punkt dazu!
            
            // Wir speichern die aktuellen IDs in lokalen Variablen, 
            // damit sie nicht überschrieben werden
            var karte1 = "#" + id1;
            var karte2 = "#" + id2;

            setTimeout(function() {
                $(karte1).attr("src", "/bilder/Empty.svg");
                $(karte2).attr("src", "/bilder/Empty.svg");
                $(karte1 + ", " + karte2).off("click").css("cursor", "default");
                
                // Prüfen, ob alle 12 Paare gefunden wurden
                if (treffer === 10) {
                    $("h1").text("🥳 You did it! 🎉");
                    $("p .erklährung").text("Press any key to restart the game.");
                    
                    // Neustart-Event aktivieren
                    aktiviereNeustart();
                }
            }, 500);

            // Variablen leeren, damit das nächste Paar gesucht werden kann
            auswahl1 = null; id1 = null;
            auswahl2 = null; id2 = null;
        }
    }
});





// umdrehen: COVER TO BILD
function turnToPicture(id, spielfeld) {
    var spezifisch = "#" + id;      // (z.B. "#4")
    var bildName = spielfeld[id - 1];    // Den Bildnamen aus dem Array holen (Index id-1 ist korrekt!)
    var pfad = "/bilder/" + bildName;    // 3. Den vollständigen Pfad zusammenbauen
    $(spezifisch).attr("src", pfad); // Das src-Attribut ändern
}

function turnToCover(id) {
    var spezifisch = "#" + id;      // (z.B. "#4")
    $(spezifisch).attr("src", "/bilder/Memory.svg"); // Das src-Attribut ändern
}




function holeGemischteBilder() {
    var bilder = [];
    
    // 1. Array erstellen (wie du es bereits hast)
    for (var i = 1; i <= 10; i++) {
        var bildName = "bild_" + i + ".jpg";
        bilder.push(bildName); 
        bilder.push(bildName); 
    }

    // 2. Das Array mischen
    return mischen(bilder); 
}


function mischen(array) {
    for (var i = array.length - 1; i > 0; i--) {
        // Wähle einen zufälligen Index von 0 bis i
        var j = Math.floor(Math.random() * (i + 1));
        
        // Tausche Elemente array[i] und array[j]
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function aktiviereNeustart() {
    $(document).keydown(function() {
        location.reload(); // Lädt die gesamte Seite neu
    });
}