# دليل التطوير - نظام إدارة المقابلات

## 🛠️ نظرة عامة على التطوير

هذا الدليل مخصص للمطورين الذين يريدون المساهمة في تطوير نظام إدارة المقابلات أو تخصيصه حسب احتياجاتهم.

## 🏗️ هيكل المشروع

```
interview-management-system/
├── index.html              # الصفحة الرئيسية
├── styles.css              # ملف التصميمات الرئيسي
├── script.js               # الوظائف الأساسية وقاعدة البيانات
├── script-functions.js     # وظائف الأسئلة والمرشحين
├── script-interviews.js    # وظائف المقابلات والتقارير
├── script-analytics.js     # وظائف التحليلات والإحصائيات
├── package.json            # تبعيات المشروع
├── README.md               # دليل المشروع
├── QUICK_START.md          # دليل البدء السريع
├── DEPLOYMENT.md           # دليل النشر
├── CONTRIBUTING.md         # دليل المساهمة
├── INSTALLATION.md         # دليل التثبيت
├── USER_GUIDE.md           # دليل المستخدم
├── DEVELOPMENT.md          # دليل التطوير (هذا الملف)
├── CHANGELOG.md            # سجل التحديثات
├── LICENSE                 # رخصة المشروع
└── .gitignore              # ملفات مستبعدة من Git
```

## 🔧 التقنيات المستخدمة

### Frontend
- **HTML5**: هيكل الصفحة مع دعم RTL
- **CSS3**: التصميم مع Tailwind CSS
- **JavaScript ES6+**: الوظائف التفاعلية
- **LocalStorage**: حفظ البيانات محلياً

### المكتبات الخارجية
- **Tailwind CSS**: إطار عمل CSS
- **Google Fonts**: خطوط Cairo العربية

### الأدوات
- **Git**: إدارة الإصدارات
- **GitHub**: المستودع الرئيسي
- **VS Code**: محرر الكود المقترح

## 📁 تفصيل الملفات

### index.html
```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>نظام إدارة المقابلات - مدرب القيادة</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <!-- محتوى الصفحة -->
    <script src="script.js"></script>
    <script src="script-functions.js"></script>
    <script src="script-interviews.js"></script>
    <script src="script-analytics.js"></script>
</body>
</html>
```

### styles.css
```css
/* إعدادات عامة */
* {
    box-sizing: border-box;
}

body {
    font-family: 'Cairo', sans-serif;
    direction: rtl;
    text-align: right;
}

/* تصميم البطاقات */
.question-card {
    transition: all 0.3s ease;
    border-right: 4px solid transparent;
}

.question-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
    border-right-color: #3B82F6;
}
```

### script.js
```javascript
// قاعدة بيانات الأسئلة
const questionsDB = {
    'personal-info': [
        {
            id: 1,
            question: "أخبرني عن نفسك وخلفيتك المهنية؟",
            category: "personal-info",
            difficulty: "easy",
            tips: "ابحث عن وضوح في التعبير وتسلسل منطقي",
            evaluationCriteria: ["وضوح التعبير", "التسلسل المنطقي", "الثقة بالنفس"],
            expectedKeywords: ["خبرة", "تدريب", "قيادة", "تطوير"]
        }
    ]
};

// إدارة الحالة
let currentFilter = 'all';
let selectedQuestions = new Set();
let allQuestions = [];
let candidates = [];
let interviews = [];
let currentInterview = null;
```

## 🎯 الوظائف الرئيسية

