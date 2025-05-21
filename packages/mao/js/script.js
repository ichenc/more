// script.js
window.addEventListener('load', () => {
    try {
        // ========== 全局变量 ==========
        let isMusicPlaying = false;
        let currentTrack = 0;
        let isUserInteracted = false;

        // ========== 元素获取 ==========
        const loader = document.querySelector('.loader');
        const musicPlayer = document.querySelector('.music-player');
        const audio = document.getElementById('bgm');
        const tracks = document.querySelectorAll('.track');
        const playBtn = document.querySelector('.play-btn');
        const statusText = document.querySelector('.player-controls div');
        const carouselContainer = document.querySelector('.carousel-container');
        const linkContainer = document.querySelector('.link-container');
        const relatedContainer = document.querySelector('.related-container');

        // ========== 音乐播放控制 ==========
        const initMusicPlayer = () => {
            // 自动播放设置
            audio.autoplay = false;
            audio.loop = true;

            // 全局点击监听（仅用于首次播放）
            document.addEventListener('click', (e) => {
                if (!musicPlayer.contains(e.target) && !isUserInteracted) {
                    isUserInteracted = true;
                    audio.play().then(() => {
                        playBtn.textContent = '⏸';
                        isMusicPlaying = true;
                    }).catch(() => {
                        statusText.innerHTML = '点击播放按钮开始播放';
                    });
                }
            });

            // 尝试自动播放
            setTimeout(() => {
                audio.play().then(() => {
                    isMusicPlaying = true;
                    playBtn.textContent = '⏸';
                }).catch(() => {
                    statusText.innerHTML = '点击页面任意位置开始播放';
                });
            }, 1000);
        };

        const togglePlayback = () => {
            if (audio.paused) {
                audio.play();
                playBtn.textContent = '⏸';
                isMusicPlaying = true;
            } else {
                audio.pause();
                playBtn.textContent = '▶';
                isMusicPlaying = false;
            }
        };

        // ========== 曲目切换功能 ==========
        const updateTrack = (index) => {
            currentTrack = (index + tracks.length) % tracks.length;
            const sources = document.querySelectorAll('source');
            
            statusText.innerHTML = '<span class="loading">加载中...</span>';
            audio.src = sources[currentTrack].src;
            
            audio.addEventListener('canplay', () => {
                tracks.forEach(t => t.classList.remove('active'));
                tracks[currentTrack].classList.add('active');
                statusText.textContent = tracks[currentTrack].textContent;
                if (isMusicPlaying) audio.play();
            });
            
            audio.addEventListener('error', () => {
                statusText.textContent = '❌ 音频加载失败';
            });
        };

        // ========== 页面初始化 ==========
        const initPage = () => {
            // 加载动画
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);

            // 导航切换
            document.getElementById('home').addEventListener('click', () => {
                carouselContainer.style.display = 'block';
                linkContainer.style.display = 'none';
                relatedContainer.style.display = 'none';
            });

            document.getElementById('tvbox').addEventListener('click', () => {
                carouselContainer.style.display = 'none';
                linkContainer.style.display = 'block';
                relatedContainer.style.display = 'none';
            });

            document.querySelectorAll('.nav-item')[2].addEventListener('click', () => {
                carouselContainer.style.display = 'none';
                linkContainer.style.display = 'none';
                relatedContainer.style.display = 'block';
            });

            // 播放器控制
            playBtn.addEventListener('click', togglePlayback);

            // 曲目点击切换
            tracks.forEach((track, index) => {
                track.addEventListener('click', () => {
                    updateTrack(index);
                    if (!isMusicPlaying) togglePlayback();
                });
            });

            // 跳转链接
          document.querySelectorAll('.link-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.stopPropagation();
        const url = item.querySelector('.link-url').innerText;
        // 直接跳转到链接
        window.location.href = url;
    });
});

            // 图片错误处理
            document.querySelectorAll('img').forEach(img => {
                img.onerror = () => {
                    img.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iMzM4Ij48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmMGZjIi8+PHRleHQgeD0iNTAiIHk9IjE1MCIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzZiNWI5NSI+5Zu+5qCH5byA5aeL5pyA5ZCO5LiA5Liq5pWwPC90ZXh0Pjwvc3ZnPg==';
                };
            });

            // 显示音乐播放器
            setTimeout(() => musicPlayer.classList.add('active'), 1000);
        };

        // ========== 樱花特效 ==========
        const createSakura = () => {
            const sakura = document.createElement('div');
            sakura.className = 'sakura';
            sakura.style.left = Math.random() * 100 + 'vw';
            sakura.style.animationDuration = Math.random() * 3 + 5 + 's';
            sakura.innerHTML = '🌸';
            document.body.appendChild(sakura);
            setTimeout(() => sakura.remove(), 8000);
        };
        setInterval(createSakura, 300);

        // ========== 轮播逻辑 ==========
        let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-item');
        const quotes = document.querySelectorAll('.quote-text');

        const showSlide = (n) => {
            slides[currentSlide].classList.remove('active');
            quotes[currentSlide].classList.remove('active');
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            setTimeout(() => quotes[currentSlide].classList.add('active'), 500);
        };
        setInterval(() => showSlide(currentSlide + 1), 5000);

        // ========== 初始化执行 ==========
        initMusicPlayer();
        initPage();

    } catch (error) {
        console.error('初始化错误:', error);
        document.querySelector('.loader')?.remove();
    }
});

// ========== 浮动播放按钮控制 ==========
document.querySelector('.mobile-play-btn').addEventListener('click', () => {
    const player = document.querySelector('.music-player');
    player.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    const player = document.querySelector('.music-player');
    if (!player.contains(e.target) && !document.querySelector('.mobile-play-btn').contains(e.target)) {
        player.classList.remove('active');
    }
});

// ========== 自动下一首功能 ==========
const audio = document.getElementById('bgm');
audio.addEventListener('ended', () => {
    const nextTrack = (currentTrack + 1) % tracks.length;
    updateTrack(nextTrack);
    if (isMusicPlaying) {
        audio.play();
    }
});