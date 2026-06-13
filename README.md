# مؤسسة جدار الفن للمقاولات — الموقع التعريفي (Company Profile Website)

موقع تعريفي احترافي لمؤسسة جدار الفن للمقاولات، متخصّص في عرض أعمال المؤسسة في مشاريع
المياه والبنية التحتية. مبنيٌّ على Django وجاهزٌ للنشر على Railway.

A professional, single-page company profile website (Arabic / RTL) for **Jidar Al-Fan
Contracting**, built on Django and ready to deploy on Railway.

---

## ✨ المميزات / Features

- تصميم احترافي عصري بهوية كحلي + ذهبي، يدعم العربية بالكامل (RTL).
- صور ومقاطع فيديو حقيقية من مواقع التنفيذ.
- أقسام: الرئيسية، من نحن (الرؤية/الرسالة)، الخدمات، لماذا نحن، منهجية العمل،
  معرض المشاريع (صور + فيديو)، القطاعات، نموذج تواصل، تذييل.
- متجاوب بالكامل مع الجوال، مع قائمة جانبية، وأنيميشن عند التمرير، وعدّادات إحصائية،
  ومعرض صور منبثق (Lightbox)، وأزرار واتساب والعودة للأعلى.
- إمكانية **تحميل الملف التعريفي PDF** عبر الطباعة (تنسيق طباعة مخصّص).

---

## 🚀 التشغيل محلياً / Run locally

```bash
pip install -r requirements.txt        # أو: pip install "django==4.0.4" whitenoise
python manage.py migrate                # ينشئ قاعدة SQLite محلياً تلقائياً
python manage.py runserver
# افتح http://127.0.0.1:8000
```

> بدون متغيّرات بيئة PostgreSQL يعمل المشروع تلقائياً على SQLite للتجربة المحلية.
> On Railway, the existing `PG*` env vars switch it to PostgreSQL automatically.

---

## ✏️ ما الذي يجب تعديله ببياناتك الحقيقية / Replace these placeholders

كل القيم التالية وُضعت كـ«عناصر نائبة» — استبدلها ببيانات المؤسسة الفعلية:

| الموضع | الملف | القيمة الحالية (placeholder) |
|--------|-------|------------------------------|
| رقم الهاتف / واتساب | `templates/profile/index.html` | `+966 50 000 0000` / `wa.me/966500000000` |
| البريد الإلكتروني | `templates/profile/index.html` | `info@jidaralfan.com` |
| العنوان التفصيلي | `templates/profile/index.html` | «الرياض، المملكة العربية السعودية» |
| رقم السجل التجاري | `templates/profile/index.html` (التذييل) | «— يُحدّث —» |
| الإحصائيات (سنوات الخبرة، عدد المشاريع…) | `templates/profile/index.html` (`data-count`) | 15 / 120 / 200 / 98 |
| روابط التواصل الاجتماعي | `templates/profile/index.html` | `href="#"` |
| نصوص «من نحن» والرؤية والرسالة | `templates/profile/index.html` | محتوى احترافي قابل للتعديل |

### الصور والفيديو
- الصور في `static/img/` — مستخرجة من مقاطعكم الميدانية.
- لإضافة صور المحابس والوصلات (غرف المحابس الداخلية): ضع الصور في `static/img/`
  وأضِف بطاقة جديدة في قسم «معرض المشاريع» داخل `index.html` على نفس نمط البطاقات الحالية.
- الفيديو في `static/video/`.

### نموذج التواصل / Contact form
يستقبل النموذج الطلب ويعرض رسالة نجاح. لتوصيل الطلبات إلى بريدكم أو نظام CRM،
عدّل دالة `home` في `mysite/views.py` (يوجد تعليق `TODO` في موضع الإرسال).

عند النشر على Railway، اضبط متغيّر البيئة التالي ليعمل النموذج عبر HTTPS:

```
CSRF_TRUSTED_ORIGINS = https://your-app.up.railway.app
```

---

## 🌐 النشر / Deploy (Railway)

المشروع مهيّأ للنشر التلقائي (`railway.json`):
```
python manage.py migrate && python manage.py collectstatic --noinput && gunicorn mysite.wsgi
```
يتم تقديم الملفات الثابتة عبر WhiteNoise.

---

## 🗂️ البنية / Structure

```
mysite/            إعدادات Django + المسارات + الـ view
templates/profile/ صفحة الموقع (index.html)
static/css/        التنسيقات (style.css)
static/js/         التفاعلات (main.js)
static/img/        الصور وصور الفيديو والأيقونة
static/video/      مقاطع الفيديو الميدانية
```
