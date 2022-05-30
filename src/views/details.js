import { deleteArticle, getArticleById } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (article, onDelete, isOwner) => html`
<section id="detailsPage">
    <div id="detailsBox">
        <div class="detailsInfo">
            <h1>Title: ${article.title}</h1>
            <div>
                <img src=${article.imageUrl} />
            </div>
        </div>

        <div class="details">
            <h3>Theater Description</h3>
            <p>${article.description}</p>
            <h4>Date: ${article.date}</h4>
            <h4>Author: ${article.author}</h4>
            <div class="buttons">
                ${isOwner ? html`<a @click=${onDelete} class="btn-delete" href="javascript:void(0)">Delete</a>
                <a class="btn-edit" href="/edit/${article._id}">Edit</a>`
                : null}
                <!-- <a class="btn-like" href="#">Like</a> -->
            </div>
            <p class="likes">Likes: 0</p>
        </div>
    </div>
</section>
`

export async function detailsView(ctx) {
    const article = await getArticleById(ctx.params.id);
    const userData = await getUserData();
    const isOwner = userData && userData.id == article._ownerId;

    ctx.render(detailsTemplate(article, onDelete, isOwner));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this article?');

        if (choice) {
            await deleteArticle(ctx.params.id);
            ctx.page.redirect('/');
        }
    }
}