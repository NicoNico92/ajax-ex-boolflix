$(document).ready(function() {
    //QUERY string funziona per il GET ma non si può usare per tutti i metodi
    //Con le password in GET chiunque la può leggere

    //preparo la funzione per il template di handlebars
    var html_template = $('#card-film-template').html();
    var template_function = Handlebars.compile(html_template);

    // chiamata ajax per recuperare i dicshi da visualizzare

    var api_url_base = 'https://api.themoviedb.org/3';
    var api_key = '72b1bdb9472582bfcdbb810f26d2718f';

    $('#search-input').click(focus_su_ricerca);

    //intercetto il click sul pulsante di ricerca
    $('#search-button').click(ricerca_film);
    $('#search-button').click(rimuovi_focus_su_ricerca);

    $('#search-input').keypress(function(event) {
        if (event.which == 13) {
            ricerca_film();
            rimuovi_focus_su_ricerca();
        }
    });

    function focus_su_ricerca() {
        $('#search-input').addClass('active');
        $('#search-button').addClass('active');
    };

    function rimuovi_focus_su_ricerca() {
        $('#search-button').removeClass('active');
        $('#search-input').removeClass('active');
    };

    function ricerca_film() {
        var testo_ricerca = $('#search-input').val();
        //controllo che l'utente abbia inserito qualcosa
        if (testo_ricerca.lenght != 0) {
            //solo se la stringa cercata non è vuota, faccio la chiamata api
            //resetto l'input
            $('#search-input').val('');
            //svuoto il risultato di testo_ricerca
            $('#risultati').empty();
            //METODI ALTERNATIVI
            // $('#risultati').text('');
            // $('#risultati').html('');
            // $('.card-film').remove();
            //faccio la chiamata ajax con la query inserita dall'utente
            $.ajax({
                'url': api_url_base + '/search/movie',
                'data': {
                    'api_key': api_key,
                    'query': testo_ricerca,
                    //di default sarebbe inglese, posso mettere italiano come filtro
                    'language': 'it-IT'
                },
                'method': 'get',
                'success': function(data_response) {
                    console.log(data_response);
                    var film = data_response.results;
                    for (var i = 0; i < film.length; i++) {
                        var film_corrente = film[i];
                        //controllo se esiste la proprietà title per l'oggetto film_corrente
                        // var titolo = film_corrente.title;
                        if(film_corrente.hasOwnProperty('title')) {
                            //se è definita la proprietà title => è un film => il titolo è nella proprietà title
                            var titolo = film_corrente.title;
                            var tipo = 'film';
                            $('card-film').removeClass('tv');
                            console.log('QUESTO E UN FILM');
                        } else {
                            // se non è definita la proprietà title => è una serie => leggo il titolo e la proprietà name
                            var titolo = film_corrente.name;
                                var tipo = 'serie tv';
                                $('card-film').addClass('tv');
                                console.log('QUESTA E UNA SERIE TV');
                        }
                        if(film_corrente.hasOwnProperty('original_title')) {
                            //se è definita la proprietà original_title => è un film => il titolo è nella proprietà title
                            var titolo_originale = film_corrente.original_title;
                                var tipo = 'film';
                        } else {
                            // se non è definita la proprietà original_title => è una serie => leggo il titolo e la proprietà name
                            var titolo_originale = film_corrente.original_name;
                                var tipo = 'serie tv';
                        }
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
                        var immagine_bandiera =
                        console.log(titolo);
                        console.log(titolo_originale);
                        console.log(lingua);
                        console.log(voto);
                        var template = {
                            titolo: titolo,
                            original_title: titolo_originale,
                            lingua: cerca_bandiera(lingua),
                            voto: voto,
                            stelle: stelle_a_video,
                            tipo: tipo
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

            $.ajax({
                'url': api_url_base + '/search/tv',
                'data': {
                    'api_key': api_key,
                    'query': testo_ricerca,
                    //di default sarebbe inglese, posso mettere italiano come filtro
                    'language': 'it-IT'
                },
                'method': 'get',
                'success': function(data_response) {
                    console.log(data_response);
                    var film = data_response.results;
                    for (var i = 0; i < film.length; i++) {
                        var film_corrente = film[i];
                        //controllo se esiste la proprietà title per l'oggetto film_corrente
                        // var titolo = film_corrente.title;
                        if(film_corrente.hasOwnProperty('title')) {
                            //se è definita la proprietà title => è un film => il titolo è nella proprietà title
                            var titolo = film_corrente.title;
                            var tipo = 'film';
                            $('.card-film').removeClass('tv');
                            console.log('QUESTO E UN FILM');
                        } else {
                            // se non è definita la proprietà title => è una serie => leggo il titolo e la proprietà name
                            var titolo = film_corrente.name;
                                var tipo = 'serie tv';
                                $('.card-film').addClass('tv');
                                console.log('QUESTA E UNA SERIE TV');
                        }
                        if(film_corrente.hasOwnProperty('original_title')) {
                            //se è definita la proprietà original_title => è un film => il titolo è nella proprietà title
                            var titolo_originale = film_corrente.original_title;
                                var tipo = 'film';
                        } else {
                            // se non è definita la proprietà original_title => è una serie => leggo il titolo e la proprietà name
                            var titolo_originale = film_corrente.original_name;
                                var tipo = 'serie tv';
                        }
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
                        console.log(lingua);
                        console.log(voto);
                        var template = {
                            titolo: titolo,
                            original_title: titolo_originale,
                            lingua: cerca_bandiera(lingua),
                            voto: voto,
                            stelle: stelle_a_video,
                            tipo: tipo
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

    function cerca_bandiera(codice_lingua) {
        var lista_bandierine = ['en', 'it', 'es', 'pt'];
        var bandiera = '';
        //controllo se esiste una icona corrispondente alla lingua
        // if(codice_lingua == 'it' || codice_lingua == 'en' || codice_lingua =='es' || codice_lingua == 'pt') {
        //ALTERNATIVA PIU' AZZECCATA
        if(lista_bandierine.includes(codice_lingua)){
            //se esiste la bandiera giusta, restituisce la lignua come da originale
            bandiera = '<img class="bandiera" src="Img/' + codice_lingua +'.png" "alt= bandiera' + codice_lingua + '">';
        } else {
            //se esiste la bandiera, restituisci la lingua così com'è
            bandiera = codice_lingua;
        }
        // RESTITUISCO LA VARIABILE CHE CONTIENE L'IMMAGINE DELLA BANDIERA (SE ESISTE), ALTRIMENTI IL CODICE LINGUA COME E' ARRIVATO IN INPUT
        return bandiera;
    }
    //Con switch
    // switch (codice_lingua) {
    //     case 'it' : {
    //         lingua_bandiera = '<img src="flags/it.png">';
    //         break;
    //     }
    //     case 'en' : {
    //         lingua_bandiera = '<img src="flags/en.png">';
    //         break
    //     }
    //     default {
    // lingua_bandiera = codice_lingua;
    //      }
    // }
});
