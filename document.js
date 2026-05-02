document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('overlay');
    const video = document.getElementById('bgVideo');
    const audio = document.getElementById('bgAudio');
    const messageContainer = document.getElementById('messageContainer');
    const messageText = document.getElementById('messageText');
    const instruction = document.getElementById('instruction');

    let started = false;

    // تقسيم الرسالة إلى جمل منفصلة
    const sentences = [
        "منه... عارف إنو بينا حصلت حاجات كتيرة، ",
        "وجرحتك يمكن بدون ما أقصد... ",
        "لكن صدقيني، أنا ندمان وبعتذر ليك من قلبي. ",
        "رغم كل شي، إنتِ لسه نفس الزولة البحبها. ",
        "وفي حاجة جواي ما اتغيّرت… محبتك. ",
        "لو في زعل بينا، خلينا نصلحو سوا. ",
        "أنا دايرك تكوني مرتاحة معاي… ",
        "بحبك شديد ❤️"
    ];

overlay.addEventListener('click', () => {
        if (!started) {
            // تحميل الصوت أولاً
            audio.load();
            
            // تشغيل الفيديو والأغنية
            video.play().catch(error => {
                console.log("Video play failed:", error);
            });
            
            audio.volume = 1.0;
            audio.play().then(() => {
                console.log("Audio playing successfully!");
            }).catch(error => {
                console.log("Audio play failed:", error);
                alert("Audio error: " + error.message);
            });

            // إخفاء التعليمات
            instruction.style.opacity = '0';
            setTimeout(() => {
                instruction.style.display = 'none';
                messageContainer.style.display = 'block';
                messageContainer.classList.add('fade-in');
                
                // بدء كتابة الجمل
                let sentenceIndex = 0;
                let charIndex = 0;
const typingSpeed = 50; // ~18 ثانية لكل الجملة (8 جمل × 2 ثانية)
                
                function typeSentence() {
                    if (sentenceIndex < sentences.length) {
                        const currentSentence = sentences[sentenceIndex];
                        
                        if (charIndex < currentSentence.length) {
                            messageText.textContent += currentSentence.charAt(charIndex);
                            charIndex++;
                            setTimeout(typeSentence, typingSpeed);
                        } else {
                            // بعد انتهاء الجملة، انتظار صغير قبل الجملة التالية
                            sentenceIndex++;
                            charIndex = 0;
                            setTimeout(typeSentence, 500);
                        }
                    }
                }
                
                typeSentence();
            }, 500);

            started = true;
        }
    });
});
