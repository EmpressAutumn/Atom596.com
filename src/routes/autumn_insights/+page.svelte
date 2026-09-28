<script lang="ts">
    import "$lib/assets/styles/autumn_insights.css";
    import SvelteMarkdown from "@humanspeak/svelte-markdown"
    import { onMount } from "svelte";

    $: pageTitle = "";

    $: title = "";
    $: subtitle = "";
    $: author = "";
    $: date = "";

    $: articleMarkdown = "";

    onMount(() => {
        const thisArticleKey = new URLSearchParams(window.location.search).get("article");
        fetch("/autumn_insights/articles.json")
            .then(response => { return response.json(); })
            .then(articles => {
                // Is the article key in the URL missing or invalid?
                if (thisArticleKey === null || !Object.keys(articles).includes(thisArticleKey)) {
                    // Set the article key to the most recent article and reload
                    const url = new URL(window.location.toString());
                    url.searchParams.set("article", Object.keys(articles)[0]);
                    window.location.href = url.toString();
                } else {
                    let blogpostsElement = document.getElementById("blogposts");
                    if (blogpostsElement) {
                        // Loop through each blog post
                        Object.keys(articles).forEach(articleKey => {
                            // Get blog post metadata
                            const articleTitle = articles[articleKey].title;
                            const articleSubtitle = (articles[articleKey].subtitle) ? articles[articleKey].subtitle : "";
                            const articleAuthor = (articles[articleKey].author) ? articles[articleKey].author : "Autumn";
                            const articleDate = articles[articleKey].date;

                            if (articleKey === thisArticleKey) {
                                // Assign the metadata to the global variables
                                pageTitle = `${articleTitle} | Autumn Insights`

                                title = articleTitle;
                                subtitle = articleSubtitle;
                                author = articleAuthor;
                                date = articleDate;

                                fetch(`/autumn_insights/${thisArticleKey}.md`)
                                    .then( response => { return response.text(); })
                                    .then( text => {
                                        articleMarkdown = text;
                                    });
                            }

                            // Add this post to the navbar
                            blogpostsElement.innerHTML += `
                        <div class="blogpost">
                            ${(articleKey === thisArticleKey) ?
                                `<p class="author-date"><b>${articles[articleKey].title}</b></p>` :
                                `<p class="author-date"><a href="/autumn_insights?article=${articleKey}" data-sveltekit-reload>
                                    <b>${articles[articleKey].title}</b>
                                </a></p>`
                            }
                            <p class="author-date">${author}</p>
                            <p class="author-date">${date}</p>
                        </div>`;
                        })
                    }
                }
            });
    });
</script>

<svelte:head>
    <title>{title} | Autumn Insights</title>
</svelte:head>

<h1>Autumn Insights</h1>
<div class="blogposts" id="blogposts"></div>
<div class="titlecontainer">
    <div class="titlebox">
        <h2 class="title" id="title">{title}</h2>
        <h3>{subtitle}</h3>
        <p class="author-date" id="author-date">{author}</p>
        <p class="author-date" id="author-date">{date}</p>
    </div>
</div>
<div class="article"><SvelteMarkdown source={articleMarkdown} /></div>
