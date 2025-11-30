# GitHub-a Push Etmək Üçün Tam Təlimatlar

## ⚠️ Vacib: Git Quraşdırılması

Git quraşdırılmamışdır. Əvvəlcə Git-i quraşdırın:

### Windows üçün:
1. https://git-scm.com/download/win - bu linkdən Git-i yükləyin
2. Quraşdırma wizard-ını izləyin (default seçimlər kifayətdir)
3. Quraşdırmadan sonra **PowerShell/Terminal-i yenidən açın**

### Git Quraşdırılıb-yoxunu yoxlamaq:
```bash
git --version
```

## 📤 GitHub-a Push Etmək

Git quraşdırdıqdan sonra, terminaldə layihə qovluğunda aşağıdakı əmrləri ardıcıl icra edin:

### 1. Git Repository-ni İnitialize Et
```bash
git init
```

### 2. Bütün Faylları Add Et
```bash
git add .
```

### 3. İlk Commit Yarat
```bash
git commit -m "Initial commit: Ekolist Diary - Ekoloji gündəlik platforması"
```

### 4. Branch-i Main Olaraq Təyin Et
```bash
git branch -M main
```

### 5. Remote Repository Əlavə Et
```bash
git remote add origin https://github.com/vddvdvdv/Ecolist-diary.git
```

### 6. GitHub-a Push Et
```bash
git push -u origin main
```

## 🔐 Authentication

İlk push zamanı GitHub username və password soruşula bilər. 

**Tövsiyə**: Personal Access Token istifadə edin:
1. GitHub.com > Settings > Developer settings > Personal access tokens > Tokens (classic)
2. "Generate new token" klikləyin
3. "repo" scope-unu seçin
4. Token-i kopyalayın və password yerinə istifadə edin

## ✅ Yoxlama

Push uğurlu olduqdan sonra:
- https://github.com/vddvdvdv/Ecolist-diary - bu linkdə kodunuzu görə bilərsiniz

## 📝 Sonrakı Dəyişikliklər

Kodda dəyişiklik etdikdən sonra:

```bash
git add .
git commit -m "Dəyişikliklərin qısa təsviri"
git push
```

## 🎯 Hazırlanmış Fayllar

- ✅ `README.md` - Layihə haqqında məlumat
- ✅ `.gitignore` - Git ignore faylları (node_modules, dist və s.)
- ✅ Bütün source kodlar hazırdır

## ⚡ Alternativ: GitHub Desktop

Git command line istifadə etmək istəmirsinizsə:
1. GitHub Desktop yükləyin: https://desktop.github.com/
2. "Add" > "Add Existing Repository"
3. Layihə qovluğunu seçin
4. "Publish repository" klikləyin

---

**Qeyd**: Git quraşdırmadan sonra terminali yenidən açmağı unutmayın!

