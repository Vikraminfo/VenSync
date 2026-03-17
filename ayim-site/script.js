const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach((el) => observer.observe(el));

const countdownEl = document.getElementById('countdown');
const targetDate = new Date('2026-08-15T09:00:00').getTime();

function updateCountdown() {
  const now = Date.now();
  const diff = targetDate - now;
  if (diff <= 0) {
    countdownEl.textContent = 'AYIM is live now!';
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  countdownEl.textContent = `Event countdown: ${days}d ${hours}h ${mins}m`;
}
updateCountdown();
setInterval(updateCountdown, 60000);

function bindForm(formId, messageId, successMsg) {
  const form = document.getElementById(formId);
  const message = document.getElementById(messageId);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      message.textContent = 'Please fill all fields correctly.';
      message.style.color = '#ff9d9d';
      form.reportValidity();
      return;
    }
    message.textContent = successMsg;
    message.style.color = '#8cffcb';
    form.reset();
  });
}

bindForm('registerForm', 'formMessage', 'Thanks for registering! Our team will contact you soon.');
bindForm('newsletterForm', 'newsletterMessage', 'You are subscribed for AYIM updates.');
