# دليل التخصيص - نظام إدارة المقابلات

## 🎨 نظرة عامة على التخصيص

هذا الدليل سيساعدك على تخصيص نظام إدارة المقابلات حسب احتياجاتك الخاصة.

## 🔧 التخصيصات الأساسية

### تغيير الألوان

#### الألوان الرئيسية
```css
/* في ملف styles.css */
:root {
    --primary-blue: #3B82F6;      /* الأزرق الرئيسي */
    --primary-green: #10B981;     /* الأخضر */
    --primary-orange: #F59E0B;    /* البرتقالي */
    --primary-purple: #8B5CF6;    /* البنفسجي */
    --primary-red: #EF4444;       /* الأحمر */
    --primary-gray: #6B7280;      /* الرمادي */
}

/* تطبيق الألوان */
.btn-primary {
    background-color: var(--primary-blue);
}

.btn-success {
    background-color: var(--primary-green);
}
```

#### تخصيص ألوان التصنيفات
```css
/* ألوان مستويات الصعوبة */
.difficulty-easy {
    background-color: #dcfce7;
    color: #166534;
}

.difficulty-medium {
    background-color: #fef3c7;
    color: #92400e;
}

.difficulty-hard {
    background-color: #fee2e2;
    color: #991b1b;
}
```

### تغيير الخطوط

#### خطوط عربية أخرى
```html
<!-- في ملف index.html -->
<link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;600;700&display=swap" rel="stylesheet">
```

```css
/* في ملف styles.css */
body {
    font-family: 'Amiri', serif;
    /* أو */
    font-family: 'Noto Sans Arabic', sans-serif;
}
```

#### خطوط إنجليزية
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
```

```css
body {
    font-family: 'Inter', 'Cairo', sans-serif;
}
```

### تغيير الشعار والعنوان

#### في ملف index.html
```html
<header class="bg-white shadow-lg border-b-4 border-blue-500">
    <div class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between flex-wrap gap-4">
            <div class="flex items-center space-x-4 space-x-reverse">
                <div class="bg-blue-500 p-3 rounded-full">
                    <!-- استبدل الأيقونة -->
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <!-- أيقونتك هنا -->
                    </svg>
                </div>
                <div>
                    <h1 class="text-2xl font-bold text-gray-800">اسم شركتك</h1>
                    <p class="text-gray-600">وظيفة: مدرب القيادة</p>
                </div>
            </div>
        </div>
    </div>
</header>
```

## 📝 تخصيص الأسئلة

### إضافة أسئلة جديدة

#### في ملف script.js
```javascript
const questionsDB = {
    'personal-info': [
        // الأسئلة الموجودة...
    ],
    'new-category': [
        {
            id: 16,
            question: "سؤالك الجديد هنا؟",
            category: "new-category",
            difficulty: "medium",
            tips: "نصيحة للمقابل",
            evaluationCriteria: ["معيار 1", "معيار 2"],
            expectedKeywords: ["كلمة 1", "كلمة 2"]
        }
    ]
};
```

#### إضافة تصنيف جديد
```html
<!-- في ملف index.html -->
<button class="category-btn px-4 py-2 rounded-full border border-gray-300 hover:bg-blue-50 transition-colors text-sm" data-category="new-category">
    التصنيف الجديد
