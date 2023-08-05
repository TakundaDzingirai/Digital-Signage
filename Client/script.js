// Wait for the page to load before running the script
window.addEventListener("load", function() {
    // Your text content
    const headlineText = "Welcome to Department of Computer Science";
    const descriptionText = "where the best way to predict the future is to invent it";
  
    // Get the headline and description elements
    const headlineElement = document.getElementById("headline");
    const descriptionElement = document.getElementById("description");
  
    // Function to animate text typing
    function animateTyping(text, element) {
      let index = 0;
      const typingSpeed = 20; // Adjust the speed of typing here (in milliseconds)
  
      function typeNextLetter() {
        if (index < text.length) {
          element.innerHTML += text.charAt(index) ;
          index++;
          setTimeout(typeNextLetter, typingSpeed);
        }
      }
  
      typeNextLetter();
    }
  
    // Start the typing animation for the headline first
    animateTyping(headlineText, headlineElement);
  
    // When the headline animation is complete, start the description animation
    setTimeout(function() {
      headlineElement.innerHTML = headlineText; // Replace cursor with final text
      animateTyping(descriptionText, descriptionElement);
    }, (headlineText.length + 1) * 30); // Wait 100ms per character + 1 second before starting the description animation
  });
  