<script lang="ts">
    import "$lib/assets/styles/devnotes.css";
    import SvelteMarkdown from "@humanspeak/svelte-markdown"
    import { onMount } from "svelte";

    $: articleMarkdown = "";
    $: title = "";
    $: subtitle = "";

    $: pageTitle = "";

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
                    let blogpostsElement = document.getElementById("blogposts");
                    if (blogpostsElement) {
                        Object.keys(articles).forEach(articleKey => {
                            let titleHTML = "";
                            if (articleKey === urlArticle) {
                                title = articles[articleKey].title;
                                subtitle = `${articles[articleKey].author} | ${articles[articleKey].date}`;
                                pageTitle = `${title} | DevNotes`;
                                titleHTML = `<p class="author-date"><b>${articles[articleKey].title}</b></p>`;
                            } else {
                                titleHTML = `<p class="author-date"><a href="/devnotes?note=${articleKey}" data-sveltekit-reload><b>${articles[articleKey].title}</b></a></p>`;
                            }
                            const author = articles[articleKey].author;
                            const date = articles[articleKey].date;
                            blogpostsElement.innerHTML += `
                        <div class="blogpost">
                            ${titleHTML}
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

<svelte:head>
    <title>{pageTitle}</title>
</svelte:head>

<h1>Dev Notes</h1>
<div class="blogposts" id="blogposts"></div>
<div class="titlecontainer">
    <div class="titlebox">
        <h2 class="title" id="title">{title}</h2>
        <p class="author-date" id="author-date">{subtitle}</p>
    </div>
</div>
<div class="article"><SvelteMarkdown source={articleMarkdown} /></div>
