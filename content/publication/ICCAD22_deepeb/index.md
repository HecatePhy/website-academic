---
title: 'DeePEB: A Neural Partial Differential Equation Solver for Post Exposure Baking Simulation in Lithography'

# Authors
# If you created a profile for a user (e.g. the default `admin` user), write the username (folder name) here
# and it will be replaced with their full name and linked to their profile.
authors:
  - Qipan Wang
  - admin
  - Yibo Lin
  - Runsheng Wang
  - Ru Huang

# Author notes (optional)
#author_notes:
#  - 'Equal contribution'
#  - 'Equal contribution'

date: '2022-12-22T00:00:00Z'
doi: 'https://doi.org/10.1145/3508352.3549398'

# Schedule page publish date (NOT publication's date).
publishDate: '2022-12-22T00:00:00Z'

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ['1']

# Publication name and optional abbreviated publication name.
publication: In *Proceedings of the 41st IEEE/ACM International Conference on Computer-Aided Design*
publication_short: In *ICCAD'22*

abstract: Post Exposure Baking (PEB) has been widely utilized in advanced lithography. PEB simulation is critical in the lithography simulation flow, as it bridges the optical simulation result and the final developed profile in the photoresist. The process of PEB can be described by coupled partial differential equations (PDE) and corresponding boundary and initial conditions. Recent years have witnessed growing presence of machine learning algorithms in lithography simulation, while PEB simulation is often ignored or treated with compact models, considering the huge cost of solving PDEs exactly. In this work, based on the observation of the physical essence of PEB, we propose DeePEB: a neural PDE Solver for PEB simulation. This model is capable of predicting the PEB latent image with high accuracy and >100 × acceleration (compared to the commercial rigorous simulation tool), paving the way for efficient and accurate photoresist modeling in lithography simulation and layout optimization.

# Summary. An optional shortened abstract.
summary: Introduce neural PDE solver to PEB (a stage in lithography).

tags: ['ML', 'lithography']

# Display this page in the Featured widget?
featured: true

# Custom links (uncomment lines below)
# links:
# - name: Custom Link
#   url: http://example.org

url_pdf: ''
url_code: 'https://github.com/wowchemy/wowchemy-hugo-themes'
url_dataset: 'https://github.com/wowchemy/wowchemy-hugo-themes'
url_poster: ''
url_project: ''
url_slides: ''
url_source: 'https://github.com/wowchemy/wowchemy-hugo-themes'
url_video: 'https://youtube.com'

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
image:
  caption: 'Image credit: [**Unsplash**](https://unsplash.com/photos/pLCdAaMFLTE)'
  focal_point: ''
  preview_only: false

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
projects:
  - example

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
slides: example
---
