document.getElementById('zoomIn').addEventListener('click', () => {
    let barChartContainer = document.getElementById('barChart').parentElement;
    let currentScale = parseFloat(barChartContainer.style.transform.replace('scale(', '').replace(')', '')) || 1;
    barChartContainer.style.transform = `scale(${currentScale + 0.1})`;
});

document.getElementById('zoomOut').addEventListener('click', () => {
    let barChartContainer = document.getElementById('barChart').parentElement;
    let currentScale = parseFloat(barChartContainer.style.transform.replace('scale(', '').replace(')', '')) || 1;
    if (currentScale > 0.5) {
        barChartContainer.style.transform = `scale(${currentScale - 0.1})`;
    }
});

let registeredUsers = [
    {
        fullName: "user",
        email: "test@example.com",
        username: "user1",
        password: "12345678"
    }
];


document.addEventListener('DOMContentLoaded', function () {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
        showDashboard();
    } else {
        document.getElementById('loginPage').style.display = 'flex'; 
    }

    const userDisplay = document.getElementById('userDisplay');
    const username = localStorage.getItem('username');
    if (username) {
        userDisplay.textContent = username;
    }

    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('username');
        localStorage.removeItem('fullName');
        document.getElementById('dashboardPage').style.display = 'none';
        document.getElementById('loginPage').style.display = 'flex';
        alert("Logged out successfully!");
    });

    document.getElementById('signoutBtn').addEventListener('click', () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('username');
        localStorage.removeItem('fullName');
        document.getElementById('dashboardPage').style.display = 'none';
        document.getElementById('signupPage').style.display = 'flex';
        alert("Signed out successfully!");
    });
});

document.getElementById('showLogin').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('signupPage').style.display = 'none';
    document.getElementById('loginPage').style.display = 'flex';
});

document.getElementById('showSignup').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('signupPage').style.display = 'flex';
});

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fullName = document.querySelector('#signupForm input[name="fullName"]').value;
    const email = document.querySelector('#signupForm input[name="email"]').value;
    const username = document.querySelector('#signupForm input[name="username"]').value;
    const password = document.querySelector('#signupForm input[name="password"]').value;
    
    if (password.length < 8) {
        alert('Password must be at least 8 characters long!');
        return;
    }
    
    const existingUser  = registeredUsers.find(user => user.username === username);
    if (existingUser ) {
        alert('Username already exists! Logging you in.');
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('fullName', existingUser .fullName);
        showDashboard();
        return;
    }
    
    registeredUsers.push({
        fullName,
        email,
        username,
        password
    });
    
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    alert('Account created successfully! Please log in.');
    document.getElementById('showLogin').click();
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const storedUsers = localStorage.getItem('registeredUsers');
    if (storedUsers) {
        registeredUsers = JSON.parse(storedUsers);
    }
    
    const user = registeredUsers.find(u => u.username === username && u.password === password);
    
    if (user) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('fullName', user.fullName);
        showDashboard();
    } else {
        alert('Invalid username or password!');
    }
});

function showDashboard() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('signupPage').style.display = 'none';
    document.getElementById('dashboardPage').style.display = 'block';
    document.getElementById('userDisplay').textContent = localStorage.getItem('fullName');
    initializeDashboard();
}

document.getElementById('homeBtn').addEventListener('click', () => {
    document.getElementById('dashboardPage').style.display = 'block';
    document.getElementById('profilePage').style.display = 'none';
    document.getElementById('settingsPage').style.display = 'none';
});

document.getElementById('profileBtn').addEventListener('click', () => {
    document.getElementById('dashboardPage').style.display = 'none';
    document.getElementById('profilePage').style.display = 'block';
    document.getElementById('settingsPage').style.display = 'none';

    const user = JSON.parse(localStorage.getItem('registeredUsers')).find(u => u.username === localStorage.getItem('username'));
    document.getElementById('profileFullName').textContent = user.fullName;
    document.getElementById('profileEmail').textContent = user.email;
    document.getElementById('profileUsername').textContent = user.username;
});

