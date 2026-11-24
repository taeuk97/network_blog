---
# Copy to src/content/labs/<slug>.mdx  →  /labs/<slug>/
# Use .mdx to embed <Figure>, <Callout>, <Download>, <PlotlyChart>.
title: "OSPF Multi-Area Basics"
description: "Building a three-router OSPF topology and verifying adjacency, LSDB and routing."
date: 2026-11-24
category: "Routing & Switching"
# One of: Linux & Network Infrastructure | Routing & Switching | Service Provider Networks |
#         Transport Protocols | Troubleshooting & Automation
tags:
  - OSPF
  - FRRouting
environment: "Containerlab + FRRouting on Ubuntu"   # shown under the title
# repo: "https://github.com/taeuk97/<repository>"  # only once it exists
# cover: "/diagrams/<slug>/topology.svg"
language: "en"
draft: true
# project: "virtual-isp-network-lab"
---

## 1. Objective

What this lab sets out to build or verify, in one or two sentences.

## 2. Background

The concepts needed to follow the lab. Link to related blog posts.

## 3. Network Topology

<Figure src="/diagrams/<slug>/topology.svg" alt="Lab topology" caption="Figure 1. Lab topology" />

| Device | Interface | Address | Role |
|---|---|---|---|
| r1 | eth1 | 10.0.12.1/30 | ... |

## 4. Equipment & Environment

- Host OS / hypervisor:
- Tools and versions:

## 5. Configuration

```text title="r1 — frr.conf"
! configuration here
```

## 6. Verification

```console title="r1 — vtysh"
r1# show ip ospf neighbor
```

## 7. Experimental Results

What was observed. Include captures or measurements as figures.

## 8. Troubleshooting

Problems encountered, how they were diagnosed, and the fix.

<Callout type="warning" title="Issue">Describe the symptom and the root cause.</Callout>

## 9. Lessons Learned

- What I understood better after the lab

## 10. References & Source Code

- Source code / configs:
- References:
