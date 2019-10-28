const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
            .then(localMediaStream => {
                //this won't work  ->  video.src = window.URL.createObjectURL(localMediaStream);
                video.srcObject = localMediaStream;
                video.play();
            })
            .catch(err => console.error('OH NO!', err))
}

function paintToCanvas(){
    const height = video.videoHeight;
    const width = video.videoWidth;
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
    }, 16);
}

function takePhoto(){
    //played sound
    snap.currentTime = 0;
    snap.play();

    //take the data out of the canvas
    const data = canvas.toDataURL('image/jpeg'); //if you console it will be a long text with atributes about the photo
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    strip.insertBefore(link, strip.firstChild); //insert the link it's going to happen rigth before the strip first child
}

getVideo();

video.addEventListener('canplay', paintToCanvas);
