/*
/ Jogo da força
/ file: ./jogoForca.js
/ description: arquivo que contém toda lógica do jogo
/ date: março/2021
/ author: Nei Thomassin Dutra
/ git: https://gitlab.com/neithomass/hangman_game
*/

// declaração das variáveis 

var palavra = '';
var letra = '';
var count = 0;
var win = 0;
var letra_d = [];
var l_digitada = [];
var plvr = '';
var dica_i = '';
var dica_ii = '';
var dica_iii = '';
var testNumRand = [];

// chama a função que escolhe aleatoriamente palavra e dicas,
// faz a busca em dados no formato json no arquivo "palavraoculta.json",
// usando a classe "XMLHttpRequest"...

function random() {
    
    document.getElementById('palavra').style.display = 'none';
    document.getElementById('letra').style.display = 'block';
    document.getElementById('letra').focus();
    var requestUrl = './palavraoculta.json';
    var request = new XMLHttpRequest();
    request.open('POST', requestUrl);
    request.responseType = 'json';
    request.send();
    request.onload = () => {
    
        var res = request.response;
        var d = res.data;
        // passa o array para a função que escolhe palavra e dicas
        saveOnVar(d);
        // passa a palavra escolhida para a função que cria as caixas do jogo no html
        criaCaixaDeLetra(plvr);
    }
    // função que faz a escolha aleatoria e guarda os valores nas variáveis
    function saveOnVar(data) {
            
        let range = data.length;
        var numRand = Math.floor(Math.random() * range);

        for(let p = 0; p < testNumRand.length; p++) {

            if(numRand === testNumRand[p]) {

                return;
            }
            else {
                
                testNumRand += numRand;
            }
        }
        
        for(let i = 0; i < range; i++) {
        
            if(i === numRand) {
            
                plvr = data[i].palavra;
                dica_i = data[i].dica.dica_i;
                dica_ii = data[i].dica.dica_ii;
                dica_iii = data[i].dica.dica_iii;
            }
        }
    }
}

// chama a função criaCaixaDeLetra(palavra) ao receber valor por input ("in_word") ou,
// pela função "random()".

function criaCaixaDeLetra(p) {

    if(p !== 'yes') {
    
        palavra = p.toUpperCase();
    }
    else {
    
        palavra = document.getElementById('in_word').value.toUpperCase();
    
        if(palavra == '') {
        
            alert('Digite uma palavra ou deixe o sistema escolher!');
            document.getElementById('in_word').value = '';
            document.getElementById('in_word').focus();
            return;
        }
        
        document.getElementById('palavra').style.display = 'none';
        document.getElementById('input_dica_i').style.display = 'block';
        document.getElementById('dica_i').focus();
    
    }
    document.getElementById('div_word').innerHTML += '<p class="text-primary ml-3">Palavra com '+palavra.length+' letras.</p>';
    // laço que cria as caixas/posições no html
    for(let w = 0; w < palavra.length; w++) {
    
        document.getElementById('div_word').innerHTML += '<div class="letter text-center slide" id="div_l_'+w+'"></div>';
    }
    
    document.getElementById('in_word').value = '';
}

// chama a função guardaDica(dica) ao receber valor por input ("dica_i", "dica_ii" e "dica_iii")
// só é usada caso não seja escolha automática aleatoria (random())

function guardaDica(d) {


    input_i = document.getElementById('input_dica_i');
    input_ii = document.getElementById('input_dica_ii');
    input_iii = document.getElementById('input_dica_iii');
    
    switch(d) {
    
        case 'dica_i':

            dica_i = document.getElementById('dica_i').value;
            input_i.style.display = 'none';
            input_ii.style.display = 'block';
            document.getElementById('dica_i').value = '';
            document.getElementById('dica_ii').focus();
            break;

        case 'dica_ii':

            dica_ii = document.getElementById('dica_ii').value;
            input_ii.style.display = 'none';
            input_iii.style.display = 'block';
            document.getElementById('dica_ii').value = '';
            document.getElementById('dica_iii').focus();
            break;

        case 'dica_iii':

            dica_iii = document.getElementById('dica_iii').value;
            input_iii.style.display = 'none';
            document.getElementById('letra').style.display = 'block';
            document.getElementById('dica_iii').value = '';
            document.getElementById('letra').focus();
            break;

        default:

            alert('[ERROR] This error is not defined!')
    }
}

