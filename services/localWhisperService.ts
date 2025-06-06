export async function transcribeVideo(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('video', file);
  const res = await fetch('/api/transcribe', {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    throw new Error(`Transcription failed with status ${res.status}`);
  }
  const data = await res.json();
  return data.transcript as string;
}
