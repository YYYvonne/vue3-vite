function blob2obj(blob:any, onload:any, encoding = 'UTF-8') {
  return new Promise<void>((resolve) => {
    let reader = new FileReader();
    reader.readAsText(blob, encoding);
    reader.onload = (e) => {
      onload(e);
      resolve();
    };
  });
}

function blob2file(blob:any, filename:any) {
  var e = document.createElement('a');
  e.setAttribute('download', filename);
  e.style.display = 'none';
  e.href = URL.createObjectURL(blob);
  document.body.appendChild(e);
  e.click();
  document.body.removeChild(e);
}

function str2file(s:any, filename:any) {
  blob2file(new Blob([s]), filename);
}

async function custom_upload(info:any, onload:any, encoding = 'UTF-8') {
  await blob2obj(info.file, (e:any) => onload(e.target.result), encoding);
  info.onSuccess('success', info.file);
}
export { blob2obj, blob2file, str2file, custom_upload };
// custom_upload, str2file