$(document).ready(function() {
    //QUERY string funziona per il GET ma non si può usare per tutti i metodi
    //Con le password in GET chiunque la può leggere

    //preparo la funzione per il template di handlebars
    var html_template = $('#card-film-template').html();
    var template_function = Handlebars.compile(html_template);

    // var source = $('#disco-template').html();
    // var template = Handlebars.compile(source);

    //preparo le variabili per il template di handlebars
    // var context = {
    //     copertina: "Img/Ten_Summoner's_Tales.jpg",
    //     titolo: "New Jersey",
    //     artista: "Bon Jovi",
    //     anno: "1988" };
    // var html = template(context);
    //
    // //appendo l'html compilato con le variabili
    // $('#dischi').append(html);

    // chiamata ajax per recuperare i dicshi da visualizzare

    var api_url_base = 'https://api.themoviedb.org/3';
    var api_key = '72b1bdb9472582bfcdbb810f26d2718f';

    $('#search-input').click(function() {
        $('#search-input').addClass('active');
        $('#search-button').addClass('active');
    });

    //intercetto il click sul pulsante di ricerca
    $('#search-button').click(ricerca_film);
    $('#search-button').click(function() {
        $('#search-button').removeClass('active');
        $('#search-input').removeClass('active');
    });

    $('#search-input').keypress(function(event) {
        if (event.which == 13) {
            ricerca_film();
            $('#search-button').removeClass('active');
            $('#search-input').removeClass('active');
        }
    });

    function ricerca_film() {
        var testo_ricerca = $('#search-input').val();
        //controllo che l'utente abbia inserito qualcosa
        if (testo_ricerca.lenght != 0) {
            //solo se la stringa cercata non è vuota, faccio la chiamata api
            //resetto l'input
            $('#search-input').val('');
            //svuoto il risultato di testo_ricerca
            $('#risultati').empty();
            //faccio la chiamata ajax con la query inserita dall'utente
            $.ajax({
                'url': api_url_base + '/search/movie',
                'data': {
                    'api_key': api_key,
                    'query': testo_ricerca,
                    'language': 'it-IT'
                },
                'method': 'get',
                'success': function(data_response) {
                    console.log(data_response);
                    var film = data_response.results;
                    for (var i = 0; i < film.length; i++) {
                        var film_corrente = film[i];
                        var titolo = film_corrente.title;
                        var titolo_originale = film_corrente.original_title;
                        var lingua = film_corrente.original_language;
                        var voto = film_corrente.vote_average;
                        var calcolo_stelle = Math.ceil(voto / 2);
                        var stelle_a_video = '';
                        for (var j = 0; j < 5; j++) {
                            if (j < calcolo_stelle) {
                                stelle_a_video += '<i class="fas fa-star"></i>';
                            } else {
                                stelle_a_video += '<i class="far fa-star"></i>';
                            }
                        };
                        console.log(titolo);
                        console.log(titolo_originale);
                        console.log(lingua);
                        console.log(voto);
                        var template = {
                            titolo: titolo,
                            original_title: titolo_originale,
                            lingua: lingua,
                            voto: voto,
                            stelle: stelle_a_video
                        };
                        //creo il template
                        var html_film = template_function(template);
                        // // appendo l'html compilato con le variabili
                        // // lo appendo al container dei dischi
                        $('#risultati').append(html_film);
                    };
                },
                'error': function() {
                    alert('error!');
                }

            });

        };


    };
});

//recupero l'array che contiene tutti i dischi
//             var x = data.response;
//             console.log(data.response);
//             console.log(x);
//             //ciclo tutte le x
//             for (var i = 0; i < x.length; i++) {
//                 //per ogni disco recupero le varie informazione /artista, disco img di copertina ecc)
//
//                 var singleX = x[i];
//                 console.log(singleX);
//
//                 //for in serve per stampare generalmente
//                 // for (var chiave in disco) {
//                 //     console.log(chiave + ': ' + disco[chiave]);
//                 // }
//                 var keywordTwo = singleX.poster;
//                 var keywordThree = singleX.title;
//                 var keywordFour = singleX.author;
//                 var keywordFive = singleX.year;
//                 var keywordOne = singleX.genre;
//                 //creo le variabili di handlebars
//
//                 var context = {
//                     copertina: keywordTwo,
//                     titolo: keywordThree,
//                     artista: keywordFour,
//                     anno: anno_uscita,
//                     genere: genre_album,
//                 };
//
//                 //versione semplificata
//                 // 'success': function(data) {
//                 //     //recupero l'array che contiene tutti i dischi
//                 //     var dischi = data.response;
//                 //     console.log(data.response);
//                 //     console.log(dischi);
//                 //     //ciclo tutti i dischi
//                 //     for (var i = 0; i < dischi.length; i++) {
//                 //         //per ogni disco recupero le varie informazione /artista, disco img di copertina ecc)
//                 //
//                 //         var disco = dischi[i];
//                 //         console.log(disco);
//                 //         //creo le variabili di handlebars
//                 //
//                 //
//                 //         var context = {
//                 //             copertina: disco.poster,
//                 //             titolo: disco.title,
//                 //             artista: disco.author,
//                 //             anno: disco.year,
//                 //         };
//
//                 //creo il template
//                 var html = template(context);
//
//                 // appendo l'html compilato con le variabili
//                 // lo appendo al container dei dischi
//                 $('#dischi').append(html);
//
//             }
//         },
//         'error': function() {
//             alert('errore');
//         }
//     });
//
//     // BONUS: tendina per selezione genere => filtro dischi
//     //Change si usa con gli input a scelta
//     $('#scelta-genere').change(function() {
//         console.log('selezionato valore')
//         //val prende il valore, non serve attr, se lo prende lui
//         //uso this (poi sostituito da '#scelta-genere') perchè 1) val non fa l'each implicito come ad esempio addClass, quindi non seleziona tutti ma solo un elemento 2) seleziono solo il valore che mi interessa se no prenderebbe la prima
//         var genere_selezionato = $('#scelta-genere').val();
//         console.log(genere_selezionato);
//         //per ogni disco verifico se il suo genere corrisponde al genere genere_selezionato
//         if (genere_selezionato == '') {
//             $('card-disco').fadeIn();
//             $('card-disco').parent('.card-disco-container').fadeIn();
//             //
//         } else {
//             //per ogni disco verifico se il suo genere corrisponde al genere selezionato
//             $('.card-disco').each(function() {
//                 var genere_disco = $(this).attr('data-genere');
//                 //se il genere del disco è uguale al genere selezionato => lo mostra
//                 if (genere_disco.toLowerCase() == genere_selezionato.toLowerCase()) {
//                     $(this).fadeIn();
//                     $(this).parent('.card-disco-container').fadeIn();
//                 } else {
//                     //altrimenti lo nascondo
//                     $(this).fadeOut();
//                     $(this).parent('.card-disco-container').fadeOut();
//                 }
//             });
//             //
//         };
//     });
// });
//
// //https://flynn.boolean.careers/exercises/api/array/music
// //https://bitbucket.org/booleancareers/ex-dischi-musicali-layout/src/master/
