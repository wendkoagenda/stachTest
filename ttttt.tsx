//Liste des permissions requises
const [studentDestroy, setAgentDestroy] = useState(false);
const [studentUserShow, setAgentUserShow] = useState(false);
const [studentUpdate, setAgentUpdate] = useState(false);
const [userActiveDesactive, setUserActiveDesactive] = useState(false);

// Utilisez le crochet "loadPermissions" directement dans le corps du composant
useEffect(() => {
  // Utilisez la fonction loadPermissions pour récupérer les autorisations
  const permissions = loadPermissions();
  // Mettre à jour les états des autorisations
  if (permissions) {
    setAgentDestroy(
      permissions.userPermissions.includes(strings.PERMISSIONS.STUDENT_DESTROY)
    );
    setAgentUserShow(
      permissions.userPermissions.includes(
        strings.PERMISSIONS.STUDENT_USER_SHOW
      )
    );
    setAgentUpdate(
      permissions.userPermissions.includes(strings.PERMISSIONS.STUDENT_UPDATE)
    );
    setUserActiveDesactive(
      permissions.userPermissions.includes(strings.PERMISSIONS.USER_ACTIVE)
    );
  }
}, []);
//*******************Fin