document.getElementById('settingsBtn').addEventListener('click', () => {
    document.getElementById('dashboardPage').style.display = 'none';
    document.getElementById('profilePage').style.display = 'none';
    document.getElementById('settingsPage').style.display = 'block';
});

let barChart, lineChart;

async function fetchData() {
    try {
        const response = await fetch('data.json'); 
        const jsonData = await response.json();
        return jsonData.data;
    } catch (error) {
        console.error('Error loading data:', error);
        return [];
    }
}

async function filterData() {
    const data = await fetchData();
    const ageFilter = document.getElementById('ageFilter').value;
    const genderFilter = document.getElementById('genderFilter').value;
    const startDate = document.getElementById('startDate').value;
   

    return data.filter(item => {
        const dateMatch = (!startDate || (item.Day >= startDate));
        const ageMatch = (ageFilter === 'all' || item.Age === ageFilter);
        const genderMatch = (genderFilter === 'all' || item.Gender === genderFilter);
        return dateMatch && ageMatch && genderMatch;
    });
}

async function updateCharts() {
    const filteredData = await filterData();
    
    const features = ['A', 'B', 'C', 'D', 'E', 'F'];
    const totals = features.map(feature => 
        filteredData.reduce((sum, item) => sum + item[feature], 0)
    );

    const barColors = [
        'rgba(244, 44, 87, 0.5)', 
        'rgba(73, 222, 19, 0.5)', 
        'rgba(236, 214, 19, 0.5)', 
        'rgba(41, 194, 194, 0.5)', 
        'rgba(86, 16, 227, 0.5)', 
        'rgba(7, 117, 27, 0.5)'  
    ];

    if (barChart) barChart.destroy();
    barChart = new Chart(document.getElementById('barChart'), {
        type: 'bar',
        data: {
            labels: features,
            datasets: [{
                label: 'Total Time Spent',
                data: totals,
                backgroundColor: barColors
            }]
        },
        options: {
            responsive: true,
            tooltips: {
                callbacks: {
                    label: function(tooltipItem) {
                        const feature = features[tooltipItem.index];
                        const total = tooltipItem.yLabel;
                        const gender = document.getElementById('genderFilter').value;
                        const age = document.getElementById('ageFilter').value;
                        return `Total: ${total} (Gender: ${gender}, Age: ${age})`;
                    }
                }
            },
            onClick: (event, elements) => {
                if (elements.length > 0) {
                    const index = elements[0].index;
                    updateLineChart(features[index]);
                }
            }
        }
    });

    if (!lineChart) {
        updateLineChart('A');
    }
}

async function updateLineChart(feature) {
    const filteredData = await filterData();
    const dates = [...new Set(filteredData.map(item => item.Day))].sort();
    const values = dates.map(date => 
        filteredData
            .filter(item => item.Day === date)
            .reduce((sum, item) => sum + item[feature], 0)
    );

    if (lineChart) lineChart.destroy();
    lineChart = new Chart(document.getElementById('lineChart'), {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: `Feature ${feature} Trend`,
                data: values,
                borderColor: 'rgb(46, 144, 144)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true
        }
    });
}

async function initializeDashboard() {
    await updateCharts();
}

document.getElementById('filter').addEventListener('click', updateCharts);

const profileIcon = document.getElementById('profileIcon');
const profileMenu = document.getElementById('profileMenu');

profileIcon.addEventListener('click', () => {
    profileMenu.style.display = profileMenu.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', (event) => {
    if (!profileIcon.contains(event.target) && !profileMenu.contains(event.target)) {
        profileMenu.style.display = 'none';
    }
});

document.getElementById('loginForm').insertAdjacentHTML('beforeend', 
    '<i class="material-icons password-toggle" style="position: absolute; right: 10px; top: 63%; transform: translateY(-50%); cursor: pointer;">visibility_off</i>'
);

