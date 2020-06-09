const soundboardAudio = {
  ocean: {
   sound: new Howl({
     src: ['./sounds/ocean.mp3'],
     volume: 0,
     html5: true,
     loop: true
   }),
   details: "sound details"
 },
 cafe: {
   sound: new Howl({
    src: ['./sounds/cafe.mp3'],
    volume: 0,
    html5: true,
    loop: true
  }),
  details: "sound details"
  },
  wind: {
   sound: new Howl({
     src: ['./sounds/wind.mp3'],
     volume: 0,
     html5: true,
     loop: true
   }),
   details: "sound details"
  }
}

let select = e => document.querySelector(e);
let selectAll = e => document.querySelectorAll(e);
const fadeTimeout = 1000;

function setupSoundButtons() {
  document.querySelector(".sound-grid__container").addEventListener("click", event => {
    if (event.target && event.target.matches("section.sound-box")) {
      //TODO: Header and Artwork are not triggering the click when clicked
      let buttonSound = event.target.dataset.sound;
      let currentVolume = event.target.querySelector('.sound-box__volume-slider').dataset.volume;

      if (soundboardAudio[buttonSound].sound.playing()) {
        soundboardAudio[buttonSound].sound.fade(currentVolume, 0, fadeTimeout);

        setTimeout(function() {
          soundboardAudio[buttonSound].sound.stop();
        }, fadeTimeout);

      } else {
        soundboardAudio[buttonSound].sound.play();
        soundboardAudio[buttonSound].sound.fade(0, currentVolume, 1000);

        console.log(soundboardAudio[buttonSound].sound.playing());
        console.log("stop", currentVolume);
      }
    }
  });
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
  const stopButton = select('.stop-button');
  stopButton.addEventListener('click', function(event) {
    Howler.stop();

    let soundButtonVolumeSliders = selectAll('.sound-box__volume-slider');
    soundButtonVolumeSliders.forEach(slider => {
      slider.dataset.volume = .5;
    });
  })
};

setupStopButton();
setupVolumeSliders();
setupSoundButtons();
