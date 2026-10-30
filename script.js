const grade = document.getElementById("grade");
const booksSection = document.getElementById("booksSection");
const booksArea = document.getElementById("booksArea");
const subjectsSection = document.getElementById("subjectsSection");
const subjectsArea = document.getElementById("subjects");
const quizArea = document.getElementById("quizArea");
const resultArea = document.getElementById("resultArea");

const ministryBooks =
    "https://moe.gov.eg/ar/elearningenterypage/e-learning/";

const gradeNames = {
    prep1: "أولى إعدادي",
    prep2: "تانية إعدادي",
    prep3: "تالتة إعدادي",
    sec1: "أولى ثانوي",
    sec2: "تانية ثانوي",
    sec3: "تالتة ثانوي"
};

const subjectLists = {
    prep1: ["اللغة العربية", "اللغة الإنجليزية", "الرياضيات", "العلوم", "الدراسات الاجتماعية", "التربية الدينية"],
    prep2: ["اللغة العربية", "اللغة الإنجليزية", "الرياضيات", "العلوم", "الدراسات الاجتماعية", "التربية الدينية"],
    prep3: ["اللغة العربية", "اللغة الإنجليزية", "الرياضيات", "العلوم", "الدراسات الاجتماعية", "التربية الدينية"],
    sec1: ["اللغة العربية", "اللغة الإنجليزية", "الرياضيات", "الفيزياء", "الكيمياء", "الأحياء", "التاريخ"],
    sec2: ["اللغة العربية", "اللغة الإنجليزية", "الرياضيات", "الفيزياء", "الكيمياء", "الأحياء", "التاريخ"],
    sec3: ["اللغة العربية", "اللغة الإنجليزية", "الرياضيات", "الفيزياء", "الكيمياء", "الأحياء", "التاريخ"]
};