const loginPasswordField = document.getElementById('password');
const loginPasswordToggle = document.querySelector('#loginForm .password-toggle');

loginPasswordToggle.addEventListener('click', () => {
    if (loginPasswordField.type === 'password') {
        loginPasswordField.type = 'text';
        loginPasswordToggle.textContent = 'visibility';
    } else {
        loginPasswordField.type = 'password';
        loginPasswordToggle.textContent = 'visibility_off';
    }
});

document.getElementById('forgotPasswordLink').addEventListener('click', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    
    if (!username) {
        alert('Please enter your username first');
        return;
    }

    const user = registeredUsers.find(u => u.username === username);
    if (user) {
        
        const tempPassword = Math.random().toString(36).slice(-8);
        
    
        user.password = tempPassword;
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        
    
        alert(`Your temporary password is: ${tempPassword}\nPlease change it after logging in.`);
    } else {
        alert('Username not found');
    }
});

document.getElementById('settingsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newPassword = document.getElementById('newPassword').value;
    
    if (newPassword.length < 8) {
        alert('Password must be at least 8 characters long!');
        return;
    }
    
    const username = localStorage.getItem('username');
    const users = JSON.parse(localStorage.getItem('registeredUsers'));
    const userIndex = users.findIndex(u => u.username === username);
    
    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem('registeredUsers', JSON.stringify(users));
        alert('Password updated successfully!');
        document.getElementById('newPassword').value = '';
    } else {
        alert('Error updating password. Please try again.');
    }
});


const signupPasswordInput = document.querySelector('#signupForm input[name="password"]');
signupPasswordInput.insertAdjacentHTML('afterend', 
    '<i class="material-icons password-toggle" style="position: absolute; right: 10px; top: 80%; transform: translateY(-50%); cursor: pointer;">visibility_off</i>'
);

const signupPasswordToggle = document.querySelector('#signupForm .password-toggle');
signupPasswordToggle.addEventListener('click', () => {
    if (signupPasswordInput.type === 'password') {
        signupPasswordInput.type = 'text';
        signupPasswordToggle.textContent = 'visibility';
    } else {
        signupPasswordInput.type = 'password';
        signupPasswordToggle.textContent = 'visibility_off';
    }
});

document.getElementById('newPassword').insertAdjacentHTML('afterend', 
    '<i class="material-icons password-toggle" style="position: absolute; right: 10px; top: 40%; transform: translateY(-50%); cursor: pointer;">visibility_off</i>'
);

const settingsPasswordToggle = document.querySelector('#settingsForm .password-toggle');
settingsPasswordToggle.addEventListener('click', () => {
    const newPasswordField = document.getElementById('newPassword');
    if (newPasswordField.type === 'password') {
        newPasswordField.type = 'text';
        settingsPasswordToggle.textContent = 'visibility';
    } else {
        newPasswordField.type = 'password';
        settingsPasswordToggle.textContent = 'visibility_off';
    }
});



function generateShareableURL() {
    const ageFilter = document.getElementById('ageFilter').value;
    const genderFilter = document.getElementById('genderFilter').value;
    const startDate = document.getElementById('startDate').value;
    

    const baseURL = window.location.href.split('?')[0]; 
    const params = new URLSearchParams({
        age: ageFilter,
        gender: genderFilter,
        startDate: startDate
    });

    const shareableURL = `${baseURL}?${params.toString()}`;
    document.getElementById('shared-url-display').textContent = shareableURL;
    document.getElementById('urlPopup').style.display = 'flex'; 
}

