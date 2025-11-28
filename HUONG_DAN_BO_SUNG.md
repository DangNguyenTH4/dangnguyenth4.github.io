# 📝 HƯỚNG DẪN BỔ SUNG NỘI DUNG CHO PORTFOLIO

## 🎯 TÓM TẮT CÁC THIẾU SÓT CẦN SỬA

### 1. **PHẦN ABOUT (Dòng ~390-440 trong index-new.html)**

#### ❌ Nội dung hiện tại (SAI):
```html
<p>
    My journey started at <span class="about-highlight">Thủy Lợi University</span> where I studied Computer Science...
</p>
```

#### ✅ Cần sửa thành:
- Bổ sung đầy đủ quá trình học tập:
  - 2000-2005: Tiểu học dân lập Nguyễn Trãi - Lạng Sơn
  - 2005-2009: THCS Hương Lâm
  - 2010-2013: THPT Hiệp Hòa 2
  - 2013-2015: Đại học Bách Khoa - Công nghệ ô tô
  - 04/2019: FPT Software Academy
  - 2015-2020: Đại học Thủy Lợi - CNTT

#### 📍 VỊ TRÍ CHÍNH XÁC:
Tìm dòng có text: `<div class="about-text">` (khoảng dòng 395-420)

#### 🔧 CODE MẪU ĐỂ THAY THẾ:
```html
<div class="about-text">
    <p>
        Tôi là <span class="about-highlight">Nguyễn Thế Đăng</span>, một Java developer với niềm đam mê xây dựng các ứng dụng có khả năng mở rộng và hiệu suất cao.
    </p>
    <p>
        Hành trình của tôi bắt đầu từ <span class="about-highlight">Tiểu học Nguyễn Trãi - Lạng Sơn</span> (2000-2005), 
        sau đó học THCS Hương Lâm và THPT Hiệp Hòa 2. Tôi từng học tại <span class="about-highlight">Đại học Bách Khoa</span> 
        chuyên ngành Công nghệ ô tô (2013-2015), sau đó chuyển sang <span class="about-highlight">Đại học Thủy Lợi</span> 
        ngành Công nghệ thông tin (2015-2020). Năm 2019, tôi tốt nghiệp <span class="about-highlight">FPT Software Academy</span>.
    </p>
    <p>
        Hiện tại tôi đang làm việc tại <span class="about-highlight">FPT Software</span>, tham gia phát triển các dự án 
        từ hệ thống hàng không đến nền tảng y tế.
    </p>
    <p>
        Phương châm sống của tôi: <span class="about-highlight">"Dũng cảm - Trắc ẩn - Xả Thân - Trung thành - Lạc quan"</span>. 
        Ngoài lập trình, tôi thích đọc tiểu thuyết, chơi bóng đá và khám phá công nghệ mới.
    </p>
</div>
```

---

### 2. **PHẦN EXPERIENCE TIMELINE (Dòng ~550-650)**

#### ❌ Thiếu sót:
- Chỉ có 3 mục kinh nghiệm
- Thiếu chi tiết về FPT Software Academy

#### ✅ Cần bổ sung:
Thêm mục FPT Software Academy vào timeline

#### 📍 VỊ TRÍ CHÍNH XÁC:
Tìm `<div class="timeline">` (khoảng dòng 550)

#### 🔧 CODE MẪU ĐỂ THÊM VÀO (sau mục "Apr 2019 - Present"):
```html
<div class="timeline-item">
    <div class="timeline-dot"></div>
    <div class="timeline-content">
        <div class="timeline-year">April 2019</div>
        <h3 class="timeline-title">FPT Software Academy</h3>
        <div class="timeline-company">FPT Software</div>
        <p class="timeline-description">
            Hoàn thành khóa đào tạo chuyên sâu về Java và Spring Framework tại FPT Software Academy, 
            chuẩn bị cho sự nghiệp phát triển phần mềm chuyên nghiệp.
        </p>
    </div>
</div>
```

---

### 3. **PHẦN PROJECTS (Dòng ~660-850)**

#### ❌ Thiếu sót:
- Thiếu các Pet Projects với C#:
  - Phần mềm học phát âm và ghi nhớ từ vựng tiếng anh
  - Phần mềm quản lý order đồ ăn (quán coffee/nhà hàng)
  - Quản lý theo dõi đăng nhập (Keylogger)
  - MockProject: Quản lí giảng viên, mentor, học viên, lớp học

