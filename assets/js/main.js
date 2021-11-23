const wrapper = $wrapper,
    searchInput = $input,
    infoText = $iText;
let audio;

function data(res, txt) {
    if (res.title) {
        infoText.html(`Can't find the meanig of <span>${txt}</span>. Please try to search another`);
    } else {
        defs = res[0].meanings[0].definitions[0];
        phonetics = `${res[0].meanings[0].partOfSpeech} /${res[0].phonetics[0].text}`
        $word.text(res[0].word);
        $phonetics.text(phonetics)
        $meaning.text(defs.definition);
        $exp.text(defs.example);
        $list.innerHTML = '';
        if (res[0].phonetics[0].audio != undefined) {
            audio = new Audio('https:' + res[0].phonetics[0].audio);
        	$vol.css('opacity',1);
        	$vol.on('click', play)
        }
        if(res[0].phonetics[0].audio == undefined) {
        	$vol.css('opacity',0.5);
        	$vol.on('click', null)
        }
        if (defs.synonyms[0] == undefined) {
            $list.parentElement.css('display', 'none')
        } else {
            $list.parentElement.css('display', 'block')
            for (i = 0; i < 5; i++) {
                tag = ` <span onclick="search('${defs.synonyms[i]}')">${defs.synonyms[i]}</span>` + '<b style="color:gray">,</b>';
                $list.innerHTML += tag;
            }
        }
        wrapper.add('active');
    }
}
$clear.on('click', e => {
	$input.value = '';
	infoText.text('Type a word and press enter to see results')
	wrapper.remov('active');
})
function play() {
	audio.play()
}
function search(txt) {
    $input.value = txt;
    fethApi(txt)
}
wrapper.css({background: '#151515'});
        $h.css('color','#fff')
        p = document.querySelectorAll('.wrapper > ul p');
        for(each of p) {
            each.css('color', '#fff')
        }
$dark.on('change', e => {
    if($dark.checked) {
        $bounce.remov('active');
        $toggler.css('background', '#151515');
        wrapper.css({background: '#151515'});
        $h.css('color','#fff')
        p = document.querySelectorAll('.wrapper > ul p');
        for(each of p) {
            each.css('color', '#fff')
        }
        infoText.css('color', '#fff')
        document.body.css('background', '#212121')
    }
})
$light.on('change', e => {
    if($light.checked) {
        $bounce.add('active');
        $toggler.css({background: '#f9f9f9'})
    }
    wrapper.css({background: '#fff'});
        $h.css('color','#000')
        p = document.querySelectorAll('.wrapper > ul p');
        for(each of p) {
            each.css('color', '#000')
        }
        infoText.css('color', '#9a9a9a');
        document.body.css('background', '#fff')

})
$toggler.on('click', e => {
    if($light.checked) {
        $dark.checked = true;
        $toggler.css('background', '#151515')
        $bounce.remov('active');
        wrapper.css({background: '#151515'});
        $h.css('color','#fff')
        p = document.querySelectorAll('.wrapper > ul p');
        for(each of p) {
            each.css('color', '#fff')
        }
        infoText.css('color', '#fff')
        document.body.css('background', '#212121')
    }
    else {
        $light.checked = true;
        $toggler.css({background: '#f9f9f9'})
        $bounce.add('active');
        wrapper.css({background: '#fff'});
        $h.css('color','#000')
        p = document.querySelectorAll('.wrapper > ul p');
        for(each of p) {
            each.css('color', '#000')
        }
        infoText.css('color', '#9a9a9a')
        document.body.css('background', '#fff')
    }
})
function fethApi(txt) {
    infoText.css('color', '#000');
    infoText.html(`Searching the meaning of <span style="font-weight: 600">${txt}</span>`);
    url = `https://api.dictionaryapi.dev/api/v2/entries/en/${txt}`;
    fetch(url).then(response => response.json()).then(response => {
        data(response, txt)
    })
}

searchInput.on('keyup', e => {
    if (e.key === "Enter" && e.target.value) {
        fethApi(e.target.value)
    }
})
log('c%Hi', 'font-size:50px')