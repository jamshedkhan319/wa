const phoneInput = document.getElementById('phoneInput');
const keys = document.querySelectorAll('.key');
const whatsappButton = document.getElementById('whatsappButton');
const pasteButton = document.getElementById('pasteButton');
const generateButton = document.getElementById('generateButton');

// কাস্টম কীবোর্ড কাজ করানোর জন্য
keys.forEach((key) => {
  key.addEventListener('click', () => {
    if (key.classList.contains('delete')) {
      phoneInput.value = phoneInput.value.slice(0, -1); // শেষ সংখ্যা মুছুন
    } else if (!key.classList.contains('btn')) {
      phoneInput.value += key.textContent; // নতুন সংখ্যা যোগ করুন
    }
  });
});

// পেস্ট বাটন ক্লিক ইভেন্ট
pasteButton.addEventListener('click', async () => {
  try {
    const text = await navigator.clipboard.readText(); // ক্লিপবোর্ড থেকে ডেটা পড়ুন
    if (/^[0-9]*$/.test(text)) {
      phoneInput.value = text; // শুধুমাত্র সংখ্যা পেস্ট করুন
    } else {
      alert('Please paste a valid number!');
    }
  } catch (err) {
    alert('Failed to read clipboard. Please allow clipboard access.');
  }
});

// লিংক তৈরি করার জন্য
generateButton.addEventListener('click', function () {
  const countryCode = document.getElementById('countryCode').value;
  const phoneNumber = phoneInput.value.trim();

  // ফোন নম্বর চেক করার জন্য Regex
  const phoneRegex = /^[0-9]{5,15}$/; // 5-15 সংখ্যার মধ্যে সীমাবদ্ধ
  if (phoneRegex.test(phoneNumber)) {
    const fullNumber = `${countryCode}${phoneNumber}`;
    const whatsappLink = `https://wa.me/${fullNumber}`;
    whatsappButton.href = whatsappLink;
    whatsappButton.style.display = 'inline-block'; // লিংক বাটন দেখান
  } else {
    alert('Please enter a valid phone number!');
    whatsappButton.style.display = 'none'; // ভুল হলে লিংক লুকান
  }
});
