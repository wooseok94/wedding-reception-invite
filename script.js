document.addEventListener('DOMContentLoaded', function () {

    const slider = document.querySelector('.slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const counter = document.querySelector('.counter');

    // 기존 이미지들
    const images = document.querySelectorAll('.slider img');

    // 무한 슬라이드용 clone
    const firstClone = images[0].cloneNode(true);
    const lastClone = images[images.length - 1].cloneNode(true);

    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, images[0]);

    const allImages = document.querySelectorAll('.slider img');

    let currentIndex = 1;
    const totalActualImages = images.length;

    // 초기 위치
    updateSlider(false);

    // -----------------------
    // 슬라이더 업데이트
    // -----------------------
    function updateSlider(withAnimation = true) {

        if (withAnimation) {
            slider.style.transition = 'transform 0.4s ease';
        } else {
            slider.style.transition = 'none';
        }

        slider.style.transform = `translateX(-${currentIndex * 100}%)`;

        let displayIndex = currentIndex;

        if (currentIndex === 0) {
            displayIndex = totalActualImages;
        } else if (currentIndex === totalActualImages + 1) {
            displayIndex = 1;
        }

        if (counter) {
            counter.textContent = `${displayIndex} / ${totalActualImages}`;
        }
    }

    // -----------------------
    // 무한 루프 처리
    // -----------------------
    slider.addEventListener('transitionend', () => {

        if (currentIndex === 0) {
            currentIndex = totalActualImages;
            updateSlider(false);
        }

        if (currentIndex === totalActualImages + 1) {
            currentIndex = 1;
            updateSlider(false);
        }

    });

    // -----------------------
    // 다음 슬라이드
    // -----------------------
    function nextSlide() {

        if (currentIndex >= totalActualImages + 1) return;

        currentIndex++;
        updateSlider(true);
    }

    // -----------------------
    // 이전 슬라이드
    // -----------------------
    function prevSlide() {

        if (currentIndex <= 0) return;

        currentIndex--;
        updateSlider(true);
    }

    // 버튼 이벤트
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // =====================================================
    // 사파리 대응 스와이프
    // =====================================================

    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    slider.addEventListener('touchstart', (e) => {

        startX = e.touches[0].clientX;
        isDragging = true;

    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {

        if (!isDragging) return;

        currentX = e.touches[0].clientX;

    }, { passive: true });

    slider.addEventListener('touchend', () => {

        if (!isDragging) return;

        const diffX = startX - currentX;

        // 최소 이동 거리
        if (diffX > 50) {
            nextSlide();
        } else if (diffX < -50) {
            prevSlide();
        }

        isDragging = false;

    });

});

// 카카오 초기화 (JavaScript 키 입력)

Kakao.init('eec407ad50205d21489eb155bd4f8567');
Kakao.isInitialized();

function shareKakao() {
    Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
            title: '父김시운, 母이순덕의 子 김우석님의 결혼 피로연에 초대합니다',
            description: '2026년 6월 13일 토요일 오후 17시 30분 남서울웨딩',
            imageUrl:
                'https://wooseok94.github.io/wedding-reception-invite/img/1.jpg', // 메시지에 보일 대표 이미지 주소
            link: {
                mobileWebUrl: 'https://wooseok94.github.io/wedding-reception-invite/',
                webUrl: 'https://wooseok94.github.io/wedding-reception-invite/',
            },
        },
        buttons: [
            {
                title: '모바일 청첩장 보기',
                link: {
                    mobileWebUrl: 'https://wooseok94.github.io/wedding-reception-invite/',
                    webUrl: 'https://wooseok94.github.io/wedding-reception-invite/',
                },
            },
        ],
    });
}
// ⭐ 1. 토스트 알림을 위한 HTML 요소를 동적으로 추가
document.addEventListener('DOMContentLoaded', () => {
    const toastDiv = document.createElement('div');
    toastDiv.id = 'toast';
    toastDiv.textContent = '링크가 복사되었습니다.';
    document.body.appendChild(toastDiv);
});

