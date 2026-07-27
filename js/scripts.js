

/* =========================
   DOM ELEMENTS
========================= */

const rollButton = document.getElementById("roll-btn");

const achievementCard = document.getElementById("achievement-card");

const achievementTitle = document.getElementById("achievement-title");

const achievementText = document.getElementById("achievement-text");

const dice = document.getElementById("dice");

/* =========================
   DATA
========================= */

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

    {
        title: "Audio Master",
        text: "Along with my Software skills, I taught myself sound desgin and audio engineering"
    },

    {
        title: "Audio Master",
        text: "Along with my Software skills, I taught myself sound desgin and audio engineering"
    },

    {
        title: "Audio Master",
        text: "Along with my Software skills, I taught myself sound desgin and audio engineering"
    },

    {
        title: "Audio Master",
        text: "Along with my Software skills, I taught myself sound desgin and audio engineering"
    },

    {
        title: "Audio Master",
        text: "Along with my Software skills, I taught myself sound desgin and audio engineering"
    },

    {
        title: "Audio Master",
        text: "Along with my Software skills, I taught myself sound desgin and audio engineering"
    },

    {
        title: "Audio Master",
        text: "Along with my Software skills, I taught myself sound desgin and audio engineering"
    },

    {
        title: "Audio Master",
        text: "Along with my Software skills, I taught myself sound desgin and audio engineering"
    },

    {
        title: "Audio Master",
        text: "Along with my Software skills, I taught myself sound desgin and audio engineering"
    },

    {
        title: "Audio Master",
        text: "Along with my Software skills, I taught myself sound desgin and audio engineering"
    },

    {
        title: "Audio Master",
        text: "Along with my Software skills, I taught myself sound desgin and audio engineering"
    },

    {
        title: "Audio Master",
        text: "Along with my Software skills, I taught myself sound desgin and audio engineering"
    },

    {
        title: "Audio Master",
        text: "Along with my Software skills, I taught myself sound desgin and audio engineering"
    },

    {
        title: "Audio Master",
        text: "Along with my Software skills, I taught myself sound desgin and audio engineering"
    }

];

function rollAchievement(){

    const randomIndex = Math.floor(Math.random() * achievements.length);

    const achievement = achievements[randomIndex];

    achievementTitle.textContent = achievement.title;

    achievementText.textContent = achievement.text;

    dice.classList.remove("spin");

    void dice.offsetWidth;

    dice.classList.add("spin");
    
    console.log(dice.className);

    achievementCard.classList.add("show");

    dice.classList.add("spin");
    
    void dice.offsetWidth;

    setTimeout(()=>{

        achievementCard.classList.remove("show");

    },3000);

}

/* =========================
   EVENT LISTENERS
========================= */

rollButton.addEventListener("click", rollAchievement);
