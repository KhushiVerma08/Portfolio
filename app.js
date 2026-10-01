/**
 * Khushi Verma | Interactive Section Switching & Direct Communication
 */

let selectedChannel = 'whatsapp'; // Default dispatch channel

document.addEventListener('DOMContentLoaded', () => {
  initUrlRouting();
  initMobileNav();
  initProcessStepper();
});

/* --------------------------------------------------------------------------
   1. Multi-Section Switching Logic (Buttons -> View Sections)
   -------------------------------------------------------------------------- */
function switchSection(targetSectionId) {
  const sections = document.querySelectorAll('.page-section');
  const navButtons = document.querySelectorAll('.nav-section-btn');
  const mobileButtons = document.querySelectorAll('.mobile-nav-btn');

  // Hide all sections, show target section
  sections.forEach(sec => {
    if (sec.id === `section-${targetSectionId}`) {
      sec.classList.add('active-section');
    } else {
      sec.classList.remove('active-section');
    }
  });

  // Update header desktop button states
  navButtons.forEach(btn => {
    if (btn.getAttribute('data-target') === targetSectionId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update mobile drawer button states
  mobileButtons.forEach(btn => {
    if (btn.getAttribute('data-target') === targetSectionId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Smooth scroll to top of section
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  // Update URL hash
  history.replaceState(null, null, `#${targetSectionId}`);
}

/* Check URL Hash on initial page load */
function initUrlRouting() {
  const hash = window.location.hash.replace('#', '');
  const validSections = ['home', 'experience', 'strategy', 'about', 'contact'];
  if (validSections.includes(hash)) {
    switchSection(hash);
  }
}

/* --------------------------------------------------------------------------
   2. Mobile Drawer Navigation
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');

  if (!menuToggle || !drawer) return;

  menuToggle.addEventListener('click', () => {
    drawer.classList.toggle('open');
  });
}

function closeMobileNav() {
  const drawer = document.getElementById('mobile-nav-drawer');
  if (drawer) {
    drawer.classList.remove('open');
  }
}

/* --------------------------------------------------------------------------
   3. Interactive 6-Step Content Strategy Framework
   -------------------------------------------------------------------------- */
function initProcessStepper() {
  const stepButtons = document.querySelectorAll('.process-steps-nav .step-btn');
  const stepPanes = document.querySelectorAll('.step-details-card .step-pane');

  stepButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetStep = btn.getAttribute('data-step');

      stepButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      stepPanes.forEach(pane => {
        const paneStep = pane.getAttribute('data-step');
        pane.classList.toggle('active-pane', paneStep === targetStep);
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. Direct Contact Dispatch (WhatsApp / Email / Copy)
   -------------------------------------------------------------------------- */
function setMessageChannel(channel) {
  selectedChannel = channel;
}

function handleDirectMessage(event) {
  event.preventDefault();

  const name = document.getElementById('sender-name').value.trim();
  const subject = document.getElementById('sender-subject').value.trim();
  const message = document.getElementById('sender-message').value.trim();
  const successBox = document.getElementById('form-success-msg');

  if (!name || !message) {
    showToast('Please fill in your name and message.');
    return;
  }

  const formattedText = `Hi Khushi,\n\nName: ${name}\nSubject: ${subject || 'Portfolio Note / Opportunity'}\n\nMessage:\n${message}`;

  if (selectedChannel === 'whatsapp') {
    const waUrl = `https://wa.me/918219039639?text=${encodeURIComponent(formattedText)}`;
    window.open(waUrl, '_blank');
    showToast('Opening WhatsApp with your message...');
  } else if (selectedChannel === 'email') {
    const mailtoUrl = `mailto:khushiverma0819@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(formattedText)}`;
    window.location.href = mailtoUrl;
    showToast('Opening your email client...');
  }

  if (successBox) {
    successBox.classList.remove('hidden');
    setTimeout(() => {
      successBox.classList.add('hidden');
    }, 5000);
  }
}

function copyEmailToClipboard() {
  const email = "khushiverma0819@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    const btnText = document.getElementById('email-btn-text');
    if (btnText) {
      const original = btnText.textContent;
      btnText.textContent = "Email Copied! ✓";
      setTimeout(() => {
        btnText.textContent = original;
      }, 2500);
    }
    showToast(`Copied ${email} to clipboard!`);
  }).catch(() => {
    showToast(`Email: ${email}`);
  });
}

/* --------------------------------------------------------------------------
   5. Toast Feedback Helper
   -------------------------------------------------------------------------- */
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');

  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.remove('hidden');

  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3200);
}

/* --------------------------------------------------------------------------
   6. Automatic Multi-Format Image Fallback (Supports .jpg, .jpeg, .png, .JPG)
   -------------------------------------------------------------------------- */
function initImageFormatFallback() {
  const allImages = document.querySelectorAll('img');
  
  allImages.forEach(img => {
    img.addEventListener('error', function() {
      const currentSrc = this.getAttribute('src');
      if (!currentSrc) return;

      const fallbackExtensions = ['.jpeg', '.jpg', '.png', '.JPG', '.JPEG', '.webp'];
      const extensionMatch = currentSrc.match(/\.(jpg|jpeg|png|JPG|JPEG|webp)$/);
      
      if (extensionMatch) {
        const currentExt = extensionMatch[0];
        const basePath = currentSrc.slice(0, -currentExt.length);
        const attempted = this.dataset.fallbackAttempt ? parseInt(this.dataset.fallbackAttempt, 10) : 0;

        const nextExts = fallbackExtensions.filter(ext => ext !== currentExt);

        if (attempted < nextExts.length) {
          this.dataset.fallbackAttempt = attempted + 1;
          const nextSrc = basePath + nextExts[attempted];
          this.src = nextSrc;
        }
      }
    });
  });
}

// Initialize fallback on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initImageFormatFallback();
});

