function insertTopbar() {
    fetch("topbar.html")
        .then(response => response.text())
        .then((data) => {
            document.getElementById("topbar").innerHTML = data;
        });
}

function checkMobile() {
    if(window.innerWidth/window.innerHeight < 1) {
        document.getElementById("content").style.width = "calc(100% - 18px)";
        document.getElementById("content").style.left = "calc(0% + 9px)";
    } else {
        document.getElementById("content").style.width = "calc(70% - 18px)";
        document.getElementById("content").style.left = "calc(15% + 9px)";
    }
    console.log(window.innerWidth/window.innerHeight);
}

insertTopbar();
checkMobile();

window.addEventListener("resize", function() {
    checkMobile();
})
