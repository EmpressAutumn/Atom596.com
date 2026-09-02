function insertTopbar() {
    fetch("/topbar.html")
        .then(response => response.text())
        .then((data) => {
            document.getElementById("topbar").innerHTML = data;
        });
}

function checkMobile() {
    if(window.innerWidth/window.innerHeight < 1) {
        document.getElementById("content").style.width = "100%";
        document.getElementById("content").style.left = "0%";
    } else {
        document.getElementById("content").style.width = "70%";
        document.getElementById("content").style.left = "15%";
    }
}

insertTopbar();
checkMobile();

window.addEventListener("resize", function() {
    checkMobile();
})
