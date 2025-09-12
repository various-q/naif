// وظائف التحليلات والإشعارات

// تحميل التحليلات
function loadAnalytics() {
    console.log('تحميل التحليلات');
    loadCandidatesSummary();
    loadPerformanceAnalytics();
    loadRecentInterviews();
    loadAdvancedStatistics();
}

function loadCandidatesSummary() {
    const container = document.getElementById('candidatesSummary');
    if (!container) return;
    
    const totalCandidates = candidates.length;
    const interviewedCandidates = candidates.filter(c => {
        return interviews.some(i => i.candidateId == c.id);
    }).length;
    const pendingCandidates = totalCandidates - interviewedCandidates;
    const acceptedCandidates = interviews.filter(i => i.overallScore >= 4).length;

    container.innerHTML = `
        <div class="space-y-4">
            <div class="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md">
                <div class="flex items-center">
                    <svg class="w-6 h-6 ml-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="font-medium">إجمالي المرشحين</span>
                </div>
                <span class="text-2xl font-bold">${totalCandidates}</span>
            </div>
            <div class="flex justify-between items-center p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-md">
                <div class="flex items-center">
                    <svg class="w-6 h-6 ml-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="font-medium">تمت مقابلتهم</span>
                </div>
                <span class="text-2xl font-bold">${interviewedCandidates}</span>
            </div>
            <div class="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg shadow-md">
                <div class="flex items-center">
                    <svg class="w-6 h-6 ml-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="font-medium">في الانتظار</span>
                </div>
                <span class="text-2xl font-bold">${pendingCandidates}</span>
            </div>
            <div class="flex justify-between items-center p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg shadow-md">
                <div class="flex items-center">
                    <svg class="w-6 h-6 ml-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="font-medium">مقبولين (ممتاز)</span>
                </div>
                <span class="text-2xl font-bold">${acceptedCandidates}</span>
            </div>
        </div>
    `;
}

function loadPerformanceAnalytics() {
    const container = document.getElementById('performanceAnalytics');
    if (!container) return;
    
    if (interviews.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12">
                <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                <p class="text-gray-500 text-lg">لا توجد مقابلات مكتملة للتحليل</p>
                <p class="text-gray-400 text-sm mt-2">ابدأ بإجراء مقابلات لرؤية التحليلات</p>
            </div>
        `;
        return;
    }

    const completedInterviews = interviews.filter(i => i.overallScore > 0);
    if (completedInterviews.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12">
                <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p class="text-gray-500 text-lg">لا توجد مقابلات مقيمة للتحليل</p>
                <p class="text-gray-400 text-sm mt-2">أكمل تقييم المقابلات لرؤية النتائج</p>
            </div>
        `;
        return;
    }

    const avgScores = completedInterviews.map(interview => interview.overallScore);
    const overallAvg = avgScores.reduce((sum, score) => sum + score, 0) / avgScores.length;
    
    const excellent = completedInterviews.filter(i => i.overallScore >= 4).length;
    const good = completedInterviews.filter(i => i.overallScore >= 3 && i.overallScore < 4).length;
    const poor = completedInterviews.filter(i => i.overallScore < 3).length;

    const successRate = ((excellent + good) / completedInterviews.length * 100).toFixed(1);

    container.innerHTML = `
        <div class="space-y-6">
            <div class="text-center p-6 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl shadow-lg">
                <div class="text-4xl font-bold mb-2">${overallAvg.toFixed(1)}/5</div>
                <div class="text-lg opacity-90">متوسط التقييم العام</div>
                <div class="text-sm opacity-75 mt-2">معدل النجاح: ${successRate}%</div>
            </div>
            
            <div class="space-y-4">
                <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div class="flex justify-between items-center mb-2">
                        <div class="flex items-center">
                            <div class="w-3 h-3 bg-green-500 rounded-full ml-2"></div>
                            <span class="text-green-800 font-medium">ممتاز (4-5 نقاط)</span>
                        </div>
                        <span class="text-green-700 font-bold">${excellent} مرشح</span>
                    </div>
                    <div class="w-full bg-green-200 rounded-full h-3">
                        <div class="bg-green-500 h-3 rounded-full score-bar transition-all duration-1000" style="width: ${completedInterviews.length > 0 ? (excellent / completedInterviews.length) * 100 : 0}%"></div>
                    </div>
                    <div class="text-right text-green-600 text-sm mt-1">${completedInterviews.length > 0 ? ((excellent / completedInterviews.length) * 100).toFixed(1) : 0}%</div>
                </div>
                
                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div class="flex justify-between items-center mb-2">
                        <div class="flex items-center">
                            <div class="w-3 h-3 bg-yellow-500 rounded-full ml-2"></div>
                            <span class="text-yellow-800 font-medium">جيد (3-4 نقاط)</span>
                        </div>
                        <span class="text-yellow-700 font-bold">${good} مرشح</span>
                    </div>
                    <div class="w-full bg-yellow-200 rounded-full h-3">
                        <div class="bg-yellow-500 h-3 rounded-full score-bar transition-all duration-1000" style="width: ${completedInterviews.length > 0 ? (good / completedInterviews.length) * 100 : 0}%"></div>
                    </div>
                    <div class="text-right text-yellow-600 text-sm mt-1">${completedInterviews.length > 0 ? ((good / completedInterviews.length) * 100).toFixed(1) : 0}%</div>
                </div>
                
                <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div class="flex justify-between items-center mb-2">
                        <div class="flex items-center">
                            <div class="w-3 h-3 bg-red-500 rounded-full ml-2"></div>
                            <span class="text-red-800 font-medium">يحتاج تحسين (أقل من 3)</span>
                        </div>
                        <span class="text-red-700 font-bold">${poor} مرشح</span>
                    </div>
                    <div class="w-full bg-red-200 rounded-full h-3">
                        <div class="bg-red-500 h-3 rounded-full score-bar transition-all duration-1000" style="width: ${completedInterviews.length > 0 ? (poor / completedInterviews.length) * 100 : 0}%"></div>
                    </div>
                    <div class="text-right text-red-600 text-sm mt-1">${completedInterviews.length > 0 ? ((poor / completedInterviews.length) * 100).toFixed(1) : 0}%</div>
                </div>
            </div>
        </div>
    `;
}

