// نظام إدارة المقابلات - مدرب القيادة
// ملف JavaScript الرئيسي

// قاعدة بيانات الأسئلة المحسنة
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
        },
        {
            id: 2,
            question: "أين تسكن حالياً؟ وهل أنت مستعد للانتقال أو السفر للعمل؟",
            category: "personal-info",
            difficulty: "easy",
            tips: "تأكد من المرونة الجغرافية والاستعداد للتنقل",
            evaluationCriteria: ["المرونة الجغرافية", "الاستعداد للسفر", "الوضوح"],
            expectedKeywords: ["مرونة", "سفر", "انتقال", "استعداد"]
        },
        {
            id: 3,
            question: "ما هي توقعاتك المالية لهذه الوظيفة؟",
            category: "personal-info",
            difficulty: "medium",
            tips: "قيم واقعية التوقعات مع معايير السوق",
            evaluationCriteria: ["واقعية التوقعات", "معرفة السوق", "المرونة"],
            expectedKeywords: ["راتب", "مناسب", "سوق", "مرونة"]
        }
    ],
    'experience': [
        {
            id: 4,
            question: "حدثني عن خبرتك في مجال التدريب والتطوير القيادي؟",
            category: "experience",
            difficulty: "medium",
            tips: "ابحث عن أمثلة محددة وقابلة للقياس",
            evaluationCriteria: ["عمق الخبرة", "تنوع التجارب", "النتائج المحققة"],
            expectedKeywords: ["تدريب", "قيادة", "تطوير", "برامج", "نتائج"]
        },
        {
            id: 5,
            question: "ما هي أهم الشهادات أو الدورات التي حصلت عليها في مجال القیادة؟",
            category: "experience",
            difficulty: "easy",
            tips: "تأكد من صحة الشهادات المذكورة",
            evaluationCriteria: ["جودة الشهادات", "التطوير المستمر", "الصدق"],
            expectedKeywords: ["شهادات", "دورات", "تطوير", "تعلم"]
        },
        {
            id: 6,
            question: "صف لي أصعب تحدٍ واجهته في مجال التدريب وكيف تعاملت معه؟",
            category: "experience",
            difficulty: "hard",
            tips: "ركز على منهجية حل المشاكل والتعلم من التجارب",
            evaluationCriteria: ["حل المشاكل", "التعلم من الأخطاء", "المثابرة"],
            expectedKeywords: ["تحدي", "حل", "تعلم", "تطوير", "نجاح"]
        }
    ],
    'leadership': [
        {
            id: 7,
            question: "كيف تعرّف القيادة الفعالة؟",
            category: "leadership",
            difficulty: "medium",
            tips: "ابحث عن تعريف شامل ومتوازن",
            evaluationCriteria: ["فهم القيادة", "الشمولية", "العمق النظري"],
            expectedKeywords: ["تأثير", "رؤية", "فريق", "أهداف", "تحفيز"]
        },
        {
            id: 8,
            question: "أعطني مثالاً على موقف قدت فيه فريقاً نحو تحقيق هدف صعب؟",
            category: "leadership",
            difficulty: "hard",
            tips: "ابحث عن مهارات القيادة العملية والنتائج",
            evaluationCriteria: ["مهارات القيادة", "تحقيق النتائج", "إدارة الفريق"],
            expectedKeywords: ["قيادة", "فريق", "هدف", "نجاح", "تحدي"]
        }
    ],
    'training': [
        {
            id: 9,
            question: "ما هي منهجيتك في تصميم البرامج التدريبية؟",
            category: "training",
            difficulty: "medium",
            tips: "ابحث عن منهجية منظمة ومدروسة",
            evaluationCriteria: ["المنهجية", "التخطيط", "التنظيم"],
            expectedKeywords: ["تحليل", "تصميم", "تنفيذ", "تقييم", "تطوير"]
        },
        {
            id: 10,
            question: "كيف تقيس فعالية البرامج التدريبية التي تقدمها؟",
            category: "training",
            difficulty: "hard",
            tips: "ابحث عن مؤشرات قابلة للقياس وأدوات تقييم",
            evaluationCriteria: ["أدوات القياس", "التحليل", "التحسين المستمر"],
            expectedKeywords: ["قياس", "تقييم", "مؤشرات", "نتائج", "تحسين"]
        }
    ],
    'scenarios': [
        {
            id: 11,
            question: "كيف تتعامل مع متدرب يقاوم التغيير ولا يتفاعل مع البرنامج؟",
            category: "scenarios",
            difficulty: "hard",
            tips: "ابحث عن استراتيجيات عملية للتعامل مع المقاومة",
            evaluationCriteria: ["التعامل مع المقاومة", "الصبر", "الإبداع في الحلول"],
            expectedKeywords: ["تفهم", "صبر", "تدرج", "تحفيز", "إقناع"]
        },
        {
            id: 12,
            question: "صف موقفاً تعاملت فيه مع صراع بين أعضاء الفريق أثناء التدريب؟",
            category: "scenarios",
            difficulty: "hard",
            tips: "تأكد من وجود مهارات حل النزاعات",
            evaluationCriteria: ["حل النزاعات", "الحياد", "مهارات التواصل"],
            expectedKeywords: ["وساطة", "حل", "تفاهم", "توازن", "عدالة"]
        }
    ],
    'thinking': [
        {
            id: 13,
            question: "كيف تتخذ قراراتك المهمة؟ اشرح لي عمليتك في التفكير؟",
            category: "thinking",
            difficulty: "medium",
            tips: "قيم منطقية التفكير ومنهجية اتخاذ القرار",
            evaluationCriteria: ["منطقية التفكير", "منهجية القرار", "التحليل"],
            expectedKeywords: ["تحليل", "معلومات", "خيارات", "تقييم", "قرار"]
        },
        {
            id: 14,
            question: "عندما تواجه مشكلة معقدة، ما هي خطواتك لحلها؟",
            category: "thinking",
            difficulty: "medium",
            tips: "ابحث عن منهجية واضحة في حل المشاكل",
            evaluationCriteria: ["منهجية حل المشاكل", "التفكير النقدي", "الإبداع"],
            expectedKeywords: ["تحليل", "تقسيم", "حلول", "تجريب", "تقييم"]
        },
        {
            id: 15,
            question: "كيف تتعامل مع الضغط والمواقف الصعبة؟",
            category: "thinking",
            difficulty: "medium",
            tips: "قيم القدرة على التحمل وإدارة الضغوط",
            evaluationCriteria: ["إدارة الضغط", "الهدوء", "التركيز"],
            expectedKeywords: ["هدوء", "تنظيم", "أولويات", "تركيز", "حلول"]
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

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل الصفحة، بدء التهيئة...');
    
    try {
        const storedCandidates = localStorage.getItem('candidates');
        const storedInterviews = localStorage.getItem('interviews');
        
        candidates = storedCandidates ? JSON.parse(storedCandidates) : [];
        interviews = storedInterviews ? JSON.parse(storedInterviews) : [];
        
        console.log('تم تحميل البيانات:', { candidates: candidates.length, interviews: interviews.length });
    } catch (error) {
        console.error('خطأ في تحميل البيانات من localStorage:', error);
        candidates = [];
        interviews = [];
    }
    
    allQuestions = Object.values(questionsDB).flat();
    console.log('تم تحميل الأسئلة:', allQuestions.length);
    
    displayQuestions(allQuestions);
    setupEventListeners();
    updateCandidateSelect();
    showQuestionsBank();
    
    console.log('تمت التهيئة بنجاح');
});

