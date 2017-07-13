export function fullName (obj) {
  if (!obj) return "";
  const {name, firstName, lastName} = obj;
  if(name) return name;
  if (!firstName && !lastName) return "";
  return [(firstName || ""), (lastName || "")].join(" ").trim();
}
