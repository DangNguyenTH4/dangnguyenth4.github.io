        // ===== LOADING SCREEN =====
        let loadProgress = 0;
        const loadingInterval = setInterval(() => {
            loadProgress += Math.random() * 30;
            if (loadProgress >= 100) {
                loadProgress = 100;
                clearInterval(loadingInterval);
                setTimeout(() => {
                    document.getElementById('loading-screen').classList.add('hidden');
                }, 500);
            }
            document.getElementById('loader-progress').style.width = loadProgress + '%';
        }, 200);

        // ===== CUSTOM CURSOR =====
        const cursor = document.getElementById('custom-cursor');
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Cursor hover effect
        const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });

        // ===== THREE.JS SCENE =====
        const canvas = document.getElementById('webgl-canvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        camera.position.z = 5;

        // Particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1000;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 20;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0x00d9ff,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Central Sphere with distortion
        const sphereGeometry = new THREE.IcosahedronGeometry(1, 4);
        const sphereMaterial = new THREE.MeshBasicMaterial({
            color: 0xb537f2,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        scene.add(sphere);

        // Torus
        const torusGeometry = new THREE.TorusGeometry(1.5, 0.1, 16, 100);
        const torusMaterial = new THREE.MeshBasicMaterial({
            color: 0x00d9ff,
            wireframe: true,
            transparent: true,
            opacity: 0.2
        });
        const torus = new THREE.Mesh(torusGeometry, torusMaterial);
        torus.rotation.x = Math.PI / 4;
        scene.add(torus);

        // Mouse interaction
        let mouseXNorm = 0;
        let mouseYNorm = 0;

        document.addEventListener('mousemove', (e) => {
            mouseXNorm = (e.clientX / window.innerWidth) * 2 - 1;
            mouseYNorm = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        // Scroll-based animation
        let scrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            scrollY = window.scrollY;
        });

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);

            // Rotate particles
            particlesMesh.rotation.y += 0.0005;
            particlesMesh.rotation.x += 0.0002;

            // Animate sphere
            sphere.rotation.x += 0.001;
            sphere.rotation.y += 0.002;

            // Distort sphere based on mouse
            const positions = sphere.geometry.attributes.position.array;
            const time = Date.now() * 0.001;
            for (let i = 0; i < positions.length; i += 3) {
                const x = positions[i];
                const y = positions[i + 1];
                const z = positions[i + 2];
                const distance = Math.sqrt(x * x + y * y + z * z);
                const offset = Math.sin(distance * 2 + time) * 0.05;
                positions[i] = x * (1 + offset);
                positions[i + 1] = y * (1 + offset);
                positions[i + 2] = z * (1 + offset);
            }
            sphere.geometry.attributes.position.needsUpdate = true;

            // Animate torus
            torus.rotation.z += 0.001;
            torus.rotation.y += 0.002;

            // Mouse parallax
            camera.position.x += (mouseXNorm * 0.5 - camera.position.x) * 0.05;
            camera.position.y += (mouseYNorm * 0.5 - camera.position.y) * 0.05;

            // Scroll parallax
            camera.position.y = scrollY * 0.001;

            renderer.render(scene, camera);
        }
        animate();

        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // ===== GSAP ANIMATIONS =====
        gsap.registerPlugin(ScrollTrigger);

        // Fade in sections
        gsap.utils.toArray('section').forEach(section => {
            gsap.from(section.children, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out'
            });
        });

        // Skill cards animation
        gsap.from('.skill-card', {
            scrollTrigger: {
                trigger: '.skills-grid',
                start: 'top 70%'
            },
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        });

        // Project cards animation
        gsap.from('.project-card', {
            scrollTrigger: {
                trigger: '.projects-container',
                start: 'top 70%'
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.7)'
        });

        // Timeline animation
        gsap.from('.timeline-item', {
            scrollTrigger: {
                trigger: '.timeline',
                start: 'top 70%'
            },
            x: (index) => index % 2 === 0 ? -100 : 100,
            opacity: 0,
            duration: 1,
            stagger: 0.3,
            ease: 'power3.out'
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Nav background on scroll
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(11, 11, 15, 0.95)';
            } else {
                nav.style.background = 'linear-gradient(180deg, rgba(11, 11, 15, 0.9) 0%, transparent 100%)';
            }
        });
