// وظائف إضافية لنظام إدارة المقابلات

// عرض الأسئلة
function displayQuestions(questions) {
    const container = document.getElementById('questionsContainer');
    if (!container) {
        console.error('لم يتم العثور على حاوي الأسئلة');
        return;
    }
    
    container.innerHTML = '';

    if (questions.length === 0) {
        container.innerHTML = '<div class="text-center py-8 text-gray-500">لا توجد أسئلة تطابق البحث</div>';
        return;
    }

    questions.forEach(q => {
        const questionCard = createQuestionCard(q);
        container.appendChild(questionCard);
    });

    container.classList.add('fade-in');
    updateSelectedCounter();
    console.log('تم عرض', questions.length, 'سؤال');
}

function createQuestionCard(question) {
    const card = document.createElement('div');
    card.className = 'question-card bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all';
    
    const difficultyColors = {
        easy: 'bg-green-100 text-green-800',
        medium: 'bg-yellow-100 text-yellow-800',
        hard: 'bg-red-100 text-red-800'
    };

    const difficultyText = {
        easy: 'سهل',
        medium: 'متوسط',
        hard: 'صعب'
    };

    const isSelected = selectedQuestions.has(question.id);

    card.innerHTML = `
        <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
                <div class="flex items-center gap-3 mb-3">
                    <span class="px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[question.difficulty]}">
                        ${difficultyText[question.difficulty]}
                    </span>
                    <span class="text-gray-500 text-sm">#${question.id}</span>
                </div>
                <h3 class="text-lg font-semibold text-gray-800 mb-3 leading-relaxed">
                    ${question.question}
                </h3>
                <div class="bg-blue-50 p-3 rounded-lg mb-3">
                    <p class="text-sm text-blue-800">
                        <strong>💡 نصيحة للمقابل:</strong> ${question.tips}
                    </p>
                </div>
                <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="text-sm text-gray-700">
                        <strong>📋 معايير التقييم:</strong> ${question.evaluationCriteria.join(' • ')}
                    </p>
                </div>
            </div>
            <button onclick="toggleQuestion(${question.id})" 
                    class="select-btn mr-4 px-4 py-2 rounded-lg border-2 transition-all ${isSelected ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300 hover:border-blue-500'}">
                ${isSelected ? '✓ مختار' : 'اختيار'}
            </button>
        </div>
    `;

    return card;
}

function toggleQuestion(questionId) {
    console.log('تبديل السؤال:', questionId);
    if (selectedQuestions.has(questionId)) {
        selectedQuestions.delete(questionId);
    } else {
        selectedQuestions.add(questionId);
    }
    filterQuestions();
}

function updateSelectedCounter() {
    const counter = document.getElementById('selectedCounter');
    const countSpan = document.getElementById('selectedCount');
    
    if (selectedQuestions.size > 0) {
        counter.classList.remove('hidden');
        countSpan.textContent = selectedQuestions.size;
    } else {
        counter.classList.add('hidden');
    }
}

function clearSelectedQuestions() {
    console.log('مسح الأسئلة المختارة');
    selectedQuestions.clear();
    filterQuestions();
}

function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    console.log('البحث عن:', searchTerm);
    
    const filteredQuestions = allQuestions.filter(q => 
        q.question.toLowerCase().includes(searchTerm) ||
        q.tips.toLowerCase().includes(searchTerm) ||
        q.evaluationCriteria.some(criteria => criteria.toLowerCase().includes(searchTerm))
    );
    
    const finalQuestions = currentFilter === 'all' ? 
        filteredQuestions : 
        filteredQuestions.filter(q => q.category === currentFilter);
        
    displayQuestions(finalQuestions);
}

function filterQuestions() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    let filteredQuestions = allQuestions;

    if (searchTerm) {
        filteredQuestions = filteredQuestions.filter(q => 
            q.question.toLowerCase().includes(searchTerm) ||
            q.tips.toLowerCase().includes(searchTerm) ||
            q.evaluationCriteria.some(criteria => criteria.toLowerCase().includes(searchTerm))
        );
    }

    if (currentFilter !== 'all') {
        filteredQuestions = filteredQuestions.filter(q => q.category === currentFilter);
    }

    displayQuestions(filteredQuestions);
}

