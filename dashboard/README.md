
# MakerGhat Voice Analytics Engine (V1.0)
**Automated Pedagogical Engagement Analysis for STEM Classrooms**

## 📌 Project Overview
This repository contains a full-stack analytical dashboard designed to quantify classroom engagement using AI-driven voice processing. [cite_start]The system analyzes Hindi-English (Hinglish) classroom audio to derive metrics like Teacher-Student talk-time ratios, questioning frequency, and overall dialogue intensity[cite: 13, 26].

## 🛠️ The Tech Stack
* [cite_start]**Transcription Pipeline:** OpenAI WhisperX (Large-V3) with Phoneme Alignment & Speaker Diarization[cite: 85].
* **Infrastructure:** Cloud-based GPU processing (A100/T4) for high-speed ASR (Automatic Speech Recognition).
* [cite_start]**Frontend:** React.js (Vite) + Pure CSS3 for high-performance, zero-latency data visualization[cite: 53].
* **Analytics:** Recharts for time-series activity mapping.

## 📊 Engagement Metrics & Logic
[cite_start]To fulfill the core analysis requirements[cite: 28, 40], the following metrics are calculated using automated heuristics:

### 1. Teacher Dominance Ratio (TDR)
* **Formula:** $$TDR = \left( \frac{\text{Teacher Talk-Time (seconds)}}{\text{Total Session Duration (seconds)}} \right) \times 100$$
* [cite_start]**Logic:** Quantifies the percentage of the session where the instructor is the primary speaker[cite: 42]. A high TDR typically indicates a lecture-heavy pedagogical style, while a lower ratio suggests more space for student voice.

### 2. Student Participation Indicator (SPI)
* **Formula:** $$SPI = \frac{\text{Total Student Responses}}{\text{Total Number of Students}}$$
* [cite_start]**Logic:** Measures the average frequency of engagement per student[cite: 43]. This normalizes the interaction count relative to the class size, providing a clearer picture of individual involvement.

### 3. Interaction Count (IC)
* **Formula:** $$IC = \sum (\text{Teacher Questions} + \text{Student Responses})$$
* [cite_start]**Logic:** Tracks the total number of verbal "hand-offs" between the instructor and learners[cite: 44]. High interaction counts correlate with active-learning environments common in STEM workshops.

## 🧠 Assumptions & Limitations
[cite_start]As this is a prototype demo[cite: 16, 82], the following factors should be considered:
* [cite_start]**Transcription Accuracy:** Approximate accuracy is accepted as per project guidelines[cite: 26]. [cite_start]Hindi transcription quality may vary based on ambient classroom noise and the use of colloquial "Hinglish"[cite: 75].
* [cite_start]**Speaker Classification:** Teacher vs. Student speech is determined using a combination of segment duration heuristics and lexical keyword matching (e.g., detecting honorifics like "Sir" or "Ma'am")[cite: 31, 37].
* [cite_start]**Hardware Constraints:** The current pipeline assumes batch processing via GPU; real-time edge deployment is a future roadmap item[cite: 8].

## 📂 Project Structure
```text
[cite_start]├── data/               # Raw and processed JSON transcripts + Metadata [cite: 17]
[cite_start]├── notebooks/          # GPU Transcription Pipeline (Jupyter Notebooks) [cite: 54]
[cite_start]├── src/                # React Dashboard Source Code [cite: 49]
├── app.py              # Data Processing Utilities
└── requirements.txt    # ML Environment Dependencies
```

---
**Developed by Simran** *Electrical Engineering Student @ SVNIT Surat*

---

