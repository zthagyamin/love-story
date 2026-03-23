/* script.js */

function checkPassword() 
{
    var password = "260228";
    
    function requestPassword() 
    {
        var userInput = prompt("请输入我们的爱情暗号 (6位日期)");

        if (userInput === null) 
        {
            alert("期待你的下次开启！");
        } 
        else if (userInput === password) 
        {
            document.getElementById("main-body").style.display = "block";
            updateDays();
            futureDays();
            alert("欢迎进入专属空间！点击音乐图标播放背景音乐。");
        } 
        else 
            {
            alert("暗号不对哦，再想想？");
            requestPassword();
        }
    }
    requestPassword();
}

function updateDays() 
{
    var startDate = new Date(2026, 1, 28);
    var today = new Date();
    var diff = today - startDate;
    var days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
    document.getElementById("days-count").innerHTML = days;
}

function futureDays() 
{
    var meetingDay = new Date(2026, 5, 15);
    var today = new Date();
    var diff = meetingDay - today;
    var days = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    document.getElementById("days-countfuture").innerHTML = days;
}

function sendLove() 
{
    alert("爱心已发送给林林！💕");
}

function toggleMusic() 
{
    var music = document.getElementById("bg-music");
    if (music.paused) 
    {
        music.play();
    } 
    else 
    {
        music.pause();
    }
}

function renderMessages() 
{
    // 修正点 1：ID 改为全小写 "messages-list"
    var messagesList = document.getElementById("messages-list");
    
    if (!messagesList) return; // 安全检查

    // 修正点 2：统一使用变量名 savedMessages (带 d)
    var savedMessages = JSON.parse(localStorage.getItem("loveDiaryMessages")) || [];

    messagesList.innerHTML = "";
    
    savedMessages.forEach(function(item) 
    {
        var card = document.createElement("div");
        card.className = "message-card";
        card.innerHTML = "<strong>" + item.name + "</strong>" +
                         "<p>" + item.text + "</p>" +
                         "<small>" + item.time + "</small>";
        messagesList.appendChild(card);
    });
}

function handleForm() 
{
    var form = document.getElementById("message-form");
    if (!form) return;

    form.onsubmit = function(e) 
    {
        e.preventDefault(); 

        var nameInput = document.getElementById("nickname");
        var textInput = document.getElementById("message-text");

        if (nameInput.value === "" || textInput.value === "") 
        {
            alert("写点什么吧！");
            return;
        }

        var newMessage = 
        {
            name: nameInput.value,
            text: textInput.value,
            time: new Date().toLocaleString()
        };

        var savedMessages = JSON.parse(localStorage.getItem("loveDiaryMessages")) || [];
        savedMessages.push(newMessage);

        localStorage.setItem("loveDiaryMessages", JSON.stringify(savedMessages));

        form.reset();
        renderMessages();
    };
}

window.onload = function() 
{
    checkPassword();
    renderMessages(); 
    handleForm();     
};