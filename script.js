/* ================================================================
   منصة التغير المناخي والتحول الرقمي الذكي
   JavaScript - الإصدار المطور
   ================================================================ */


/* ================================================================
   01 - إعدادات النظام
   ================================================================ */

const APP_CONFIG = {

    screens: [
        "intro-screen",
        "objectives-screen",
        "calculator-screen",
        "solutions-screen",
        "guide-screen"
    ],

    screenSteps: {

        "intro-screen": 1,

        "objectives-screen": 2,

        "calculator-screen": 3,

        "solutions-screen": 4,

        "guide-screen": 5

    },

    emissions: {

        plasticPerBag: 0.05,

        electricityPerKwh: 0.5,

        carPerKm: 0.2

    },

    thresholds: {

        low: 100,

        medium: 300

    }

};


/* ================================================================
   02 - التهيئة العامة
   ================================================================ */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeApplication();

    }
);


/* ================================================================
   03 - تشغيل التطبيق
   ================================================================ */

function initializeApplication() {

    console.info(
        "بدء تشغيل منصة التغير المناخي والتحول الرقمي..."
    );


    setupNavigation();

    setupCalculatorInputs();

    setupInitialScreen();

    setupKeyboardAccessibility();


    console.info(
        "تم تحميل نظام المنصة بنجاح."
    );

}


/* ================================================================
   04 - إعداد الشاشة الأولى
   ================================================================ */

function setupInitialScreen() {

    const activeScreen =
        document.querySelector(
            ".app-screen.active"
        );


    if (!activeScreen) {

        const firstScreen =
            document.getElementById(
                APP_CONFIG.screens[0]
            );


        if (firstScreen) {

            firstScreen.classList.add(
                "active"
            );

        }

    }


    const currentScreen =
        document.querySelector(
            ".app-screen.active"
        );


    if (currentScreen) {

        updateProgressNavigation(
            currentScreen.id
        );

    }

}


/* ================================================================
   05 - تجهيز أزرار وروابط التنقل
   ================================================================ */

function setupNavigation() {

    const navigationButtons =
        document.querySelectorAll(
            "[data-target-screen]"
        );


    navigationButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const target =
                        button.dataset.targetScreen;


                    if (target) {

                        navigateScreen(
                            target
                        );

                    }

                }
            );

        }
    );

}


/* ================================================================
   06 - دالة التنقل الرئيسية
   ================================================================ */

/**
 * الانتقال بين شاشات المنصة.
 *
 * @param {string} screenId
 * معرف الشاشة المطلوبة.
 */

function navigateScreen(screenId) {

    if (
        typeof screenId !== "string" ||
        screenId.trim() === ""
    ) {

        console.error(
            "لم يتم تحديد معرف شاشة صالح."
        );

        return;

    }


    const targetScreen =
        document.getElementById(
            screenId
        );


    if (!targetScreen) {

        console.error(
            "عذراً، الشاشة المطلوبة غير موجودة: " +
            screenId
        );

        return;

    }


    const allScreens =
        document.querySelectorAll(
            ".app-screen"
        );


    allScreens.forEach(
        function (screen) {

            screen.classList.remove(
                "active"
            );

        }
    );


    targetScreen.classList.add(
        "active"
    );


    updateProgressNavigation(
        screenId
    );


    resetScreenScroll();


    dispatchScreenChangeEvent(
        screenId
    );

}


/* ================================================================
   07 - تحديث مؤشر مراحل المشروع
   ================================================================ */

function updateProgressNavigation(
    screenId
) {

    const currentStep =
        APP_CONFIG.screenSteps[
            screenId
        ];


    if (!currentStep) {

        return;

    }


    const progressSteps =
        document.querySelectorAll(
            ".progress-step"
        );


    progressSteps.forEach(
        function (step) {

            const stepNumber =
                Number(
                    step.dataset.step
                );


            step.classList.remove(
                "active",
                "completed"
            );


            if (
                stepNumber === currentStep
            ) {

                step.classList.add(
                    "active"
                );

            }


            if (
                stepNumber < currentStep
            ) {

                step.classList.add(
                    "completed"
                );

            }

        }
    );

}


/* ================================================================
   08 - إعادة التمرير إلى بداية الشاشة
   ================================================================ */

function resetScreenScroll() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* ================================================================
   09 - إرسال حدث تغيير الشاشة
   ================================================================ */

function dispatchScreenChangeEvent(
    screenId
) {

    const screenChangeEvent =
        new CustomEvent(
            "platformScreenChanged",
            {
                detail: {
                    screenId: screenId
                }
            }
        );


    document.dispatchEvent(
        screenChangeEvent
    );

}


