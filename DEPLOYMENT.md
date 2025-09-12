# دليل النشر على GitHub

## 📚 خطوات النشر على GitHub

### 1️⃣ إنشاء مستودع جديد
1. اذهب إلى [GitHub](https://github.com)
2. انقر على **"New repository"**
3. أدخل اسم المستودع: `interview-management-system`
4. اختر **"Public"** أو **"Private"**
5. لا تضع علامة على "Initialize with README"
6. انقر على **"Create repository"**

### 2️⃣ رفع الملفات
```bash
# استنساخ المستودع
git clone https://github.com/username/interview-management-system.git
cd interview-management-system

# نسخ جميع الملفات إلى المجلد
# (انسخ جميع الملفات التي أنشأناها)

# إضافة الملفات
git add .

# إنشاء commit
git commit -m "إضافة نظام إدارة المقابلات - مدرب القيادة"

# رفع الملفات
git push -u origin main
```

### 3️⃣ تفعيل GitHub Pages
1. اذهب إلى **"Settings"** في المستودع
2. انتقل إلى **"Pages"** في القائمة الجانبية
3. اختر **"Deploy from a branch"**
4. اختر **"main"** كفرع المصدر
5. اختر **"/ (root)"** كمجلد
6. انقر على **"Save"**
7. انتظر بضع دقائق حتى يتم النشر

### 4️⃣ الوصول للموقع
- سيكون الموقع متاحاً على: `https://username.github.io/interview-management-system`

## 🔧 تخصيص النشر

### تغيير اسم المستودع
إذا كنت تريد تغيير اسم المستودع:
1. اذهب إلى **"Settings"**
2. انتقل إلى **"Repository name"**
3. غيّر الاسم
4. انقر على **"Rename"**

### تخصيص المجال
يمكنك ربط المجال الخاص بك:
1. اذهب إلى **"Settings"** > **"Pages"**
2. أدخل المجال في **"Custom domain"**
3. أضف ملف `CNAME` في المجلد الجذر

## 📱 النشر على منصات أخرى

### Netlify
1. اذهب إلى [Netlify](https://netlify.com)
2. انقر على **"New site from Git"**
3. اختر **"GitHub"**
4. اختر المستودع
5. انقر على **"Deploy site"**

### Vercel
1. اذهب إلى [Vercel](https://vercel.com)
2. انقر على **"New Project"**
3. اختر المستودع من GitHub
4. انقر على **"Deploy"**

### GitHub Codespaces
1. اذهب إلى المستودع على GitHub
2. انقر على **"Code"** > **"Codespaces"**
3. اختر **"Create codespace"**
4. افتح الملف `index.html` في المتصفح

## 🔄 التحديثات

### إضافة تحديثات جديدة
```bash
# إضافة التغييرات
git add .

# إنشاء commit جديد
git commit -m "وصف التحديث"

# رفع التحديثات
git push origin main
```

### إعادة النشر
- GitHub Pages يعيد النشر تلقائياً عند كل push
- انتظر 1-2 دقيقة حتى تظهر التحديثات

## 🛠️ استكشاف الأخطاء

### المشكلة: الموقع لا يظهر
**الحل**: 
- تأكد من تفعيل GitHub Pages
- تحقق من أن الملف `index.html` في المجلد الجذر
- انتظر بضع دقائق إضافية

### المشكلة: التصميم لا يظهر
**الحل**:
- تأكد من وجود اتصال بالإنترنت
- تحقق من أن ملف `styles.css` موجود
- تأكد من أن Tailwind CSS يتم تحميله

### المشكلة: JavaScript لا يعمل
**الحل**:
- تحقق من أن جميع ملفات JavaScript موجودة
- تأكد من أن المسارات صحيحة
- افتح Developer Tools للتحقق من الأخطاء

## 📊 إحصائيات المشروع

### إضافة شارات
أضف هذه الشارات إلى ملف README.md:

```markdown
![GitHub stars](https://img.shields.io/github/stars/username/interview-management-system)
![GitHub forks](https://img.shields.io/github/forks/username/interview-management-system)
![GitHub issues](https://img.shields.io/github/issues/username/interview-management-system)
![GitHub license](https://img.shields.io/github/license/username/interview-management-system)
```

### إضافة روابط
```markdown
[🌐 الموقع المباشر](https://username.github.io/interview-management-system)
[📚 الوثائق](https://github.com/username/interview-management-system#readme)
[🐛 الإبلاغ عن مشاكل](https://github.com/username/interview-management-system/issues)
```

## 🎯 نصائح للنشر

1. **اختر اسماً واضحاً** للمستودع
2. **اكتب وصفاً جيداً** للمستودع
3. **أضف tags** مناسبة
4. **اكتب README.md** شامل
5. **أضف ملف LICENSE**
6. **استخدم .gitignore** مناسب

## 🔒 الأمان

- **لا تضع معلومات حساسة** في الكود
- **استخدم HTTPS** دائماً
- **راجع الأذونات** بانتظام
- **احتفظ بنسخ احتياطية** من البيانات

---

**مبروك! موقعك الآن متاح للعالم** 🌍
