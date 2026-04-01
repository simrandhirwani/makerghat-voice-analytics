
***

# MakerGhat Voice Analytics Engine (V1.0)
**Automated Pedagogical Engagement Analysis for STEM Classrooms**

## 📌 Project Overview
This repository contains a functional MVP designed to convert classroom audio recordings into actionable pedagogical insights. The system processes Hindi-English (Hinglish) audio to measure student engagement, teacher dominance, and overall classroom interaction dynamics.

**Live Demo:** https://makerghat-voice-analytics.vercel.app/

## 🛠️ The Tech Stack
* **Transcription Pipeline:** OpenAI WhisperX (Large-V3) for robust Indic language support.
* **Acoustic Processing:** Phoneme Alignment & Speaker Diarization for precise time-stamping.
* **Frontend:** React.js (Vite) for a zero-latency, responsive dashboard.
* **Data Visualization:** Recharts for time-series engagement mapping.

## 📊 Engagement Metrics & Logic
The system utilizes automated heuristics and keyword-based rules to derive session metrics. The following formal metrics have been defined:

### 1. Teacher Dominance Ratio ($TDR$)
The $TDR$ identifies the proportion of the session where the instructor is the primary verbal actor.
$$TDR = \left( \frac{ \sum_{i=1}^{n} \Delta t_{T, i} }{ \Delta T_{total} } \right) \times 100\%$$
* **Where**: $\Delta t_{T, i}$ represents the duration of individual teacher speech segments.
* **Logic**: High ratios indicate lecture-centric delivery, while lower values suggest an inquiry-based environment.

### 2. Student Participation Indicator ($SPI$)
The $SPI$ normalizes student vocal engagement against the total cohort size.
$$SPI = \frac{ \sum R_{student} }{ N_{students} }$$
* **Where**: $R_{student}$ is the total count of student responses and $N_{students}$ is the total student population.
* **Logic**: Provides a density-independent measure of how frequently the average student contributes.

### 3. Interaction Count ($IC$)
The $IC$ quantifies the total number of bidirectional verbal exchanges.
$$IC = \mathcal{Q}_{teacher} + \mathcal{R}_{student}$$
* **Where**: $\mathcal{Q}_{teacher}$ is the count of instructor-led questions and $\mathcal{R}_{student}$ is the count of student responses.
* **Logic**: Acts as a proxy for the "dialogic loop" in active-learning environments.

## 🧠 Approach & Methodology
To handle the unique challenges of Indian classrooms, the following approach was taken:
1.  **Diarization Heuristics**: Segments were classified based on duration and lexical markers (e.g., detecting honorifics like "Sir" or "Ma'am").
2.  **Indic Language Support**: Optimized WhisperX for Hinglish to ensure approximate accuracy across diverse dialects.
3.  **Data Bucketing**: Implemented 1-minute time-series resolution to maintain dashboard performance during long sessions.

## 📂 Project Structure
```text
├── data/               # Processed JSON transcripts and session metadata
├── notebooks/          # ML Pipeline (WhisperX Inference & Processing)
├── src/                # React Dashboard Source Code (Vite-based)
├── app.py              # Data Processing Utilities
└── requirements.txt    # ML Environment Dependencies
```

## ⚠️ Assumptions & Limitations
* **Accuracy**: As per assignment guidelines, approximate transcription accuracy is accepted.
* **Noise Profiles**: Background noise in classrooms may occasionally impact diarization reliability.
* **Heuristics**: Speaker classification relies on segment length and keyword matching, which may vary across different instruction styles.

---
**Developed by Simran** *Electrical Engineering Student @ SVNIT Surat*

***
