const soundboardAudio = {
  construction: {
   sound: new Howl({
     src: ['./sounds/gentrification-construction.webm','./sounds/gentrification-construction.mp3'],
     volume: 0,
     html5: true,
     loop: true
   }),
   details: "gentrification construction"
 },
 protest: {
   sound: new Howl({
    src: ['./sounds/standing-rock-protest.webm','./sounds/standing-rock-protest.mp3'],
    volume: 0,
    html5: true,
    loop: true
  }),
  details: "standing rock protest"
  },
  sweatshop: {
   sound: new Howl({
     src: ['./sounds/sweat-shop.webm','./sounds/sweat-shop.mp3'],
     volume: 0,
     html5: true,
     loop: true
   }),
   details: "sewing sweat shop"
 },
  deforestation: {
   sound: new Howl({
     src: ['./sounds/deforestation.webm','./sounds/deforestation.mp3'],
     volume: 0,
     html5: true,
     loop: true
   }),
   details: "rain forest deforestation"
 },
 oil: {
  sound: new Howl({
    src: ['./sounds/oil-drilling.webm','./sounds/oil-drilling.mp3'],
    volume: 0,
    html5: true,
    loop: true
  }),
  details: "oil drilling"
},
landfill: {
 sound: new Howl({
   src: ['./sounds/landfill.webm','./sounds/landfill.mp3'],
   volume: 0,
   html5: true,
   loop: true
 }),
 details: "landfill"
},
glaciers: {
 sound: new Howl({
   src: ['./sounds/melting-glaciers.webm','./sounds/melting-glaciers.mp3'],
   volume: 0,
   html5: true,
   loop: true
 }),
 details: "melting glaciers"
},
plastic: {
 sound: new Howl({
   src: ['./sounds/plastic-pollution.webm','./sounds/plastic-pollution.mp3'],
   volume: 0,
   html5: true,
   loop: true
 }),
 details: "plastic pollution"
},
fracking: {
 sound: new Howl({
   src: ['./sounds/fracking.webm','./sounds/fracking.mp3'],
   volume: 0,
   html5: true,
   loop: true
 }),
 details: "fracking"
},
wildfires: {
 sound: new Howl({
   src: ['./sounds/wildfires.webm','./sounds/wildfires.mp3'],
   volume: 0,
   html5: true,
   loop: true
 }),
 details: "wildfires"
}
}

let select = e => document.querySelector(e);
let selectAll = e => document.querySelectorAll(e);
const fadeTimeout = 1000;

function setupSoundButtons() {
  const allButtons = selectAll('.sound-box');

  allButtons.forEach(button => {
    button.addEventListener('click', toggleButtonSounds);
  });
}

function toggleButtonSounds(event) {
  let buttonSound = event.currentTarget.dataset.sound;
  let currentVolume = event.currentTarget.querySelector('.sound-box__volume-slider').dataset.volume;

  if (event.target.matches('.sound-box__volume') || event.target.matches('.sound-box__volume-slider')) {
    return;
  }

  if (soundboardAudio[buttonSound].sound.playing()) {
    soundboardAudio[buttonSound].sound.fade(currentVolume, 0, fadeTimeout);

    setTimeout(function() {
      soundboardAudio[buttonSound].sound.stop();
    }, fadeTimeout);

    console.log("playing", currentVolume);

    event.currentTarget.querySelector('.sound-box__header').style.opacity = 0;
    event.currentTarget.querySelector('.sound-box__icon').style.opacity = 1;
    event.currentTarget.querySelector('.sound-box__volume').style.opacity = 0;
  } else {
    soundboardAudio[buttonSound].sound.play();
    soundboardAudio[buttonSound].sound.fade(0, currentVolume, 1000);

    console.log(soundboardAudio[buttonSound].sound.playing());
    console.log("stop", currentVolume);

    event.currentTarget.querySelector('.sound-box__header').style.opacity = 1;
    event.currentTarget.querySelector('.sound-box__icon').style.opacity = 0.1;
    event.currentTarget.querySelector('.sound-box__volume').style.opacity = 1;
  }
}

function setupVolumeSliders() {
  const volumeSliders = selectAll('.sound-box__volume-slider');

  volumeSliders.forEach(slider => {
    slider.addEventListener('click', event => {
      let sliderSound = event.target.dataset.sound;
      let currentVolume = event.target.value;
      soundboardAudio[sliderSound].sound.fade(event.target.dataset.volume, currentVolume, 100);
      event.target.dataset.volume = event.target.value;
    })
  })
}

function setupStopButton() {
  const stopButton = select('.header__stop-button');
  stopButton.addEventListener('click', function(event) {
    Howler.stop();

    let soundButtons = selectAll('.sound-box');
    soundButtons.forEach(button => {
      button.querySelector('.sound-box__header').style.opacity = 0;
      button.querySelector('.sound-box__icon').style.opacity = 1;
      button.querySelector('.sound-box__volume').style.opacity = 0;
      button.querySelector('.sound-box__volume-slider').dataset.volume = ".5";

      setTimeout(function() {
        button.querySelector('.sound-box__volume-slider').value = .5;
      }, 1500);

    });
  });
};


setupSoundButtons();
setupStopButton();
setupVolumeSliders();
