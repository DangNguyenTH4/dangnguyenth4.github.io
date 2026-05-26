const track = document.querySelector("[data-carousel-track]");
const statusText = document.querySelector("[data-carousel-status]");
const uploadInput = document.querySelector("#certificate-upload");
const prevButton = document.querySelector("[data-carousel-prev]");
const nextButton = document.querySelector("[data-carousel-next]");

let activeSlide = 0;

function getSlides() {
    return Array.from(track.querySelectorAll(".certificate-slide"));
}

function updateCarousel() {
    const slides = getSlides();
    activeSlide = Math.max(0, Math.min(activeSlide, slides.length - 1));
    track.style.transform = `translateX(-${activeSlide * 100}%)`;
    slides.forEach((slide, index) => {
        slide.classList.toggle("is-active", index === activeSlide);
        slide.setAttribute("aria-hidden", index === activeSlide ? "false" : "true");
    });
    statusText.textContent = `${activeSlide + 1} / ${slides.length}`;
}

function createCertificateSlide(file) {
    const slide = document.createElement("article");
    slide.className = "certificate-slide";

    const preview = document.createElement("div");
    preview.className = "certificate-preview";

    if (file.type.startsWith("image/")) {
        const image = document.createElement("img");
        image.src = URL.createObjectURL(file);
        image.alt = file.name;
        preview.appendChild(image);
    } else {
        preview.classList.add("certificate-document");
        preview.textContent = file.name;
    }

    const copy = document.createElement("div");
    copy.className = "certificate-copy";

    const label = document.createElement("p");
    label.className = "eyebrow";
    label.textContent = "Certificate";

    const title = document.createElement("h3");
    title.textContent = file.name.replace(/\.[^/.]+$/, "");

    const time = document.createElement("time");
    time.textContent = "Đã upload";

    const description = document.createElement("p");
    description.textContent = "Ảnh chứng chỉ cá nhân.";

    copy.append(label, title, time, description);

    slide.append(preview, copy);
    return slide;
}

prevButton.addEventListener("click", () => {
    const slides = getSlides();
    activeSlide = (activeSlide - 1 + slides.length) % slides.length;
    updateCarousel();
});

nextButton.addEventListener("click", () => {
    const slides = getSlides();
    activeSlide = (activeSlide + 1) % slides.length;
    updateCarousel();
});

uploadInput.addEventListener("change", (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) {
        return;
    }

    files.forEach((file) => {
        track.appendChild(createCertificateSlide(file));
    });

    activeSlide = getSlides().length - files.length;
    updateCarousel();
    uploadInput.value = "";
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
        const target = document.querySelector(anchor.getAttribute("href"));
        if (!target) {
            return;
        }

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

updateCarousel();
