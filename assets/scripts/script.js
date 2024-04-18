//Variables
let navIcon = document.getElementById("navIcon");
let dropdownContent = document.getElementById("dropdownContent");
let icon = navIcon.children[0];
navIcon.addEventListener("click", navMenuOpen);
//Function to open and close the navigation menu
function navMenuOpen() {
    dropdownContent.classList.toggle("active");
    if (icon.classList.contains("fa-bars")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
    } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
    }
}