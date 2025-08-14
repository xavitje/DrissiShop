document.addEventListener('DOMContentLoaded', function() {
  console.log("Script loaded! Searching for elements...");
  
  const searchInput = document.getElementById('product-search');
  console.log("Search input found:", searchInput !== null);

  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase().trim();
      console.log("Searching for:", searchTerm);
      
      const productCards = document.querySelectorAll('.product-card');
      console.log("Product cards found:", productCards.length);
      
      productCards.forEach(card => {
        const title = card.querySelector('h2')?.textContent.toLowerCase() || '';
        const description = card.querySelector('p:not(.price)')?.textContent.toLowerCase() || '';
        const isVisible = title.includes(searchTerm) || description.includes(searchTerm);
        
        card.style.display = isVisible ? 'block' : 'none';
        console.log(`Card "${title}" - ${isVisible ? "visible" : "hidden"}`);
      });
    });
  }
});