// chama a função testaLetra() ao receber  valor por input ("in_letter")
// função principal do jogo que, percorre o objeto palavra e verifica se contêm a letra
// quando encontra imprime a caixa/posição correspondente,
// a cada dois erros imprime uma das três dicas e
// a cada erro monta o boneco na forca :(

function testaLetra() {
    
    letra = document.getElementById('in_letter').value.toUpperCase();
    document.getElementById('in_letter').value = '';
    document.getElementById('in_letter').focus();
    
    if(letra == '' || letra.length > 1) {
    
        alert('Digite uma e, somente uma letra!');
        letra = '';
        return;
    }
    
    letra_d += letra;
    var print = letra_d.split('').join(' - ','');
    // após adicionar a letra na array ("letra_d") imprime o html com as palavras já digitadas
    document.getElementById('l_digitada').innerHTML = '<h4 class="text-danger text-center bg-white">'+print+'</h4>';

    if((!l_digitada.includes(letra)) || (l_digitada.indexOf(letra) === -1)) {
    
        l_digitada += letra;
    
        if(palavra.includes(letra)) {
            // laço que verifica a posição da letra na palvra
            for(let i = 0; i < palavra.length; i++) {
            
                if(letra === palavra[i]){
                    // imprime a letra no html na posição/caixa correspondente 
                    document.getElementById('div_l_'+i).innerHTML = '<h3 class="font-weight-bold">'+letra+'</h3>';
                    win ++;
                    // se o contador ("win") atingiu o tamanho da palavra o jogador ganhou :)
                    if(win === palavra.length) {
            
                            document.getElementById('game_over').style.display = 'block';
                            document.getElementById('title-final').innerText = 'YOU WON!!! CONGRATULATIONS!!!';
                        
                            palavra = '';
                            letra = '';
                            count = 0;
                            winn = 0;
                            l_digitada = '';
                    }
                }
            }
        }
        else{
            // este bloco trata das letras que não estão na palavra do jogo
            // monta parte do boneco e,
            // de acordo com o contador ("count") imprime no html uma dica a cada dois erros
            count ++;
            document.getElementById('forca'+count).style.display = 'block';
            document.getElementById('forca'+count).classList.toggle('animate');
            
            if(count == 2) {
            
                document.getElementById('dica').style.display = 'block';
                setTimeout( () => {
                    document.getElementById('dica').innerHTML += '<p class="text-warning inidica"><strong>(1/3): </strong>'+dica_i+'...</p>';
                }, 1000);

            }if(count == 4) {
            
                document.getElementById('dica').innerHTML += '<p class="text-warning inidica"><strong>(2/3): </strong>'+dica_ii+'...</p>';
            
            }if(count == 6) {
            
                document.getElementById('dica').innerHTML += '<p class="text-warning inidica"><strong>(3/3): </strong>'+dica_iii+'...</p>';
            
            }
            // se o contador ("count") chegou ao tamanho das partes do boneco
            // o jogo termina e o jogador perdeu o jogo :(
            if(count == 7) {
            
                    document.getElementById('game_over').style.display = 'block';
                    document.getElementById('title-final').innerText = 'YOU LOST!!! GAME OVER!!!';
                
                    palavra = '';
                    letra = '';
                    count = 0;
                    winn = 0;
                    l_digitada = '';
            }
        }
        
        letra = '';
        
        
    }
    else {
        // se a letra já foi digitada abre janela de aviso
        alert('A letra '+letra+' já foi digitada!!');
    }
}

// função que reseta o jogo mantendo alguns valores da jogada anterior

function resetGame() {

    palavra = '';
    letra = '';
    count = 0;
    winn = 0;
    l_digitada = '';
    window.location.reload(true);
}

// função que força o recarregamento da página ("deprecated")

function exitGame() {

    palavra = '';
    letra = '';
    count = 0;
    winn = 0;
    l_digitada = '';
    window.location.reload(true);
}
