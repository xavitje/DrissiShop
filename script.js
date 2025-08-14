document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('product-search');
  
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase().trim();
      const productCards = document.querySelectorAll('.product-card');
      
      productCards.forEach(card => {
        const title = card.querySelector('h2').textContent.toLowerCase();
        const description = card.querySelector('p:not(.price)').textContent.toLowerCase();
        
        // Toon/verberg op basis van zoekterm
        card.style.display = (title.includes(searchTerm) || description.includes(searchTerm)
          ? 'block' 
          : 'none';
      });
    });
  }
});
