// Floating social buttons: open links in new tab
// (No navbar JS needed for static Bootstrap navbar)
document.querySelectorAll('.floating-social-buttons a').forEach(btn => {
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
});