const loadPermissions = () => {
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3MTEwOTIwOTUsImV4cCI6MTcxMTEwMjg5NSwibmJmIjoxNzExMDkyMDk1LCJqdGkiOiJMTTNWNjdlSHpRaXUwRjRkIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJwZXJtaXNzaW9ucyI6WyJkZWZhdWx0LnBlcm1pc3Npb24iXSwicm9sZXMiOlsiYWRtaW4iXX0.bH2FNTASpOE_JdvPtiKuD217JOo7G74eyK-Ji7w93gE";
  const [header, payload, signature] = access_token.split(".");
  const decodedPayload = JSON.parse(atob(payload));
  return { userPermissions: decodedPayload.permissions };
};

export default loadPermissions;
