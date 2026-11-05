
// ===== 音樂播放器 =====

const songs = [
    {
        title: "GUILTY PLEASURE",
        artist: "I.N",
        file: "music/guilty pleasure.mp3",
        cover: "jpg/guilty pleasure.png"
    },
    {
        title: "M.I.A.",
        artist: "Stray Kids",
        file: "music/M.I.A .mp3",
        cover: "jpg/Stray Kids 2020.png"
    },
    {
        title: "START!",
        artist: "Lee Know,Seungmin,I.N",
        file: "music/START!.mp3",
        cover: "jpg/START!.png"
    }
];

let currentSong = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("song-title");
const artist = document.getElementById("song-artist");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("play-btn");
const progress = document.getElementById("progress");

const playlist = document.getElementById("playlist");

// 載入歌曲
function loadSong(index) {
    const song = songs[index];

    title.textContent = song.title;
    artist.textContent = song.artist;
    cover.src = song.cover;
    audio.src = song.file;

    updatePlaylist();
}

// 播放與暫停
function togglePlay() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

// 更新播放按鈕
audio.addEventListener("play", () => {
    playBtn.textContent = "Ⅱ";
});

audio.addEventListener("pause", () => {
    playBtn.textContent = "▶";
});

// 下一首
function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    audio.play();
}

// 上一首
function prevSong() {
    currentSong =
        (currentSong - 1 + songs.length) % songs.length;

    loadSong(currentSong);
    audio.play();
}

// 播放結束自動下一首
audio.addEventListener("ended", nextSong);

// 更新進度條
audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progress.value =
            (audio.currentTime / audio.duration) * 100;

        document.getElementById("current-time").textContent =
            formatTime(audio.currentTime);

        document.getElementById("duration").textContent =
            formatTime(audio.duration);
    }
});

// 拖曳進度條
progress.addEventListener("input", () => {
    if (audio.duration) {
        audio.currentTime =
            (progress.value / 100) * audio.duration;
    }
});

// 時間格式
function formatTime(time) {
    if (!Number.isFinite(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return minutes + ":" + String(seconds).padStart(2, "0");
}

// 建立歌曲清單
function updatePlaylist() {
    playlist.innerHTML = "";

    songs.forEach((song, index) => {
        const item = document.createElement("div");

        item.className = "song-item";

        if (index === currentSong) {
            item.classList.add("active");
        }

        item.innerHTML = `
            <span>${song.title} - ${song.artist}</span>
            <span>♪</span>
        `;

        item.addEventListener("click", () => {
            currentSong = index;
            loadSong(currentSong);
            audio.play();
        });

        playlist.appendChild(item);
    });
}

// 初始化
loadSong(currentSong);
