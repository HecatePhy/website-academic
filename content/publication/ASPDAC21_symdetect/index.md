---
title: 'Layout Symmetry Annotation for Analog Circuits with Graph Neural Networks'

# Authors
# If you created a profile for a user (e.g. the default `admin` user), write the username (folder name) here
# and it will be replaced with their full name and linked to their profile.
authors:
  - admin
  - Chenhui Deng
  - Mingjie Liu
  - Zhiru Zhang
  - David Z. Pan
  - Yibo Lin

# Author notes (optional)
#author_notes:
#  - 'Equal contribution'
#  - 'Equal contribution'

date: '2021-01-19T00:00:00Z'
doi: '10.1145/3394885.3431545'

# Schedule page publish date (NOT publication's date).
publishDate: '2021-01-29T00:00:00Z'

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ['1']

# Publication name and optional abbreviated publication name.
publication: In *Proceedings of the 26th Asia and South Pacific Design Automation Conference*
publication_short: In *ASPDAC'21*

abstract: The performance of analog circuits is susceptible to various layout constraints, such as symmetry, matching, etc. Modern analog placement and routing algorithms usually need to take these constraints as input for high quality solutions, while manually annotating such constraints is tedious and requires design expertise. Thus, automatic constraint annotation from circuit netlists is a critical step to analog layout automation. In this work, we propose a graph learning based framework to learn the general rules for annotation of the symmetry constraints with path-based feature extraction and label filtering techniques. Experimental results on the open-source analog circuit designs demonstrate that our framework is able to achieve significantly higher accuracy compared with the most recent works on symmetry constraint detection leveraging graph similarity and signal flow analysis techniques. The framework is general and can be extended to other pairwise constraints as well.

# Summary. An optional shortened abstract.
summary: Symmetry constraints annotation with GNN.

tags: ['analog', 'ML']

# Display this page in the Featured widget?
featured: true

# Custom links (uncomment lines below)
# links:
# - name: Custom Link
#   url: http://example.org

#url_pdf: ''
url_code: 'https://github.com/HecatePhy/SymDetect.git'
#url_dataset: ''
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
#projects:
#  - example

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
#slides: example
---
