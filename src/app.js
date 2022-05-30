import { logout } from '../src/api/data.js';
import {render, page} from './lib.js';
import { getUserData } from './util.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { allEventsView } from './views/home.js';
import { loginView } from './views/login.js';
import { profileView } from './views/profile.js';
import { registerView } from './views/register.js';


const root = document.getElementById('content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', allEventsView);
page('/login', loginView);
page('/register', registerView);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/profile', profileView);

updateUserNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;
    next();
}

export async function updateUserNav() {
    const userData = await getUserData();
    if (userData) {
        document.getElementById('profileNav').style.display = 'inline-block';
        document.getElementById('createNav').style.display = 'inline-block';
        document.getElementById('logoutBtn').style.display = 'inline-block';
        document.getElementById('loginNav').style.display = 'none';
        document.getElementById('registerNav').style.display = 'none';
    }else {
        document.getElementById('profileNav').style.display = 'none';
        document.getElementById('createNav').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'none';
        document.getElementById('loginNav').style.display = 'inline-block';
        document.getElementById('registerNav').style.display = 'inline-block';
    }
}

async function onLogout() {
    await logout();
    updateUserNav();
    page.redirect('/');
}