// إعداد مستمعي الأحداث
function setupEventListeners() {
    console.log('إعداد مستمعي الأحداث...');
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
        console.log('تم ربط مستمع البحث');
    }
    
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('تم النقر على فئة:', this.dataset.category);
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.category;
            filterQuestions();
        });
    });

    const candidateForm = document.getElementById('candidateForm');
    if (candidateForm) {
        candidateForm.addEventListener('submit', handleCandidateSubmit);
        console.log('تم ربط نموذج المرشح');
    }
    
    console.log('تم إعداد جميع مستمعي الأحداث');
}

// وظائف التنقل
function showQuestionsBank() {
    console.log('عرض بنك الأسئلة');
    hideAllSections();
    const section = document.getElementById('questionsSection');
    if (section) {
        section.classList.remove('hidden');
        updateNavButtons('questionsSection');
    }
}

function showInterviewMode() {
    console.log('عرض وضع المقابلة');
    hideAllSections();
    const section = document.getElementById('interviewSection');
    if (section) {
        section.classList.remove('hidden');
        updateNavButtons('interviewSection');
    }
}

function showAnalytics() {
    console.log('عرض التحليلات');
    hideAllSections();
    const section = document.getElementById('analyticsSection');
    if (section) {
        section.classList.remove('hidden');
        updateNavButtons('analyticsSection');
        loadAnalytics();
    }
}

function hideAllSections() {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.add('hidden');
    });
}

function updateNavButtons(activeSection) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const buttonMap = {
        'questionsSection': 0,
        'interviewSection': 1,
        'analyticsSection': 2
    };
    
    const buttons = document.querySelectorAll('.nav-btn');
    if (buttons[buttonMap[activeSection]]) {
        buttons[buttonMap[activeSection]].classList.add('active');
    }
}
