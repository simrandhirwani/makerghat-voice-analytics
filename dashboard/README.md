# MakerGhat Voice Analytics Engine (V1.0)
**Automated Pedagogical Engagement Analysis for STEM Classrooms**

## 📌 Project Overview
This repository contains a full-stack analytical dashboard designed to quantify classroom engagement using AI-driven voice processing. The system analyzes Hindi-English (Hinglish) classroom audio to derive metrics like Teacher-Student talk-time ratios, questioning frequency, and overall dialogue intensity.

## 🛠️ The Tech Stack
* **Transcription Pipeline:** OpenAI WhisperX (Large-V3) with Phoneme Alignment & Speaker Diarization.
* **Infrastructure:** Cloud-based GPU processing (A100/T4) for high-speed ASR (Automatic Speech Recognition).
* **Frontend:** React.js (Vite) + Pure CSS3 for high-performance, zero-latency data visualization.
* **Analytics:** Recharts for time-series activity mapping.

## 🚀 Key Features
* **Speech Density Mapping:** Visualizes the "rhythm" of the classroom, identifying periods of high activity vs. lecture dominance.
* **Interrogative Detection:** Custom NLP logic to identify Hindi and English question markers (क्या, क्यों, how, why).
* **Talk-Time Distribution:** A visual meter showing the balance between instructor lecture and learner participation.
* **Signal Reliability Scoring:** Real-time tracking of AI transcription confidence based on acoustic log-probabilities.
* **Professional Reporting:** One-click PDF export optimized for field workers and stakeholders.

## 📂 Project Structure
```text
├── data/               # Raw and processed JSON transcripts + Metadata
├── notebooks/          # GPU Transcription Pipeline (Jupyter Notebooks)
├── src/                # React Dashboard Source Code
├── app.py              # Data Processing Utilities
└── requirements.txt    # ML Environment Dependencies