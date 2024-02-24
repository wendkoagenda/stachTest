const access_token =
  localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ?? "access_token";
const [header, payload, signature] = access_token.split(".");

const decodedPayload = JSON.parse(atob(payload));
const userPermissions = decodedPayload.permissions;

const usePermissions = () => {
  return { header, userPermissions, signature };
};

export default usePermissions;
