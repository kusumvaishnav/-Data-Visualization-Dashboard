

// let registeredUsers = [
//     {
//         fullName: "user",
//         email: "test@example.com",
//         username: "user1",
//         password: "123"
//     }
// ];

// // Authentication Logic
// document.getElementById('showLogin').addEventListener('click', (e) => {
//     e.preventDefault();
//     document.getElementById('signupPage').style.display = 'none';
//     document.getElementById('loginPage').style.display = 'flex';
// });

// document.getElementById('showSignup').addEventListener('click', (e) => {
//     e.preventDefault();
//     document.getElementById('loginPage').style.display = 'none';
//     document.getElementById('signupPage').style.display = 'flex';
// });

// // document.getElementById('forgotPassword').addEventListener('click', (e) => {
// //     e.preventDefault();
// //     alert('Password reset link will be sent to your email.');
// // });

// // Sign up form handler
// document.getElementById('signupForm').addEventListener('submit', function(e) {
//     e.preventDefault();
    
//     const fullName = document.querySelector('#signupForm input[name="fullName"]').value;
//     const email = document.querySelector('#signupForm input[name="email"]').value;
//     const username = document.querySelector('#signupForm input[name="username"]').value;
//     const password = document.querySelector('#signupForm input[name="password"]').value;
    
//     // Check if username already exists
//     if (registeredUsers.some(user => user.username === username)) {
//         alert('Username already exists! Please choose another.');
//         return;
//     }
    
//     // Register new user
//     registeredUsers.push({
//         fullName,
//         email,
//         username,
//         password
//     });
    
//     // Store in localStorage
//     localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    
//     alert('Account created successfully! Please log in.');
//     document.getElementById('showLogin').click();
// });

// // Login form handler
// document.getElementById('loginForm').addEventListener('submit', function(e) {
//     e.preventDefault();
    
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;
    
//     // Load users from localStorage
//     const storedUsers = localStorage.getItem('registeredUsers');
//     if (storedUsers) {
//         registeredUsers = JSON.parse(storedUsers);
//     }
    
//     // Check credentials
//     const user = registeredUsers.find(u => u.username === username && u.password === password);
    
//     if (user) {
//         localStorage.setItem('isAuthenticated', 'true');
//         localStorage.setItem('username', username);
//         localStorage.setItem('fullName', user.fullName);
//         showDashboard();
//     } else {
//         alert('Invalid username or password!');
//     }
// });

// // Dashboard Logic
// let barChart, lineChart;

// // Fetch JSON data
// async function fetchData() {
//     try {
//         const response = await fetch('data.json'); // Ensure this file exists and is accessible
//         const jsonData = await response.json();
//         return jsonData.data;
//     } catch (error) {
//         console.error('Error loading data:', error);
//         return [];
//     }
// }

// function showDashboard() {
//     document.getElementById('loginPage').style.display = 'none';
//     document.getElementById('signupPage').style.display = 'none';
//     document.getElementById('dashboardPage').style.display = 'block';
//     document.getElementById('userDisplay').textContent = localStorage.getItem('fullName');
//     initializeDashboard();
// }

// async function filterData() {
//     const data = await fetchData();
//     const ageFilter = document.getElementById('ageFilter').value;
//     const genderFilter = document.getElementById('genderFilter').value;
//     const startDate = document.getElementById('startDate').value;
//     const endDate = document.getElementById('endDate').value;

//     return data.filter(item => {
//         const dateMatch = (!startDate || !endDate || (item.Day >= startDate && item.Day <= endDate));
//         const ageMatch = (ageFilter === 'all' || item.Age === ageFilter);
//         const genderMatch = (genderFilter === 'all' || item.Gender === genderFilter);
//         return dateMatch && ageMatch && genderMatch;
//     });
// }

// async function updateCharts() {
//     const filteredData = await filterData();
    
//     // Update bar chart
//     const features = ['A', 'B', 'C', 'D', 'E', 'F'];
//     const totals = features.map(feature => 
//         filteredData.reduce((sum, item) => sum + item[feature], 0)
//     );

//     if (barChart) barChart.destroy();
//     barChart = new Chart(document.getElementById('barChart'), {
//         type: 'bar',
//         data: {
//             labels: features,
//             datasets: [{
//                 label: 'Total Time Spent',
//                 data: totals,
//                 backgroundColor: 'rgba(54, 162, 235, 0.5)'
//             }]
//         },
//         options: {
//             responsive: true,
//             onClick: (event, elements) => {
//                 if (elements.length > 0) {
//                     const index = elements[0].index;
//                     updateLineChart(features[index]);
//                 }
//             }
//         }
//     });

//     // Initialize line chart if not yet created
//     if (!lineChart) {
//         updateLineChart('A');
//     }
// }

// async function updateLineChart(feature) {
//     const filteredData = await filterData();
//     const dates = [...new Set(filteredData.map(item => item.Day))].sort();
//     const values = dates.map(date => 
//         filteredData
//             .filter(item => item.Day === date)
//             .reduce((sum, item) => sum + item[feature], 0)
//     );