/* ================================================================
   10 - إعداد حقول الحاسبة
   ================================================================ */

function setupCalculatorInputs() {

    const calculatorInputs =
        document.querySelectorAll(
            "#calculator-screen input"
        );


    calculatorInputs.forEach(
        function (input) {

            input.addEventListener(
                "input",
                function () {

                    sanitizeCalculatorInput(
                        input
                    );

                    clearCalculatorErrorState();

                }
            );


            input.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key === "Enter"
                    ) {

                        calculateAdvancedFootprint();

                    }

                }
            );

        }
    );

}


/* ================================================================
   11 - تنظيف قيمة الإدخال
   ================================================================ */

function sanitizeCalculatorInput(
    input
) {

    if (!input) {

        return;

    }


    let value =
        input.value;


    value =
        value.replace(
            /[^\d.]/g,
            ""
        );


    const firstDot =
        value.indexOf(".");


    if (firstDot !== -1) {

        value =
            value.substring(
                0,
                firstDot + 1
            ) +
            value
                .substring(firstDot + 1)
                .replace(/\./g, "");

    }


    if (
        Number(value) < 0
    ) {

        value = "0";

    }


    input.value =
        value;

}


/* ================================================================
   12 - التحقق من قيم الحاسبة
   ================================================================ */

function validateCalculatorInputs(
    values
) {

    const errors = [];


    if (
        values.plasticBags < 0
    ) {

        errors.push(
            "عدد الأكياس البلاستيكية لا يمكن أن يكون سالباً."
        );

    }


    if (
        values.electricityKwh < 0
    ) {

        errors.push(
            "استهلاك الكهرباء لا يمكن أن يكون سالباً."
        );

    }


    if (
        values.carKm < 0
    ) {

        errors.push(
            "عدد الكيلومترات لا يمكن أن يكون سالباً."
        );

    }


    if (
        !Number.isFinite(
            values.plasticBags
        )
    ) {

        errors.push(
            "قيمة الأكياس البلاستيكية غير صالحة."
        );

    }


    if (
        !Number.isFinite(
            values.electricityKwh
        )
    ) {

        errors.push(
            "قيمة الكهرباء غير صالحة."
        );

    }


    if (
        !Number.isFinite(
            values.carKm
        )
    ) {

        errors.push(
            "قيمة السيارة غير صالحة."
        );

    }


    return errors;

}


/* ================================================================
   13 - جلب قيم الحاسبة
   ================================================================ */

function getCalculatorValues() {

    const plasticInput =
        document.getElementById(
            "plastic-bags"
        );


    const electricityInput =
        document.getElementById(
            "electricity-kwh"
        );


    const carInput =
        document.getElementById(
            "car-km"
        );


    return {

        plasticBags:
            parseFloat(
                plasticInput?.value
            ) || 0,

        electricityKwh:
            parseFloat(
                electricityInput?.value
            ) || 0,

        carKm:
            parseFloat(
                carInput?.value
            ) || 0

    };

}


/* ================================================================
   14 - دالة حساب البصمة الكربونية
   ================================================================ */

/**
 * حساب البصمة الكربونية التقديرية.
 *
 * الدالة الأساسية المستخدمة من HTML:
 *
 * calculateAdvancedFootprint()
 */

function calculateAdvancedFootprint() {

    const resultContainer =
        document.getElementById(
            "calculation-result"
        );


    if (!resultContainer) {

        console.error(
            "عنصر عرض النتائج غير موجود."
        );

        return;

    }


    const values =
        getCalculatorValues();


    const validationErrors =
        validateCalculatorInputs(
            values
        );


    if (
        validationErrors.length > 0
    ) {

        showCalculationError(
            resultContainer,
            validationErrors
        );

        return;

    }


    const emissions =
        calculateEmissions(
            values
        );


    const evaluation =
        evaluateEmissionLevel(
            emissions.total
        );


    renderCalculationResult(
        resultContainer,
        values,
        emissions,
        evaluation
    );


    resultContainer.scrollIntoView({

        behavior: "smooth",

        block: "nearest"

    });

}


/* ================================================================
   15 - حساب الانبعاثات
   ================================================================ */

