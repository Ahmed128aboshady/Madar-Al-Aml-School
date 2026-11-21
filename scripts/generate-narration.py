"""Regenerate bundled letter narration on Windows with installed SAPI voices.
Requires Python, pywin32, FFmpeg, and Microsoft Hoda / Zira OneCore voices.
Run from the project directory: python scripts/generate-narration.py
No network calls or credentials are used.
"""
import json
import pathlib
import subprocess
import tempfile
import win32com.client

ROOT = pathlib.Path(__file__).resolve().parents[1]
manifest = json.loads((ROOT / "public/audio/narration.json").read_text(encoding="utf-8"))
category = win32com.client.Dispatch("SAPI.SpObjectTokenCategory")
category.SetId(r"HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Speech_OneCore\Voices", False)
voices = list(category.EnumerateTokens())
for clip in manifest["clips"]:
    destination = ROOT / "public/audio" / clip["file"]
    destination.parent.mkdir(parents=True, exist_ok=True)
    speaker = win32com.client.Dispatch("SAPI.SpVoice")
    speaker.Voice = next(v for v in voices if clip["voice"] in v.GetDescription())
    speaker.Rate = -2
    with tempfile.TemporaryDirectory(prefix="madar-narration-") as temporary:
        wav = str(pathlib.Path(temporary) / "voice.wav")
        stream = win32com.client.Dispatch("SAPI.SpFileStream")
        stream.Open(wav, 3, False)
        speaker.AudioOutputStream = stream
        speaker.Speak(clip["text"])
        stream.Close()
        subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", wav,
                        "-af", "loudnorm=I=-18:TP=-2:LRA=7", "-ar", "24000", "-ac", "1", "-b:a", "64k", str(destination)], check=True)
print(f"Generated {len(manifest['clips'])} narration files.")
