<script lang="ts">
    import "$lib/assets/styles/devnotes.css";
    import SvelteMarkdown from "@humanspeak/svelte-markdown"
    import { onMount } from "svelte";

    let articleMarkdown = "";
    let title = "";
    let authorAndDate = "";
    let tags = "";

    onMount(() => {
        const urlArticle = new URLSearchParams(window.location.search).get("note");
        fetch("/devnotes/articles.json")
            .then(response => { return response.json(); })
            .then(articles => {
                if (urlArticle === null || !Object.keys(articles).includes(urlArticle)) {
                    const url = new URL(window.location.toString());
                    url.searchParams.append("note", Object.keys(articles)[0]);
                    window.location.href = url.toString();
                } else {
                    title = articles[urlArticle].title;
                    authorAndDate = articles[urlArticle].author + " | " + articles[urlArticle].date;
                    tags = articles[urlArticle].tags;

                    let blogpostsElement = document.getElementById("blogposts");
                    if (blogpostsElement) {
                        Object.keys(articles).forEach(article => {
                            let title;
                            if (article === urlArticle) {
                                let t = articles[article].title;
                                title = `<p class="author-date"><b>${t}</b></p>`
                            } else {
                                let t = articles[article].title;
                                title = `<p class="author-date"><a href="/devnotes?note=${article}" data-sveltekit-reload><b>${t}</b></a></p>`
                            }
                            const author = articles[article].author;
                            const date = articles[article].date;
                            blogpostsElement.innerHTML += `
                        <div class="blogpost">
                            ${title}
                            <p class="author-date">${author}</p>
                            <p class="author-date">${date}</p>
                        </div>`;
                        })
                    }
                    fetch(`/devnotes/${urlArticle}.md`)
                        .then( response => { return response.text(); })
                        .then( text => {
                            articleMarkdown = text;
                        });
                }
            });
    });
</script>

<h1>Dev Notes</h1>
<div class="blogposts" id="blogposts"></div>
<div class="titlecontainer">
    <div class="titlebox">
        <h2 class="title" id="title">{title}</h2>
        <p class="author-date" id="author-date">{authorAndDate}</p>
        <p class="tags" id="tags">{tags}</p>
    </div>
</div>
<div class="article"><SvelteMarkdown source={articleMarkdown} /></div>
