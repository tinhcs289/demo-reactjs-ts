export default async function toBase64(file: File | Blob): Promise<string | null> {
  return new Promise((resolve, _reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      var base64 = reader.result;
      resolve(`${base64}`);
    };
    reader.onerror = function (error) {
      resolve(null);
    };
  });
}
