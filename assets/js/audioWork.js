document.addEventListener('DOMContentLoaded', function() {
    var audio = document.getElementById('audioWork');
    var playButton = document.getElementById('playButton');
    var currentTimeDisplay = document.getElementById('currentTime');
    var audioTimeDisplay = document.getElementById('audioTime');
    
    // Display total duration once the metadata is loaded
    audio.addEventListener('loadedmetadata', function() {
        var totalMinutes = Math.floor(audio.duration / 60);
        var totalSeconds = Math.floor(audio.duration % 60);
        if (totalSeconds < 10) {
            totalSeconds = '0' + totalSeconds;
        }
        audioTimeDisplay.textContent = totalMinutes + ':' + totalSeconds;
    });

    // Play or pause audio when button is clicked
    playButton.addEventListener('click', function() {
        if (audio.paused) {
            audio.play().catch(function(error) {
                console.error('Error playing audio:', error);
            });
            playButton.textContent = 'Pause';
        } else {
            audio.pause();
            playButton.textContent = 'Play';
        }
    });

    // Update current time display
    audio.addEventListener('timeupdate', function() {
        var currentMinutes = Math.floor(audio.currentTime / 60);
        var currentSeconds = Math.floor(audio.currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = '0' + currentSeconds;
        }
        currentTimeDisplay.textContent = currentMinutes + ':' + currentSeconds;
    });
});
