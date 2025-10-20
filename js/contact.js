// 문의 폼(실제 전송은 구현 X, alert만)
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('문의가 정상적으로 접수되었습니다.\n감사합니다!');
      form.reset();
    });
  }
});
