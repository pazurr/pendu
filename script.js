let indexIMg = 0 ;
let  verifTableuax = [];

function getData() {
    fetch('BDD.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Traitez les données comme vous le souhaitez
        console.log('Données récupérées du fichier JSON :', data);
        let btnReload = document.getElementById('btnReload')

        let motDecomposer = []
        
        // en gros faut que tu regarde si la longeur de motDecomposer et la longeur de indexIMg pour voir si elelson identique la varibale indexIMg sera incrementer au fr et a mesure qu'il y a des mauvaise letre si il en manque une ça veux dire qu'il a reussi sionn non et pour l'index de l'image j'ais pas d'ide 

        btnReload.addEventListener("click", () => reload(data,motDecomposer,btnReload))

        let alphabets = document.getElementById('alphabet');
        data.alphabet.forEach((lettre,index)=> {
            let alphabet = lettre
            divA = `<a id="${index}">${alphabet}</a>`
            alphabets.insertAdjacentHTML('beforeend', divA)
        });
        for(let i = 0; i < data.alphabet.length; i++) {
            let lettreAlphabet = document.getElementById(`${i}`)

            lettreAlphabet.addEventListener("click", () => lettres(data,i,motDecomposer,btnReload))
        }

    });
}
getData();

function reload (data,motDecomposer,btnReload){   
    let imgP = document.getElementById('imgP')
    btnReload.classList.remove('btnavent')
    btnReload.classList.add('btnReload')
    resultata.classList.remove('visible')
    resultata.classList.add('pasVisible')
    let tirait = document.getElementById('tirait')

    imgP.src = "img/step_0.png"
    indexIMg = 0
    tirait.textContent = ""
    motDecomposer.length = 0;
    let random = Math.floor(Math.random() * data.words.length)
    let randomWords = data.words[random]
    console.log(randomWords);
    for (let i = 0; i < randomWords.length; i++) {
        console.log(randomWords[i]);  
        motDecomposer.push(randomWords[i])     
    }
    motDecomposer.forEach((element,index)=> {
        let tiraits = `<h2 id="trait${index}" class="verif"> _ </h2>`
        tirait.insertAdjacentHTML('beforeend', tiraits)
    });
}

function lettres (data,i,motDecomposer,btnReload){
    let titleResultat = document.getElementById('titleResultat')
    let resultata = document.getElementById('resultata')
    let verif = document.querySelectorAll('.verif')
    let imagePendu = document.getElementById('imgP')
    let lettre =  data.alphabet[i].toLowerCase()
    console.log(lettre);

    motDecomposer.forEach((mot,index)=> {
        let tirait = document.getElementById(`trait${index}`)
        if(lettre == mot){
            tirait.textContent = mot
            console.log("lalalala");
        }
    });

    let verifAttanchment = Array.from(verif).map(element => element.textContent.trim()).join(' ');
    console.log(verifAttanchment);
    if (verifTableuax == 0){
        verifTableuax.push(verifAttanchment)
        console.log(verifTableuax);
    }

    console.log(verifAttanchment,verifTableuax);
    
    if(verifAttanchment == verifTableuax){ 
        verifTableuax = []
        indexIMg += 1
        console.log(indexIMg);
        imagePendu.src = `img/imgPendu/step_${indexIMg}.png`;
        verifTableuax.push(verifAttanchment)
        console.log(verifTableuax);
    }else{
        verifTableuax = []
        verifTableuax.push(verifAttanchment)
        console.log("booh");   
    }

    if(indexIMg >11){
        console.log("perdu");
        btnReload.classList.add('btnavent')
        resultata.classList.add('visible')
        resultata.classList.remove('pasVisible')
        titleResultat.classList.remove('gagnier')
        titleResultat.classList.add('perdu')
        titleResultat.textContent = `PERDU ! le mot étais ${motDecomposer}`
    }   

    let resultat = verifTableuax[0].replace(/\s+/g, '').split('');
    console.log(resultat);
    
    if(resultat.includes("_")){
        console.log("domage loser");
    }else{
        console.log("GG");
        btnReload.classList.add('btnavent')
        resultata.classList.add('visible')
        resultata.classList.remove('pasVisible')
        titleResultat.classList.remove('perdu')
        titleResultat.classList.add('gagnier')
        titleResultat.textContent = `GG !`

    }
}

// oen gros ta un dernier probleme c'est juste que quand la page se charge pour la premier foi si on click direct sur une lettre ça va metre gg parce que le tableuax et vide donc ne contien pas de "_" 
// ce que tu doi faire :  en grso des qu'on va arriver sur la page on va avoir le nom du jeux et le bouton reload en gros il y aura pas les tirait et le lettre voila 