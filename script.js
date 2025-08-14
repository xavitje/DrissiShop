// PRODUCT ZOEKBALK
document.addEventListener('DOMContentLoaded', function() {
  // Zoekfunctionaliteit
  const searchInput = document.getElementById('product-search');
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      document.querySelectorAll('.product-card').forEach(card => {
        const title = card.querySelector('h2').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        card.style.display = (title.includes(searchTerm) || description.includes(searchTerm) 
          ? 'block' 
          : 'none';
      });
    });
  }

  // WhatsApp button animatie
  const whatsappBtn = document.querySelector('.whatsapp-float');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', function() {
      // Voeg hier eventueel tracking code toe
      console.log('WhatsApp bestelling gestart');
    });
  }
});
