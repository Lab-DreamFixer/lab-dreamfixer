const playlist = [
    { img: 'assets/images/wp_sfondo/dreamfixer_wp_components.webp', audio: 'assets/audio/dreamfixer_components.mp3' },
    { img: 'assets/images/wp_sfondo/dreamfixer_wp_master_panca.webp', audio: 'assets/audio/dreamfixer_panca.mp3' },
    { img: 'assets/images/wp_sfondo/dreamfixer_wp_master_camera.webp', audio: 'assets/audio/dreamfixer_camera.mp3' },
    { img: 'assets/images/wp_sfondo/dreamfixer_wp_master_sky.webp', audio: 'assets/audio/dreamfixer_sky.mp3' },
    { img: 'assets/images/me/dreamfixer_glitch_master.webp', audio: 'assets/audio/dreamfixer_glitch.mp3' },
    { img: 'assets/images/logo/dreamfixer_master1920x1080.webp', audio: 'assets/audio/dreamfixer_clessidra.mp3' }
];
const dictionary = {
    it: { 
        marquee: "+++ LAB-DREAMFIXER +++ RIPARATORE DI SOGNI +++ IN FASE DI CONFIGURAZIONE +++", 
        btn: "Sintonizzati con il Lab",
        hint: "SCORRI PER SINTONIZZARE"
    },
    en: { 
        marquee: "+++ LAB-DREAMFIXER +++ MANDER OF DREAMS +++ TUNING IN PROGRESS +++", 
        btn: "Tune into the Lab",
        hint: "SCROLL TO TUNE"
    },
    ru: { 
        marquee: "+++ LAB-DREAMFIXER +++ РЕМОНТНИК СНОВ +++ идет настройка +++", 
        btn: "Настройся на Лабораторию", 
        hint: "ПРОКРУТИТЕ ДЛЯ НАСТРОЙКИ"
    }
};
let currentTrack = 0;
let loopTimer;

const bgContainer = document.getElementById('bg-container');
const audioPlayer = document.getElementById('audio-player');
const entryOverlay = document.getElementById('entry-overlay');
const marquee = document.getElementById('main-marquee');
const imgClessidra = document.getElementById('img-clessidra');
const btnEntry = document.getElementById('entry-btn');
const footer = document.getElementById('lab-footer');

// --- LOGICA DELLO SCROLL ---
entryOverlay.addEventListener('scroll', () => {
    const hint = document.getElementById('scroll-hint');
    if (hint && entryOverlay.scrollTop > 20) hint.style.opacity = "0";

    let scrollPos = entryOverlay.scrollTop;
    let windowHeight = window.innerHeight;
    let scrollPercent = scrollPos / (windowHeight * 7); 

    imgClessidra.style.opacity = scrollPercent * 2.5;
    let moveY = 500 - (scrollPercent * 3500); 
    if (moveY < 0) moveY = 0; 
    imgClessidra.style.transform = `translateY(${moveY}px)`;

    if (moveY <= 0) { 
        btnEntry.style.opacity = 1;
        btnEntry.style.pointerEvents = "auto";
        if(footer) footer.style.opacity = 1; // ACCENDE LA BARRA AL TERMINE DELLO SCROLL
    } else {
        btnEntry.style.opacity = 0;
        btnEntry.style.pointerEvents = "none";
         if(footer) footer.style.opacity = 0; // LA SPEGNE SE TORNI SU
    }
});

function changeLang(lang) {
    if (window.event) window.event.stopPropagation();
    marquee.innerText = dictionary[lang].marquee;
    btnEntry.innerText = dictionary[lang].btn;
    const hintText = document.getElementById('hint-text');
    if (hintText) hintText.innerText = dictionary[lang].hint;
}

function updateMainframe() {
    const track = playlist[currentTrack];
    bgContainer.style.opacity = 0;
    setTimeout(() => {
        bgContainer.style.backgroundImage = `url('${track.img}')`;
        bgContainer.style.opacity = 1;
        audioPlayer.src = track.audio;
        audioPlayer.load();
        audioPlayer.play().catch(e => console.log("Input richiesto"));
        currentTrack = (currentTrack + 1) % playlist.length;
    }, 400);
}

// INGRESSO
btnEntry.addEventListener('click', (e) => {
    e.stopPropagation();
    entryOverlay.style.display = 'none';
    if(footer) footer.style.opacity = 1;
    updateMainframe();
    loopTimer = setInterval(updateMainframe, 109000);
});

// NAVIGAZIONE
window.addEventListener('click', () => {
    if (entryOverlay.style.display === 'none') {
        clearInterval(loopTimer);
        updateMainframe();
        loopTimer = setInterval(updateMainframe, 109000);
    }
});