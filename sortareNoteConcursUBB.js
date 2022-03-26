const fs = require( 'fs' );
const pdfParse = require( 'pdf-parse' );
const numeFisier = "./REZULTATE FINALE SORTATE.txt";
const logger = fs.createWriteStream( numeFisier, {
    flags: 'a' // 'a' means appending (old data will be preserved)
} )

let toateNotele;
//regular expression sa scoata tot ce nu este o nota(greu de explicat)
const regexNote = /\d{3}[a-zA-Z]{6,}|\d{3}/gm;
//sa scoata si newlineuriile la sfasrit
const regexNewLine = /\n{1,2}/g;

function turnIntoStrings ( note ) {
    let noteok = note.map( nota => "" + nota )
    return noteok;
}



function scrieInFisier ( note ) {
    note.forEach( nota => {
        logger.write( nota + "\n" );
    } );
}




const readPdf = async ( uri ) => {
    const buffer = fs.readFileSync( uri );
    try {
        const data = await pdfParse( buffer );


        toateNotele = data.text.split( regexNote );

        //scoatem titlul
        toateNotele.shift();

        //scoatem end lineuriile ciudate si le facem numere
        let noteOk = toateNotele.map( nota => {
            nota = nota.replace( regexNewLine, "" );
            return parseFloat( nota );
        } );

        //scoatem Not a numberuriile care apar de la dublu spatiile lasate de aia care au fct pdfu vaivai babeș
        noteOk = noteOk.filter( item => !isNaN( item ) );

        // dupa care sortam descrescator
        noteOk.sort( ( a, b ) => b - a );

        console.log( noteOk ); // sa fiu eu sigur ca nu-s complet prost

        let siMaiOk = turnIntoStrings( noteOk ); // aparent tre sa fie stringuri sa scrii in fisier

        scrieInFisier( siMaiOk );

        console.log( siMaiOk );// sa fiu eu sigur ca nu-s complet prost x 2

        // Total page
        console.log( 'Total pages: ', data.numpages );

    } catch ( err ) {
        throw new Error( err );
    }
}

const DUMMY_PDF = './rezultate-partiale-concurs-mate-info-ubb-2022.pdf';
readPdf( DUMMY_PDF );

/*
Tot ce am testat eu aici


let text = [10.0, 331, NaN, 532.2, NaN];
text.sort( ( a, b ) => a - b );
let kkt = turnIntoStrings( text );
text[1] = text[1].replace( /8/, "" );

text = text.filter( item => !isNaN( item ) );

console.log( text );
scrieInFisier( kkt );

removeLineBreaks( text );

let okcred = altText.replace( regexNewLine, "" );

altText = okcred

Testing
fs.writeFile( './REZULTATE FINALE SORTATE.txt', text, err => {
    if ( err ) {
        console.error( err )
        return
    }
// } )
*/


