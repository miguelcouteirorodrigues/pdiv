function sound(id) {
    /* var element = document.getElementById("audio_" + id);
    //this.sound;
    this.sound = document.createElement("audio");

    if (element == null) {
        //this.sound = document.createElement("audio");
        this.sound.id = "audio_" + id;
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        this.sound.loop = loop;
        document.body.appendChild(this.sound);
    } */

    this.sound = document.getElementById("audio_" + id);

    this.play = function() {
        this.sound.play();
    }
    
    this.pause = function() {
        this.sound.pause();
    }

    this.mute = function() {
        this.sound.volume = 0;
    }

    this.unMute = function() {
        this.sound.volume = .5;
    }

    this.stop = function(id) {
        this.sound.pause();
        this.sound.currentTime = 0;
    }
}