/*
/ Jogo da força
/ file: ./jogoForca.js
/ description: arquivo que contém toda lógica do jogo
/ date: março/2021
/ author: Nei Thomassin Dutra
/ git: https://gitlab.com/neithomass/hangman_game
*/

var palavra = '';
var letra = '';
var count = 0;
var winn = 0;
var letra_d = [];
var l_digitada = [];
var dica_i = '';
var dica_ii = '';
var dica_iii = '';

// chama a função criaCaixaDeLetra(palavra) ao receber valor por input "in_word"
function criaCaixaDeLetra() {

    palavra = document.getElementById('in_word').value;
    if(palavra == '') {
        alert('Digite uma palavra!');
        window.location.reload(true);
        palavra = '';
        letra = '';
        count = 0;
        winn = 0;
        l_digitada = '';
        document.getElementById('in_word').value = '';
        document.getElementById('in_word').focus();
        return;
    }
    document.getElementById('palavra').style.display = 'none';
    document.getElementById('input_dica_i').style.display = 'block';
    document.getElementById('dica_i').focus();
    document.getElementById('div_word').innerHTML += '<p class="text-primary ml-3">Palavra com '+palavra.length+' letras.</p>';
    
    for(let w = 0; w < palavra.length; w++) {
    
        document.getElementById('div_word').innerHTML += '<div class="letter text-center" id="div_l_'+w+'"></div>';
    }
    
    document.getElementById('in_word').value = '';
}

// chama a função guardaDica(dica) ao receber valor por input "dica_i", "dica_ii" e "dica_iii"
function guardaDica(d) {


    input_i = document.getElementById('input_dica_i');
    input_ii = document.getElementById('input_dica_ii');
    input_iii = document.getElementById('input_dica_iii');
    if(d === 'dica_i') {
    
        dica_i = document.getElementById('dica_i').value;
        input_i.style.display = 'none';
        input_ii.style.display = 'block';
        document.getElementById('dica_ii').focus();
        document.getElementById('dica_i').value = '';
        return;
    }
    if(d === 'dica_ii') {
    
        dica_ii = document.getElementById('dica_ii').value;
        input_ii.style.display = 'none';
        input_iii.style.display = 'block';
        document.getElementById('dica_iii').focus();
        document.getElementById('dica_ii').value = '';
        return;
    }
    if(d === 'dica_iii') {
    
        dica_iii = document.getElementById('dica_iii').value;
        input_iii.style.display = 'none';
        document.getElementById('letra').style.display = 'block';
        document.getElementById('letra').focus();
        document.getElementById('dica_iii').value = '';
        return;
    }
    
}

// chama a função testtaLetra(letra) ao receber  valor por input "in_letter"
function testaLetra() {
    
    letra = document.getElementById('in_letter').value;
    if(letra == '') {
        alert('Digite uma letra!');
        letra = '';
        document.getElementById('in_letter').value = '';
        document.getElementById('in_letter').focus();
        return;
    }
    
    letra_d += letra;
    var print = letra_d.split('').join(' - ','');
    document.getElementById('l_digitada').innerHTML = '<h4 class="text-danger text-center">'+print+'</h4>'; 

    if((!l_digitada.includes(letra)) || (l_digitada.indexOf(letra) === -1)) {
    
        l_digitada += letra;
    
        if(palavra.includes(letra)) {
            for(let i = 0; i < palavra.length; i++) {
                if(letra === palavra[i]){
                    document.getElementById('div_l_'+i).innerHTML = '<h3>'+letra+'</h3>';
                    winn ++;
                    if(winn === palavra.length) {
                        alert('PARABÉNS, você ganhou o jogo!!!');
                        palavra = '';
                        letra = '';
                        count = 0;
                        winn = 0;
                        l_digitada = '';
                        window.location.reload(true);
                        
                    }
                }
            }
        }
        else{
            count ++;
            document.getElementById('forca'+count).style.display = 'block';
            document.getElementById('forca'+count).classList.toggle('animate');
            
            if(count == 2) {
            
                document.getElementById('dica').style.display = 'block';
                document.getElementById('dica').innerHTML += '<p class="text-warning ml-3"><strong>1/3: </strong>'+dica_i+'...</p>';
            }if(count == 4) {
            
                document.getElementById('dica').innerHTML += '<p class="text-warning ml-3"><strong>2/3: </strong>'+dica_ii+'...</p>';
            }if(count == 6) {
            
                document.getElementById('dica').innerHTML += '<p class="text-warning ml-3"><strong>3/3: </strong>'+dica_iii+'...</p>';
            }
            if(count == 7) {
                setTimeout( () => {
                
                    document.getElementById('game_over').style.display = 'block';
                }, 500);
                setTimeout( function() {
                
                    palavra = '';
                    letra = '';
                    count = 0;
                    winn = 0;
                    l_digitada = '';
                    window.location.reload(true);
                }, 4000);

            }
        }
        letra = '';
        document.getElementById('in_letter').value = '';
        document.getElementById('in_letter').focus();
        
        
    }
    else {
        console.log(letra+' já existe');
        alert('A letra '+letra+' já foi digitada!!');
        document.getElementById('in_letter').value = '';
        document.getElementById('in_letter').focus();
    }
}


