/**
 * TRIGGER THEME — OPTIMIZED SCRIPT
 * Prasad Mhaske | Performance Marketer & Web Architect
 */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. ADVANCED CONTEXTUAL CURSOR FOLLOWER
  // --------------------------------------------------------------------------
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorFollower = document.querySelector('.cursor-follower');
  const cursorText = document.querySelector('.cursor-text');

  if (cursorDot && cursorFollower && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;
    let isHovering = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    const renderCursor = () => {
      // Smooth interpolation for butter-smooth gliding
      const ease = isHovering ? 0.22 : 0.16;
      followerX += (mouseX - followerX) * ease;
      followerY += (mouseY - followerY) * ease;
      cursorFollower.style.left = `${followerX}px`;
      cursorFollower.style.top = `${followerY}px`;
      requestAnimationFrame(renderCursor);
    };
    renderCursor();

    // Contextual label on portfolio cards
    document.querySelectorAll('.work-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        isHovering = true;
        document.body.classList.add('cursor-hover-card');
        if (cursorText) cursorText.textContent = 'VIEW ↗';
      });
      card.addEventListener('mouseleave', () => {
        isHovering = false;
        document.body.classList.remove('cursor-hover-card');
        if (cursorText) cursorText.textContent = '';
      });
    });

    // General interactive elements hover
    const standardInteractive = document.querySelectorAll('a, button, input, textarea, select, .filter-pill');
    standardInteractive.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (!el.closest('.work-card')) {
          isHovering = true;
          document.body.classList.add('cursor-hover');
        }
      });
      el.addEventListener('mouseleave', () => {
        isHovering = false;
        document.body.classList.remove('cursor-hover');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 2. 3D INTERACTIVE HERO PARALLAX TILT
  // --------------------------------------------------------------------------
  const heroSection = document.getElementById('hero');
  const portraitFrame = document.getElementById('hero-portrait-frame');
  const statBadge = document.getElementById('hero-stat-badge');

  if (heroSection && portraitFrame && window.matchMedia('(pointer: fine)').matches) {
    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;

      targetRotateY = normX * 12; // Max 12deg yaw
      targetRotateX = -normY * 12; // Max 12deg pitch
    });

    heroSection.addEventListener('mouseleave', () => {
      targetRotateX = 0;
      targetRotateY = 0;
    });

    const updateTilt = () => {
      currentRotateX += (targetRotateX - currentRotateX) * 0.1;
      currentRotateY += (targetRotateY - currentRotateY) * 0.1;

      portraitFrame.style.transform = `rotateY(${currentRotateY.toFixed(2)}deg) rotateX(${currentRotateX.toFixed(2)}deg)`;
      if (statBadge) {
        statBadge.style.transform = `translateZ(40px) translate(${(currentRotateY * 1.5).toFixed(1)}px, ${(-currentRotateX * 1.5).toFixed(1)}px)`;
      }

      requestAnimationFrame(updateTilt);
    };
    updateTilt();
  }

  // --------------------------------------------------------------------------
  // 3. MAGNETIC BUTTONS (TRIGGER SUBTLE INTERACTION)
  // --------------------------------------------------------------------------
  if (window.matchMedia('(pointer: fine)').matches) {
    const magneticElements = document.querySelectorAll('.header-cta-btn, .btn-trigger-primary, .btn-trigger-secondary, .burger-menu-btn, .card-arrow-circle');
    magneticElements.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 4. SCROLL REVEAL OBSERVER (AWWWARDS-STYLE REVEALS)
  // --------------------------------------------------------------------------
  const revealTargets = document.querySelectorAll('.work-card, .bento-stat-card, .service-row-item, .timeline-item-card, .testimonial-card');
  revealTargets.forEach(el => el.classList.add('reveal-on-scroll'));

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => revealObserver.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-revealed'));
  }

  // --------------------------------------------------------------------------
  // 5. LIVE CLOCK (PUNE, INDIA IST)
  // --------------------------------------------------------------------------
  const liveClockEl = document.getElementById('live-clock');
  const updateClock = () => {
    if (!liveClockEl) return;
    const now = new Date();
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    liveClockEl.textContent = `${now.toLocaleTimeString('en-US', options)} IST`;
  };
  updateClock();
  setInterval(updateClock, 1000);

  // --------------------------------------------------------------------------
  // 6. KINETIC TYPEWRITER EFFECT
  // --------------------------------------------------------------------------
  const typewriterText = document.getElementById('typewriter-text');
  if (typewriterText) {
    const roles = [
      'Performance Marketing Lead',
      'B2B SaaS Growth Architect',
      '+200% Organic Traffic Engine',
      'AI Search & AEO Strategist',
      'Full-Stack Web Architect'
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 75;

    const typeStep = () => {
      const currentRole = roles[roleIdx];
      if (isDeleting) {
        typewriterText.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 35;
      } else {
        typewriterText.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 75;
      }

      if (!isDeleting && charIdx === currentRole.length) {
        typingSpeed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typingSpeed = 400;
      }

      setTimeout(typeStep, typingSpeed);
    };

    setTimeout(typeStep, 600);
  }

  // --------------------------------------------------------------------------
  // 7. SLIDE-OVER NAVIGATION DRAWER (TRIGGER STYLE)
  // --------------------------------------------------------------------------
  const burgerBtn = document.getElementById('burger-menu-btn');
  const drawerPanel = document.getElementById('drawer-panel');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const drawerLinks = document.querySelectorAll('.drawer-nav-item a');

  const openDrawer = () => {
    drawerPanel.classList.add('active');
    drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawerPanel.classList.remove('active');
    drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (burgerBtn) burgerBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeModal();
    }
  });

  // --------------------------------------------------------------------------
  // 8. PROJECT DATA & MODAL VIEWER (TRIGGER AJAX POPUP)
  // --------------------------------------------------------------------------
  const projectDatabase = {
    'patseer': {
      title: 'PatSeer & IP8.ai',
      category: 'B2B SaaS Growth & Web Architecture',
      tags: ['B2B SaaS', 'Technical SEO', 'AI Search (AEO)', 'WordPress'],
      image: 'assets/images/portfolio/ip8-patseer.jpg',
      description: 'End-to-end digital growth engine for global intellectual property analytics platform. Architected the complete website for IP8.ai from ground up, scaling organic traffic by 200% and inbound enterprise leads by 56%. Spearheaded AI Answer Engine Optimization (AEO) to capture top recommendation positions across ChatGPT, Claude, and Perplexity.',
      metrics: [
        { num: '+200%', label: 'Organic Traffic Lift' },
        { num: '+56%', label: 'Inbound MQL→SQL Lift' },
        { num: '91%', label: 'Page Speed Boost' }
      ],
      link: 'https://ip8.ai/'
    },
    'ecocrest': {
      title: 'Ecocrest EcoAgra',
      category: 'E-Commerce & Digital Branding',
      tags: ['E-Commerce', 'Shopify', 'Meta Ads', 'Graphic Design'],
      image: 'assets/images/portfolio/ecocrest.png',
      description: 'Full creative branding, direct-to-consumer store architecture, and performance ads for agricultural biotechnology solutions. Boosted conversion rates by 355% through landing page storytelling, customer onboarding friction reduction, and targeted ad funnels.',
      metrics: [
        { num: '+355%', label: 'Conversion Surge' },
        { num: '4.8x', label: 'ROAS on Paid Media' },
        { num: '10K+', label: 'Monthly Shoppers' }
      ],
      link: 'https://ecocrest.in/'
    },
    'cytos': {
      title: 'CYTOS Healthcare Labs',
      category: 'Healthcare B2B & Web Architecture',
      tags: ['Healthcare', 'Lead Generation', 'UI/UX Design', 'Full-Stack'],
      image: 'assets/images/portfolio/cytos.png',
      description: 'Engineered a modern digital diagnostic healthcare platform with integrated patient onboarding, pathology booking funnels, and automated appointment scheduling, resulting in over 400+ qualified patient acquisitions within the initial 90 days.',
      metrics: [
        { num: '400+', label: 'Patient Bookings' },
        { num: '+180%', label: 'Local Search Inflow' },
        { num: '1.2s', label: 'Average Load Time' }
      ],
      link: '#'
    },
    'hcpnest': {
      title: 'HCPNest Medical Recruitment',
      category: 'Recruitment Portal & Web Application',
      tags: ['Web Application', 'CRO', 'Search Engine Optimization'],
      image: 'assets/images/portfolio/hcpnest.png',
      description: 'Architected high-converting locum medical job board and candidate intake funnel connecting verified healthcare practitioners with leading hospitals across North America and India. Reduced candidate drop-off by 42%.',
      metrics: [
        { num: '80%', label: 'Faster Placements' },
        { num: '-42%', label: 'Drop-off Reduction' },
        { num: '5,000+', label: 'Registered Doctors' }
      ],
      link: '#'
    },
    'fludio': {
      title: 'Fludio Water Solutions',
      category: 'Enterprise B2B & SEO',
      tags: ['Enterprise B2B', 'SEO Dominance', 'Brand Identity'],
      image: 'assets/images/portfolio/fludio.png',
      description: 'Corporate brand identity and enterprise lead-generation platform for commercial water purification and filtration systems. Secured Page 1 Google rankings for 30+ commercial procurement keywords across Maharashtra.',
      metrics: [
        { num: 'Top 3', label: 'Google Rankings' },
        { num: '+65%', label: 'B2B RFQ Inquiries' },
        { num: '100%', label: 'Client Satisfaction' }
      ],
      link: '#'
    },
    'godrej': {
      title: 'Godrej & Boyce Growth Strategy',
      category: 'Enterprise Revenue & Paid Media',
      tags: ['Paid Media', 'Enterprise Growth', 'Funnel Optimization'],
      image: 'assets/images/portfolio/godrej.png',
      description: 'Strategic performance marketing and multi-channel acquisition strategy executed for Godrej & Boyce divisions, driving high-intent corporate inquiries and reducing Customer Acquisition Cost (CAC) by 38%.',
      metrics: [
        { num: '+45%', label: 'Qualified MQL Volume' },
        { num: '-38%', label: 'CAC Reduction' },
        { num: '99.4%', label: 'Attribution Accuracy' }
      ],
      link: '#'
    },
    'laxman': {
      title: 'Dr. Laxman Malkunje Healthcare',
      category: 'Clinical SEO & Patient Management System',
      tags: ['Clinical Healthcare', 'Local SEO', 'Custom Portal'],
      image: 'assets/images/portfolio/dr-laxman-malkunje.png',
      description: 'Custom digital presence and Patient Management System for acclaimed Oral & Maxillofacial Surgeon. Scaled clinic appointments by 120% through hyper-local Google Maps SEO, patient testimonials, and high-trust landing pages.',
      metrics: [
        { num: '+120%', label: 'Monthly Appointments' },
        { num: '#1 Rank', label: 'Local Dental Search' },
        { num: '5.0★', label: 'Google Review Avg' }
      ],
      link: '#'
    },
    'ratnaparkhi': {
      title: 'Dr. Ratnaparkhi Surgery Clinic',
      category: 'Specialist Patient Acquisition',
      tags: ['Medical Practice', 'Conversion Rate Optimization', 'AEO'],
      image: 'assets/images/portfolio/dr-ratnaparkhi.png',
      description: 'Consultation booking platform and informative patient education portal designed for surgical consultations, maximizing inquiries from mobile searchers and local referral networks.',
      metrics: [
        { num: '+85%', label: 'Direct Call Leads' },
        { num: '92%', label: 'Mobile Conversion Rate' },
        { num: '4.9★', label: 'Reputation Score' }
      ],
      link: '#'
    }
  };

  const modalBackdrop = document.getElementById('trigger-modal-backdrop');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalImg = document.getElementById('modal-img');
  const modalTags = document.getElementById('modal-tags');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalMetrics = document.getElementById('modal-metrics');
  const modalLink = document.getElementById('modal-link');

  const openModal = (projectId) => {
    const data = projectDatabase[projectId];
    if (!data || !modalBackdrop) return;

    modalImg.src = data.image;
    modalImg.alt = data.title;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.description;
    if (modalLink) modalLink.href = data.link;

    modalTags.innerHTML = data.tags.map(t => `<span class="card-pill">${t}</span>`).join('');
    modalMetrics.innerHTML = data.metrics.map(m => `
      <div class="modal-stat-item">
        <span class="modal-stat-num">${m.num}</span>
        <span class="modal-stat-label">${m.label}</span>
      </div>
    `).join('');

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('click', () => {
      const pid = card.dataset.project;
      openModal(pid);
    });
  });

  // --------------------------------------------------------------------------
  // 9. PORTFOLIO CATEGORY FILTERING
  // --------------------------------------------------------------------------
  const filterPills = document.querySelectorAll('.filter-pill');
  const workRows = document.querySelectorAll('.work-row');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const category = pill.dataset.filter;

      workRows.forEach(row => {
        const card = row.querySelector('.work-card');
        const cardCat = card ? card.dataset.category : '';
        if (category === 'all' || cardCat.includes(category)) {
          row.style.display = 'flex';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 10. AJAX CONTACT FORM WITH CELEBRATORY CHECKMARK SCREEN
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('trigger-contact-form');
  const successOverlay = document.getElementById('form-success-overlay');
  const resetFormBtn = document.getElementById('success-reset-btn');

  if (contactForm && successOverlay) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('.submit-trigger-btn');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<span>SENDING INQUIRY...</span> <i class="fas fa-spinner fa-spin"></i>';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        successOverlay.classList.add('active');
        contactForm.reset();
      }, 900);
    });

    if (resetFormBtn) {
      resetFormBtn.addEventListener('click', () => {
        successOverlay.classList.remove('active');
      });
    }
  }

  // --------------------------------------------------------------------------
  // 11. BACK TO TOP
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