### إدارة الأسئلة
```javascript
function displayQuestions(questions) {
    const container = document.getElementById('questionsContainer');
    container.innerHTML = '';
    
    questions.forEach(q => {
        const questionCard = createQuestionCard(q);
        container.appendChild(questionCard);
    });
}

function createQuestionCard(question) {
    const card = document.createElement('div');
    card.className = 'question-card bg-white rounded-xl shadow-md p-6';
    
    const difficultyColors = {
        easy: 'bg-green-100 text-green-800',
        medium: 'bg-yellow-100 text-yellow-800',
        hard: 'bg-red-100 text-red-800'
    };
    
    card.innerHTML = `
        <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-800 mb-3">
                    ${question.question}
                </h3>
                <div class="bg-blue-50 p-3 rounded-lg mb-3">
                    <p class="text-sm text-blue-800">
                        <strong>💡 نصيحة للمقابل:</strong> ${question.tips}
                    </p>
                </div>
            </div>
            <button onclick="toggleQuestion(${question.id})" 
                    class="select-btn mr-4 px-4 py-2 rounded-lg border-2">
                اختيار
            </button>
        </div>
    `;
    
    return card;
}
```

### إدارة المرشحين
```javascript
function addCandidate(candidateData) {
    const candidate = {
        id: Date.now(),
        ...candidateData,
        createdAt: new Date().toISOString(),
        interviews: []
    };
    
    candidates.push(candidate);
    localStorage.setItem('candidates', JSON.stringify(candidates));
    updateCandidateSelect();
}

function updateCandidateSelect() {
    const select = document.getElementById('candidateSelect');
    select.innerHTML = '<option value="">اختر مرشحاً للمقابلة</option>';
    
    candidates.forEach(candidate => {
        const option = document.createElement('option');
        option.value = candidate.id;
        option.textContent = `${candidate.fullName} - ${candidate.city}`;
        select.appendChild(option);
    });
}
```

### إدارة المقابلات
```javascript
function startInterview() {
    const candidateId = document.getElementById('candidateSelect').value;
    
    if (!candidateId) {
        showNotification('يرجى اختيار مرشح أولاً', 'error');
        return;
    }
    
    const candidate = candidates.find(c => c.id == candidateId);
    currentInterview = {
        id: Date.now(),
        candidateId: candidateId,
        candidateName: candidate.fullName,
        startTime: new Date().toISOString(),
        questions: [],
        status: 'in-progress'
    };
    
    loadInterviewQuestions();
    updateInterviewUI();
}
```

## 🔄 تدفق البيانات

### حفظ البيانات
```javascript
// حفظ المرشحين
localStorage.setItem('candidates', JSON.stringify(candidates));

// حفظ المقابلات
localStorage.setItem('interviews', JSON.stringify(interviews));

// تحميل البيانات
candidates = JSON.parse(localStorage.getItem('candidates') || '[]');
interviews = JSON.parse(localStorage.getItem('interviews') || '[]');
```

### إدارة الحالة
```javascript
// الحالة العامة
let currentFilter = 'all';
let selectedQuestions = new Set();
let allQuestions = [];
let candidates = [];
let interviews = [];
let currentInterview = null;

// تحديث الواجهة
function updateUI() {
    updateSelectedCounter();
    updateCandidateSelect();
    updateInterviewUI();
}
```

## 🎨 نظام التصميم

### الألوان
```css
:root {
    --primary-blue: #3B82F6;
    --primary-green: #10B981;
    --primary-orange: #F59E0B;
    --primary-purple: #8B5CF6;
    --primary-red: #EF4444;
    --primary-gray: #6B7280;
}
```

### الخطوط
```css
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap');

body {
    font-family: 'Cairo', sans-serif;
}
```

### التجاوب
```css
@media (max-width: 768px) {
    .container {
        padding-left: 1rem;
        padding-right: 1rem;
    }
    
    .question-card {
        margin-bottom: 1rem;
    }
}
```

## 🧪 الاختبار

### اختبار الوظائف
```javascript
// اختبار إضافة مرشح
function testAddCandidate() {
    const initialCount = candidates.length;
    addCandidate({
        fullName: 'اختبار',
        phone: '123456789',
        email: 'test@example.com',
        city: 'الرياض'
    });
    assert(candidates.length === initialCount + 1);
}

// اختبار حفظ البيانات
function testSaveData() {
    const testData = { test: 'data' };
    localStorage.setItem('test', JSON.stringify(testData));
    const loaded = JSON.parse(localStorage.getItem('test'));
    assert(JSON.stringify(loaded) === JSON.stringify(testData));
}
```

