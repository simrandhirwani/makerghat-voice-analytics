import whisperx
import gc 
import os

# 1. Configuration for CPU Speed Test
device = "cpu" 
batch_size = 1  # <-- Changed to 1 so we don't choke the CPU RAM

audio_file_path = "data/sample1.mp3" # Keep your exact filename here

if not os.path.exists(audio_file_path):
    print(f"Error: I cannot find the file at {audio_file_path}")
    exit()

# <-- Changed from "base" to "tiny" for a massive speed boost
print("Loading Whisper 'tiny' model...")
model = whisperx.load_model("tiny", device, compute_type="int8") 

print("Loading audio file...")
audio = whisperx.load_audio(audio_file_path)

print("Transcribing... this should be much faster now!")
result = model.transcribe(audio, batch_size=batch_size)

print("\n--- TRANSCRIPTION RESULTS ---\n")
for segment in result["segments"][:5]:
    print(f"[{segment['start']:.2f}s -> {segment['end']:.2f}s] {segment['text']}")

gc.collect()