const track = document.querySelector("[data-carousel-track]");
const statusText = document.querySelector("[data-carousel-status]");
const uploadInput = document.querySelector("#certificate-upload");
const prevButton = document.querySelector("[data-carousel-prev]");
const nextButton = document.querySelector("[data-carousel-next]");

let activeSlide = 0;

function initWebGLBackground() {
    const canvas = document.querySelector("#webgl-canvas");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canvas || !window.THREE || prefersReducedMotion) {
        return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: "low-power"
    });

    const isMobile = window.matchMedia("(max-width: 680px)").matches;
    const particleCount = isMobile ? 160 : 360;
    const positions = new Float32Array(particleCount * 3);

    for (let index = 0; index < positions.length; index += 3) {
        positions[index] = (Math.random() - 0.5) * 16;
        positions[index + 1] = (Math.random() - 0.5) * 10;
        positions[index + 2] = (Math.random() - 0.5) * 10;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particles = new THREE.Points(
        particlesGeometry,
        new THREE.PointsMaterial({
            size: isMobile ? 0.028 : 0.022,
            color: 0x22d3ee,
            transparent: true,
            opacity: 0.48
        })
    );

    const sphere = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.15, 2),
        new THREE.MeshBasicMaterial({
            color: 0xf472b6,
            wireframe: true,
            transparent: true,
            opacity: 0.22
        })
    );

    const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.9, 0.025, 8, 96),
        new THREE.MeshBasicMaterial({
            color: 0x60a5fa,
            wireframe: true,
            transparent: true,
            opacity: 0.2
        })
    );

    sphere.position.set(2.7, 0.7, -1);
    ring.position.copy(sphere.position);
    ring.rotation.x = Math.PI / 3;
    scene.add(particles, sphere, ring);
    camera.position.z = 6;

    function resizeRenderer() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }

    let frameId = 0;
    let isVisible = true;

    function render() {
        if (!isVisible) {
            return;
        }

        particles.rotation.y += 0.0008;
        particles.rotation.x += 0.00025;
        sphere.rotation.x += 0.002;
        sphere.rotation.y += 0.0024;
        ring.rotation.z += 0.0018;
        ring.rotation.y += 0.001;
        renderer.render(scene, camera);
        frameId = requestAnimationFrame(render);
    }

    document.addEventListener("visibilitychange", () => {
        isVisible = !document.hidden;
        if (isVisible) {
            frameId = requestAnimationFrame(render);
        } else {
            cancelAnimationFrame(frameId);
        }
    });

    window.addEventListener("resize", resizeRenderer, { passive: true });
    resizeRenderer();
    render();
}

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

initWebGLBackground();
updateCarousel();
