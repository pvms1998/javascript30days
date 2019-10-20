/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
let vol = ranges[0].value;

/* Build out functions */
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  console.log(icon);
  toggle.textContent = icon;
}

function skip() {
 video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
  vol = this.value;
  console.log(this.name);
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
let count = 0;
window.addEventListener('keyup', (e) => {
  if(e.key == "ArrowRight" )
    video.currentTime += 10;
  if(e.key == "ArrowLeft")
    video.currentTime -= 10;
  if(e.key == " ")
    togglePlay();
  if(e.key == "m" || e.key == "M")
    count++;
  /*if((e.key == "m" || e.key == "M") && ranges[0].value != 0)
  {
    video["volume"] = 0;
    ranges[0].value = 0;
  }*/
  if((e.key == "m" || e.key == "M") && count%2 != 0)
  {
    video["volume"] = 0;
    ranges[0].value = 0;
  }
  else
    /*if((e.key == "m" || e.key == "M") && ranges[0].value == 0 )
    {
      video["volume"] = vol;
      ranges[0].value = vol;
      console.log(ranges[0].value);
    }*/
    if((e.key == "m" || e.key == "M") )
    {
      video["volume"] = vol;
      ranges[0].value = vol;
    }
});

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