// كل سؤال: نص السؤال، الاختيارات، رقم الإجابة الصحيحة
const questionBanks = {
    "اللغة العربية": [
        ["ما نوع كلمة (مدرسة)؟", ["اسم", "فعل", "حرف"], 0],
        ["ما جمع كلمة (كتاب)؟", ["كاتب", "كتب", "مكتبة"], 1],
        ["ما مضاد كلمة (النجاح)؟", ["التفوق", "الفشل", "التقدم"], 1],
        ["ما نوع الجملة (الشمس مشرقة)؟", ["فعلية", "اسمية", "شرطية"], 1],
        ["ما علامة رفع المبتدأ؟", ["الفتحة", "الكسرة", "الضمة"], 2]
    ],

    "اللغة الإنجليزية": [
        ["Choose: I ___ a student.", ["am", "is", "are"], 0],
        ["What is the plural of (book)?", ["bookes", "books", "bookies"], 1],
        ["Choose: She ___ to school every day.", ["go", "goes", "going"], 1],
        ["The opposite of (big) is:", ["small", "tall", "long"], 0],
        ["Choose: They ___ playing now.", ["is", "am", "are"], 2]
    ],

    "الرياضيات": [
        ["ناتج 5 × 6 يساوي؟", ["25", "30", "35"], 1],
        ["ناتج 20 ÷ 4 يساوي؟", ["4", "5", "6"], 1],
        ["مجموع زوايا المثلث؟", ["90", "180", "360"], 1],
        ["الجذر التربيعي للعدد 49؟", ["6", "7", "8"], 1],
        ["ناتج 10² يساوي؟", ["20", "100", "1000"], 1]
    ],

    "العلوم": [
        ["ما مصدر الطاقة الرئيسي للأرض؟", ["القمر", "الشمس", "النجوم"], 1],
        ["ما الغاز الذي نتنفسه؟", ["الأكسجين", "النيتروجين", "الهيدروجين"], 0],
        ["ما وحدة قياس القوة؟", ["المتر", "النيوتن", "اللتر"], 1],
        ["أي عضو يضخ الدم؟", ["المخ", "القلب", "الرئة"], 1],
        ["ما حالة الماء عند التجمد؟", ["سائلة", "صلبة", "غازية"], 1]
    ],

    "الدراسات الاجتماعية": [
        ["ما عاصمة مصر؟", ["القاهرة", "الإسكندرية", "أسوان"], 0],
        ["تقع مصر في قارة؟", ["آسيا فقط", "أفريقيا", "أوروبا"], 1],
        ["ما أطول نهر في مصر؟", ["النيل", "الفرات", "دجلة"], 0],
        ["ما البحر الذي يقع شمال مصر؟", ["الأحمر", "المتوسط", "العربي"], 1],
        ["ما وسيلة تمثيل سطح الأرض؟", ["الخريطة", "الساعة", "الميزان"], 0]
    ],

    "التربية الدينية": [
        ["كم عدد أركان الإسلام؟", ["أربعة", "خمسة", "ستة"], 1],
        ["ما أول سورة في المصحف؟", ["الفاتحة", "البقرة", "الإخلاص"], 0],
        ["كم عدد الصلوات المفروضة؟", ["ثلاث", "خمس", "سبع"], 1],
        ["ما الشهر الذي يصوم فيه المسلمون؟", ["شعبان", "رمضان", "شوال"], 1],
        ["ما قبلة المسلمين؟", ["المسجد الأقصى", "الكعبة", "المسجد النبوي"], 1]
    ],

    "الفيزياء": [
        ["ما وحدة قياس السرعة؟", ["متر/ثانية", "كجم", "نيوتن"], 0],
        ["ما رمز القوة؟", ["F", "M", "T"], 0],
        ["تقاس الكتلة بوحدة؟", ["المتر", "الكيلوجرام", "الثانية"], 1],
        ["ما مصدر الضوء الطبيعي؟", ["الشمس", "المرآة", "الكتاب"], 0],
        ["وحدة قياس الزمن؟", ["الثانية", "المتر", "اللتر"], 0]
    ],

    "الكيمياء": [
        ["ما الرمز الكيميائي للماء؟", ["CO2", "H2O", "O2"], 1],
        ["ما رمز الأكسجين؟", ["O", "H", "N"], 0],
        ["ما أصغر وحدة في العنصر؟", ["الذرة", "الخلية", "الجزيء"], 0],
        ["ما الرمز الكيميائي للذهب؟", ["Ag", "Au", "Fe"], 1],
        ["ما الغاز الذي يرمز له CO2؟", ["الأكسجين", "ثاني أكسيد الكربون", "الهيدروجين"], 1]
    ],

    "الأحياء": [
        ["ما وحدة بناء جسم الكائن الحي؟", ["الخلية", "النسيج", "العضو"], 0],
        ["أين تتم عملية البناء الضوئي؟", ["الجذور", "الأوراق", "الساق"], 1],
        ["ما العضو المسؤول عن التنفس؟", ["القلب", "الرئتان", "المعدة"], 1],
        ["ما المادة التي تعطي النبات لونه الأخضر؟", ["الكلوروفيل", "الهيموجلوبين", "النشا"], 0],
        ["أي مما يلي من الكائنات الحية؟", ["الصخر", "النبات", "الماء"], 1]
    ],

    "التاريخ": [
        ["أين قامت الحضارة المصرية القديمة؟", ["وادي النيل", "بلاد الشام", "شبه الجزيرة العربية"], 0],
        ["ما اسم الكتابة المصرية القديمة؟", ["المسمارية", "الهيروغليفية", "اللاتينية"], 1],
        ["من بنى الهرم الأكبر؟", ["خوفو", "رمسيس الثاني", "توت عنخ آمون"], 0],
        ["ما عاصمة مصر القديمة في عصر من عصورها؟", ["طيبة", "روما", "أثينا"], 0],
        ["ما اسم نهر مصر الرئيسي؟", ["النيل", "الأمازون", "الدانوب"], 0]
    ]
};

