// ELEMENTS
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const openSidebarBtn = document.getElementById('open-sidebar');
const closeSidebarBtn = document.getElementById('close-sidebar');
const modalOverlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');
const closeModalBtn = document.getElementById('close-modal');
const contactTriggers = document.querySelectorAll('.contact-trigger');
const counters = document.querySelectorAll('.stat-counter');
// New selector for sidebar links
const sidebarLinks = document.querySelectorAll('#sidebar nav a');

// THEME LOGIC
if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
    themeToggle.checked = true;
}
themeToggle.addEventListener('change', () => {
    html.classList.toggle('dark');
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
});

// SIDEBAR LOGIC
function toggleSidebar(isOpen) {
    sidebar.classList.toggle('-translate-x-full', !isOpen);
    sidebarOverlay.classList.toggle('opacity-0', !isOpen);
    sidebarOverlay.classList.toggle('pointer-events-none', !isOpen);
}

openSidebarBtn.addEventListener('click', () => toggleSidebar(true));
closeSidebarBtn.addEventListener('click', () => toggleSidebar(false));
sidebarOverlay.addEventListener('click', () => toggleSidebar(false));

// FIX: CLOSE SIDEBAR WHEN A LINK IS CLICKED
sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        toggleSidebar(false);
    });
});

// MODAL LOGIC
function toggleModal(isOpen) {
    modalOverlay.classList.toggle('opacity-0', !isOpen);
    modalOverlay.classList.toggle('pointer-events-none', !isOpen);
    modalContent.classList.toggle('scale-90', !isOpen);
    modalContent.classList.toggle('scale-100', isOpen);
}

contactTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
        toggleSidebar(false); // Close sidebar if contact is clicked from there
        toggleModal(true);
    });
});

closeModalBtn.addEventListener('click', () => toggleModal(false));
modalOverlay.addEventListener('click', (e) => { 
    if(e.target === modalOverlay) toggleModal(false); 
});

// RESTORED COUNTER ANIMATION
const animateCounters = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const increment = target / 40;
                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 30);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter); // Only animate once
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
};

window.addEventListener('DOMContentLoaded', animateCounters);