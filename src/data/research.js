export const researchData = {
  overview: "My research focuses on the intersection of deep learning architectures, medical image computing, neuro-inspired optimization algorithms, and trustworthy computer vision. I am particularly interested in developing neural networks that incorporate biologically inspired adaptation principles to improve boundary delineation in complex volumetric medical data.",

  thesis: {
    title: "Neuro-Inspired Optimization Mechanisms for U-Net-Based Medical Image Segmentation",
    institution: "Bahir Dar University — MSc in Computer Engineering Thesis",
    advisor: "Department of Computer Engineering",
    summary: "Investigated how local reward signals and neural plasticity principles can modulate backpropagation gradients in deep convolutional networks, specifically addressing fuzzy tissue boundaries in brain MRI segmentation."
  },

  manuscripts: [
    {
      id: 1,
      title: "Reward-Driven Neural Plasticity Modulation for Enhanced Brain MRI Tissue Delineation in U-Net Architectures",
      authors: "Kibret Mulugeta, et al.",
      venue: "Scientific Reports (In Preparation)",
      status: "Manuscript in preparation for submission to Scientific Reports",
      year: "2026",
      tags: ["Deep Learning", "Brain MRI", "U-Net", "Neuro-Inspired AI", "Medical Imaging"],
      abstract: "Standard convolutional segmentation networks rely on global loss functions that treat all pixels equally during gradient updates, often blurring subtle anatomical transitions in complex medical scans. In this work, we propose a reward-driven neural plasticity optimization layer integrated into U-Net architectures. By dynamically scaling gradient updates based on localized spatial boundary density, the model yields sharper tissue contour delineation without increasing inference parameters.",
      pipeline: [
        { stage: "Input Slice", description: "Multi-modal Brain MRI volume (T1, T2, FLAIR)" },
        { stage: "Anatomical Preprocessing", description: "Skull stripping, N4 bias field correction, z-score intensity normalization" },
        { stage: "Encoder Path", description: "Hierarchical feature abstraction via downsampling convolutions" },
        { stage: "Plasticity Bottleneck", description: "Local reward signal calculation modulating gradient updates at spatial boundaries" },
        { stage: "Decoder Path", description: "Feature reconstruction with feature-map skip connections" },
        { stage: "Segmentation Map", description: "High-precision binary / multi-class tissue mask output" }
      ]
    }
  ],

  researchPillars: [
    {
      title: "Medical Image Computing",
      icon: "Activity",
      description: "Developing robust deep learning models for anatomical segmentation, lesion localization, and artifact mitigation in MRI scans."
    },
    {
      title: "Neuro-Inspired Optimization",
      icon: "Brain",
      description: "Exploring biological neural plasticity and reward modulation mechanisms to improve convergence and spatial precision in artificial neural networks."
    },
    {
      title: "Computer Vision & Deep Learning",
      icon: "Eye",
      description: "Convolutional network design, U-Net architectures, YOLO object localization, and edge-preserving image filtering."
    },
    {
      title: "Trustworthy & Reliable AI",
      icon: "ShieldCheck",
      description: "Ensuring deep learning systems in high-stakes domains provide verifiable boundary predictions, reproducible evaluation metrics (Dice, IoU), and robust handling of dataset noise."
    }
  ]
};