// ⭐ 2. 토스트 알림을 보여주는 함수
function showToast() {
    const toast = document.getElementById('toast');
    if (!toast) return;

    // 이미 떠 있다면 중복 실행 방지
    if (toast.classList.contains('show')) return;

    // 'show' 클래스 추가
    toast.classList.add('show');

    // 2초(2000ms) 후에 'show' 클래스 제거
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// ⭐ 3. URL 복사 함수 (알럿을 토스트로 변경)
function copyToClipboard() {
    // 현재 페이지의 URL 가져오기
    const currentUrl = window.location.href;

    // 클립보드에 복사
    navigator.clipboard.writeText(currentUrl).then(() => {
        // 복사 성공 시 토스트 알림 실행
        showToast();
    }).catch(err => {
        // 예외 처리 (오래된 브라우저 등)
        console.error('복사 실패:', err);

        // 구형 방식 (fallback)
        const textArea = document.createElement("textarea");
        textArea.value = currentUrl;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showToast(); // 성공 시 토스트 알림
        } catch (err) {
            alert("복사 실패했습니다. 주소창의 링크를 직접 복사해주세요."); // 최후의 보루
        }
        document.body.removeChild(textArea);
    });
}

function copyAccount(accountNumber) {
    navigator.clipboard.writeText(accountNumber).then(() => {
        // 기존에 만들어둔 토스트 알림 함수 호출
        if (typeof showToast === 'function') {
            const toast = document.getElementById('toast');
            toast.textContent = '계좌번호가 복사되었습니다.'; // 메시지 변경
            showToast();
        } else {
            alert('계좌번호가 복사되었습니다.');
        }
    }).catch(err => {
        console.error('복사 실패:', err);
    });
}

function updateDDay() {
    const weddingDate = new Date("2026-06-13T17:30:00"); // 피로연 날짜 설정
    const now = new Date();

    // 두 날짜의 차이 계산 (밀리초 단위)
    const diff = weddingDate - now;

    // 일(day) 단위로 변환
    const dDay = Math.ceil(diff / (1000 * 60 * 60 * 24));

    const dDayElement = document.getElementById("d-day-count");
    if (dDayElement) {
        if (dDay > 0) {
            dDayElement.textContent = dDay;
        } else if (dDay === 0) {
            dDayElement.textContent = "Day"; // 당일인 경우
        } else {
            dDayElement.textContent = "+" + Math.abs(dDay); // 지난 경우
        }
    }
}

// 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", updateDDay);

const bgm = document.getElementById('bgm');
const btn = document.getElementById('music-floating-btn');
const icon = document.getElementById('status-icon');

function updateUI(isPlaying) {
    if (isPlaying) {
        icon.innerText = '⏸️'; // 정지 아이콘
    } else {
        icon.innerText = '🎵'; // 재생 아이콘
    }
}

// 첫 터치 시 재생 (브라우저 정책 대응)
document.addEventListener('click', function () {
    if (bgm.paused) {
        bgm.play().then(() => updateUI(true));
    }
}, { once: true });

// 버튼 클릭 토글
btn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (bgm.paused) {
        bgm.play();
        updateUI(true);
    } else {
        bgm.pause();
        updateUI(false);
    }
});

const container = document.getElementById('image-container');
const totalImages = 32; // 전체 이미지 개수

for (let i = 1; i <= totalImages; i++) {
    const img = document.createElement('img');

    // 파일 경로 설정 (i가 1일 때 1.jpg, 2일 때 2.jpg ...)
    img.src = `img/${i}.jpg`;

    // 특정 이미지(예: 2번)에만 'active' 클래스를 주고 싶을 때
    if (i === 1) {
        img.classList.add('active');
    }

    // 컨테이너에 이미지 추가
    container.appendChild(img);
}