const icons = document.querySelectorAll(".icon-user");
const option = ["stone", "paper", "scissor"];
const currentStatus = document.getElementById("status");
const playground = document.getElementById("playground");
const userScore = document.getElementById("user-score");
const computerScore = document.getElementById("computer-score");

function addScore(name) {
    if (name === "user") currentStatus.innerHTML = "Hurray! you Won &#128515";
    else if (name === "draw") currentStatus.innerHTML = "OOPs draw! &#129318";
    else currentStatus.innerHTML = "You Lost &#128546";

    let score = JSON.parse(localStorage.getItem("score"));
    score[name] = score[name] + 1;
    localStorage.setItem("score", JSON.stringify(score));
    userScore.innerText = score.user;
    computerScore.innerText = score.computer;
}

const check = () => {
    const score = JSON.parse(localStorage.getItem("score"));
    if (score.user === 3 || score.computer === 3) {
        localStorage.clear();
        const button = document.createElement("button");
        const h2 = document.createElement("h2");
        button.innerText = "restart";
        button.setAttribute("onclick", "location.reload()");
        if (score.user === 3) h2.innerHTML = "Hurray you have won the match! &#128515";
        else h2.innerHTML = "You Lost the match &#128546";

        setTimeout(() => {
            playground.innerHTML = "";
            playground.appendChild(h2);
            playground.appendChild(button);
        }, 1000);
    }
};

const play = (userAnswer) => {
    const user = document.getElementById(userAnswer);
    user.classList.remove("animation");
    setTimeout(() => {
        user.classList.add("animation");
    }, 10);

    const compAnswer = option[Math.floor(Math.random() * 10) % 3];
    const computer = document.getElementById(compAnswer + "-computer");
    computer.classList.remove("animation");
    setTimeout(() => {
        computer.classList.add("animation");
    }, 10);

    if (compAnswer === userAnswer) return "draw";
    if (userAnswer === "paper")
        return compAnswer === "scissor" ? "computer" : "user";
    if (userAnswer === "scissor")
        return compAnswer === "stone" ? "computer" : "user";
    if (userAnswer === "stone")
        return compAnswer === "paper" ? "computer" : "user";
};

(() => {
    if (!localStorage.getItem("score"))
        localStorage.setItem("score", JSON.stringify({ user: 0, computer: 0 }));

    const score = JSON.parse(localStorage.getItem("score"));
    userScore.innerText = score.user;
    computerScore.innerText = score.computer;
    icons.forEach((item) => {
        item.addEventListener("click", (e) => {
            addScore(play(item.getAttribute("id")));
            check();
        });
    });
})();
