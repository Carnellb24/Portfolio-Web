

/* ahcivement scripts */

const rollButton = document.getElementById("roll-btn");

const achievementCard = document.getElementById("achievement-card");

const achievementTitle = document.getElementById("achievement-title");

const achievementText = document.getElementById("achievement-text");

const achievements = [

    {
        title: "Dungeon Master",
        text: "Built and ran tabletop RPG campaigns for over 10 years."
    },

    {
        title: "Creative Builder",
        text: "Designed Heroic, a multi-genre tabletop RPG. I have plans to develop a compainion application. "
    },

    {
        title: "Software Apprentice",
        text: "Currently pursuing a Software Engineering degree at WGU."
    },

    {
        title: "Problem Solver",
        text: "I enjoy turning ideas into interactive software."
    },

    {
        title: "Always Learning",
        text: "I'm constantly improving my web development skills."
    },

    {
        title: "Audio Master",
        text: "Along with my Software skills, I taught myself sound desgin and audio engineering"
    },

];

function rollAchievement() {

    const randomIndex = Math.floor(Math.random() * achievements.length);

    const achievement = achievements[randomIndex];

    achievementTitle.textContent = achievement.title;

    achievementText.textContent = achievement.text;

}

rollButton.addEventListener("click", rollAchievement);

function rollAchievement() {

    const randomIndex = Math.floor(Math.random() * achievements.length);

    const achievement = achievements[randomIndex];

    achievementTitle.textContent = achievement.title;

    achievementText.textContent = achievement.text;

    achievementCard.classList.add("show");

    setTimeout(() => {

        achievementCard.classList.remove("show");

    }, 3000);

}


