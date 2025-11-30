# 🚀 GitHub-a Push Etmək - Addım-Addım Təlimatlar

## ✅ GitHub Repository Hazırdır!

Repository yaradılıb: https://github.com/vddvdvdv/Ecolist-diary

İndi kodları push etmək lazımdır.

---

## 🎯 Yol 1: GitHub Desktop (Ən Asan - Tövsiyə Olunur) ⭐

### Addım 1: GitHub Desktop Yüklə
1. **Link**: https://desktop.github.com/
2. **Download for Windows** klikləyin
3. Quraşdırın

### Addım 2: GitHub Hesabı ilə Daxil Ol
1. GitHub Desktop-u açın
2. GitHub hesabınızla daxil olun

### Addım 3: Repository Əlavə Et
1. **File** > **Add Local Repository** klikləyin
2. **Choose...** klikləyin
3. Bu qovluğu seçin: `C:\Users\Acer\Desktop\ekolist`
4. **Add repository** klikləyin

### Addım 4: Commit və Push
1. Sol tərəfdə bütün faylları görəcəksiniz
2. Aşağıda commit mesajı yazın: `"Initial commit: Ekolist Diary - Complete project"`
3. **"Commit to main"** klikləyin
4. Yuxarıda **"Publish repository"** düyməsini görəcəksiniz
5. **"Publish repository"** klikləyin
6. Repository adını təsdiqləyin və **"Publish Repository"** klikləyin

**✅ Hazır!** Kodunuz GitHub-da olacaq.

---

## 🎯 Yol 2: Git Command Line

### Addım 1: Git Quraşdır
1. **Link**: https://git-scm.com/download/win
2. Quraşdırın (default seçimlər kifayətdir)
3. **Quraşdırmadan sonra PowerShell-i YENİDƏN AÇIN**

### Addım 2: Git Konfiqurasiyası (İlk dəfə)
```powershell
git config --global user.name "Sizin Adınız"
git config --global user.email "sizin@email.com"
```

### Addım 3: Repository Initialize və Push
```powershell
# Layihə qovluğuna keçin
cd C:\Users\Acer\Desktop\ekolist

# Git repository initialize et
git init

# Bütün faylları add et
git add .

# İlk commit yarat
git commit -m "Initial commit: Ekolist Diary - Complete project"

# Branch-i main olaraq təyin et
git branch -M main

# Remote repository əlavə et
git remote add origin https://github.com/vddvdvdv/Ecolist-diary.git

# GitHub-a push et
git push -u origin main
```

### Addım 4: Authentication
İlk push zamanı:
- **Username**: GitHub username-iniz
- **Password**: Personal Access Token (aşağıda təlimatlar)

---

## 🔐 Personal Access Token Yaratmaq

1. **GitHub.com**-a daxil olun
2. Sağ yuxarı küncdə **profil ikonu** > **Settings**
3. Sol menyuda **Developer settings**
4. **Personal access tokens** > **Tokens (classic)**
5. **Generate new token** > **Generate new token (classic)**
6. **Note**: "Ekolist Diary" yazın
7. **Expiration**: İstədiyiniz müddət (və ya "No expiration")
8. **Scopes**: **`repo`** checkbox-ını seçin
9. **Generate token** klikləyin
10. **Token-i kopyalayın** (bir daha görünməyəcək!)

Push zamanı password yerinə bu token-i istifadə edin.

---

## ✅ Yoxlama

Push uğurlu olduqdan sonra:
- https://github.com/vddvdvdv/Ecolist-diary - bu linkdə bütün kodlarınızı görə bilərsiniz

---

## 📋 Hazırlanmış Fayllar

Layihədə hazır olan fayllar:
- ✅ `README.md` - Layihə haqqında məlumat
- ✅ `.gitignore` - Git ignore faylları
- ✅ Bütün source kodlar
- ✅ `package.json` - Dependencies
- ✅ Konfiqurasiya faylları

---

## 🆘 Problemlər

### "git: command not found"
- Git quraşdırılmamışdır
- Git-i quraşdırın və **terminali yenidən açın**

### "remote origin already exists"
```powershell
git remote remove origin
git remote add origin https://github.com/vddvdvdv/Ecolist-diary.git
```

### "Authentication failed"
- Personal Access Token istifadə edin
- Token-in `repo` scope-u olduğundan əmin olun

---

## 💡 Tövsiyə

**GitHub Desktop** istifadə etmək ən asan yoldur - command line bilmək lazım deyil və Git quraşdırmağa ehtiyac yoxdur!

