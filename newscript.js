document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("changeTextButton");
    const textElement = document.getElementById("displayText");

    button.addEventListener("click", function () {
        textElement.textContent = "Text has been changed!";
        console.log("Button clicked! Text updated.");
    });
});
