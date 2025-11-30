# 🚀 Git Quraşdırılması və GitHub-a Push

## ⚠️ Problem: Git Quraşdırılmamışdır

PowerShell-də Git əmrləri işləmir çünki Git quraşdırılmamışdır.

## ✅ Həll 1: Git Quraşdır (Command Line)

### Addım 1: Git Yüklə və Quraşdır

1. **Git yükləyin**: https://git-scm.com/download/win
2. Quraşdırma wizard-ını izləyin:
   - **Default seçimlər kifayətdir**
   - "Git from the command line and also from 3rd-party software" seçin
   - "Use bundled OpenSSH" seçin
   - "Use the OpenSSL library" seçin
   - "Checkout Windows-style, commit Unix-style line endings" seçin
   - "Use MinTTY" seçin
3. **Quraşdırmadan sonra PowerShell-i YENİDƏN AÇIN**

### Addım 2: Git Quraşdırılıb-yoxunu Yoxla

Yeni PowerShell pəncərəsində:
```powershell
git --version
```

Əgər `git version 2.x.x` görsəniz, Git quraşdırılıb deməkdir.

### Addım 3: Git Konfiqurasiyası (İlk dəfə)

```powershell
git config --global user.name "Sizin Adınız"
git config --global user.email "sizin@email.com"
```

### Addım 4: GitHub-a Push

```powershell
# 1. Git repository-ni initialize et
git init

# 2. Bütün faylları add et
git add .

# 3. İlk commit yarat
git commit -m "Initial commit: Ekolist Diary - Ekoloji gündəlik platforması"

# 4. Branch-i main olaraq təyin et
git branch -M main

# 5. Remote repository əlavə et
git remote add origin https://github.com/vddvdvdv/Ecolist-diary.git

# 6. GitHub-a push et
git push -u origin main
```

---

## ✅ Həll 2: GitHub Desktop (Ən Asan Yol) ⭐

Git command line istifadə etmək istəmirsinizsə, GitHub Desktop istifadə edin:

### Addım 1: GitHub Desktop Yüklə

1. **GitHub Desktop yükləyin**: https://desktop.github.com/
2. Quraşdırın və GitHub hesabınızla daxil olun

### Addım 2: Repository Əlavə Et

1. GitHub Desktop-da **"File"** > **"Add Local Repository"** klikləyin
2. **"Choose..."** klikləyin
3. Layihə qovluğunu seçin: `C:\Users\Acer\Desktop\ekolist`
4. **"Add repository"** klikləyin

### Addım 3: Commit və Push

1. Sol tərəfdə dəyişiklikləri görəcəksiniz
2. Aşağıda commit mesajı yazın: `"Initial commit: Ekolist Diary"`
3. **"Commit to main"** klikləyin
4. **"Publish repository"** (və ya "Push origin") klikləyin
5. Repository adını təsdiqləyin və **"Publish Repository"** klikləyin

**Hazır!** Kodunuz GitHub-da olacaq.

---

## 🔐 Authentication

İlk push zamanı GitHub username və password soruşula bilər.

### Personal Access Token (Tövsiyə olunur):

1. **GitHub.com**-a daxil olun
2. **Settings** > **Developer settings** > **Personal access tokens** > **Tokens (classic)**
3. **"Generate new token"** klikləyin
4. **Token name**: "Ekolist Diary"
5. **Expiration**: İstədiyiniz müddət
6. **Scopes**: **`repo`** checkbox-ını seçin
7. **"Generate token"** klikləyin
8. **Token-i kopyalayın**

Push zamanı:
- **Username**: GitHub username-iniz
- **Password**: Kopyaladığınız token (password deyil!)

---

## 📋 Yoxlama

Push uğurlu olduqdan sonra:
- https://github.com/vddvdvdv/Ecolist-diary - bu linkdə kodunuzu görə bilərsiniz

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

**GitHub Desktop** istifadə etmək ən asan yoldur - command line bilmək lazım deyil!

