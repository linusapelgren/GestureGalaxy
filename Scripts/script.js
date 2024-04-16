document.addEventListener('DOMContentLoaded', function() {
    let membersName = [];
    let membersPassword = [];
    let membersEmail = [];

    let loginForm = document.getElementById('loginForm');
    let registerForm = document.getElementById('registerForm');
    let showRegisterFormButton = document.getElementById('showRegisterForm');
    let showLoginFormButton = document.getElementById('showLoginForm');

    if (registerForm) {
        registerForm.addEventListener('submit', addMember);
    }

    if (loginForm) {
        loginForm.addEventListener('submit', loginUser);
    }

    if (showRegisterFormButton) {
        showRegisterFormButton.addEventListener('click', function(event) {
            event.preventDefault();
            if (loginForm) loginForm.style.display = 'none';
            if (registerForm) registerForm.style.display = 'block';
        });
    }

    if (showLoginFormButton) {
        showLoginFormButton.addEventListener('click', function(event) {
            event.preventDefault();
            if (registerForm) registerForm.style.display = 'none';
            if (loginForm) loginForm.style.display = 'block';
        });
    }

    function addMember(event) {
        event.preventDefault();
        let username = document.getElementById('registerUsername').value;
        let password = document.getElementById('registerPassword').value;
        let confirmPassword = document.getElementById('confirmPassword').value;
        let email = document.getElementById('registerEmail').value;
        
        if (password !== confirmPassword) {
            console.log('Passwords do not match');
            return;
        }

        membersName.push(username);
        membersPassword.push(password);
        membersEmail.push(email);
        
        document.getElementById('registerUsername').value = '';
        document.getElementById('registerPassword').value = '';
        document.getElementById('confirmPassword').value = '';
        document.getElementById('registerEmail').value = '';
        
        console.log('Successful registration');
        console.log(membersName, membersPassword, membersEmail);
        
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    }

    let loginregisterBtn = document.getElementById('loginregister');

    function loginUser(event) {
        event.preventDefault();
        let email = document.getElementById('loginEmail').value;
        let password = document.getElementById('loginPassword').value;
        let errorMessage = document.getElementById('errorMessage');

        let index = membersEmail.indexOf(email);
        if (index !== -1 && membersPassword[index] === password) {
            console.log('Logged in successfully');
            localStorage.setItem('loggedInUser', membersName[index]); 
            window.location.href = "index.html"; 
        } else {
            errorMessage.textContent = 'Invalid email or password'; 
        }
        console.log('Registered accounts:', membersName, membersPassword, membersEmail); 
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
    }

    let loginButton = document.querySelector('.login'); // Get the login button
    if (loginButton) {
        loginButton.addEventListener('click', loginUser); // Add the event listener
    } else {
        console.error('Login button not found');
    }

    if (loginregisterBtn) {
        let loggedInUser = localStorage.getItem('loggedInUser'); // Get the logged in user from localStorage
        if (loggedInUser) {
            loginregisterBtn.textContent = loggedInUser; // Change the text of the button to the logged in users username
            loginregisterBtn.style.display = 'none'; // Hide the login/register button
        } else {
            loginregisterBtn.style.display = 'block'; // Show the login/register button
        }
    } else {
        console.error('Login/register button not found');
    }

    let dropdown = document.getElementById('dropdown');
    let dropdownBtn = document.getElementById('dropdownBtn');
    let dropdownContent = document.getElementById('dropdownContent');
    let logoutBtn = document.getElementById('logoutBtn');

    if (!dropdown || !dropdownBtn || !dropdownContent || !logoutBtn || !loginregisterBtn) {
        console.error('One or more elements could not be found');
        return;
    }

    let loggedInUser = window.localStorage.getItem('loggedInUser'); // Get the logged in user from localStorage
    if (loggedInUser) {
        dropdownBtn.textContent = loggedInUser;
        dropdown.style.display = 'block'; // Show the dropdown
        loginregisterBtn.textContent = loggedInUser; // Change the text of the button to the logged in users username
        loginregisterBtn.style.display = 'none'; // Hide the login/register button

        dropdownBtn.addEventListener('click', function(event) {
            event.stopPropagation();
            // Toggle visibility of dropdownContent
            if (dropdownContent.style.display === 'none' || dropdownContent.style.display === '') {
                dropdownContent.style.display = 'block';
            } else {
                dropdownContent.style.display = 'none';
            }
        });
        
        logoutBtn.addEventListener('click', function(event) {
            event.stopPropagation();
            window.localStorage.removeItem('loggedInUser');
            window.location.href = "login.html";
        });
    }
});