#### ✅ Cần bổ sung:
Thêm 4 project cards nữa

#### 📍 VỊ TRÍ CHÍNH XÁC:
Tìm `<div class="projects-container">` (khoảng dòng 660)
Thêm VÀO CUỐI, trước thẻ đóng `</div>` của projects-container

#### 🔧 CODE MẪU ĐỂ THÊM VÀO:
```html
<!-- Thêm 4 project cards này vào cuối projects-container -->

<div class="project-card">
    <div class="project-header">
        <span class="project-type">Pet Project - C#</span>
        <span class="project-date">Personal</span>
    </div>
    <h3 class="project-title">English Learning with Pronunciation</h3>
    <div class="project-role">Role: Developer</div>
    <p class="project-description">
        Phần mềm học phát âm và ghi nhớ từ vựng tiếng Anh qua hình ảnh. 
        Ứng dụng giúp người học cải thiện phát âm và mở rộng vốn từ vựng thông qua phương pháp học trực quan.
    </p>
    <div class="project-tech">
        <span class="tech-tag">C#</span>
        <span class="tech-tag">.NET</span>
        <span class="tech-tag">WinForms</span>
    </div>
</div>

<div class="project-card">
    <div class="project-header">
        <span class="project-type">Pet Project - C#</span>
        <span class="project-date">Personal</span>
    </div>
    <h3 class="project-title">Restaurant Order Management</h3>
    <div class="project-role">Role: Developer</div>
    <p class="project-description">
        Phần mềm quản lý order đồ ăn trong quán coffee/nhà hàng. 
        Hệ thống giúp quản lý đơn hàng, menu, thanh toán và theo dõi doanh thu.
    </p>
    <div class="project-tech">
        <span class="tech-tag">C#</span>
        <span class="tech-tag">.NET</span>
        <span class="tech-tag">SQL Server</span>
    </div>
</div>

<div class="project-card">
    <div class="project-header">
        <span class="project-type">Pet Project - C#</span>
        <span class="project-date">Personal</span>
    </div>
    <h3 class="project-title">Computer Usage Tracker</h3>
    <div class="project-role">Role: Developer</div>
    <p class="project-description">
        Quản lý theo dõi đăng nhập và sử dụng máy tính (Keylogger). 
        Ứng dụng giám sát hoạt động máy tính, theo dõi thời gian sử dụng và các ứng dụng được mở.
    </p>
    <div class="project-tech">
        <span class="tech-tag">C#</span>
        <span class="tech-tag">.NET</span>
        <span class="tech-tag">Windows API</span>
    </div>
</div>

<div class="project-card">
    <div class="project-header">
        <span class="project-type">Pet Project - Java</span>
        <span class="project-date">Personal</span>
    </div>
    <h3 class="project-title">Education Management System</h3>
    <div class="project-role">Role: Full-Stack Developer</div>
    <p class="project-description">
        MockProject: Quản lí giảng viên, mentor, học viên, lớp học. 
        Hệ thống quản lý toàn diện cho các trung tâm đào tạo với đầy đủ tính năng quản lý lớp học và học viên.
    </p>
    <div class="project-tech">
        <span class="tech-tag">Java</span>
        <span class="tech-tag">Spring Boot</span>
        <span class="tech-tag">MySQL</span>
    </div>
</div>
```

---

### 4. **PHẦN STATS (Dòng ~430-460)**

#### ❌ Nội dung hiện tại:
```html
<div class="stat-number">10+</div>
<div class="stat-label">Projects</div>
```

#### ✅ Cần sửa thành:
```html
<div class="stat-number">15+</div>
<div class="stat-label">Projects</div>
```
(Vì bạn có thêm nhiều pet projects)

---

### 5. **PHẦN HERO DESCRIPTION (Dòng ~270-280)**

#### ❌ Nội dung hiện tại (tiếng Anh):
```html
<p class="hero-description">
    Crafting innovative solutions with Java, Spring Framework, and modern web technologies.
    Specializing in microservices architecture and scalable systems.
</p>
```

#### ✅ Có thể sửa thành (tiếng Việt hoặc song ngữ):
```html
<p class="hero-description">
    Xây dựng các giải pháp sáng tạo với Java, Spring Framework và công nghệ web hiện đại.
    Chuyên về kiến trúc microservices và hệ thống có khả năng mở rộng.
</p>
```

