import { getMyArticles } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const profileTemplate = (articles, userData) => html`
<section id="profilePage">
    <div class="userInfo">
        <div class="avatar">
            <img src="./images/profilePic.png">
        </div>
        <h2>${userData.email}</h2>
    </div>
    <div class="board">
        ${articles.length == 0 ? html`
        <div class="no-events">
            <p>This user has no events yet!</p>
        </div>`
        : articles.map(articleCard)}
    </div>
</section>
`;

const articleCard = (article) => html`
<div class="eventBoard">
    <div class="event-info">
        <img src=${article.imageUrl}>
        <h2>${article.title}</h2>
        <h6>${article.date}</h6>
        <a href="/details/${article._id}" class="details-button">Details</a>
    </div>
</div>
`;

export async function profileView(ctx) {
    const userData = getUserData();
    const articles = await getMyArticles(userData.id);
    ctx.render(profileTemplate(articles, userData));
}