// import { fetchUserProfile } from '../api/auth.js';
import { getLoggedInUser } from '../api/auth.js';

const createBtn = document.getElementById('create-btn');
const cancelBtn = document.getElementById('cancel-btn');
const modalElement = document.getElementById('create-modal');

createBtn.addEventListener('click', () => {
    if (modalElement) {
        console.log("Create button clicked");
        modalElement.classList.remove('hidden');
        modalElement.classList.add('visible');
    }
});

cancelBtn.addEventListener('click', () => {
    if (modalElement) {
        console.log("Cancel button clicked");
        modalElement.classList.remove('visible');
        modalElement.classList.add('hidden');
    }
});

window.addEventListener('load', async () => {
//  await fetchUserProfile();
})

const user = getLoggedInUser();
if (user) {
  console.log('Logged in user:', user);
} else {
  console.log('No user is logged in');
}