export default function toBrowserLocalTempUrl(base64Content: string) {
  if (!base64Content) return '';
  const bytes = atob(base64Content);
  let length = bytes.length;
  let out = new Uint8Array(length);
  while (length--) {
    out[length] = bytes.charCodeAt(length);
  }
  const blob = new Blob([out], { type: 'application/pdf' });
  return URL.createObjectURL(blob);
}