---

## 📋 CHECKLIST BỔ SUNG

### Bắt buộc phải sửa:
- [ ] **1. Sửa phần About** - Bổ sung đầy đủ quá trình học tập
- [ ] **2. Thêm FPT Academy vào Timeline**
- [ ] **3. Thêm 4 Pet Projects** (3 C# + 1 Java MockProject)
- [ ] **4. Sửa số lượng Projects** từ 10+ thành 15+

### Tùy chọn (nên làm):
- [ ] **5. Dịch Hero description** sang tiếng Việt
- [ ] **6. Thêm link CV TopCV** vào Contact section
- [ ] **7. Kiểm tra lại tất cả thông tin cá nhân**

---

## 🎨 HƯỚNG DẪN BỔ SUNG THÊM NỘI DUNG MỚI

### Nếu bạn muốn thêm Projects mới:

**Vị trí:** Trong `<div class="projects-container">` (dòng ~660)

**Template:**
```html
<div class="project-card">
    <div class="project-header">
        <span class="project-type">LOẠI DỰ ÁN</span>
        <span class="project-date">THỜI GIAN</span>
    </div>
    <h3 class="project-title">TÊN DỰ ÁN</h3>
    <div class="project-role">Role: VAI TRÒ CỦA BẠN</div>
    <p class="project-description">
        MÔ TÃ CHI TIẾT DỰ ÁN
    </p>
    <div class="project-tech">
        <span class="tech-tag">CÔNG NGHỆ 1</span>
        <span class="tech-tag">CÔNG NGHỆ 2</span>
        <span class="tech-tag">CÔNG NGHỆ 3</span>
    </div>
</div>
```

### Nếu bạn muốn thêm Kinh nghiệm làm việc mới:

**Vị trí:** Trong `<div class="timeline">` (dòng ~550)

**Template:**
```html
<div class="timeline-item">
    <div class="timeline-dot"></div>
    <div class="timeline-content">
        <div class="timeline-year">THỜI GIAN</div>
        <h3 class="timeline-title">CHỨC DANH</h3>
        <div class="timeline-company">TÊN CÔNG TY</div>
        <p class="timeline-description">
            MÔ TẢ CÔNG VIỆC VÀ THÀNH TỰU
        </p>
    </div>
</div>
```

### Nếu bạn muốn thêm Skills mới:

**Vị trí:** Trong `<div class="skills-grid">` (dòng ~490)

**Template:**
```html
<div class="skill-card">
    <div class="skill-category">DANH MỤC</div>
    <h3 class="skill-name">TÊN KỸ NĂNG</h3>
    <ul class="skill-list">
        <li>Kỹ năng 1</li>
        <li>Kỹ năng 2</li>
        <li>Kỹ năng 3</li>
        <li>Kỹ năng 4</li>
    </ul>
</div>
```

---

## 🔍 CÁCH TÌM VỊ TRÍ CHÍNH XÁC

1. Mở file `index-new.html`
2. Dùng Ctrl+F (hoặc Cmd+F trên Mac)
3. Tìm các từ khóa sau:

| Phần cần sửa | Từ khóa tìm kiếm |
|--------------|------------------|
| About | `<div class="about-text">` |
| Timeline | `<div class="timeline">` |
| Projects | `<div class="projects-container">` |
| Skills | `<div class="skills-grid">` |
| Stats | `<div class="about-stats">` |
| Hero | `<p class="hero-description">` |

---

## ⚠️ LƯU Ý QUAN TRỌNG

1. **Backup file trước khi sửa**: Copy `index-new.html` thành `index-new-backup.html`
2. **Kiểm tra cú pháp HTML**: Đảm bảo đóng mở thẻ đúng
3. **Test trên trình duyệt**: Sau khi sửa, mở file và kiểm tra
4. **Responsive**: Kiểm tra trên mobile (F12 > Toggle device toolbar)

---

## 📞 CẦN TRỢ GIÚP?

Nếu bạn muốn tôi tự động sửa các phần này, hãy cho tôi biết:
- ✅ "Hãy sửa tất cả các phần trên cho tôi"
- ✅ "Chỉ sửa phần About và Projects"
- ✅ "Tôi muốn tự sửa, chỉ cần hướng dẫn thêm về..."
