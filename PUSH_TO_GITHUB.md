# 🚀 GitHub-a Push Etmək Üçün Təlimatlar

## ⚠️ Vacib: Git Quraşdırılması

Sistemdə Git quraşdırılmamışdır. Əvvəlcə Git-i quraşdırın:

### Windows üçün Git Quraşdırılması:
1. **Git yükləyin**: https://git-scm.com/download/win
2. Quraşdırma wizard-ını izləyin (default seçimlər kifayətdir)
3. **Quraşdırmadan sonra PowerShell/Terminal-i YENİDƏN AÇIN**

### Git Quraşdırılıb-yoxunu yoxlamaq:
```bash
git --version
```
Bu əmr `git version 2.x.x` kimi bir versiya göstərməlidir.

---

## 📤 GitHub-a Push Etmək (Git Quraşdırdıqdan Sonra)

Terminaldə layihə qovluğunda (`C:\Users\Acer\Desktop\ekolist`) aşağıdakı əmrləri **ardıcıl** icra edin:

### 1️⃣ Git Repository-ni İnitialize Et
```bash
git init
```

### 2️⃣ Bütün Faylları Add Et
```bash
git add .
```

### 3️⃣ İlk Commit Yarat
```bash
git commit -m "Initial commit: Ekolist Diary - Ekoloji gündəlik platforması"
```

### 4️⃣ Branch-i Main Olaraq Təyin Et
```bash
git branch -M main
```

### 5️⃣ Remote Repository Əlavə Et
```bash
git remote add origin https://github.com/vddvdvdv/Ecolist-diary.git
```

### 6️⃣ GitHub-a Push Et
```bash
git push -u origin main
```

---

## 🔐 Authentication (İlk Push Zamanı)

İlk push zamanı GitHub username və password soruşula bilər.

### Personal Access Token İstifadəsi (Tövsiyə olunur):

1. **GitHub.com**-a daxil olun
2. **Settings** > **Developer settings** > **Personal access tokens** > **Tokens (classic)**
3. **"Generate new token"** klikləyin
4. **Token name**: "Ekolist Diary" (və ya istədiyiniz ad)
5. **Expiration**: İstədiyiniz müddət (və ya "No expiration")
6. **Scopes**: **`repo`** checkbox-ını seçin
7. **"Generate token"** klikləyin
8. **Token-i kopyalayın** (bir daha görünməyəcək!)

Push zamanı:
- **Username**: GitHub username-iniz
- **Password**: Kopyaladığınız token

---

## ✅ Yoxlama

Push uğurlu olduqdan sonra:
- https://github.com/vddvdvdv/Ecolist-diary - bu linkdə kodunuzu görə bilərsiniz

---

## 📝 Sonrakı Dəyişikliklər

Kodda dəyişiklik etdikdən sonra:

```bash
git add .
git commit -m "Dəyişikliklərin qısa təsviri"
git push
```

---

## 🎯 Hazırlanmış Fayllar

- ✅ `README.md` - Layihə haqqında tam məlumat
- ✅ `.gitignore` - Git ignore faylları (node_modules, dist və s. ignore olunur)
- ✅ Bütün source kodlar hazırdır və push üçün hazırdır

---

## ⚡ Alternativ: GitHub Desktop (Graphical Interface)

Git command line istifadə etmək istəmirsinizsə:

1. **GitHub Desktop yükləyin**: https://desktop.github.com/
2. GitHub hesabınızla daxil olun
3. **"File"** > **"Add Local Repository"**
4. Layihə qovluğunu seçin: `C:\Users\Acer\Desktop\ekolist`
5. **"Publish repository"** klikləyin
6. Repository adını təsdiqləyin və **"Publish"** klikləyin

---

## 🆘 Problemlər

### "git: command not found"
- Git quraşdırılmamışdır və ya PATH-də yoxdur
- Git-i quraşdırın və terminali yenidən açın

### "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/vddvdvdv/Ecolist-diary.git
```

### "Authentication failed"
- Personal Access Token istifadə edin (yuxarıda təlimatlar var)
- Token-in `repo` scope-u olduğundan əmin olun

---

**Qeyd**: Git quraşdırmadan sonra terminali yenidən açmağı unutmayın! 🔄