function calculateEmissions(
    values
) {

    const plasticEmissions =
        values.plasticBags *
        4 *
        APP_CONFIG.emissions.plasticPerBag;


    const electricityEmissions =
        values.electricityKwh *
        APP_CONFIG.emissions.electricityPerKwh;


    const carEmissions =
        values.carKm *
        4 *
        APP_CONFIG.emissions.carPerKm;


    const total =
        plasticEmissions +
        electricityEmissions +
        carEmissions;


    return {

        plastic:
            roundNumber(
                plasticEmissions
            ),

        electricity:
            roundNumber(
                electricityEmissions
            ),

        car:
            roundNumber(
                carEmissions
            ),

        total:
            roundNumber(
                total
            )

    };

}


/* ================================================================
   16 - تقريب الأرقام
   ================================================================ */

function roundNumber(
    number,
    decimals = 2
) {

    const factor =
        Math.pow(
            10,
            decimals
        );


    return (
        Math.round(
            number * factor
        ) / factor
    );

}


/* ================================================================
   17 - تقييم مستوى الانبعاثات
   ================================================================ */

function evaluateEmissionLevel(
    total
) {

    if (
        total <=
        APP_CONFIG.thresholds.low
    ) {

        return {

            level:
                "منخفض",

            title:
                "مؤشر منخفض",

            icon:
                "🌱",

            color:
                "#198754",

            background:
                "#eaf8f0",

            message:
                "القيمة التقديرية الناتجة عن المدخلات منخفضة وفقاً للمعايير التعليمية المستخدمة داخل هذه الحاسبة. يمكنك الاستمرار في تقليل الاستهلاك واستخدام الموارد بكفاءة."

        };

    }


    if (
        total <=
        APP_CONFIG.thresholds.medium
    ) {

        return {

            level:
                "متوسط",

            title:
                "مؤشر متوسط",

            icon:
                "⚡",

            color:
                "#f59f00",

            background:
                "#fff5df",

            message:
                "القيمة التقديرية تقع في النطاق المتوسط وفقاً للمعادلات التعليمية المستخدمة. يمكن تقليلها من خلال ترشيد الكهرباء وتقليل استخدام البلاستيك وتحسين أساليب التنقل."

        };

    }


    return {

        level:
            "مرتفع",

        title:
            "مؤشر مرتفع",

        icon:
            "🌍",

        color:
            "#dc3545",

        background:
            "#fff0f1",

        message:
            "القيمة التقديرية مرتفعة وفقاً للمعاملات المستخدمة في الحاسبة. يمكن دراسة مصادر الاستهلاك الأعلى ومحاولة تقليلها تدريجياً من خلال إجراءات أكثر كفاءة."

    };

}


/* ================================================================
   18 - عرض أخطاء الحاسبة
   ================================================================ */

function showCalculationError(
    container,
    errors
) {

    container.style.display =
        "block";


    container.classList.add(
        "visible"
    );


    container.style.borderRightColor =
        "#dc3545";


    const errorItems =
        errors
            .map(
                function (error) {

                    return `
                        <li>
                            ${escapeHtml(error)}
                        </li>
                    `;

                }
            )
            .join("");


    container.innerHTML = `

        <div class="result-header">

            <div
                class="result-status-icon"
                style="
                    background:#fff0f1;
                    color:#dc3545;
                "
            >
                ⚠️
            </div>

            <div>

                <h4>
                    توجد مشكلة في البيانات
                </h4>

                <p>
                    يرجى مراجعة البيانات التالية:
                </p>

            </div>

        </div>

        <ul
            style="
                padding-right:20px;
                color:#842029;
                line-height:2;
            "
        >

            ${errorItems}

        </ul>

    `;

}


/* ================================================================
   19 - عرض نتيجة الحساب
   ================================================================ */

