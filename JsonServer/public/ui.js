import { getUser } from '/bl.js';

async function loadUsers(){
    const users = await getUser();
    const usersContainer = document.getElementById('users-container');

    users.forEach(user => {
      
        usersContainer.insertAdjacentHTML('beforeend', 
            `
            <div class="card" style="width: 18rem;">
                <img src="https://via.placeholder.com/150" class="card-img-top" alt="${user.name}">
                <div class="card-body">
                    <h5 class="card-title">${user.name}</h5>
                    <p class="card-text">Username: ${user.username}</p>
                    <a href="#" class="btn btn-primary">View Profile</a>
                </div>
            </div>
            `
        )
    });
}

loadUsers();


