fetch("topbar.html")
    .then(response => response.text())
    .then((data) => {
        document.getElementById("topbar").innerHTML = data;
        const toggleButton = document.getElementById("mode-toggle");
        if (toggleButton) {
            toggleButton.addEventListener("click", toggleMode);
        }
    });