function generateRandomQuestions() {
    console.log('توليد أسئلة عشوائية');
    const randomQuestions = [];
    const availableQuestions = [...allQuestions];
    
    for (let i = 0; i < Math.min(10, availableQuestions.length); i++) {
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        randomQuestions.push(availableQuestions[randomIndex]);
        availableQuestions.splice(randomIndex, 1);
    }
    
    displayQuestions(randomQuestions);
    showNotification('تم اختيار 10 أسئلة عشوائية!', 'success');
}

// إدارة المرشحين
function showCandidateForm() {
    console.log('عرض نموذج المرشح');
    const modal = document.getElementById('candidateModal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closeCandidateForm() {
    console.log('إغلاق نموذج المرشح');
    const modal = document.getElementById('candidateModal');
    const form = document.getElementById('candidateForm');
    if (modal) modal.classList.add('hidden');
    if (form) form.reset();
}

function handleCandidateSubmit(e) {
    e.preventDefault();
    console.log('إرسال نموذج المرشح');
    
    const formData = new FormData(e.target);
    const candidate = {
        id: Date.now(),
        fullName: formData.get('fullName'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        city: formData.get('city'),
        district: formData.get('district') || '',
        experience: formData.get('experience') || '',
        education: formData.get('education') || '',
        notes: formData.get('notes') || '',
        createdAt: new Date().toISOString(),
        interviews: []
    };

    console.log('بيانات المرشح الجديد:', candidate);

    candidates.push(candidate);
    
    try {
        localStorage.setItem('candidates', JSON.stringify(candidates));
        console.log('تم حفظ المرشح في localStorage');
    } catch (error) {
        console.error('خطأ في حفظ المرشح:', error);
        showNotification('حدث خطأ في حفظ البيانات', 'error');
        return;
    }
    
    updateCandidateSelect();
    closeCandidateForm();
    showNotification('تم إضافة المرشح بنجاح!', 'success');
}

function updateCandidateSelect() {
    const select = document.getElementById('candidateSelect');
    if (!select) return;
    
    select.innerHTML = '<option value="">اختر مرشحاً للمقابلة</option>';
    
    candidates.forEach(candidate => {
        const option = document.createElement('option');
        option.value = candidate.id;
        option.textContent = `${candidate.fullName} - ${candidate.city}`;
        select.appendChild(option);
    });
    
    console.log('تم تحديث قائمة المرشحين:', candidates.length);
}

function showCandidatesList() {
    console.log('عرض قائمة المرشحين');
    const modal = document.getElementById('candidatesListModal');
    if (modal) {
        modal.classList.remove('hidden');
        loadCandidatesList();
    }
}

function closeCandidatesList() {
    console.log('إغلاق قائمة المرشحين');
    const modal = document.getElementById('candidatesListModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function loadCandidatesList() {
    const container = document.getElementById('candidatesListContent');
    
    if (candidates.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-8">لا توجد مرشحين مضافين بعد</p>';
        return;
    }

    container.innerHTML = `
        <div class="overflow-x-auto">
            <table class="w-full border-collapse border border-gray-300">
                <thead>
                    <tr class="bg-gray-50">
                        <th class="border border-gray-300 px-4 py-2 text-right">الاسم</th>
                        <th class="border border-gray-300 px-4 py-2 text-right">الهاتف</th>
                        <th class="border border-gray-300 px-4 py-2 text-right">المدينة</th>
                        <th class="border border-gray-300 px-4 py-2 text-right">الخبرة</th>
                        <th class="border border-gray-300 px-4 py-2 text-right">المقابلات</th>
                        <th class="border border-gray-300 px-4 py-2 text-right">الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    ${candidates.map(candidate => {
                        const candidateInterviews = interviews.filter(i => i.candidateId == candidate.id);
                        return `
                        <tr>
                            <td class="border border-gray-300 px-4 py-2">${candidate.fullName}</td>
                            <td class="border border-gray-300 px-4 py-2">${candidate.phone}</td>
                            <td class="border border-gray-300 px-4 py-2">${candidate.city}</td>
                            <td class="border border-gray-300 px-4 py-2">${candidate.experience || 'غير محدد'}</td>
                            <td class="border border-gray-300 px-4 py-2">${candidateInterviews.length}</td>
                            <td class="border border-gray-300 px-4 py-2">
                                <button onclick="viewCandidateDetails(${candidate.id})" class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors">
                                    عرض
                                </button>
                            </td>
                        </tr>
                    `;}).join('')}
                </tbody>
            </table>
        </div>
    `;
}
