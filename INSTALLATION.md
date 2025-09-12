# دليل التثبيت - نظام إدارة المقابلات

## 📋 المتطلبات

### متطلبات النظام
- **نظام التشغيل**: Windows, macOS, Linux, أو أي نظام يدعم المتصفحات الحديثة
- **المتصفح**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **الذاكرة**: 50 MB مساحة فارغة
- **الاتصال**: اتصال بالإنترنت لتحميل Tailwind CSS (اختياري)

### متطلبات التطوير (اختياري)
- **Node.js**: 14.0.0 أو أحدث
- **npm**: 6.0.0 أو أحدث
- **Git**: لأي إصدار حديث

## 🚀 التثبيت

### الطريقة الأولى: التثبيت المباشر (الأسهل)

#### 1️⃣ تحميل الملفات
```bash
# تحميل من GitHub
git clone https://github.com/username/interview-management-system.git

# أو تحميل ZIP
# انقر على "Code" > "Download ZIP"
```

#### 2️⃣ فتح الملف
- افتح ملف `index.html` في أي متصفح حديث
- ابدأ الاستخدام فوراً! 🎉

### الطريقة الثانية: خادم محلي

#### باستخدام Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### باستخدام Node.js
```bash
# تثبيت http-server
npm install -g http-server

# تشغيل الخادم
http-server -p 8000

# أو باستخدام npx
npx http-server -p 8000
```

#### باستخدام PHP
```bash
php -S localhost:8000
```

#### باستخدام Live Server (VS Code)
1. افتح المشروع في VS Code
2. تثبيت إضافة "Live Server"
3. انقر بزر الماوس الأيمن على `index.html`
4. اختر "Open with Live Server"

### الطريقة الثالثة: Docker (متقدم)

#### إنشاء Dockerfile
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### بناء وتشغيل الحاوية
```bash
# بناء الصورة
docker build -t interview-system .

# تشغيل الحاوية
docker run -p 8080:80 interview-system
```

## 🔧 التكوين

### إعدادات المتصفح
1. **تفعيل JavaScript**: تأكد من تفعيل JavaScript
2. **السماح بالملفات المحلية**: بعض المتصفحات تحتاج إعدادات خاصة
3. **إعدادات الخصوصية**: تأكد من السماح بحفظ البيانات محلياً

### إعدادات الخادم (اختياري)
```javascript
// في package.json
{
  "scripts": {
    "start": "http-server -p 8000 -o --cors",
    "dev": "live-server --port=8000 --open=/index.html --cors"
  }
}
```

## 🛠️ التطوير

### إعداد بيئة التطوير
```bash
# استنساخ المستودع
git clone https://github.com/username/interview-management-system.git
cd interview-management-system

# تثبيت التبعيات (اختياري)
npm install

# تشغيل في وضع التطوير
npm run dev
```

### هيكل المشروع
```
interview-management-system/
├── index.html              # الصفحة الرئيسية
├── styles.css              # ملف التصميمات
├── script.js               # الوظائف الأساسية
├── script-functions.js     # وظائف الأسئلة والمرشحين
├── script-interviews.js    # وظائف المقابلات والتقارير
├── script-analytics.js     # وظائف التحليلات والإحصائيات
├── package.json            # تبعيات المشروع
├── README.md               # دليل المشروع
├── QUICK_START.md          # دليل البدء السريع
├── DEPLOYMENT.md           # دليل النشر
├── CONTRIBUTING.md         # دليل المساهمة
├── INSTALLATION.md         # دليل التثبيت
├── CHANGELOG.md            # سجل التحديثات
├── LICENSE                 # رخصة المشروع
└── .gitignore              # ملفات مستبعدة من Git
```

## 🔍 التحقق من التثبيت

