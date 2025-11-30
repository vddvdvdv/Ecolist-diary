# GitHub-a Push Etmək Üçün Təlimatlar

## Git Quraşdırılması

Əgər Git quraşdırılmamışdırsa, əvvəlcə Git-i quraşdırın:
- Windows: https://git-scm.com/download/win
- Quraşdırmadan sonra terminali yenidən açın

## GitHub-a Push Etmək

Terminaldə aşağıdakı əmrləri ardıcıl olaraq icra edin:

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

## Əgər Remote Artıq Mövcuddursa

Əgər remote artıq əlavə edilibsə, aşağıdakı əmrləri istifadə edin:

```bash
git remote set-url origin https://github.com/vddvdvdv/Ecolist-diary.git
git push -u origin main
```

## Sonrakı Dəyişikliklər

Layihədə dəyişiklik etdikdən sonra:

```bash
git add .
git commit -m "Dəyişikliklərin təsviri"
git push
```

## Qeyd

- İlk push zamanı GitHub username və password soruşula bilər
- Personal Access Token istifadə etmək tövsiyə olunur
- GitHub Settings > Developer settings > Personal access tokens-dan token yarada bilərsiniz

