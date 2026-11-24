---
# Copy to src/content/measurements/<slug>.mdx  →  /measurements/<slug>/
# Only real, collected data. Put raw data and Plotly figures in public/datasets/<slug>/.
title: "Starlink vs. Terrestrial RTT at KAIST"
description: "Comparing round-trip time over Starlink and terrestrial access to common targets."
date: 2026-11-24
category: "Satellite Internet"
# One of: Satellite Internet | Terrestrial Internet | Internet Routing & Topology |
#         Network Performance Analysis | Datasets & Tools
tags:
  - Starlink
  - RTT
period: "YYYY-MM-DD — YYYY-MM-DD"                  # when the data was collected
vantagePoints:
  - "Starlink @ KAIST"
  - "Terrestrial @ KAIST"
# dataset: "/datasets/<slug>/raw.csv"             # downloadable raw data
language: "en"
draft: true
project: "internet-measurement-platform"
---

## Summary

Two or three sentences: what was measured and the main finding.

## Research Question

What this measurement tries to answer.

## Methodology

- **Vantage points:**
- **Targets:**
- **Tools:** (e.g. ping, mtr, iperf3, RIPE Atlas measurement IDs)
- **Schedule:** interval, duration, number of samples

```bash title="collection command"
# exact command used
```

## Results

<PlotlyChart src="/datasets/<slug>/figure.json" title="Figure 1. ..." caption="What the chart shows and how to read it." />

| Metric | Starlink | Terrestrial |
|---|---|---|
| Median RTT | | |

## Analysis

Interpretation of the results — what explains the observed behaviour.

## Limitations

Sample size, time of day, single vantage point, etc.

## Data & Tools

<Download href="/datasets/<slug>/raw.csv" label="Raw measurement data" meta="CSV" />

## References