### اختبار التوافق
```javascript
// اختبار دعم LocalStorage
function testLocalStorage() {
    if (typeof(Storage) !== "undefined") {
        console.log("LocalStorage مدعوم");
        return true;
    } else {
        console.log("LocalStorage غير مدعوم");
        return false;
    }
}

// اختبار دعم RTL
function testRTL() {
    const html = document.documentElement;
    return html.dir === 'rtl' && html.lang === 'ar';
}
```

## 🔧 التطوير المحلي

### إعداد البيئة
```bash
# استنساخ المستودع
git clone https://github.com/username/interview-management-system.git
cd interview-management-system

# تثبيت التبعيات
npm install

# تشغيل في وضع التطوير
npm run dev
```

### إعداد VS Code
```json
{
    "editor.tabSize": 4,
    "editor.insertSpaces": true,
    "editor.detectIndentation": false,
    "files.encoding": "utf8",
    "emmet.includeLanguages": {
        "html": "html"
    },
    "liveServer.settings.port": 8000,
    "liveServer.settings.root": "/",
    "liveServer.settings.CustomBrowser": "chrome"
}
```

## 📦 البناء والنشر

### بناء المشروع
```bash
# لا يوجد بناء مطلوب للمشروع الحالي
# يمكن إضافة minification إذا لزم الأمر

# ضغط JavaScript
uglifyjs script.js -o script.min.js

# ضغط CSS
cleancss -o styles.min.css styles.css
```

### النشر
```bash
# رفع إلى GitHub
git add .
git commit -m "تحديث المشروع"
git push origin main

# النشر على GitHub Pages
# يتم تلقائياً عند push إلى main
```

## 🐛 استكشاف الأخطاء

### أخطاء شائعة

#### مشاكل JavaScript
```javascript
// تحقق من وجود العناصر
function checkElements() {
    const elements = [
        'questionsContainer',
        'candidateSelect',
        'searchInput'
    ];
    
    elements.forEach(id => {
        const element = document.getElementById(id);
        if (!element) {
            console.error(`العنصر ${id} غير موجود`);
        }
    });
}
```

#### مشاكل CSS
```css
/* تحقق من تحميل الخطوط */
@font-face {
    font-family: 'Cairo';
    src: url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap');
}
```

#### مشاكل البيانات
```javascript
// تحقق من صحة البيانات
function validateData(data) {
    if (!data || typeof data !== 'object') {
        console.error('البيانات غير صحيحة');
        return false;
    }
    return true;
}
```

## 🚀 التحسينات المستقبلية

### ميزات مقترحة
- [ ] إضافة المزيد من الأسئلة
- [ ] تحسين نظام التحليلات
- [ ] إضافة تصدير البيانات
- [ ] تحسين الأداء
- [ ] إضافة اختبارات تلقائية
- [ ] دعم اللغات المتعددة
- [ ] إضافة API
- [ ] تطبيق موبايل

### تحسينات تقنية
- [ ] استخدام TypeScript
- [ ] إضافة Webpack
- [ ] تحسين الأداء
- [ ] إضافة PWA
- [ ] تحسين SEO

## 📚 الموارد المفيدة

### وثائق
- [MDN Web Docs](https://developer.mozilla.org/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [JavaScript.info](https://javascript.info/)

### أدوات
- [VS Code](https://code.visualstudio.com/)
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)

### مجتمعات
- [Stack Overflow](https://stackoverflow.com/)
- [GitHub](https://github.com/)
- [Reddit](https://www.reddit.com/r/webdev/)

---

**استمتع بالتطوير!** 🚀