</button>
```

### تعديل الأسئلة الموجودة
```javascript
// في ملف script.js
const questionsDB = {
    'personal-info': [
        {
            id: 1,
            question: "السؤال المعدل هنا؟",
            category: "personal-info",
            difficulty: "easy",
            tips: "النصيحة المعدلة",
            evaluationCriteria: ["معيار جديد"],
            expectedKeywords: ["كلمة جديدة"]
        }
    ]
};
```

## 🎯 تخصيص التقييم

### إضافة معايير تقييم جديدة
```javascript
// في ملف script-interviews.js
function loadInterviewQuestions() {
    // ... الكود الموجود ...
    
    // إضافة معيار جديد
    <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">المعيار الجديد:</label>
        <select id="new_criteria_${question.id}" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
            <option value="">اختر</option>
            <option value="5">ممتاز</option>
            <option value="4">جيد جداً</option>
            <option value="3">جيد</option>
            <option value="2">مقبول</option>
            <option value="1">ضعيف</option>
        </select>
    </div>
}
```

### تغيير نظام النقاط
```javascript
// في ملف script-interviews.js
function saveInterview() {
    // ... الكود الموجود ...
    
    // تغيير نظام النقاط من 1-5 إلى 1-10
    questionsData.push({
        questionId: question.id,
        question: question.question,
        answer: answer,
        rating: parseInt(rating) || 0,
        clarity: parseInt(clarity) || 0,
        confidence: parseInt(confidence) || 0,
        newCriteria: parseInt(newCriteria) || 0, // المعيار الجديد
        notes: notes
    });
}
```

## 📊 تخصيص التحليلات

### إضافة رسوم بيانية جديدة
```javascript
// في ملف script-analytics.js
function loadPerformanceAnalytics() {
    // ... الكود الموجود ...
    
    // إضافة رسم بياني جديد
    container.innerHTML += `
        <div class="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <h4 class="font-semibold text-indigo-800 mb-2">الرسم البياني الجديد</h4>
            <div class="w-full bg-indigo-200 rounded-full h-3">
                <div class="bg-indigo-500 h-3 rounded-full" style="width: 75%"></div>
            </div>
        </div>
    `;
}
```

### تخصيص الإحصائيات
```javascript
// في ملف script-analytics.js
function loadAdvancedStatistics() {
    // ... الكود الموجود ...
    
    // إضافة إحصائية جديدة
    const newStatElement = document.getElementById('newStat');
    if (newStatElement) {
        newStatElement.textContent = 'القيمة الجديدة';
    }
}
```

## 🎨 تخصيص التصميم

### تغيير التخطيط
```css
/* في ملف styles.css */
.container {
    max-width: 1200px; /* تغيير العرض الأقصى */
    margin: 0 auto;
    padding: 0 1rem;
}

/* تغيير المسافات */
.question-card {
    margin-bottom: 2rem; /* زيادة المسافة */
    padding: 2rem; /* زيادة الحشو */
}
```

### إضافة تأثيرات جديدة
```css
/* في ملف styles.css */
.question-card {
    transition: all 0.3s ease;
    border-right: 4px solid transparent;
}

.question-card:hover {
    transform: translateY(-4px); /* زيادة الحركة */
    box-shadow: 0 12px 30px rgba(0,0,0,0.15); /* ظل أقوى */
    border-right-color: #3B82F6;
}

