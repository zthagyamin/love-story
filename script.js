/* =========================================
   1. 密码验证与启动
   ========================================= */
function checkPassword() {
    const password = "260228";
    const userInput = prompt("请输入我们的爱情暗号 (6位日期)");
    if (userInput === password) {
        document.getElementById("main-body").style.display = "block";
        initAll();
        console.log("密码正确，系统启动");
    } else if (userInput !== null) {
        alert("暗号不对哦，再想想？");
        checkPassword();
    }
}

/* =========================================
   2. 核心初始化 (在这里完成所有事件绑定)
   ========================================= */
function initAll() {
    updateDays();
    futureDays();
    setInterval(annualBirthdayCountdown, 1000);
    renderMessages();
    handleForm();

    // --- 强制绑定按钮点击事件 ---
    // 逻辑：不管是点按钮还是点文字，统统触发切换
    const quoteBtn = document.querySelector(".pink-btn") || document.querySelector(".small-btn");
    const quoteArea = document.getElementById("quote-display");

    if (quoteBtn) {
        quoteBtn.addEventListener("click", (e) => {
            console.log("按钮被点击了");
            spawnHearts(e);
        });
    }

    if (quoteArea) {
        quoteArea.addEventListener("click", (e) => {
            console.log("文字区域被点击了");
            spawnHearts(e);
        });
    }

    // 初始化显示一条情话
    popQuote();
}

/* =========================================
   3. 计时功能
   ========================================= */
function updateDays() {
    const start = new Date(2026, 1, 28);
    const diff = new Date() - start;
    document.getElementById("days-count").innerText = Math.floor(diff / (1000*60*60*24));
}

function futureDays() {
    const target = new Date(2026, 5, 15);
    const diff = target - new Date();
    document.getElementById("days-countfuture").innerText = Math.max(0, Math.ceil(diff / (1000*60*60*24)));
}

function annualBirthdayCountdown() {
    const now = new Date();
    let year = now.getFullYear();
    let target = new Date(year, 3, 23);
    if (now > target && (now.getDate() !== 23 || now.getMonth() !== 3)) {
        target = new Date(year + 1, 3, 23);
    }
    const diff = target - now;
    const timerDisp = document.getElementById("birthday-timer");
    const headerDisp = document.getElementById("countdown-header");
    const wishDisp = document.getElementById("birthday-wish");

    if (now.getMonth() === 3 && now.getDate() === 23) {
        if(headerDisp) headerDisp.style.display = "none";
        if(timerDisp) timerDisp.style.display = "none";
        if(wishDisp) wishDisp.style.display = "block";
    } else {
        const d = Math.floor(diff / (1000*60*60*24));
        const h = Math.floor((diff / (1000*60*60)) % 24);
        const m = Math.floor((diff / (1000*60)) % 60);
        const s = Math.floor((diff / 1000) % 60);
        if(timerDisp) timerDisp.innerText = `${d}天 ${h}时 ${m}分 ${s}秒`;
    }
}

/* =========================================
   4. 情话库与动画 (核心修复区)
   ========================================= */
const sweetQuotes = [
    "“林林，我爱你，是那种不讲道理的爱。”",
    "“那 96 分钟的沉默，是我在心里抱了你一千次。”",
    "“我很想你，比昨天多一点，比明天少一点。”",
    "“别怕高考，考完我带你去吃遍天下所有的好吃的。”",
    "“你不是垃圾，你是我这辈子捡到最珍贵的宝物。”",
    "“检测到林林能量不足，自动补给一个跨越千里的亲亲 💋”",
    "“恭喜 18 岁的林林领证上岗——正式成为张天帝心里唯一的法定守护对象。”",
    "“如果你的爱是垃圾，那我会是这辈子最贪婪的拾荒者，一片也不想留给别人”",
    "“别听那些否定的话，你在我这里的权重点（Weight）永远是最高的，无法覆盖。”",
    "“林林，你不是在努力变好，你是在发光，我只是那个离你最近、最怕你被抢走的护光人。”",
    "“我想你了。这种想念没有延迟，每一秒都是实时的、满格的。”",
    "“刚才发呆了三秒，第一秒在想你，第二秒在想怎么抱你，第三秒在想怎么亲你。”",
    "“一千多公里确实很远，但只要想到 6 月 15 号，我就觉得连路边的风都是甜的。”",
    "“世界多了一个大人，但我多了一个永远可以不用长大的小朋友。”",
    "“18 岁之后的路可能很辛苦，但别怕，我会是你永远的 Buffer，帮你挡掉所有的负面情绪。”",
    "“刚才又走神了，脑子里全是你刚睡醒的样子。”",
    "“现在的辛苦是为了以后的并肩作战，林林加油，我一直在。”",
    "“如果你累了，就躲进我怀里，这里永远是你的避风港。”",
    "“想你的时候，连路过的风都想抓住问问它有没有见过你。”",
    "“我说过的每一句‘我在’，都是终身有效的承诺。”",
    "“如果你不需要完美，因为我爱的就是那个独一无二的你。”",
    "“林林，我想你了。这四个字，我愿意说一万遍，直到你真正信我为止。”",
    "“你是 17 岁最完美的句点，也是 18 岁最灿烂的开篇。”"
];

function popQuote() {
    const display = document.getElementById("quote-display");
    if (!display) return;
    const randomIndex = Math.floor(Math.random() * sweetQuotes.length);
    display.classList.remove("animate-text");
    void display.offsetWidth; // 触发重绘
    display.innerText = sweetQuotes[randomIndex];
    display.classList.add("animate-text");
}

// 增加爱心喷发功能
function spawnHearts(e) {
    for (let i = 0; i < 6; i++) {
        const heart = document.createElement("span");
        heart.className = "heart-particle";
        heart.innerText = "❤️";
        // 兼容鼠标点击和触摸
        const x = e.clientX || (e.touches && e.touches[0].clientX);
        const y = e.clientY || (e.touches && e.touches[0].clientY);
        heart.style.left = x + "px";
        heart.style.top = y + "px";
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }
    popQuote(); // 同时切文字
}

/* =========================================
   5. 留言板逻辑
   ========================================= */
function renderMessages() {
    const list = document.getElementById("messages-list");
    if (!list) return;
    const msgs = JSON.parse(localStorage.getItem("loveDiaryMessages")) || [];
    list.innerHTML = msgs.reverse().map(m => `
        <div class="message-card">
            <strong>${m.name}</strong><p>${m.text}</p><small>${m.time}</small>
        </div>
    `).join('');
}

function handleForm() {
    const form = document.getElementById("message-form");
    if(!form) return;
    form.onsubmit = function(e) {
        e.preventDefault();
        const name = document.getElementById("nickname").value;
        const text = document.getElementById("message-text").value;
        const msgs = JSON.parse(localStorage.getItem("loveDiaryMessages")) || [];
        msgs.push({ name, text, time: new Date().toLocaleString() });
        localStorage.setItem("loveDiaryMessages", JSON.stringify(msgs));
        this.reset();
        renderMessages();
    };
}

function toggleMusic() {
    const m = document.getElementById("bg-music");
    m.paused ? m.play() : m.pause();
}

function sendLove() { alert("爱心已发送给林林！💕 张天帝正穿越时空拥抱你。"); }

window.onload = checkPassword;