let currentQuestions = [];
let currentSubject = "";
let currentGrade = "";

function loadGrade() {
    currentGrade = grade.value;

    subjectsArea.innerHTML = "";
    booksArea.innerHTML = "";
    quizArea.innerHTML = "";
    resultArea.innerHTML = "";

    if (!currentGrade) {
        alert("اختار الصف الدراسي الأول");
        return;
    }

    booksSection.hidden = false;
    subjectsSection.hidden = false;

    document.querySelectorAll(".book-link").forEach(e => e.remove());

    subjectLists[currentGrade].forEach(subject => {
        const book = document.createElement("a");
        book.href = ministryBooks;
        book.target = "_blank";
        book.className = "book-link";
        book.textContent = "📘 كتاب " + subject;
        booksArea.appendChild(book);

        const button = document.createElement("button");
        button.textContent = subject;
        button.onclick = () => startQuiz(subject);
        subjectsArea.appendChild(button);
    });
}

function startQuiz(subject) {
    currentSubject = subject;

    const questions = questionBanks[subject] || [];

    if (questions.length === 0) {
        alert("لا توجد أسئلة لهذه المادة حاليًا");
        return;
    }

    currentQuestions = [...questions]
        .sort(() => Math.random() - 0.5)
        .slice(0, 25);

    quizArea.innerHTML = "";
    resultArea.innerHTML = "";

    const title = document.createElement("h2");
    title.textContent = "امتحان " + subject + " - " + gradeNames[currentGrade];
    quizArea.appendChild(title);

    currentQuestions.forEach((q, index) => {
        const questionBox = document.createElement("div");
        questionBox.className = "question";

        const questionTitle = document.createElement("h3");
        questionTitle.textContent = `${index + 1}- ${q[0]}`;
        questionBox.appendChild(questionTitle);

        q[1].forEach((option, optionIndex) => {
            const label = document.createElement("label");
            const radio = document.createElement("input");

            radio.type = "radio";
            radio.name = "question" + index;
            radio.value = optionIndex;

            label.appendChild(radio);
            label.append(" " + option);

            questionBox.appendChild(label);
            questionBox.appendChild(document.createElement("br"));
        });

        quizArea.appendChild(questionBox);
    });

    const finishButton = document.createElement("button");
    finishButton.textContent = "إنهاء الامتحان";
    finishButton.onclick = finishQuiz;
    quizArea.appendChild(finishButton);

    quizArea.scrollIntoView({ behavior: "smooth" });
}

function finishQuiz() {
    let score = 0;
    let unanswered = 0;

    currentQuestions.forEach((q, index) => {
        const answer = document.querySelector(
            `input[name="question${index}"]:checked`
        );

        if (!answer) {
            unanswered++;
        } else if (Number(answer.value) === q[2]) {
            score++;
        }
    });

    if (unanswered > 0) {
        const confirmFinish = confirm(
            `لسه فيه ${unanswered} سؤال من غير إجابة. هل تريد إنهاء الامتحان؟`
        );

        if (!confirmFinish) return;
    }

    const total = currentQuestions.length;
    const percentage = Math.round((score / total) * 100);

    resultArea.innerHTML = `
        <h2>نتيجة الامتحان 🎉</h2>
        <h3>المادة: ${currentSubject}</h3>
        <h3>الدرجة: ${score} من ${total}</h3>
        <h3>النسبة المئوية: ${percentage}%</h3>
        <button onclick="startQuiz(currentSubject)">إعادة الامتحان</button>
        <button onclick="backToSubjects()">الرجوع للمواد</button>
    `;

    quizArea.innerHTML = "";
    resultArea.scrollIntoView({ behavior: "smooth" });
}

function backToSubjects() {
    quizArea.innerHTML = "";
    resultArea.innerHTML = "";
    subjectsSection.scrollIntoView({ behavior: "smooth" });
}