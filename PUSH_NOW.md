# 🚀 GitHub'a Push Talimatları

## 🎯 Yol 1: GitHub Desktop (Ən Asan - 5 Dəqiqə) ⭐

### Addım 1: GitHub Desktop Yüklə
1. **Link**: https://desktop.github.com/
2. **Download for Windows** klikləyin
3. Quraşdırın (2-3 dəqiqə)

### Addım 2: Repository Əlavə Et
1. GitHub Desktop-u açın
2. GitHub hesabınızla daxil olun
3. **File** > **Add Local Repository**
4. **Choose...** klikləyin
5. Bu qovluğu seçin: `C:\Users\Acer\Desktop\ekolist`
6. **Add repository** klikləyin

### Addım 3: Push Et
1. Sol tərəfdə bütün faylları görəcəksiniz
2. Aşağıda commit mesajı: `"Initial commit: Ekolist Diary - Complete project"`
3. **"Commit to main"** klikləyin
4. **"Publish repository"** (yuxarıda) klikləyin
5. **"Publish Repository"** təsdiqləyin

**✅ Hazır!** Kodunuz GitHub-da!

---

## 🎯 Yol 2: Git Quraşdır və Push Et

### Addım 1: Git Quraşdır (5 dəqiqə)
1. **Link**: https://git-scm.com/download/win
2. Quraşdırın (default seçimlər kifayətdir)
3. **Quraşdırmadan sonra PowerShell-i YENİDƏN AÇIN**

### Addım 2: Git Konfiqurasiyası
Yeni PowerShell pəncərəsində:
```powershell
git config --global user.name "vddvdvdv"
git config --global user.email "sizin@email.com"
```

### Addım 3: Push Et
```powershell
cd C:\Users\Acer\Desktop\ekolist

git init
git add .
git commit -m "Initial commit: Ekolist Diary - Complete project"
git branch -M main
git remote add origin https://github.com/vddvdvdv/Ecolist-diary.git
git push -u origin main
```

### Addım 4: Authentication
Push zamanı GitHub hesabınızla giriş yapın.

---

## ✅ Yoxlama

Push uğurlu olduqdan sonra:
- https://github.com/vddvdvdv/Ecolist-diary - bu linkdə bütün kodlarınızı görə bilərsiniz

---

## 💡 Tövsiyə

**GitHub Desktop** istifadə edin - ən asan və sürətli yoldur! 5 dəqiqədə hazır olacaq.
