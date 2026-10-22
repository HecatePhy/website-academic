---
title: 'DiffRouter: A Differentiable Routing Framework for UltraScale FPGAs'

# Authors
# If you created a profile for a user (e.g. the default `admin` user), write the username (folder name) here
# and it will be replaced with their full name and linked to their profile.
authors:
  - admin
  - Zhili Xiong
  - Yusu Wang
  - David Z. Pan

# Author notes (optional)

date: '2026-04-20T00:00:00Z'
doi: '10.1109/FCCM68464.2026.00029'

# Schedule page publish date (NOT publication's date).
publishDate: '2023-01-14T00:00:00Z'

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ['1']

# Publication name and optional abbreviated publication name.
publication: In *2026 IEEE 34th Annual International Symposium on Field-Programmable Custom Computing Machines*
publication_short: In *FCCM'26*

abstract: "Routing has become a major bottleneck in large-scale FPGA design flows, where traditional routers rely on sequential net-by-net processing and rip-up-reroute heuristics. This inherent sequentialism limits parallelism, leads to suboptimal utilization of routing resources, and significantly increases runtime on modern FPGAs. This paper introduces DiffRouter, the first differentiable, gradient-based FPGA routing framework with GPU acceleration. By lifting routing into a continuous optimization space, DiffRouter enables highly concurrent routing and improved global optimality before projecting solutions back onto the discrete fabric. The framework consists of three key stages: (1) Resource-pruned preprocessing, which extracts compact routing variables per net to reduce memory footprint and problem complexity; (2) Differentiable global routing via gradient descent, which formulates routing as a Lagrangian-relaxed optimization that minimizes wirelength while iteratively enforcing connectivity and congestion constraints as relaxed terms; and (3) Postprocessing, which maps the continuous wire distributions to a valid UltraScale routing solution and completes solutions by detailed routing. Experiments on the FPGA 2024 Routing Contest benchmarks show that DiffRouter outperforms state-of-the-art parallel routers, achieving over 5× speedup over RWRoute and 2× over Vivado, and running 18% faster than the state-of-the-art academic FPGA router Potter while delivering competitive critical path wirelength."

# Summary. An optional shortened abstract.
summary: A novel differentiable routing framework for UltraScale+ FPGA.

tags: ['routing', 'FPGA']

categories: ['FPGA']

# Display this page in the Featured widget?
featured: true

# Custom links (uncomment lines below)
# links:
# - name: Custom Link
#   url: http://example.org

#url_pdf: ''
#url_code: 'https://github.com/wowchemy/wowchemy-hugo-themes'
#url_dataset: 'https://github.com/wowchemy/wowchemy-hugo-themes'
#url_poster: ''
#url_project: ''
#url_slides: ''
#url_source: 'https://github.com/wowchemy/wowchemy-hugo-themes'
#url_video: 'https://youtube.com'

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
#image:
#  caption: 'Image credit: [**Unsplash**](https://unsplash.com/photos/pLCdAaMFLTE)'
#  focal_point: ''
#  preview_only: false

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
#projects: []

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
#slides: example
---
