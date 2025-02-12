const menuIcon = document.getElementById("menu-icon");
const slideoutMenu = document.getElementById("slideout-menu");
const searchIcon = document.getElementById("search-icon");
const searchBox = document.getElementById("searchbox");

searchIcon.addEventListener('click', function () {
  if (searchBox.style.top == '72px') {
    searchBox.style.top = '24px';
    searchBox.style.pointerEvents = 'none';
  } else {
    searchBox.style.top = '72px';
    searchBox.style.pointerEvents = 'auto';
  }
});

menuIcon.addEventListener('click', function () {
  if (slideoutMenu.style.opacity == "1") {
    slideoutMenu.style.opacity = '0';
    slideoutMenu.style.pointerEvents = 'none';
  } else {
    slideoutMenu.style.opacity = '1';
    slideoutMenu.style.pointerEvents = 'auto';
  }
})

document.getElementById('poll-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const selectedOption = document.querySelector('input[name="help-option"]:checked');

  if (selectedOption) {
      const value = selectedOption.value;
      if (value === 'counseling') {
          window.location.href = 'counseling.html'; // Redirect to counseling page
      } else if (value === 'blogs') {
          window.location.href = 'blogpost.html'; // Redirect to blogs page
      }
  } else {
      alert('Please select an option.');
  }
});
