import { getUsers } from './dal.js';


export async function getUser () {
    const users = await getUsers();

    return users.map(user => ({
        id: user.id,
        name: user.name,
        username: user.username

    }));
}

