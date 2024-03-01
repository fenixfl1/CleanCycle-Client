export function normalizeFileList(e: any) {
  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
}

export function normalizePhone(value: string) {
  return value.replace(/[^0-9]/g, '');
}
