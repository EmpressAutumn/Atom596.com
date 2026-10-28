<script lang="ts">
    import "$lib/assets/styles/autumn_insights.css";
    import SvelteMarkdown from "@humanspeak/svelte-markdown"
    import matter from "@11ty/gray-matter";
    import { onMount } from "svelte";

    const articles = [
        "placeholder",
        "storytelling",
        "the_passing_seasons"
    ];

    let articlesBar: HTMLDivElement;

    $: thisArticleMarkdown = "";
    $: thisArticleData = {
        "title": "",
        "subtitle": "",
        "author": "",
        "date": ""
    } as { [p: string]: any };

    const loadItems = async () => {
        const urlArticleKey = new URLSearchParams(window.location.search).get("article");
        const thisArticleKey = (urlArticleKey === null || articles.indexOf(urlArticleKey) == -1) ? articles[0] : urlArticleKey;

        for (const articleKey of articles) {
            const articleObject = matter(await((await fetch(`/autumn_insights/${articleKey}.md`)).text()));

            let articleData = articleObject.data;
            if (articleData.author === undefined) {
                articleData["author"] = "Autumn";
            }

            let articleBarTitle: string;

            if (articleKey == thisArticleKey) {
                thisArticleMarkdown = articleObject.content;
                thisArticleData = articleData;

                articleBarTitle = `
                    <p class="author-date">
                            <b>${articleData.title}</b>
                    </p>`;
            } else {
                articleBarTitle = `
                    <p class="author-date">
                        <a href="/autumn_insights?article=${articleKey}" data-sveltekit-reload>
                            <b>${articleData.title}</b>
                        </a>
                    </p>`;
            }

            articlesBar.innerHTML += `
                <div class="blogpost">
                    ${articleBarTitle}
                    <p class="author-date">${articleData.author}</p>
                    <p class="author-date">${articleData.date}</p>
                </div>`;
        }

    };

    onMount(() => {
        loadItems();
    });
</script>

<svelte:head>
    <title>{thisArticleData.title} | Autumn Insights</title>
</svelte:head>

<h1>Autumn Insights</h1>
<div class="blogposts" id="blogposts" bind:this={articlesBar}></div>
<div class="titlecontainer">
    <div class="titlebox">
        <h2 class="title" id="title">{thisArticleData.title}</h2>
        <h3>{thisArticleData.subtitle}</h3>
        <p class="author-date" id="author-date">{thisArticleData.author}</p>
        <p class="author-date" id="author-date">{thisArticleData.date}</p>
    </div>
</div>
<div class="article"><SvelteMarkdown source={thisArticleMarkdown} /></div>
