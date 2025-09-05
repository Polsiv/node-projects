//youtube api
var videoList = [];
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
var videoIndex = 0;

// slider

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1, 
    spaceBetween: 10,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        576: { slidesPerView: 2 }, // 2 cards on small screens
        768: { slidesPerView: 3 }, // 3 cards on medium screens
        992: { slidesPerView: 4 }  // 4 cards on large screens
    }
});

// carousel

async function fetchYoutubeVideos() {
    try {
        const response = await fetch('http://localhost:3000/youtube/searchVideo/');
        const data = await response.json();

        const container = document.getElementById('VideoContainer');
        container.innerHTML = ''; // items already exisitng are cleared
        

        data.data.items.forEach(video => {
            const thumbnailUrl = video.snippet.thumbnails.high.url;
            const title = video.snippet.title;
            videoList.push(video.id.videoId);


            const card = document.createElement("div");
            card.classList.add("swiper-slide");
           
            card.innerHTML =  `
            <div class="card" onclick="playCardVideo(event)">
                <img src="${thumbnailUrl}" class="card-img-top" alt="Video Thumbnail">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                </div>
            </div>
        `;

            container.appendChild(card);
    });

    // reinitialize Swiper to detect new slides
    swiper.update();

    } catch (err) {
        console.log(err);
    }
};

// youtube iframe api 

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '700',
        width: '1700',
        videoId: videoList[videoIndex],
        playerVars: { 'playsinline': 1 },
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}



function togglePlayPause() {
    if (player.getPlayerState() == YT.PlayerState.PLAYING) {
        player.pauseVideo();
        document.getElementById("play-icon").classList.replace("fa-pause", "fa-play");
    } else {
        player.playVideo();
        document.getElementById("play-icon").classList.replace("fa-play", "fa-pause");
    }
}

function nextVideo() {
    videoIndex = (videoIndex + 1) % videoList.length;
    player.loadVideoById(videoList[videoIndex]);
}

function prevVideo() {
    videoIndex = (videoIndex - 1 + videoList.length) % videoList.length;
    player.loadVideoById(videoList[videoIndex]);
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        document.getElementById("play-icon").classList.replace("fa-play", "fa-pause");
    } else {
        document.getElementById("play-icon").classList.replace("fa-pause", "fa-play");
    }
}

function playCardVideo(event) {
    const slides = Array.from(document.querySelectorAll(".swiper-slide"));
    const clickedSlide = event.currentTarget.closest(".swiper-slide"); // Get the parent slide

    const index = slides.indexOf(clickedSlide);
    videoIndex = index; 
    player.loadVideoById(videoList[videoIndex]);
}


// what does this even do wtf
function resizePlayer() {

    if (!player) return;

    const container = document.getElementById("DisplayVideo-container");
    let width = container.clientWidth * 0.98; // Prevents slight overflow
    let height = width * 0.5625;

    // Ensure it's not too small on larger screens
    if (window.innerWidth > 1024) {
        width = Math.max(width, 900); // Minimum width for large screens
        height = width * 0.5625;
    }

    player.setSize(width, height);
}

window.addEventListener("resize", resizePlayer);
resizePlayer();


fetchYoutubeVideos();