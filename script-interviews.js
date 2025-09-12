// وظائف المقابلات والتحليلات

// وظائف المقابلات
function startInterview() {
    console.log('بدء المقابلة');
    const candidateId = document.getElementById('candidateSelect').value;
    
    if (!candidateId) {
        showNotification('يرجى اختيار مرشح أولاً', 'error');
        return;
    }

    const candidate = candidates.find(c => c.id == candidateId);
    if (!candidate) {
        showNotification('المرشح المحدد غير موجود', 'error');
        return;
    }

    currentInterview = {
        id: Date.now(),
        candidateId: candidateId,
        candidateName: candidate.fullName,
        startTime: new Date().toISOString(),
        questions: [],
        status: 'in-progress'
    };

    console.log('بدء مقابلة جديدة:', currentInterview);

    loadInterviewQuestions();
    updateInterviewUI();
    showNotification('تم بدء المقابلة!', 'success');
}

function updateInterviewUI() {
    const status = document.getElementById('interviewStatus');
    const candidateName = document.getElementById('currentCandidateName');
    const startBtn = document.getElementById('startBtn');
    const saveBtn = document.getElementById('saveBtn');
    const reportBtn = document.getElementById('reportBtn');
    const resetBtn = document.getElementById('resetBtn');

    if (currentInterview) {
        if (status) status.classList.remove('hidden');
        if (candidateName) candidateName.textContent = currentInterview.candidateName;
        if (startBtn) startBtn.classList.add('hidden');
        if (saveBtn) saveBtn.classList.remove('hidden');
        if (reportBtn) reportBtn.classList.remove('hidden');
        if (resetBtn) resetBtn.classList.remove('hidden');
    } else {
        if (status) status.classList.add('hidden');
        if (startBtn) startBtn.classList.remove('hidden');
        if (saveBtn) saveBtn.classList.add('hidden');
        if (reportBtn) reportBtn.classList.add('hidden');
        if (resetBtn) resetBtn.classList.add('hidden');
    }
}

function resetInterview() {
    console.log('إعادة تعيين المقابلة');
    currentInterview = null;
    const questionsContainer = document.getElementById('interviewQuestions');
    const candidateSelect = document.getElementById('candidateSelect');
    
    if (questionsContainer) questionsContainer.innerHTML = '';
    if (candidateSelect) candidateSelect.value = '';
    
    updateInterviewUI();
    showNotification('تم إعادة تعيين المقابلة', 'success');
}

function loadInterviewQuestions() {
    const container = document.getElementById('interviewQuestions');
    if (!container) return;
    
    const questionsToUse = selectedQuestions.size > 0 ? 
        allQuestions.filter(q => selectedQuestions.has(q.id)) : 
        allQuestions.slice(0, 10);

    console.log('تحميل أسئلة المقابلة:', questionsToUse.length);

    container.innerHTML = questionsToUse.map((question, index) => `
        <div class="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div class="flex items-center gap-2 mb-3">
                <span class="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">${index + 1}</span>
                <h4 class="font-semibold text-gray-800">${question.question}</h4>
            </div>
            <div class="bg-blue-50 p-3 rounded-lg mb-4">
                <p class="text-sm text-blue-800">
                    <strong>💡 نصيحة:</strong> ${question.tips}
                </p>
            </div>
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">إجابة المرشح:</label>
                    <textarea id="answer_${question.id}" rows="4" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="اكتب إجابة المرشح هنا..."></textarea>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">التقييم العام:</label>
                        <select id="rating_${question.id}" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="">اختر التقييم</option>
                            <option value="5">ممتاز (5/5)</option>
                            <option value="4">جيد جداً (4/5)</option>
                            <option value="3">جيد (3/5)</option>
                            <option value="2">مقبول (2/5)</option>
                            <option value="1">ضعيف (1/5)</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">وضوح الإجابة:</label>
                        <select id="clarity_${question.id}" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="">اختر</option>
                            <option value="5">واضح جداً</option>
                            <option value="4">واضح</option>
                            <option value="3">متوسط</option>
                            <option value="2">غير واضح</option>
                            <option value="1">مشوش</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">الثقة بالنفس:</label>
                        <select id="confidence_${question.id}" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="">اختر</option>
                            <option value="5">واثق جداً</option>
                            <option value="4">واثق</option>
                            <option value="3">متوسط</option>
                            <option value="2">متردد</option>
                            <option value="1">غير واثق</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">ملاحظات إضافية:</label>
                    <textarea id="notes_${question.id}" rows="2" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="أي ملاحظات إضافية..."></textarea>
                </div>
            </div>
        </div>
    `).join('');
}