function renderCalculationResult(
    container,
    values,
    emissions,
    evaluation
) {

    container.style.display =
        "block";


    container.classList.add(
        "visible"
    );


    container.style.borderRightColor =
        evaluation.color;


    container.innerHTML = `

        <div class="result-header">

            <div
                class="result-status-icon"
                style="
                    background:${evaluation.background};
                    color:${evaluation.color};
                "
            >
                ${evaluation.icon}
            </div>

            <div>

                <h4>
                    ${evaluation.title}
                </h4>

                <p>
                    تحليل تقديري للبيانات المدخلة
                </p>

            </div>

        </div>


        <div class="emission-total">

            <div>

                <strong>
                    إجمالي الانبعاثات المقدرة
                </strong>

                <span class="emission-unit">
                    بناءً على المدخلات الحالية
                </span>

            </div>


            <div>

                <span class="emission-number">
                    ${emissions.total}
                </span>

                <span class="emission-unit">
                    كجم CO₂e / شهر تقريباً
                </span>

            </div>

        </div>


        <div class="breakdown-grid">


            <div class="breakdown-item">

                <span>
                    🛍️
                </span>

                <strong>
                    البلاستيك
                </strong>

                <small>
                    ${emissions.plastic} كجم تقريباً
                </small>

            </div>


            <div class="breakdown-item">

                <span>
                    ⚡
                </span>

                <strong>
                    الكهرباء
                </strong>

                <small>
                    ${emissions.electricity} كجم تقريباً
                </small>

            </div>


            <div class="breakdown-item">

                <span>
                    🚗
                </span>

                <strong>
                    السيارة
                </strong>

                <small>
                    ${emissions.car} كجم تقريباً
                </small>

            </div>


        </div>


        <div
            class="evaluation-message"
            style="
                background:${evaluation.background};
                color:${evaluation.color};
                border:1px solid ${evaluation.color}33;
            "
        >

            <strong>
                التقييم والتوجيه:
            </strong>

            ${escapeHtml(
                evaluation.message
            )}

        </div>


        <p
            style="
                margin-top:15px;
                font-size:0.72rem;
                color:#82948c;
            "
        >

            💡
            تذكّر أن هذه القيمة تقديرية وتعتمد على معاملات مبسطة
            لأغراض التعليم والتوعية فقط.

        </p>

    `;

}


/* ================================================================
   20 - إزالة حالة الخطأ
   ================================================================ */

function clearCalculatorErrorState() {

    const resultContainer =
        document.getElementById(
            "calculation-result"
        );


    if (!resultContainer) {

        return;

    }


    if (
        resultContainer.classList.contains(
            "visible"
        )
    ) {

        resultContainer.style.borderRightColor =
            "";

    }

}


/* ================================================================
   21 - حماية النصوص
   ================================================================ */

function escapeHtml(
    value
) {

    if (
        typeof value !== "string"
    ) {

        return "";

    }


    return value
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* ================================================================
   22 - دعم لوحة المفاتيح
   ================================================================ */

function setupKeyboardAccessibility() {

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeOpenResultIfNeeded();

            }

        }
    );

}


/* ================================================================
   23 - إغلاق النتيجة عند الحاجة
   ================================================================ */

function closeOpenResultIfNeeded() {

    const resultContainer =
        document.getElementById(
            "calculation-result"
        );


    if (!resultContainer) {

        return;

    }


    if (
        resultContainer.classList.contains(
            "visible"
        )
    ) {

        resultContainer.classList.remove(
            "visible"
        );

        resultContainer.style.display =
            "none";

    }

}


/* ================================================================
   24 - دالة مساعدة للحصول على الشاشة الحالية
   ================================================================ */

function getCurrentScreen() {

    return document.querySelector(
        ".app-screen.active"
    );

}


/* ================================================================
   25 - دالة معرفة رقم الشاشة الحالية
   ================================================================ */

function getCurrentScreenIndex() {

    const currentScreen =
        getCurrentScreen();


    if (!currentScreen) {

        return 0;

    }


    return Number(
        currentScreen.dataset.screenIndex
    ) || 0;

}


/* ================================================================
   26 - الانتقال للشاشة التالية
   ================================================================ */

function goToNextScreen() {

    const currentIndex =
        getCurrentScreenIndex();


    const nextIndex =
        currentIndex + 1;


    if (
        nextIndex >
        APP_CONFIG.screens.length
    ) {

        return;

    }


    navigateScreen(
        APP_CONFIG.screens[
            nextIndex - 1
        ]
    );

}


/* ================================================================
   27 - الانتقال للشاشة السابقة
   ================================================================ */

function goToPreviousScreen() {

    const currentIndex =
        getCurrentScreenIndex();


    const previousIndex =
        currentIndex - 1;


    if (
        previousIndex < 1
    ) {

        return;

    }


    navigateScreen(
        APP_CONFIG.screens[
            previousIndex - 1
        ]
    );

}


/* ================================================================
   28 - مراقبة تغيير الشاشة
   ================================================================ */

document.addEventListener(
    "platformScreenChanged",
    function (event) {

        console.info(
            "تم الانتقال إلى الشاشة:",
            event.detail.screenId
        );

    }
);


/* ================================================================
   29 - رسالة تشغيل النظام
   ================================================================ */

console.info(
    "%c منصة التغير المناخي والتحول الرقمي الذكي ",
    "font-weight:900;font-size:16px;color:#198754;"
);


console.info(
    "جميع وظائف التنقل والحاسبة جاهزة للعمل."
);