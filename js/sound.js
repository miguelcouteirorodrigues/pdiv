function sound(id) {
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