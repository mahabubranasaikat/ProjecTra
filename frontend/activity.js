const API_BASE_URL = `${window.location.origin}/api`;

// Load auth manager
let authManager;
try {
    authManager = window.authManager;
} catch (e) {
    authManager = {
        getToken: () => localStorage.getItem('ProjecTra_token'),
        getUserData: () => {
            const data = localStorage.getItem('ProjecTra_user');
            return data ? JSON.parse(data) : null;
        },
        logout: () => {
            localStorage.removeItem('ProjecTra_token');
            localStorage.removeItem('ProjecTra_user');
            localStorage.removeItem('userId');
        },
        authenticatedFetch: async (url, options = {}) => {
            const token = authManager.getToken();
            const config = {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                }
            };
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            const response = await fetch(url, config);
            if (response.status === 401) {
                authManager.logout();
                window.location.href = '/auth/login.html';
            }
            return response;
        }
    };
}


// Profile info display elements
const displayUserId = document.getElementById('displayUserId');
const type = document.getElementById('type');
const description = document.getElementById('description');
const time = document.getElementById('time');

let userId = null;

// Get user ID from JWT token or URL
function getUserId() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlUserId = urlParams.get('userId');
    
    if (urlUserId) return urlUserId;
    
    // Get from JWT token
    const userData = authManager.getUserData();
    if (userData) return userData.userId;
    
    // Legacy fallback
    return localStorage.getItem('userId');
}

// Load profile data
async function loadProfile() {
    userId = getUserId();
    
    if (!userId) {
        showAlert('No user ID found. Please login first.', 'error');
        setTimeout(() => {
            
        }, 2000);
        return;
    }
    
    try {
        const response = await authManager.authenticatedFetch(`${API_BASE_URL}/profile/${userId}`);
        const data = await response.json();
        
        if (response.ok && data.success) {
            originalData = data.data;
            populateForm(data.data);
            loadingState.style.display = 'none';
            form.style.display = 'block';
        } else {
            if (response.status === 404) {
                showAlert('Profile not found. Please create a new profile.', 'error');
                setTimeout(() => {
                    window.location.href = 'create-profile.html';
                }, 2000);
            } else {
                showAlert('Failed to load profile. Please try again.', 'error');
            }
            loadingState.style.display = 'none';
        }
    } catch (error) {
        console.error('Error loading profile:', error);
        showAlert('Network error. Please check your connection.', 'error');
        loadingState.style.display = 'none';
    }
}