### اختبار الوظائف الأساسية
1. **فتح الصفحة**: تأكد من تحميل الصفحة بشكل صحيح
2. **إضافة مرشح**: جرب إضافة مرشح جديد
3. **استكشاف الأسئلة**: انتقل إلى بنك الأسئلة
4. **إجراء مقابلة**: جرب إجراء مقابلة تجريبية
5. **مراجعة التحليلات**: تحقق من صفحة التحليلات

### اختبار التوافق
```bash
# اختبار في متصفحات مختلفة
# Chrome, Firefox, Safari, Edge

# اختبار على أجهزة مختلفة
# Desktop, Tablet, Mobile
```

## 🐛 استكشاف الأخطاء

### المشكلة: الصفحة لا تحمل
**الأسباب المحتملة**:
- ملف `index.html` غير موجود
- مسار الملف غير صحيح
- المتصفح لا يدعم HTML5

**الحلول**:
```bash
# تحقق من وجود الملف
ls -la index.html

# تحقق من المسار
pwd

# جرب متصفح آخر
```

### المشكلة: التصميم لا يظهر
**الأسباب المحتملة**:
- ملف `styles.css` غير موجود
- لا يوجد اتصال بالإنترنت
- مشكلة في تحميل Tailwind CSS

**الحلول**:
```bash
# تحقق من وجود ملف CSS
ls -la styles.css

# تحقق من الاتصال بالإنترنت
ping google.com

# جرب تحميل Tailwind محلياً
```

### المشكلة: JavaScript لا يعمل
**الأسباب المحتملة**:
- JavaScript معطل في المتصفح
- ملفات JavaScript غير موجودة
- أخطاء في الكود

**الحلول**:
```bash
# تحقق من وجود ملفات JavaScript
ls -la script*.js

# افتح Developer Tools
# F12 في معظم المتصفحات

# تحقق من الأخطاء في Console
```

### المشكلة: البيانات لا تُحفظ
**الأسباب المحتملة**:
- LocalStorage معطل
- المتصفح في وضع الخصوصية
- مساحة التخزين ممتلئة

**الحلول**:
```javascript
// تحقق من دعم LocalStorage
if (typeof(Storage) !== "undefined") {
    console.log("LocalStorage مدعوم");
} else {
    console.log("LocalStorage غير مدعوم");
}
```

## 📱 التثبيت على الأجهزة المحمولة

### Android
1. افتح Chrome
2. اذهب إلى الموقع
3. انقر على "Add to Home Screen"
4. اختر اسم التطبيق
5. انقر على "Add"

### iOS
1. افتح Safari
2. اذهب إلى الموقع
3. انقر على "Share"
4. اختر "Add to Home Screen"
5. انقر على "Add"

## 🔒 الأمان

### إعدادات الخصوصية
- جميع البيانات محفوظة محلياً
- لا يتم إرسال بيانات إلى خوادم خارجية
- يمكن حذف البيانات في أي وقت

### إعدادات المتصفح
```javascript
// تحقق من إعدادات الخصوصية
navigator.cookieEnabled
navigator.storage.estimate()
```

## 📊 الأداء

### تحسين الأداء
```bash
# ضغط الملفات (اختياري)
npm install -g uglify-js
uglifyjs script.js -o script.min.js

# تحسين الصور
# استخدم أدوات ضغط الصور
```

### مراقبة الأداء
```javascript
// قياس وقت التحميل
console.time('loadTime');
// ... الكود ...
console.timeEnd('loadTime');
```

## 🆘 الدعم

### الحصول على المساعدة
1. راجع هذا الدليل
2. اقرأ ملف README.md
3. افتح Issue في GitHub
4. تواصل معنا عبر البريد الإلكتروني

### الإبلاغ عن المشاكل
```markdown
## وصف المشكلة
وصف واضح للمشكلة

## خطوات إعادة الإنتاج
1. ...
2. ...
3. ...

## معلومات النظام
- نظام التشغيل: ...
- المتصفح: ...
- الإصدار: ...

## لقطة الشاشة
(إذا كانت مفيدة)
```

---

**تم التثبيت بنجاح! استمتع باستخدام النظام** 🎉
