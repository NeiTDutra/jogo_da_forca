/*
/ Jogo da força
/ file: jogoForca.js
/ 
*/

var palavra = '';
var letra = '';
var count = 0;
var winn = 0;
var letra_d = [];
var l_digitada = [];

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
    }
    document.getElementById('palavra').style.display = 'none';
    document.getElementById('letra').style.display = 'block';
    document.getElementById('div_word').innerHTML += '<p class="text-primary ml-5">Palavra com '+palavra.length+' letras.</p>';
    
    for(let w = 0; w < palavra.length; w++) {
    
        document.getElementById('div_word').innerHTML += '<div class="letter text-center" id="div_l_'+w+'"></div>';
    }
    
    document.getElementById('in_word').value = '';
}

// chama a função testtaLetra(letra) ao receber  valor por input "in_letter"
function testaLetra() {
    
    letra = document.getElementById('in_letter').value;
    if(letra == '') {
        alert('Digite uma letra!');
        letra = '';
        document.getElementById('in_letter').value = '';
        document.getElementById('in_letter').focus();
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
            if(count == 7) {
                setTimeout( () => {
                
                    document.getElementById('game_over').style.display = 'block';
                }, 2000);
                setTimeout( function() {
                
                    alert('Acabou o jogo, o boneco está na forca!!!');
                    palavra = '';
                    letra = '';
                    count = 0;
                    winn = 0;
                    l_digitada = '';
                    window.location.reload(true);
                }, 7000);

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