function saveInterview() {
    console.log('حفظ المقابلة');
    
    if (!currentInterview) {
        showNotification('لا توجد مقابلة نشطة للحفظ', 'error');
        return;
    }

    const questionsData = [];
    const questionsToUse = selectedQuestions.size > 0 ? 
        allQuestions.filter(q => selectedQuestions.has(q.id)) : 
        allQuestions.slice(0, 10);

    let hasData = false;
    questionsToUse.forEach(question => {
        const answer = document.getElementById(`answer_${question.id}`)?.value || '';
        const rating = document.getElementById(`rating_${question.id}`)?.value || '';
        const clarity = document.getElementById(`clarity_${question.id}`)?.value || '';
        const confidence = document.getElementById(`confidence_${question.id}`)?.value || '';
        const notes = document.getElementById(`notes_${question.id}`)?.value || '';

        if (answer || rating || clarity || confidence || notes) {
            hasData = true;
        }

        questionsData.push({
            questionId: question.id,
            question: question.question,
            answer: answer,
            rating: parseInt(rating) || 0,
            clarity: parseInt(clarity) || 0,
            confidence: parseInt(confidence) || 0,
            notes: notes
        });
    });

    if (!hasData) {
        showNotification('يرجى ملء بعض البيانات قبل الحفظ', 'error');
        return;
    }

    currentInterview.questions = questionsData;
    currentInterview.endTime = new Date().toISOString();
    currentInterview.status = 'completed';

    // Calculate overall score
    const ratingsWithValues = questionsData.filter(q => q.rating > 0);
    const totalRating = ratingsWithValues.reduce((sum, q) => sum + q.rating, 0);
    const avgRating = ratingsWithValues.length > 0 ? totalRating / ratingsWithValues.length : 0;
    currentInterview.overallScore = avgRating;

    console.log('بيانات المقابلة المحفوظة:', currentInterview);

    // Save to interviews array
    interviews.push(currentInterview);
    
    try {
        localStorage.setItem('interviews', JSON.stringify(interviews));
        console.log('تم حفظ المقابلة في localStorage');
    } catch (error) {
        console.error('خطأ في حفظ المقابلة:', error);
        showNotification('حدث خطأ في حفظ المقابلة', 'error');
        return;
    }

    // Update candidate record
    const candidate = candidates.find(c => c.id == currentInterview.candidateId);
    if (candidate) {
        if (!candidate.interviews) candidate.interviews = [];
        candidate.interviews.push(currentInterview.id);
        try {
            localStorage.setItem('candidates', JSON.stringify(candidates));
        } catch (error) {
            console.error('خطأ في تحديث بيانات المرشح:', error);
        }
    }

    showNotification('تم حفظ المقابلة بنجاح!', 'success');
}

