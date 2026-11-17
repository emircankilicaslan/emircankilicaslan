<div align="center">

# Emircan Kılıçaslan

**Full-Stack Yazılım Geliştirici** · Ankara, Türkiye

Kamu ve özel sektör için güvenilir, test edilmiş, izlenebilir kurumsal web uygulamaları geliştiriyorum.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-emircan--kilicaslan-0077B5?style=flat&logo=linkedin)](https://linkedin.com/in/emircan-kilicaslan)
<!-- E-POSTA: aşağıdaki satırı kendi adresinle aç -->
<!-- [![E-posta](https://img.shields.io/badge/E--posta-ad%40ornek.com-D14836?style=flat&logo=gmail&logoColor=white)](mailto:ad@ornek.com) -->

</div>

---

## 🧠 Hakkımda

Bilkent Üniversitesi CTIS mezunuyum. İki staj ve üç tam zamanlı mühendislik deneyimimle web uygulamalarını arayüzden veritabanına tüm katmanlarda geliştirdim.

Şu an **Future Ventures AG**'de finans ekiplerinin günlük işlerinde kullandığı şirket içi web uygulamalarını geliştiriyorum. Odağım, **verinin doğru, tutarlı ve izlenebilir kalması**: iş kuralı hatasız çalışmalı, kim neyi ne zaman değiştirdi görülebilmeli, sistem dış kaynak kesilse de ayakta kalmalı.

> **English:** Full-stack developer (Bilkent CTIS graduate) building data-intensive internal business applications with Next.js, TypeScript, PostgreSQL, and .NET / Spring Boot. I focus on correctness, auditability, testing, and clear documentation.

### Beni ayıran şeyler

| | |
| :--- | :--- |
| 🔍 **Doğruluğa önem** | Hesaplamalar ve API rotaları için test yazarım; testlerin gerçekten hata yakaladığını koda kasıtlı hata ekleyerek (mutasyon mantığıyla) doğrularım. |
| 🧾 **İzlenebilirlik** | Denetim kaydı (audit log), rol bazlı yetki ve onay akışı, kurumsal uygulamaların vazgeçilmezi; projelerimin çoğunda var. |
| 🗄️ **Veritabanı disiplini** | Her şema değişikliği migrasyonla yapılır (EF Core, Flyway, Prisma, Laravel); elle müdahale yok. |
| 📝 **Belgelenmiş iş** | Küçük, izlenebilir commit'ler, anlaşılır PR'lar, README'de mimari kararlar. |
| 🔗 **Dış entegrasyon güvenliği** | Harici veri kullanılmadan önce doğrulanır; kaynak yanıt vermezse yedek akış devreye girer. |

---

## 💼 Deneyim

### Yazılım Geliştirici · Future Ventures AG · *Mayıs 2026 – devam*

Şirket içi finans uygulamalarında özellikleri uçtan uca (sorgu → API → React arayüzü) geliştiriyorum.

- Büyük veri kümeleri üzerinde etkileşimli grafikler, gelişmiş filtreleme, tarih aralığı analizi ve dışa aktarma
- Harici veri kaynaklarıyla entegrasyon: doğrulama, hata yönetimi ve yedek akış
- İş açısından kritik hesaplamalar ve API rotaları için Vitest testleri
- Azure DevOps üzerinde iş kalemi → pull request → gözden geçirme akışı

**Teknolojiler:** TypeScript, React, Next.js, Node.js, PostgreSQL, Prisma, Vitest, Azure DevOps

---

## ⚙️ Teknoloji Yığını

| Seviye | Teknolojiler |
| :--- | :--- |
| **Günlük kullandığım** | TypeScript, React, Next.js, Node.js, PostgreSQL, Prisma, Tailwind CSS, TanStack Query / Table, Recharts, Vitest, Git, Azure DevOps |
| **Projelerde kullandığım** | C# / ASP.NET Core (EF Core, Dapper), Java 21 / Spring Boot, Python (FastAPI), SQL Server (T-SQL), JWT, Docker, GitHub Actions, xUnit, JUnit |
| **Temel düzeyde** | Go, PHP / Laravel, SQLite, Firebase |
| **Pratikler** | REST API tasarımı, MVC, OOP, rol bazlı yetkilendirme, migrasyon, otomatik test, CI |

---

## 🧰 Kurumsal Projelerde Uyguladığım Pratikler

- ✅ **Kimlik ve yetki:** JWT, rol ve birim bazlı yetki
- ✅ **Denetim:** değişiklik geçmişi ve denetim kaydı (audit log)
- ✅ **Veri bütünlüğü:** girdi doğrulama, eş zamanlılık koruması, migrasyon
- ✅ **Raporlama:** Excel / CSV dışa aktarma
- ✅ **Kalite:** birim ve entegrasyon testleri, her push'ta GitHub Actions ile derleme + test
- ✅ **Dağıtım:** Docker ile paketleme; PostgreSQL ve SQL Server desteği
- ✅ **Dokümantasyon:** mimari kararlar ve çalıştırma adımları README'de

---

## 🚀 Öne Çıkan Projeler

### Kurumsal / kamu tarzı iş uygulamaları

| Proje | Ne çözüyor | Öne çıkanlar | Teknolojiler |
| :--- | :--- | :--- | :--- |
| [**StaffDesk**](https://github.com/emircankilicaslan/StaffDesk) | Personel izin ve zimmet yönetimi | Onay akışı, iş günü ve bakiye hesabı, birim bazlı yetki, zimmet geçmişi, denetim kaydı, Excel çıktısı | Java 21, Spring Boot, PostgreSQL, Flyway, JWT, Docker, JUnit |
| [**FacilityOps**](https://github.com/emircankilicaslan/FacilityOps) | Tesis bazlı arıza / talep takibi | SLA takibi, genel denetim kaydı, atama ve metin filtreleri, CSV / Excel çıktısı | C#, ASP.NET Core, EF Core, SQL Server, JWT, Docker, xUnit |
| [**BookTrack**](https://github.com/emircankilicaslan/BookTrack) | Kütüphane ödünç takibi | İş günü bazlı teslim tarihi, gecikme cezası, eş zamanlılık koruması, **75 otomatik test** | C#, ASP.NET Core 8, EF Core, SQL Server, JWT, Docker, xUnit |
| [**AssetPulse**](https://github.com/emircankilicaslan/AssetPulse) | Altyapı varlıkları için ölçüm toplama ve alarm | Art arda ihlal ve histerezisli kurallar, alarm yaşam döngüsü, grafikler, denetim kaydı | C#, ASP.NET Core 8 (API + MVC), Dapper, T-SQL, Chart.js, xUnit |

### Entegrasyon ve altyapı

| Proje | Ne çözüyor | Teknolojiler |
| :--- | :--- | :--- |
| [**e-belge-project**](https://github.com/emircankilicaslan/e-belge-project) | e-Fatura / e-Arşiv alış-satış fatura yönetimi (demo), UBL-TR XML çıktısı | PHP, JavaScript, PHPUnit |
| [**Go-React-SSH-Terminal**](https://github.com/emircankilicaslan/Go-React-SSH-Terminal) | Tarayıcıdan SSH terminali: şifreli parola saklama, tek kullanımlık WebSocket bileti, host key doğrulama | Go, React, WebSocket, SQLite |

### Diğer

| Proje | Ne çözüyor | Teknolojiler |
| :--- | :--- | :--- |
| [**task-manager**](https://github.com/emircankilicaslan/task-manager) | Görev yönetimi: token tabanlı kimlik doğrulama, yetkilendirme politikaları, filtreleme, sayfalama | Laravel 11, Next.js 14, PHPUnit, Vitest |
| [**brand-intelligence-agent**](https://github.com/emircankilicaslan/brand-intelligence-agent) | Marka adı ve web adresinden Marka DNA raporu üreten ajan | Python, CLIP, scikit-learn, LLM |

#### Arayüzlerden görünümler

| StaffDesk · izin bakiyesi | FacilityOps · SLA takibi | AssetPulse · varlık sağlığı paneli |
| :---: | :---: | :---: |
| <a href="https://github.com/emircankilicaslan/StaffDesk"><img src="https://raw.githubusercontent.com/emircankilicaslan/StaffDesk/main/docs/screenshots/arayuz-genel-bakis.jpg" width="300" alt="StaffDesk genel bakış"></a> | <a href="https://github.com/emircankilicaslan/FacilityOps"><img src="https://raw.githubusercontent.com/emircankilicaslan/FacilityOps/main/docs/screenshots/arayuz-liste.jpg" width="300" alt="FacilityOps arıza listesi"></a> | <a href="https://github.com/emircankilicaslan/AssetPulse"><img src="https://raw.githubusercontent.com/emircankilicaslan/AssetPulse/main/docs/screenshots/panel.jpg" width="300" alt="AssetPulse genel durum paneli"></a> |

---

## 📊 Kod İstatistikleri

<!-- DIL-ISTATISTIGI:BASLA -->
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/diller-koyu.svg">
  <img alt="Public repolarımdaki dil dağılımı" src="assets/diller-acik.svg">
</picture>
<!-- DIL-ISTATISTIGI:BITIS -->

---

## 🎓 Eğitim

**Bilkent Üniversitesi**, Bilgisayar Teknolojisi ve Bilişim Sistemleri (CTIS), mezun

## 📫 İletişim

[LinkedIn](https://linkedin.com/in/emircan-kilicaslan) üzerinden ulaşabilirsiniz.