function loadRecentInterviews() {
    const container = document.getElementById('recentInterviews');
    if (!container) return;
    
    if (interviews.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12">
                <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                <p class="text-gray-500 text-lg">لا توجد مقابلات بعد</p>
                <p class="text-gray-400 text-sm mt-2">ابدأ بإجراء مقابلات مع المرشحين</p>
            </div>
        `;
        return;
    }

    const recentInterviews = interviews
        .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
        .slice(0, 8);

    container.innerHTML = `
        <div class="space-y-4">
            ${recentInterviews.map((interview, index) => {
                const candidate = candidates.find(c => c.id == interview.candidateId);
                const candidateName = candidate ? candidate.fullName : 'مرشح محذوف';
                const candidateCity = candidate ? candidate.city : '';
                const score = interview.overallScore || 0;
                const scoreColor = score >= 4 ? 'text-green-600 bg-green-50' : score >= 3 ? 'text-yellow-600 bg-yellow-50' : score > 0 ? 'text-red-600 bg-red-50' : 'text-gray-600 bg-gray-50';
                const statusIcon = interview.status === 'completed' ? '✅' : '⏳';
                const statusText = interview.status === 'completed' ? 'مكتملة' : 'جارية';
                const statusColor = interview.status === 'completed' ? 'text-green-600' : 'text-blue-600';
                
                let duration = '';
                if (interview.endTime && interview.startTime) {
                    const durationMinutes = Math.round((new Date(interview.endTime) - new Date(interview.startTime)) / 60000);
                    duration = `${durationMinutes} دقيقة`;
                }
                
                return `
                    <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div class="flex items-center justify-between">
                            <div class="flex-1">
                                <div class="flex items-center gap-3 mb-2">
                                    <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span class="text-blue-600 font-bold text-sm">${index + 1}</span>
                                    </div>
                                    <div>
                                        <div class="font-semibold text-gray-800">${candidateName}</div>
                                        <div class="text-sm text-gray-500">${candidateCity}</div>
                                    </div>
                                </div>
                                <div class="flex items-center gap-4 text-sm text-gray-600">
                                    <span>📅 ${new Date(interview.startTime).toLocaleDateString('ar-SA')}</span>
                                    ${duration ? `<span>⏱️ ${duration}</span>` : ''}
                                    <span class="${statusColor}">${statusIcon} ${statusText}</span>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="px-3 py-2 rounded-lg ${scoreColor} font-bold text-lg">
                                    ${score > 0 ? score.toFixed(1) + '/5' : 'غير مقيم'}
                                </div>
                                ${score > 0 ? `
                                    <div class="text-xs mt-1 ${score >= 4 ? 'text-green-600' : score >= 3 ? 'text-yellow-600' : 'text-red-600'}">
                                        ${score >= 4 ? 'مرشح ممتاز' : score >= 3 ? 'مرشح جيد' : 'يحتاج تحسين'}
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
            
            ${interviews.length > 8 ? `
                <div class="text-center pt-4">
                    <button onclick="showAllInterviews()" class="text-blue-600 hover:text-blue-800 font-medium text-sm">
                        عرض جميع المقابلات (${interviews.length})
                    </button>
                </div>
            ` : ''}
        </div>
    `;
}

function loadAdvancedStatistics() {
    const completedInterviews = interviews.filter(i => i.endTime && i.startTime);
    let avgDuration = 0;
    if (completedInterviews.length > 0) {
        const totalDuration = completedInterviews.reduce((sum, interview) => {
            return sum + (new Date(interview.endTime) - new Date(interview.startTime));
        }, 0);
        avgDuration = Math.round(totalDuration / completedInterviews.length / 60000);
    }
    
    const ratedInterviews = interviews.filter(i => i.overallScore > 0);
    let acceptanceRate = 0;
    if (ratedInterviews.length > 0) {
        const acceptedCount = ratedInterviews.filter(i => i.overallScore >= 4).length;
        acceptanceRate = ((acceptedCount / ratedInterviews.length) * 100).toFixed(1);
    }
    
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    const thisMonthInterviews = interviews.filter(i => {
        const interviewDate = new Date(i.startTime);
        return interviewDate.getMonth() === thisMonth && 
               interviewDate.getFullYear() === thisYear &&
               i.overallScore > 0;
    });
    
    let topScore = 0;
    if (thisMonthInterviews.length > 0) {
        topScore = Math.max(...thisMonthInterviews.map(i => i.overallScore));
    }
    
    const avgDurationElement = document.getElementById('avgInterviewDuration');
    const acceptanceRateElement = document.getElementById('acceptanceRate');
    const topPerformerElement = document.getElementById('topPerformerScore');
    
    if (avgDurationElement) {
        avgDurationElement.textContent = avgDuration > 0 ? `${avgDuration} دقيقة` : '-- دقيقة';
    }
    
    if (acceptanceRateElement) {
        acceptanceRateElement.textContent = ratedInterviews.length > 0 ? `${acceptanceRate}%` : '--%';
    }
    
    if (topPerformerElement) {
        topPerformerElement.textContent = topScore > 0 ? `${topScore.toFixed(1)} / 5` : '-- / 5';
    }
}

function showAllInterviews() {
    const modal = document.createElement('div');
    modal.className = 'modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    
    const allInterviewsList = interviews
        .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
        .map((interview, index) => {
            const candidate = candidates.find(c => c.id == interview.candidateId);
            const candidateName = candidate ? candidate.fullName : 'مرشح محذوف';
            const score = interview.overallScore || 0;
            const scoreColor = score >= 4 ? 'text-green-600' : score >= 3 ? 'text-yellow-600' : score > 0 ? 'text-red-600' : 'text-gray-600';
            
            return `
                <tr class="border-b border-gray-200 hover:bg-gray-50">
                    <td class="px-4 py-3">${index + 1}</td>
                    <td class="px-4 py-3 font-medium">${candidateName}</td>
                    <td class="px-4 py-3">${new Date(interview.startTime).toLocaleDateString('ar-SA')}</td>
                    <td class="px-4 py-3 ${scoreColor} font-semibold">${score > 0 ? score.toFixed(1) + '/5' : 'غير مقيم'}</td>
                    <td class="px-4 py-3">
                        <span class="px-2 py-1 rounded-full text-xs ${interview.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}">
                            ${interview.status === 'completed' ? 'مكتملة' : 'جارية'}
                        </span>
                    </td>
                </tr>
            `;
        }).join('');

    modal.innerHTML = `
        <div class="bg-white rounded-xl shadow-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold text-gray-800">جميع المقابلات</h2>
                <button onclick="this.closest('.modal').remove()" class="text-gray-500 hover:text-gray-700 p-1">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-4 py-3 text-right text-sm font-medium text-gray-700">#</th>
                            <th class="px-4 py-3 text-right text-sm font-medium text-gray-700">المرشح</th>
                            <th class="px-4 py-3 text-right text-sm font-medium text-gray-700">التاريخ</th>
                            <th class="px-4 py-3 text-right text-sm font-medium text-gray-700">التقييم</th>
                            <th class="px-4 py-3 text-right text-sm font-medium text-gray-700">الحالة</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${allInterviewsList}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function viewCandidateDetails(candidateId) {
    const candidate = candidates.find(c => c.id === candidateId);
    if (!candidate) {
        showNotification('المرشح غير موجود', 'error');
        return;
    }

    const candidateInterviews = interviews.filter(i => i.candidateId == candidateId);
    
    const modal = document.createElement('div');
    modal.className = 'modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    
    let interviewsSection = '<p class="text-gray-500">لم يتم إجراء مقابلات بعد</p>';
    if (candidateInterviews.length > 0) {
        const avgScore = candidateInterviews
            .filter(i => i.overallScore > 0)
            .reduce((sum, i, _, arr) => sum + i.overallScore / arr.length, 0);
        
        interviewsSection = `
            <div class="space-y-3">
                <div class="flex justify-between items-center">
                    <span>عدد المقابلات:</span>
                    <span class="font-semibold">${candidateInterviews.length}</span>
                </div>
                ${avgScore > 0 ? `
                    <div class="flex justify-between items-center">
                        <span>متوسط التقييم:</span>
                        <span class="font-semibold ${avgScore >= 4 ? 'text-green-600' : avgScore >= 3 ? 'text-yellow-600' : 'text-red-600'}">${avgScore.toFixed(1)}/5</span>
                    </div>
                ` : ''}
                <div class="border-t pt-3">
                    <h4 class="font-medium mb-2">تاريخ المقابلات:</h4>
                    ${candidateInterviews.map(interview => `
                        <div class="text-sm text-gray-600">
                            📅 ${new Date(interview.startTime).toLocaleDateString('ar-SA')} - 
                            ${interview.overallScore > 0 ? interview.overallScore.toFixed(1) + '/5' : 'غير مقيم'}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    modal.innerHTML = `
        <div class="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold text-gray-800">تفاصيل المرشح</h2>
                <button onclick="this.closest('.modal').remove()" class="text-gray-500 hover:text-gray-700 p-1">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            
            <div class="space-y-6">
                <div class="bg-blue-50 p-4 rounded-lg">
                    <h3 class="font-semibold text-blue-800 mb-3">المعلومات الشخصية</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div><strong>الاسم:</strong> ${candidate.fullName}</div>
                        <div><strong>الهاتف:</strong> ${candidate.phone}</div>
                        <div><strong>البريد:</strong> ${candidate.email}</div>
                        <div><strong>المدينة:</strong> ${candidate.city}</div>
                        <div><strong>الحي:</strong> ${candidate.district || 'غير محدد'}</div>
                        <div><strong>الخبرة:</strong> ${candidate.experience || 'غير محدد'}</div>
                        <div><strong>المؤهل:</strong> ${candidate.education || 'غير محدد'}</div>
                    </div>
                    ${candidate.notes ? `<div class="mt-3"><strong>ملاحظات:</strong> ${candidate.notes}</div>` : ''}
                </div>
                
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h3 class="font-semibold text-gray-800 mb-3">سجل المقابلات</h3>
                    ${interviewsSection}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function showNotification(message, type) {
    console.log('إظهار إشعار:', message, type);
    
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 px-6 py-3 rounded-lg text-white font-semibold z-50 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}
