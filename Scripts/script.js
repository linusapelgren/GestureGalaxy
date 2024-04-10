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

function loginUser(event) {
    event.preventDefault();
    let username = document.getElementById('loginUsername').value;
    let password = document.getElementById('loginPassword').value;

    let index = membersName.indexOf(username);
    if (index !== -1 && membersPassword[index] === password) {
        console.log('Logged in successfully');
    } else {
        console.log('Invalid username or password');
    }

    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
}
});