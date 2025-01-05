document.addEventListener('DOMContentLoaded', function() {
    var audio = document.getElementById('audioWork');
    var playButton = document.getElementById('playButton');
    var currentTimeDisplay = document.getElementById('currentTime');
    var audioTimeDisplay = document.getElementById('audioTime');

    // Function to format time with leading zeros
    function formatTime(time) {
        var minutes = Math.floor(time / 60);
        var seconds = Math.floor(time % 60);
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return minutes + ':' + seconds;
    }

    // Display total duration once the metadata is loaded
    audio.addEventListener('loadedmetadata', function() {
        audioTimeDisplay.textContent = formatTime(audio.duration);
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
        currentTimeDisplay.textContent = formatTime(audio.currentTime);
    });
});
