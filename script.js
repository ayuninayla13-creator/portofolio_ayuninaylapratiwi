document.addEventListener("DOMContentLoaded", () => {
    /* =========================================================
       MOBILE NAVIGATION
    ========================================================= */
    const menuToggle = document.getElementById("menu-toggle");
    const navWrapper = document.getElementById("nav-links-wrapper");

    if (menuToggle && navWrapper) {
        menuToggle.addEventListener("click", () => {
            navWrapper.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });

        document.querySelectorAll(".nav-link").forEach((link) => {
            link.addEventListener("click", () => {
                navWrapper.classList.remove("active");
                menuToggle.classList.remove("active");
            });
        });
    }


    /* =========================================================
       THEME SWITCHER
    ========================================================= */
    const themeToggle = document.getElementById("theme-toggle");
    const themeMenu = document.getElementById("theme-menu");
    const paletteButtons = document.querySelectorAll(".palette-swatch");

    if (themeToggle && themeMenu) {
        themeToggle.addEventListener("click", (event) => {
            event.stopPropagation();
            themeMenu.classList.toggle("show");
        });

        document.addEventListener("click", (event) => {
            if (!themeMenu.contains(event.target) &&
                !themeToggle.contains(event.target)) {
                themeMenu.classList.remove("show");
            }
        });
    }

    paletteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const theme = button.dataset.theme;

            document.body.removeAttribute("data-theme");

            if (theme && theme !== "blue") {
                document.body.setAttribute("data-theme", theme);
            }

            paletteButtons.forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            localStorage.setItem("portfolio-theme", theme || "blue");

            if (themeMenu) {
                themeMenu.classList.remove("show");
            }
        });
    });

    // Restore selected theme
    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme) {
        document.body.removeAttribute("data-theme");

        if (savedTheme !== "blue") {
            document.body.setAttribute("data-theme", savedTheme);
        }

        paletteButtons.forEach((button) => {
            button.classList.toggle(
                "active",
                button.dataset.theme === savedTheme
            );
        });
    }


    /* =========================================================
       BACK TO TOP
    ========================================================= */
    const backToTop = document.getElementById("back-to-top");

    if (backToTop) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 500) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
        });
    }


    /* =========================================================
       ACTIVE NAVIGATION ON SCROLL
    ========================================================= */
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    const updateActiveNavigation = () => {
        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.id;
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", updateActiveNavigation);
    updateActiveNavigation();



    /* =========================================================
       TOAST NOTIFICATION
    ========================================================= */
    function showToast(message) {
        let toast = document.getElementById("portfolio-toast");

        if (!toast) {
            toast = document.createElement("div");
            toast.id = "portfolio-toast";
            toast.className = "portfolio-toast";

            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.classList.add("show");

        clearTimeout(toast.hideTimer);

        toast.hideTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 2500);
    }



    /* =========================================================
       PROJECT SEARCH & FILTER
    ========================================================= */
    const projectSearch = document.getElementById("project-search");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    let activeCategory = "all";

    function filterProjects() {
        const searchTerm = projectSearch
            ? projectSearch.value.toLowerCase().trim()
            : "";

        let visibleCount = 0;

        projectCards.forEach((card) => {
            const category = card.dataset.category || "";
            const content = card.textContent.toLowerCase();

            const categoryMatch =
                activeCategory === "all" ||
                category.includes(activeCategory);

            const searchMatch =
                !searchTerm ||
                content.includes(searchTerm);

            if (categoryMatch && searchMatch) {
                card.style.display = "";
                visibleCount++;
                requestAnimationFrame(() => {
                    card.classList.add("visible");
                });
            } else {
                card.style.display = "none";
                card.classList.remove("visible");
            }
        });
    }

    const clearSearchButton = document.getElementById("clear-search-btn");
    const noProjectsFound = document.getElementById("no-projects-found");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            filterButtons.forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            activeCategory = button.dataset.filter || "all";

            filterProjects();
        });
    });

    if (projectSearch) {
        projectSearch.addEventListener("input", filterProjects);
    }

    if (clearSearchButton && projectSearch) {
        clearSearchButton.addEventListener("click", () => {
            projectSearch.value = "";
            activeCategory = "all";
            filterButtons.forEach((button) => {
                button.classList.toggle("active", button.dataset.filter === "all");
            });
            filterProjects();
            projectSearch.focus();
        });
    }

    filterProjects();


    /* =========================================================
       PROJECT MODAL
    ========================================================= */
    const projectModal = document.getElementById("project-modal");
    const modalBackdrop = document.getElementById("modal-backdrop");
    const modalClose = document.getElementById("modal-close-btn");
    const modalContent = document.getElementById("modal-content-inner");

    const projectData = {
        1: {
            title: "Prediksi Perubahan Lahan Sawah",
            category: "Data & Machine Learning • GIS",
            description:
                "Aplikasi untuk memprediksi perubahan lahan sawah menggunakan algoritma MultiLayer Perceptron (MLP). Proyek mengolah data citra Sentinel-2, beberapa indeks spektral, dan GeoTIFF, kemudian menyajikan proses upload, pengolahan data, perhitungan luas, serta hasil prediksi melalui aplikasi Flask dan React.",
            technologies: ["Python", "Machine Learning", "MLP", "Flask", "React", "QGIS", "GeoTIFF", "MySQL"],
            highlights: [
                "Pengolahan data citra dan indeks spektral",
                "Prediksi kelas tutupan/perubahan lahan menggunakan MLP",
                "Upload dan pemrosesan data GeoTIFF",
                "Visualisasi hasil pada aplikasi web"
            ],
            status: "Repository GitHub",
            demoUrl: "",
            githubUrl: "https://github.com/ayuninayla13-creator/prediction"
        },
        2: {
            title: "Shop Ayy",
            category: "Web Development • Laravel",
            description:
                "Aplikasi marketplace berbasis Laravel untuk sisi buyer dengan fitur autentikasi, produk, kategori, keranjang, pesanan, riwayat transaksi, penyimpanan proyek, serta konsep komunikasi antara pembeli dan pemilik proyek.",
            technologies: ["Laravel", "PHP", "MySQL", "JavaScript", "HTML", "CSS"],
            highlights: [
                "Autentikasi dan profil pengguna",
                "Produk, kategori, keranjang, dan pesanan",
                "Riwayat status pesanan",
                "Konsep chat buyer dengan pemilik proyek"
            ],
            status: "Repository GitHub",
            demoUrl: "",
            githubUrl: "https://github.com/ayuninayla13-creator/shopayy"
        },
        3: {
            title: "GymPulse",
            category: "System Development • RFID",
            description:
                "Sistem manajemen membership gym berbasis Laravel dengan data member, paket membership, kartu RFID, check-in/check-out, absensi, dashboard, chart, serta log aktivitas.",
            technologies: ["Laravel", "PHP", "MySQL", "RFID", "JavaScript", "Chart.js"],
            highlights: [
                "Manajemen member dan paket membership",
                "Registrasi serta pengelolaan kartu RFID",
                "Check-in/check-out dan riwayat absensi",
                "Dashboard dan visualisasi data"
            ],
            status: "Live Demo",
            demoUrl: "https://gym-membership-app-opal.vercel.app/",
            githubUrl: ""
        },
    };

    function openProjectModal(projectId) {
        if (!projectModal || !modalContent) {
            return;
        }

        const project = projectData[projectId];

        if (!project) {
            return;
        }

        const demoButton = project.demoUrl
            ? `<a class="modal-project-action primary" href="${project.demoUrl}" target="_blank" rel="noopener">
                    <i class="fa-solid fa-play"></i> Live Demo
               </a>`
            : `<span class="modal-project-action disabled" title="Proyek belum di-hosting">
                    <i class="fa-solid fa-play"></i> Live Demo belum tersedia
               </span>`;

        const githubButton = project.githubUrl
            ? `<a class="modal-project-action secondary" href="${project.githubUrl}" target="_blank" rel="noopener">
                    <i class="fa-brands fa-github"></i> GitHub Repository
               </a>`
            : `<span class="modal-project-action disabled" title="Repository belum ditautkan">
                    <i class="fa-brands fa-github"></i> GitHub belum tersedia
               </span>`;

        modalContent.innerHTML = `
            <div class="modal-project-detail">
                <span class="project-tag">${project.category}</span>

                <div class="modal-project-heading">
                    <div>
                        <h2>${project.title}</h2>
                        <span class="project-status"><i class="fa-solid fa-circle"></i> ${project.status}</span>
                    </div>
                </div>

                <div class="project-view-note">
                    <i class="fa-solid fa-eye"></i>
                    <div>
                        <strong>Proyek dapat dilihat tanpa Live Demo</strong>
                        <span>Gunakan detail proyek, teknologi, dan dokumentasi di bawah untuk melihat gambaran pekerjaan.</span>
                    </div>
                </div>

                <p class="modal-description">${project.description}</p>

                <div class="modal-project-section">
                    <h4>Yang dikerjakan</h4>
                    <ul class="project-highlight-list">
                        ${project.highlights.map((item) => `<li><i class="fa-solid fa-check"></i><span>${item}</span></li>`).join("")}
                    </ul>
                </div>

                <div class="modal-tech-stack modal-project-section">
                    <h4>Teknologi yang digunakan</h4>
                    <div class="tech-list">
                        ${project.technologies.map((tech) => `<span class="tech-tag-pill">${tech}</span>`).join("")}
                    </div>
                </div>

                <div class="modal-project-actions">
                    ${demoButton}
                    ${githubButton}
                </div>

                <p class="modal-project-note">
                    <i class="fa-solid fa-circle-info"></i>
                    ${project.demoUrl ? "Demo dapat dicoba langsung melalui tombol Live Demo." : "Live Demo belum tersedia karena proyek belum di-deploy. Recruiter tetap dapat melihat ringkasan, fitur, teknologi, dan dokumentasi proyek dari portfolio ini."}
                </p>
            </div>
        `;

        projectModal.classList.add("show");
        projectModal.setAttribute("aria-hidden", "false");

        document.body.classList.add("modal-open");
    }

    function closeProjectModal() {
        if (!projectModal) {
            return;
        }

        projectModal.classList.remove("show");
        projectModal.setAttribute("aria-hidden", "true");

        document.body.classList.remove("modal-open");
    }

    document.querySelectorAll(".open-modal-btn").forEach((button) => {
        button.addEventListener("click", () => {
            const card = button.closest(".project-card");

            if (!card) {
                return;
            }

            const projectId = card.dataset.id;

            openProjectModal(projectId);
        });
    });

    if (modalClose) {
        modalClose.addEventListener("click", closeProjectModal);
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener("click", closeProjectModal);
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeProjectModal();
            closeCertificateModal();
        }
    });




    /* =========================================================
       CERTIFICATE DETAIL MODAL
    ========================================================= */
    const certificateModal = document.getElementById("certificate-modal");
    const certificateBackdrop = document.getElementById("certificate-backdrop");
    const certificateClose = document.getElementById("certificate-close-btn");
    const certificateContent = document.getElementById("certificate-modal-content");

    const certificateData = {
        "junior-web-programmer": {
            title: "Junior Web Programmer",
            issuer: "Pelatihan / Siap Kerja",
            image: "assets/certificates/SertifikatMediatama.jpeg",
            description: "Pelatihan yang membahas dasar pengembangan website, UI/UX, PHP, Laravel, dan penerapan framework untuk membangun aplikasi web.",
            skills: ["UI/UX", "PHP", "Laravel", "Web Development"]
        },
        "revou-intro-data-analytics": {
            title: "RevoU Mini Course — Intro to Data Analytics",
            issuer: "RevoU",
            image: "assets/certificates/SertifikatRevoU.jpg",
            description: "Mini course pengantar analisis data yang membahas proses memahami, mengolah, dan menggunakan data untuk menghasilkan insight.",
            skills: ["Data Analytics", "Data Processing", "Data Insight"]
        },
        "cisco-introduction-to-data-science": {
            title: "Introduction to Data Science",
            issuer: "Cisco Networking Academy",
            image: "assets/certificates/SertifikatCisco.jpg",
            description: "Pembelajaran pengantar data science melalui Cisco Networking Academy, termasuk konsep dasar data science dan teknologi terkait.",
            skills: ["Data Science", "Data Concepts", "Technology"]
        }
    };

    function openCertificateModal(certificateId) {
        if (!certificateModal || !certificateContent) return;
        const certificate = certificateData[certificateId];
        if (!certificate) return;

        certificateContent.innerHTML = `
            <div class="certificate-detail">
                <div class="certificate-detail-header">
                    <div>
                        <span class="badge-pill"><i class="fa-solid fa-certificate"></i> Sertifikat</span>
                        <h2 id="certificate-modal-title">${certificate.title}</h2>
                        <p>${certificate.issuer}</p>
                    </div>
                </div>

                <div class="certificate-image-wrap">
                    <img src="${certificate.image}" alt="Sertifikat ${certificate.title}" class="certificate-full-image"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="certificate-image-fallback" style="display:none;">
                        <i class="fa-regular fa-image"></i>
                        <strong>Gambar sertifikat belum ditambahkan</strong>
                        <span>Simpan gambar pada folder <code>assets/certificates/</code> sesuai nama file yang digunakan.</span>
                    </div>
                </div>

                <div class="certificate-detail-info">
                    <div>
                        <h4>Tentang Pelatihan</h4>
                        <p>${certificate.description}</p>
                    </div>
                    <div>
                        <h4>Materi / Kompetensi</h4>
                        <div class="tech-list">
                            ${certificate.skills.map(skill => `<span class="tech-tag-pill">${skill}</span>`).join("")}
                        </div>
                    </div>
                </div>
            </div>
        `;

        certificateModal.classList.add("show");
        certificateModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
    }

    function closeCertificateModal() {
        if (!certificateModal) return;
        certificateModal.classList.remove("show");
        certificateModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
    }

    document.querySelectorAll(".certificate-card").forEach((card) => {
        card.addEventListener("click", () => openCertificateModal(card.dataset.certificate));
        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openCertificateModal(card.dataset.certificate);
            }
        });
    });

    if (certificateClose) certificateClose.addEventListener("click", closeCertificateModal);
    if (certificateBackdrop) certificateBackdrop.addEventListener("click", closeCertificateModal);


    /* =========================================================
       CV MODAL
    ========================================================= */
    const cvModal = document.getElementById("cv-modal");
    const cvButton = document.getElementById("cv-modal-btn");
    const cvClose = document.getElementById("cv-close-btn");
    const cvBackdrop = document.getElementById("cv-backdrop");

    function openCvModal() {
        if (!cvModal) {
            return;
        }

        cvModal.classList.add("show");
        cvModal.setAttribute("aria-hidden", "false");

        document.body.classList.add("modal-open");
    }

    function closeCvModal() {
        if (!cvModal) {
            return;
        }

        cvModal.classList.remove("show");
        cvModal.setAttribute("aria-hidden", "true");

        document.body.classList.remove("modal-open");
    }

    if (cvButton) {
        cvButton.addEventListener("click", openCvModal);
    }

    if (cvClose) {
        cvClose.addEventListener("click", closeCvModal);
    }

    if (cvBackdrop) {
        cvBackdrop.addEventListener("click", closeCvModal);
    }


    /* =========================================================
       ESCAPE KEY FOR MODALS
    ========================================================= */
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeProjectModal();
            closeCvModal();
        }
    });


    /* =========================================================
       SMOOTH SCROLL
    ========================================================= */
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const header = document.querySelector(".header");
            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                20;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        });
    });



    /* =========================================================
       CURRENT YEAR
    ========================================================= */
    const currentYear =
        document.getElementById("current-year");

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }


    /* =========================================================
       SCROLL REVEAL
    ========================================================= */
    const revealElements = document.querySelectorAll(
        ".section, .project-card, .service-card, .timeline-item"
    );

    if ("IntersectionObserver" in window) {
        const observer =
            new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add(
                                "revealed"
                            );

                            observer.unobserve(
                                entry.target
                            );
                        }
                    });
                },
                {
                    threshold: 0.08
                }
            );

        revealElements.forEach((element) => {
            observer.observe(element);
        });
    }


    /* =========================================================
       BUTTON RIPPLE EFFECT
    ========================================================= */
    document
        .querySelectorAll(".btn, .control-btn")
        .forEach((button) => {
            button.addEventListener("click", function (event) {
                const ripple =
                    document.createElement("span");

                ripple.className = "button-ripple";

                const rect =
                    this.getBoundingClientRect();

                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );

                ripple.style.width = `${size}px`;
                ripple.style.height = `${size}px`;

                ripple.style.left =
                    `${event.clientX - rect.left - size / 2}px`;

                ripple.style.top =
                    `${event.clientY - rect.top - size / 2}px`;

                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
});