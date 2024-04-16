document.addEventListener('DOMContentLoaded', function() {
    let membersName = [];
    let membersPassword = [];
    let membersEmail = [];

    let loginForm = document.getElementById('loginForm');
    let registerForm = document.getElementById('registerForm');
    let showRegisterFormButton = document.getElementById('showRegisterForm');
    let showLoginFormButton = document.getElementById('showLoginForm');

    registerForm.addEventListener('submit', addMember);
    loginForm.addEventListener('submit', loginUser);

    showRegisterFormButton.addEventListener('click', function(event) {
        event.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });

    showLoginFormButton.addEventListener('click', function(event) {
        event.preventDefault();
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

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

    document.addEventListener('DOMContentLoaded', function() {
        let loginregisterBtn = document.getElementById('loginregister'); // Get the login/register button
        let loggedInUser = localStorage.getItem('loggedInUser'); // Get the logged in user from localStorage
        if (loggedInUser) {
            loginregisterBtn.textContent = loggedInUser; // Change the text of the button to the logged in users username
        }
    });

    document.addEventListener('DOMContentLoaded', function() {
        let dropdown = document.getElementById('dropdown');
        let dropdownBtn = document.getElementById('dropdownBtn');
        let dropdownContent = document.getElementById('dropdownContent');
        let logoutBtn = document.getElementById('logoutBtn');
    
        let loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            dropdownBtn.textContent = loggedInUser;
    
            dropdownBtn.onclick = function(event) {
                event.stopPropagation();
                dropdownContent.style.display = dropdownContent.style.display === 'none' ? 'block' : 'none';
            };
    
            logoutBtn.addEventListener('click', function(event) {
                event.stopPropagation();
                localStorage.removeItem('loggedInUser');
                window.location.href = "login.html";
            });
        } else {
            dropdown.style.display = 'none';
        }
    });
});
