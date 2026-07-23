export const projectsData = [
  {
    slug: "neuro-inspired-optimization-medical-segmentation",
    title: "Neuro-Inspired Optimization for Medical Image Segmentation",
    category: "Medical AI / Deep Learning",
    domain: "Deep Learning & Brain MRI",
    tagline: "Enhancing U-Net segmentation fidelity using reward-driven neural plasticity optimization principles.",
    featured: true,
    status: "Manuscript in preparation for submission to Scientific Reports",
    github: "https://github.com/kibretmulugeta",
    demo: null,
    metrics: [
      { label: "Architecture", value: "Custom U-Net + Plasticity Layer" },
      { label: "Evaluation Metrics", value: "Dice Similarity Coefficient, IoU" },
      { label: "Target Domain", value: "Brain MRI Micro-Structure Segmentation" }
    ],
    problem: "Standard backpropagation in U-Net architectures often struggles with fine spatial details and high-contrast boundaries in complex brain MRI scans due to uniform weight adjustment updates.",
    approach: "Introduced biological neural plasticity mechanisms into the neural weight updating process, using local reward signals to selectively reinforce features corresponding to subtle anatomical structures.",
    techStack: ["Python", "PyTorch", "U-Net", "Medical Image Processing", "SimpleITK", "NumPy", "Matplotlib"],
    caseStudy: {
      executiveSummary: "This research project presents a neuro-inspired optimization paradigm designed to improve standard U-Net architectures for medical image segmentation. By drawing inspiration from reward-driven biological neural plasticity, the model dynamically adapts gradient weights at feature boundary interfaces in brain MRI scans.",
      context: "Medical image segmentation demands extremely high spatial precision. Standard cross-entropy or Dice loss functions treat all pixels equally during gradient updates, leading to fuzzy contour boundaries around micro-lesions or tissue transitions.",
      objectives: [
        "Design a neuro-inspired weight modulation scheme operating on spatial boundary maps.",
        "Integrate plasticity mechanisms within the U-Net skip-connection bottleneck.",
        "Rigorously evaluate spatial overlap fidelity using Dice Similarity Coefficient (DSC) and Intersection over Union (IoU)."
      ],
      architecture: [
        "Input Tier: Multi-channel Brain MRI Slice (T1, T2, FLAIR).",
        "Preprocessing Tier: Skull stripping, intensity normalization (z-score), spatial resampling.",
        "Encoding Path: 4-stage convolutional downsampling block with max-pooling.",
        "Bottleneck Tier: Reward-driven neural plasticity layer modulating weight updates based on spatial gradient density.",
        "Decoding Path: Transposed convolution upsampling with modified skip-connections.",
        "Output Tier: High-resolution binary or multi-class tissue mask."
      ],
      preprocessing: [
        "Skull stripping to remove non-brain tissue pixels.",
        "N4 bias field correction for magnetic field inhomogeneity removal.",
        "Z-score intensity normalization across individual patient volumes.",
        "2.5D spatial slicing with sliding window data augmentation."
      ],
      tradeoffs: "Incorporating reward-driven modulation introduces a minor computational overhead during backward propagation training passes (~12% increase per epoch), but results in significantly sharper boundary delineation during inference without adding parameter count to inference time.",
      resultsAndLimitations: "Qualitative visual inspection reveals markedly reduced false positive boundaries around complex anatomical convolutions. Quantitative analysis shows consistent improvements in boundary Dice scores. The current evaluation is restricted to 2D slice representations; 3D volumetric tensor extensions are planned for future iterations."
    }
  },
  {
    slug: "brain-mri-stroke-lesion-segmentation",
    title: "Brain MRI Stroke Lesion Segmentation System",
    category: "Computer Vision & Medical Imaging",
    domain: "Medical Computer Vision",
    tagline: "End-to-end preprocessing and deep learning pipeline for ischemic stroke lesion detection on ATLAS brain MRI datasets.",
    featured: true,
    status: "Completed Research Project",
    github: "https://github.com/kibretmulugeta",
    demo: null,
    metrics: [
      { label: "Dataset Context", value: "ATLAS Brain MRI Dataset" },
      { label: "Pipeline Stages", value: "Skull Stripping → Normalization → U-Net" },
      { label: "Noise Reduction", value: "Wavelet Denoising Filter" }
    ],
    problem: "Ischemic stroke lesions exhibit highly variable shape, size, and intensity contrast, making manual delineation time-consuming and susceptible to inter-observer variability.",
    approach: "Constructed an automated medical vision pipeline combining skull stripping, N4 bias correction, 2D wavelet denoising, and a customized 2D U-Net convolutional network optimized for heterogeneous lesion structures.",
    techStack: ["Python", "TensorFlow / Keras", "OpenCV", "PyWavelets", "NiBabel", "Scikit-Image"],
    caseStudy: {
      executiveSummary: "Developed a medical computer vision pipeline targeted at automated ischemic stroke lesion segmentation. Using the ATLAS dataset benchmark context, the pipeline applies strict anatomical preprocessing before feeding tensor volumes into a deep convolutional segmentation model.",
      context: "Accurate stroke lesion volume measurement is critical for post-stroke rehabilitation assessment. Raw MRI scans contain artifacts, intensity non-uniformity, and background noise that degrade standard deep learning performance.",
      objectives: [
        "Build a deterministic preprocessing pipeline for multi-modal brain MRI scans.",
        "Implement 2D Discrete Wavelet Transform (DWT) for edge-preserving noise reduction.",
        "Train a customized U-Net architecture with loss function tuning tailored for class imbalance (small lesion masks)."
      ],
      architecture: [
        "Stage 1: NIfTI file ingestion via NiBabel.",
        "Stage 2: Automatic skull stripping using intensity thresholding and morphological operations.",
        "Stage 3: Wavelet denoising (Symlet 4 wavelet decomposition) to eliminate high-frequency MRI noise while preserving lesion edges.",
        "Stage 4: U-Net deep segmentation model with focal Tversky loss to penalize false negatives.",
        "Stage 5: Post-processing connected component analysis."
      ],
      preprocessing: [
        "Intensity normalization rescaling voxel values into range [0, 1].",
        "Wavelet denoising thresholding.",
        "Spatial slice extraction and channel concatenation."
      ],
      tradeoffs: "Wavelet denoising increases initial data preprocessing time per scan volume by ~3.5 seconds, but improves convergence rate during model training and yields cleaner boundary segmentations.",
      resultsAndLimitations: "Successfully automated lesion region extraction with robust handling of small focal lesions. The model performance remains sensitive to severe patient movement artifacts in raw scans."
    }
  },
  {
    slug: "fullstack-task-workflow-management-platform",
    title: "Full-Stack Task & Workflow Management Platform",
    category: "Backend & Systems Engineering",
    domain: "Software Engineering & APIs",
    tagline: "High-performance Python backend API with FastAPI, JWT security, and MongoDB Atlas cloud storage.",
    featured: true,
    status: "Production-Ready Open Source",
    github: "https://github.com/kibretmulugeta",
    demo: null,
    metrics: [
      { label: "Backend Framework", value: "FastAPI (Asynchronous Python)" },
      { label: "Authentication", value: "OAuth2 + JWT Token Bearer" },
      { label: "Database Layer", value: "MongoDB Atlas (NoSQL Document Store)" }
    ],
    problem: "Modern enterprise task management demands asynchronous API response times, secure multi-tenant role-based access, and flexible document models for dynamic task attributes.",
    approach: "Engineered a modular RESTful backend architecture utilizing Python's FastAPI framework with Pydantic schema validation, Motor async MongoDB driver, and stateless JWT authentication.",
    techStack: ["Python", "FastAPI", "MongoDB Atlas", "Motor (Async PyMongo)", "Pydantic", "JWT", "Docker"],
    caseStudy: {
      executiveSummary: "A modern asynchronous RESTful backend service built with Python and FastAPI for managing complex workflows, task hierarchies, and team assignments. Designed following clean architecture principles, OpenAPI compliance, and secure stateless authentication.",
      context: "Traditional synchronous Python WSGI frameworks struggle under high concurrent I/O throughput when coordinating notifications, database queries, and user state operations.",
      objectives: [
        "Implement sub-10ms latency endpoints using FastAPI async/await event loops.",
        "Architect stateless authentication using HS256 algorithm JWT bearer tokens.",
        "Establish structured schema validation with Pydantic models."
      ],
      architecture: [
        "API Gateway Tier: FastAPI router handling HTTP requests and CORS policy.",
        "Security Tier: JWT middleware validating authorization header tokens.",
        "Service Tier: Business logic controllers decoupling routes from data access.",
        "Data Access Tier: Motor async driver connecting to MongoDB Atlas cloud cluster."
      ],
      preprocessing: [],
      tradeoffs: "Opting for a NoSQL MongoDB document schema provided high schema flexibility for customizable task metadata, requiring strict Pydantic validation at the API boundary to enforce runtime data integrity.",
      resultsAndLimitations: "Achieved high throughput under concurrent load tests with clean modular code organization. Currently deployed as a microservice container architecture."
    }
  },
  {
    slug: "intelligent-reminder-scheduling-application",
    title: "Intelligent Reminder & Scheduling Application",
    category: "Applied Intelligent Systems",
    domain: "Software & Smart Scheduling",
    tagline: "Modular state-machine driven scheduler featuring priority event queues and alert notification mechanisms.",
    featured: false,
    status: "Completed Engineering Project",
    github: "https://github.com/kibretmulugeta",
    demo: null,
    metrics: [
      { label: "Architecture", value: "Event Queue State Machine" },
      { label: "Language", value: "Python 3.10+" },
      { label: "Storage", value: "Local SQLite / JSON Cache" }
    ],
    problem: "Context switching and fragmented scheduling lead to missed deadlines without adaptive priority-based reminder triggers.",
    approach: "Designed an intelligent event scheduling engine leveraging priority queue data structures, configurable notification handlers, and dynamic task urgency scoring algorithms.",
    techStack: ["Python", "SQLite", "APScheduler", "JSON Schema", "Desktop / CLI UI"],
    caseStudy: {
      executiveSummary: "An applied software engine for desktop and workflow scheduling that dynamically prioritizes tasks based on deadline urgency, event dependencies, and user availability intervals.",
      context: "Built to demonstrate clean modular software design, object-oriented design patterns, and background task scheduling in Python.",
      objectives: [
        "Implement priority queue event management.",
        "Build recurring schedule engines with cron-like flexibility.",
        "Provide modular notification handlers."
      ],
      architecture: [
        "Core Engine: Priority queue managing scheduled triggers.",
        "Persistence Tier: SQLite transactional store for task state.",
        "Notification Subsystem: Asynchronous alert trigger engine."
      ],
      preprocessing: [],
      tradeoffs: "Leveraging background thread polling required careful mutex lock management to eliminate race conditions on local task databases.",
      resultsAndLimitations: "Provides reliable low-overhead event dispatching for desktop software environments."
    }
  },
  {
    slug: "computer-vision-license-plate-detection",
    title: "Computer Vision & License Plate Detection Pipeline",
    category: "Applied Computer Vision",
    domain: "Computer Vision & Deep Learning",
    tagline: "Real-time vehicle and license plate localization pipeline using YOLO deep learning models and spatial contour filters.",
    featured: false,
    status: "Completed Project",
    github: "https://github.com/kibretmulugeta",
    demo: null,
    metrics: [
      { label: "Vision Backbone", value: "YOLO Object Detection" },
      { label: "Processing Library", value: "OpenCV & PyTesseract / Custom OCR" },
      { label: "Target Application", value: "Automated Vehicle Access Control" }
    ],
    problem: "Real-world traffic video streams suffer from motion blur, varying lighting conditions, and perspective distortion, degrading standard OCR accuracy.",
    approach: "Combined YOLO deep learning bounding-box detection to isolate vehicle license regions followed by perspective transformation, adaptive thresholding, and morphological character segmentation.",
    techStack: ["Python", "YOLO (Ultralytics)", "OpenCV", "NumPy", "Matplotlib"],
    caseStudy: {
      executiveSummary: "A modular computer vision pipeline designed for real-time localization and extraction of vehicle license plates from complex natural scene images and video frames.",
      context: "Traditional edge-detection approach for license plate extraction fails under nighttime lighting or non-standard angles. Deep learning bounding box detection provides high localization accuracy.",
      objectives: [
        "Train YOLO detector on vehicle foreground regions.",
        "Apply geometric perspective warping to rectify tilted license plates.",
        "Segment alphanumeric character regions for recognition."
      ],
      architecture: [
        "Input Frame → YOLO Bounding Box Extraction → Perspective Transformation → Bilateral Filter Denoising → Adaptive Thresholding → Character Output."
      ],
      preprocessing: [
        "Bilateral filtering for edge-preserving smoothing.",
        "Adaptive Otsu thresholding for binarization.",
        "Contour area filtering to isolate character glyphs."
      ],
      tradeoffs: "YOLO inference requires GPU hardware for optimal 30+ FPS real-time processing, but CPU fallback maintains acceptable 8-12 FPS frame processing rates.",
      resultsAndLimitations: "Achieved robust bounding-box localization across diverse lighting environments. Highly distorted or dirty license plates present minor character recognition challenges."
    }
  }
];