//     if (lineChart) lineChart.destroy();
//     lineChart = new Chart(document.getElementById('lineChart'), {
//         type: 'line',
//         data: {
//             labels: dates,
//             datasets: [{
//                 label: `Feature ${feature} Trend`,
//                 data: values,
//                 borderColor: 'rgb(75, 192, 192)',
//                 tension: 0.1
//             }]
//         },
//         options: {
//             responsive: true
//         }
//     });
// }

// async function initializeDashboard() {
//     await updateCharts();
// }

// // Filter event listeners
// ['ageFilter', 'genderFilter', 'startDate', 'endDate'].forEach(id => {
//     document.getElementById(id).addEventListener('change', updateCharts);
// });

// // Logout Logic
// document.getElementById('logoutBtn').addEventListener('click', function () {
//     localStorage.removeItem('isAuthenticated');
//     localStorage.removeItem('username');
//     localStorage.removeItem('fullName');
//     document.getElementById('dashboardPage').style.display = 'none';
//     document.getElementById('loginPage').style.display = 'flex';
// });





let registeredUsers = [
    {
        fullName: "user",
        email: "test@example.com",
        username: "user1",
        password: "123"
    }
];


// // Dark Mode / Light Mode Toggle
// document.getElementById('modeToggle').addEventListener('click', () => {
//     document.body.classList.toggle('dark-mode');
// });

// Zoom In and Zoom Out functionality
document.getElementById('zoomIn').addEventListener('click', () => {
    let currentScale = parseFloat(document.getElementById('dashboardPage').style.transform.replace('scale(', '').replace(')', '')) || 1;
    document.getElementById('dashboardPage').style.transform = `scale(${currentScale + 0.1})`;
});

document.getElementById('zoomOut').addEventListener('click', () => {
    let currentScale = parseFloat(document.getElementById('dashboardPage').style.transform.replace('scale(', '').replace(')', '')) || 1;
    if (currentScale > 0.5) {
        document.getElementById('dashboardPage').style.transform = `scale(${currentScale - 0.1})`;
    }
});




// Authentication Logic
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

// Sign up form handler
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fullName = document.querySelector('#signupForm input[name="fullName"]').value;
    const email = document.querySelector('#signupForm input[name="email"]').value;
    const username = document.querySelector('#signupForm input[name="username"]').value;
    const password = document.querySelector('#signupForm input[name="password"]').value;
    
    if (registeredUsers.some(user => user.username === username)) {
        alert('Username already exists! Please choose another.');
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

// Login form handler
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

// log out
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('logoutButton').addEventListener('click', function() {
        console.log("Logged out");
    });
});


// Dashboard Logic
let barChart, lineChart;

// Fetch JSON data
async function fetchData() {
    try {
        const response = await fetch('data.json'); // Ensure this file exists and is accessible
        const jsonData = await response.json();
        return jsonData.data;
    } catch (error) {
        console.error('Error loading data:', error);
        return [];
    }
}

function showDashboard() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('signupPage').style.display = 'none';
    document.getElementById('dashboardPage').style.display = 'block';
    document.getElementById('userDisplay').textContent = localStorage.getItem('fullName');
    initializeDashboard();
}

async function filterData() {
    const data = await fetchData();
    const ageFilter = document.getElementById('ageFilter').value;
    const genderFilter = document.getElementById('genderFilter').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    return data.filter(item => {
        const dateMatch = (!startDate || !endDate || (item.Day >= startDate && item.Day <= endDate));
        const ageMatch = (ageFilter === 'all' || item.Age === ageFilter);
        const genderMatch = (genderFilter === 'all' || item.Gender === genderFilter);
        return dateMatch && ageMatch && genderMatch;
    });
}

async function updateCharts() {
    const filteredData = await filterData();
    
    // Update bar chart
    const features = ['A', 'B', 'C', 'D', 'E', 'F'];
    const totals = features.map(feature => 
        filteredData.reduce((sum, item) => sum + item[feature], 0)
    );

    if (barChart) barChart.destroy();
    barChart = new Chart(document.getElementById('barChart'), {
        type: 'bar',
        data: {
            labels: features,
            datasets: [{
                label: 'Total Time Spent',
                data: totals,
                backgroundColor: 'rgba(38, 136, 201, 0.5)'
            }]
        },
        options: {
            responsive: true,
            onClick: (event, elements) => {
                if (elements.length > 0) {
                    const index = elements[0].index;
                    updateLineChart(features[index]);
                }
            }
        }
    });

    // Initialize line chart if not yet created
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

// Filter event listeners
['ageFilter', 'genderFilter', 'startDate', 'endDate'].forEach(id => {
    document.getElementById(id).addEventListener('change', updateCharts);
});



// Logout Logic
document.getElementById('logoutBtn').addEventListener('click', function () {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    localStorage.removeItem('fullName');
    document.getElementById('dashboardPage').style.display = 'none';
    document.getElementById('loginPage').style.display = 'flex';
});


