// 포트폴리오 필터 및 라이트박스

document.addEventListener('DOMContentLoaded', function () {
  // 필터 버튼
  const filterBtns = document.querySelectorAll('.filter-btn');
  const thumbs = document.querySelectorAll('.pf-thumb');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      thumbs.forEach(thumb => {
        if (filter === 'all' || thumb.getAttribute('data-category') === filter) {
          thumb.style.display = 'block';
          setTimeout(() => thumb.style.opacity = 1, 10);
        } else {
          thumb.style.opacity = 0;
          setTimeout(() => thumb.style.display = 'none', 300);
        }
      });
    });
  });

  // 라이트박스
  let currentIndex = -1;
  let filteredThumbs = Array.from(thumbs);

  function updateFilteredThumbs() {
    const active = document.querySelector('.filter-btn.active');
    const filter = active ? active.getAttribute('data-filter') : 'all';
    filteredThumbs = Array.from(thumbs).filter(thumb =>
      filter === 'all' || thumb.getAttribute('data-category') === filter
    );
  }

  function openLightbox(idx) {
    updateFilteredThumbs();
    currentIndex = idx;
    const src = filteredThumbs[currentIndex].querySelector('img').src;
    const alt = filteredThumbs[currentIndex].querySelector('img').alt;
    let lightbox = document.getElementById('lightbox');
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.id = 'lightbox';
      lightbox.innerHTML = `
        <div class="lb-bg"></div>
        <div class="lb-content">
          <button class="lb-close" aria-label="닫기">×</button>
          <button class="lb-prev" aria-label="이전">‹</button>
          <img src="" alt="" class="lb-img">
          <button class="lb-next" aria-label="다음">›</button>
        </div>
      `;
      document.body.appendChild(lightbox);
      lightbox.querySelector('.lb-bg').onclick = closeLightbox;
      lightbox.querySelector('.lb-close').onclick = closeLightbox;
      lightbox.querySelector('.lb-prev').onclick = prevImg;
      lightbox.querySelector('.lb-next').onclick = nextImg;
    }
    lightbox.querySelector('.lb-img').src = src;
    lightbox.querySelector('.lb-img').alt = alt;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.style.display = 'none';
    document.body.style.overflow = '';
  }
  function prevImg() {
    updateFilteredThumbs();
    currentIndex = (currentIndex - 1 + filteredThumbs.length) % filteredThumbs.length;
    openLightbox(currentIndex);
  }
  function nextImg() {
    updateFilteredThumbs();
    currentIndex = (currentIndex + 1) % filteredThumbs.length;
    openLightbox(currentIndex);
  }
  thumbs.forEach((thumb, idx) => {
    thumb.addEventListener('click', function () {
      updateFilteredThumbs();
      const filteredIdx = filteredThumbs.indexOf(thumb);
      openLightbox(filteredIdx);
    });
  });
  // 키보드 지원
  document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox || lightbox.style.display !== 'flex') return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImg();
    if (e.key === 'ArrowRight') nextImg();
  });
});
