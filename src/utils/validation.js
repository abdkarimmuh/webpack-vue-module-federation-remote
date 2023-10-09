const emailPattern =
  /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-z0-9-]{1,63}\.){1,8}[a-z]{2,63}$/;

export const isNotEmpty = (val) =>
  !!(
    val !== "" &&
    val !== null &&
    typeof val !== "undefined" &&
    Object.values(val).length !== 0
  );
export const required = (val) => !!val || "Wajib diisi";
export const requiredSelect = (val) =>
  (typeof val === "object" && !!val) || "Wajib diisi";
export const requiredObject = (val) => typeof val === "object" || "Wajib diisi";
export const requiredObjectEmpty = (val) => !!val.value || "Wajib diisi";

export const checkAccountType = (norek) => {
  const typeId = norek.charAt(12);
  switch (typeId) {
    case "1":
      return "L"; // LN (LN/Pinjaman)
    case "3":
      return "D"; // CA (CA/Giro)
    case "4":
      return "T"; // TD (TD/Deposito)
    case "5":
      return "S"; // SA (SA/Tabungan)
    case "9":
      return "D"; // CA (CA/Giro)
    default:
      return ""; // Undefined
  }
};

export const isSystemError = (err) => {
  const message =
    typeof err.message === "undefined"
      ? err.toUpperCase()
      : err.message.toUpperCase();
  if (message === "MAXIMUM CONNECTION TIME EXCEEDED") return true;

  const _CODE = typeof err.code === "undefined" ? err : err.code;
  const listSystemErrorCode = [
    2, // 'UNKNOWN'
    4, // 'DEADLINE_EXCEEDED'
    8, // 'RESOURCE_EXHAUSTED'
    10, // 'ABORTED'
    11, // 'OUT_OF_RANGE'
    12, // 'UNIMPLEMENTED'
    13, // 'INTERNAL'
    14, // 'UNAVAILABLE'
    15, // 'DATA_LOSS'
  ];
  return listSystemErrorCode.find((item) => item === _CODE);
};

export const checksum = (norek) => {
  let nSubTotal = 0;
  let nTotal = 0;
  const weight = "32765432765432";

  for (let b = 0; b < 14; b++) {
    nSubTotal =
      parseInt(norek.toString().substring(b, b + 1), 10) *
      parseInt(weight.substring(b, b + 1), 10);
    nTotal += nSubTotal;
  }
  const nRem = nTotal % 10;
  const nRemMin = 10 - nRem;
  let cek = 0;

  if (nRemMin < 10) {
    cek = nRemMin;
  }

  return cek === parseInt(norek.toString().substring(14), 10);
};

export const checkRekeningIDR = (norek) => {
  const currencyDigit = norek.substring(4, 6);
  return currencyDigit === "01";
};

export const isSameBranch = (accountNo, branch) =>
  accountNo.substr(0, 4) === branch;

export const minLength = (val) => val.length >= 3 || "Isi minimal 3 karakter";

export const emailFormat = (val) =>
  emailPattern.test(val) || val === "" || "Isi alamat email yang benar";