function copyToClipboard() {
    const urlText = document.getElementById('shared-url-display').textContent;
    navigator.clipboard.writeText(urlText).then(() => {
        alert('URL copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}


document.getElementById('shareUrlBtn').addEventListener('click', generateShareableURL);

document.getElementById('copyUrlBtn').addEventListener('click', copyToClipboard);

document.querySelector('.close-popup').addEventListener('click', () => {
    document.getElementById('urlPopup').style.display = 'none'; 
});

let currentFilteredData = [];
let allData = [];

async function filterData() {
    const data = await fetchData();
    const ageFilter = document.getElementById('ageFilter').value;
    const genderFilter = document.getElementById('genderFilter').value;
    const startDate = document.getElementById('startDate').value;
   
    allData = data;

    const filteredData = data.filter(item => {
        const dateMatch = (!startDate || (item.Day >= startDate));
        const ageMatch = (ageFilter === 'all' || item.Age === ageFilter);
        const genderMatch = (genderFilter === 'all' || item.Gender === genderFilter);
        return dateMatch && ageMatch && genderMatch;
    });

    currentFilteredData = filteredData;
    
    
    localStorage.setItem('lastFilters', JSON.stringify({
        age: ageFilter,
        gender: genderFilter,
        startDate: startDate
    }));

    return filteredData;
}

async function updateSheetView(showAll = false) {
    const tableBody = document.getElementById('dataSheetBody');
    tableBody.innerHTML = '';
    
    const dataToShow = showAll ? allData : currentFilteredData;
    
    dataToShow.forEach((row, index) => {
        const tr = document.createElement('tr');
        tr.style.backgroundColor = index % 2 === 0 ? '#ffffff' : '#f9f9f9';
        
        tr.innerHTML = `
            <td style="padding: 12px; border: 1px solid #ddd;">${row.Day}</td>
            <td style="padding: 12px; border: 1px solid #ddd;">${row.Age}</td>
            <td style="padding: 12px; border: 1px solid #ddd;">${row.Gender}</td>
            <td style="padding: 12px; border: 1px solid #ddd;">${row.A}</td>
            <td style="padding: 12px; border: 1px solid #ddd;">${row.B}</td>
            <td style="padding: 12px; border: 1px solid #ddd;">${row.C}</td>
            <td style="padding: 12px; border: 1px solid #ddd;">${row.D}</td>
            <td style="padding: 12px; border: 1px solid #ddd;">${row.E}</td>
            <td style="padding: 12px; border: 1px solid #ddd;">${row.F}</td>
        `;
        tableBody.appendChild(tr);
    });
}


document.getElementById('viewSheetBtn').addEventListener('click', function() {
    const sheetView = document.getElementById('sheetView');
    if (sheetView.style.display === 'none') {
        sheetView.style.display = 'block';
        this.textContent = 'Hide Sheet';
        localStorage.setItem('sheetVisible', 'true');
        updateSheetView(false); 
    } else {
        sheetView.style.display = 'none';
        this.textContent = 'View Sheet';
        localStorage.setItem('sheetVisible', 'false');
        updateSheetView(true);
    }
});

async function initializeDashboard() {
   
    const lastFilters = JSON.parse(localStorage.getItem('lastFilters'));
    if (lastFilters) {
        document.getElementById('ageFilter').value = lastFilters.age;
        document.getElementById('genderFilter').value = lastFilters.gender;
        document.getElementById('startDate').value = lastFilters.startDate;
    }

    await updateCharts();
    
    if (localStorage.getItem('sheetVisible') === 'true') {
        const sheetView = document.getElementById('sheetView');
        const viewSheetBtn = document.getElementById('viewSheetBtn');
        sheetView.style.display = 'block';
        viewSheetBtn.textContent = 'Hide Sheet';
        await updateSheetView(false); 
    }
}

document.getElementById('filter').addEventListener('click', async () => {
    await updateCharts();
    if (document.getElementById('sheetView').style.display === 'block') {
        await updateSheetView(false); 
    }
});
document.getElementById('resetFilters').addEventListener('click', () => {
   
    document.getElementById('ageFilter').value = 'all';
    document.getElementById('genderFilter').value = 'all';
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';

    
    updateCharts();
});