function generateReport() {
    console.log('إنشاء تقرير التقييم');
    
    if (!currentInterview || !currentInterview.questions || currentInterview.questions.length === 0) {
        showNotification('لا توجد بيانات مقابلة لإنشاء التقرير', 'error');
        return;
    }

    const candidate = candidates.find(c => c.id == currentInterview.candidateId);
    if (!candidate) {
        showNotification('بيانات المرشح غير موجودة', 'error');
        return;
    }

    const questions = currentInterview.questions;
    
    // Calculate scores
    const ratingsWithValues = questions.filter(q => q.rating > 0);
    const totalRating = ratingsWithValues.reduce((sum, q) => sum + q.rating, 0);
    const avgRating = ratingsWithValues.length > 0 ? totalRating / ratingsWithValues.length : 0;
    
    const clarityWithValues = questions.filter(q => q.clarity > 0);
    const avgClarity = clarityWithValues.length > 0 ? 
        clarityWithValues.reduce((sum, q) => sum + q.clarity, 0) / clarityWithValues.length : 0;
    
    const confidenceWithValues = questions.filter(q => q.confidence > 0);
    const avgConfidence = confidenceWithValues.length > 0 ? 
        confidenceWithValues.reduce((sum, q) => sum + q.confidence, 0) / confidenceWithValues.length : 0;

    // Determine recommendation
    let recommendation = '';
    let recommendationColor = '';
    if (avgRating >= 4) {
        recommendation = 'مرشح ممتاز - يُنصح بقبوله';
        recommendationColor = 'text-green-600';
    } else if (avgRating >= 3) {
        recommendation = 'مرشح جيد - يحتاج مراجعة إضافية';
        recommendationColor = 'text-yellow-600';
    } else if (avgRating > 0) {
        recommendation = 'مرشح غير مناسب - لا يُنصح بقبوله';
        recommendationColor = 'text-red-600';
    } else {
        recommendation = 'لم يتم تقييم المرشح بعد';
        recommendationColor = 'text-gray-600';
    }

    // Generate report HTML
    const reportHTML = `
        <div class="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">تقرير تقييم المقابلة</h1>
                <p class="text-gray-600">وظيفة: مدرب القيادة</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h3 class="font-semibold text-gray-800 mb-2">معلومات المرشح</h3>
                    <p><strong>الاسم:</strong> ${candidate.fullName}</p>
                    <p><strong>الهاتف:</strong> ${candidate.phone}</p>
                    <p><strong>المدينة:</strong> ${candidate.city}</p>
                    <p><strong>الخبرة:</strong> ${candidate.experience || 'غير محدد'}</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h3 class="font-semibold text-gray-800 mb-2">معلومات المقابلة</h3>
                    <p><strong>التاريخ:</strong> ${new Date(currentInterview.startTime).toLocaleDateString('ar-SA')}</p>
                    <p><strong>عدد الأسئلة:</strong> ${questions.length}</p>
                    <p><strong>المدة:</strong> ${currentInterview.endTime ? Math.round((new Date(currentInterview.endTime) - new Date(currentInterview.startTime)) / 60000) + ' دقيقة' : 'جارية'}</p>
                </div>
            </div>

            <div class="mb-8">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">ملخص التقييم</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-blue-50 p-4 rounded-lg text-center">
                        <div class="text-2xl font-bold text-blue-600">${avgRating > 0 ? avgRating.toFixed(1) + '/5' : 'غير مقيم'}</div>
                        <div class="text-sm text-gray-600">التقييم العام</div>
                    </div>
                    <div class="bg-green-50 p-4 rounded-lg text-center">
                        <div class="text-2xl font-bold text-green-600">${avgClarity > 0 ? avgClarity.toFixed(1) + '/5' : 'غير مقيم'}</div>
                        <div class="text-sm text-gray-600">وضوح الإجابات</div>
                    </div>
                    <div class="bg-purple-50 p-4 rounded-lg text-center">
                        <div class="text-2xl font-bold text-purple-600">${avgConfidence > 0 ? avgConfidence.toFixed(1) + '/5' : 'غير مقيم'}</div>
                        <div class="text-sm text-gray-600">الثقة بالنفس</div>
                    </div>
                </div>
            </div>

            <div class="mb-8">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">التوصية النهائية</h3>
                <div class="bg-gray-50 p-6 rounded-lg text-center">
                    <div class="text-xl font-bold ${recommendationColor}">${recommendation}</div>
                </div>
            </div>

            <div class="mb-8">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">تفاصيل الأسئلة والإجابات</h3>
                <div class="space-y-4">
                    ${questions.map((q, index) => `
                        <div class="border border-gray-200 rounded-lg p-4">
                            <h4 class="font-semibold text-gray-800 mb-2">${index + 1}. ${q.question}</h4>
                            <div class="bg-gray-50 p-3 rounded mb-3">
                                <p class="text-gray-700">${q.answer || 'لم يتم تسجيل إجابة'}</p>
                            </div>
                            <div class="flex flex-wrap gap-4 text-sm">
                                <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded">التقييم: ${q.rating > 0 ? q.rating + '/5' : 'غير مقيم'}</span>
                                <span class="bg-green-100 text-green-800 px-2 py-1 rounded">الوضوح: ${q.clarity > 0 ? q.clarity + '/5' : 'غير مقيم'}</span>
                                <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded">الثقة: ${q.confidence > 0 ? q.confidence + '/5' : 'غير مقيم'}</span>
                            </div>
                            ${q.notes ? `<div class="mt-2 text-sm text-gray-600"><strong>ملاحظات:</strong> ${q.notes}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="text-center">
                <button onclick="window.print()" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                    طباعة التقرير
                </button>
            </div>
        </div>
    `;

    // Open report in new window
    const reportWindow = window.open('', '_blank');
    if (reportWindow) {
        reportWindow.document.write(`
            <!DOCTYPE html>
            <html lang="ar" dir="rtl">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>تقرير تقييم المقابلة - ${candidate.fullName}</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap');
                    body { font-family: 'Cairo', sans-serif; }
                    @media print { body { print-color-adjust: exact; } }
                </style>
            </head>
            <body class="bg-gray-100 p-4">
                ${reportHTML}
            </body>
            </html>
        `);
        reportWindow.document.close();
        console.log('تم إنشاء التقرير في نافذة جديدة');
    }
}