/* إضافة تأثير النقر */
.question-card:active {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.1);
}
```

### تخصيص الأزرار
```css
/* في ملف styles.css */
.btn {
    transition: all 0.2s ease;
    cursor: pointer;
    border-radius: 0.5rem;
    font-weight: 600;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.btn:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

/* أزرار مخصصة */
.btn-custom {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
}
```

## 🔧 تخصيص الوظائف

### إضافة وظائف جديدة
```javascript
// في ملف script-functions.js
function newFunction() {
    console.log('الوظيفة الجديدة تعمل!');
    // كود الوظيفة هنا
}

// ربط الوظيفة بزر
document.getElementById('newButton').addEventListener('click', newFunction);
```

### تعديل الوظائف الموجودة
```javascript
// في ملف script-functions.js
function generateRandomQuestions() {
    console.log('توليد أسئلة عشوائية');
    const randomQuestions = [];
    const availableQuestions = [...allQuestions];
    
    // تغيير عدد الأسئلة العشوائية
    const questionCount = 15; // بدلاً من 10
    
    for (let i = 0; i < Math.min(questionCount, availableQuestions.length); i++) {
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        randomQuestions.push(availableQuestions[randomIndex]);
        availableQuestions.splice(randomIndex, 1);
    }
    
    displayQuestions(randomQuestions);
    showNotification(`تم اختيار ${questionCount} أسئلة عشوائية!`, 'success');
}
```

## 📱 تخصيص الاستجابة

### تحسين الشاشات الصغيرة
```css
/* في ملف styles.css */
@media (max-width: 480px) {
    .container {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
    }
    
    .question-card {
        padding: 1rem;
        margin-bottom: 1rem;
    }
    
    .btn {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
    }
    
    .nav-btn {
        font-size: 0.75rem;
        padding: 0.5rem 0.75rem;
    }
}
```

### تحسين الشاشات الكبيرة
```css
/* في ملف styles.css */
@media (min-width: 1024px) {
    .question-card {
        margin-bottom: 2rem;
        padding: 2rem;
    }
    
    .container {
        max-width: 1400px;
    }
    
    .grid-cols-1 {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}
```

## 🎯 تخصيص المحتوى

### تغيير النصوص
```html
<!-- في ملف index.html -->
<h1 class="text-2xl font-bold text-gray-800">اسم نظامك</h1>
<p class="text-gray-600">وصف النظام</p>
```

### إضافة معلومات إضافية
```html
<!-- في ملف index.html -->
<div class="bg-blue-50 p-4 rounded-lg mb-6">
    <h3 class="font-semibold text-blue-800 mb-2">معلومات إضافية</h3>
    <p class="text-blue-700">هذه معلومات إضافية عن النظام</p>
</div>
```

## 🔒 تخصيص الأمان

### إضافة التحقق من البيانات
```javascript
// في ملف script-functions.js
function validateCandidateData(data) {
    const errors = [];
    
    if (!data.fullName || data.fullName.length < 2) {
        errors.push('الاسم يجب أن يكون أكثر من حرفين');
    }
    
    if (!data.phone || !/^[0-9+\-\s]+$/.test(data.phone)) {
        errors.push('رقم الهاتف غير صحيح');
    }
    
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('البريد الإلكتروني غير صحيح');
    }
    
    return errors;
}
```

### إضافة تشفير البيانات
```javascript
// في ملف script.js
function encryptData(data) {
    // تشفير بسيط للبيانات الحساسة
    return btoa(JSON.stringify(data));
}

function decryptData(encryptedData) {
    // فك التشفير
    return JSON.parse(atob(encryptedData));
}
```

## 📊 تخصيص التقارير

### إضافة حقول جديدة للتقرير
```javascript
// في ملف script-interviews.js
function generateReport() {
    // ... الكود الموجود ...
    
    // إضافة حقل جديد
    const reportHTML = `
        <div class="mb-8">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">المعلومات الإضافية</h3>
            <div class="bg-gray-50 p-4 rounded-lg">
                <p><strong>الحقل الجديد:</strong> ${newFieldValue}</p>
            </div>
        </div>
    `;
}
```

### تخصيص تنسيق التقرير
```css
/* في ملف styles.css */
@media print {
    .report-header {
        background-color: #f8f9fa;
        padding: 2rem;
        margin-bottom: 2rem;
    }
    
    .report-section {
        margin-bottom: 1.5rem;
        page-break-inside: avoid;
    }
    
    .report-footer {
        margin-top: 2rem;
        padding-top: 1rem;
        border-top: 2px solid #e5e7eb;
    }
}
```

## 🚀 نصائح للتخصيص

### أفضل الممارسات
1. **احتفظ بنسخة احتياطية** من الملفات الأصلية
2. **اختبر التغييرات** في بيئة منفصلة
3. **وثق التغييرات** في ملف منفصل
4. **استخدم Git** لتتبع التعديلات

### تجنب المشاكل الشائعة
1. **لا تعدل الملفات الأساسية** مباشرة
2. **اختبر في متصفحات مختلفة**
3. **تحقق من التوافق** مع الأجهزة المختلفة
4. **احتفظ بالنسخ الاحتياطية**

---

**استمتع بالتخصيص!** 🎨