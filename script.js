// スムーズスクロール
function scrollToContact() {
    document.getElementById('contact').scrollIntoView({
        behavior: 'smooth'
    });
}

// FAQアコーディオン
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const wasActive = faqItem.classList.contains('active');

    // 全てのFAQを閉じる
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    // クリックされた項目が閉じていた場合のみ開く
    if (!wasActive) {
        faqItem.classList.add('active');
    }
}

// カルーセル機能
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const totalTestimonials = testimonials.length;

function showTestimonial(index) {
    // 全てのカードを非表示
    testimonials.forEach(card => {
        card.classList.remove('active');
    });

    // 選択されたカードを表示
    testimonials[index].classList.add('active');

    // ページネーションドットを更新
    document.querySelectorAll('.pagination-dot').forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });

    currentTestimonial = index;
}

function nextTestimonial() {
    const next = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(next);
}

function previousTestimonial() {
    const prev = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    showTestimonial(prev);
}

// ページネーションドットのクリックイベント
document.addEventListener('DOMContentLoaded', () => {
    const dots = document.querySelectorAll('.pagination-dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });

    // 自動スライド（5秒ごと）
    setInterval(nextTestimonial, 5000);
});

// 文字数カウンター
function updateCharCount(textarea) {
    const charCount = textarea.value.length;
    const charCountElement = document.getElementById('charCount');
    charCountElement.textContent = charCount;

    // 500文字に近づいたら色を変える
    if (charCount > 450) {
        charCountElement.style.color = '#ff6b6b';
    } else {
        charCountElement.style.color = 'inherit';
    }
}

// コンタクトフォーム送信
function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    console.log('フォームデータ:', data);

    // 実際の実装では、ここでAPIにデータを送信します
    alert('お問い合わせありがとうございます！\n担当者より24時間以内にご連絡いたします。');
    event.target.reset();
    document.getElementById('charCount').textContent = '0';
}

// ニュースレター登録
function handleNewsletterSubmit(event) {
    event.preventDefault();

    const email = event.target.querySelector('input[type="email"]').value;

    console.log('ニュースレター登録:', email);

    // 実際の実装では、ここでAPIにデータを送信します
    alert('ニュースレターへのご登録ありがとうございます！\n最新情報をお届けします。');
    event.target.reset();
}

// スクロール時のヘッダー背景変更
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(15, 25, 41, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, var(--primary-color), var(--bg-dark))';
        header.style.backdropFilter = 'none';
    }
});

// アニメーション（スクロール時に要素をフェードイン）
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// アニメーション対象の要素を監視
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.feature-card, .pricing-card, .testimonial-card, .faq-item'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// モバイルメニュー切り替え（必要に応じて）
let mobileMenuOpen = false;

function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    mobileMenuOpen = !mobileMenuOpen;

    if (mobileMenuOpen) {
        nav.style.display = 'flex';
    } else {
        nav.style.display = 'none';
    }
}

// レスポンシブ対応：ウィンドウサイズ変更時
window.addEventListener('resize', () => {
    const nav = document.querySelector('.nav');
    if (window.innerWidth > 768) {
        nav.style.display = 'flex';
    } else if (!mobileMenuOpen) {
        nav.style.display = 'none';
    }
});
