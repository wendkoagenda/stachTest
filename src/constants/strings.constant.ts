const strings = {
  APPLICATION_NAME: "Campus flow",

  ACTORS: {},
  ROLES: {},
  PLACEHOLDERS: {
    PHONE1: "Numéro de téléphone Whatsapp ici",
    PHONE2: "Numéro téléphone de secours ici ",
    EMAIL: "Adresse email ici",
    FIRST_NAME: "Prénom(s) ici",
    LAST_NAME: "Nom de famille ici",
    TITLE: "Saisir une phrse en gise de Titre",
    BANNER: "Saisir une phrse en gise de banniere",
  },
  INSTRUCTIONS: {
    STATUS: "L'utilisateur sera-t-il actif ou inactif ?",
    UPDATED_AGENT:
      "Effectuez des modifications d'agent ici. Cliquez sur Enregistrer lorsque vous avez terminé.",
    ADD_AGENT:
      "Ajouter un nouveaux menbre de l'administration ici.Cliquez sur Enregistrer lorsque vous avez terminé.",
    DELETE_AGENT:
      "Veillez confirmer la suppression d'un membre de l'administration",
    SHOW_AGENT:
      "Vous retrouverez ici toutes les formation lie a ce membre administration. Bous pouvers copier les information dans votre presse papier en clickant sur la dite information.",
    // Students
    UPDATED_STUDENT:
      "Effectuez des modifications d'etudiant ici. Cliquez sur Enregistrer lorsque vous avez terminé.",
    ADD_STUDENT:
      "Ajouter un nouveau etudiant ici.Cliquez sur Enregistrer lorsque vous avez terminé.",
    DELETE_STUDENT: "Veillez confirmer la suppression d'un etudiant",
    SHOW_STUDENT:
      "Vous retrouverez ici toutes les formation lie a cet etudiant. Bous pouvers copier les information dans votre presse papier en clickant sur la dite information.",
    // Teachers
    UPDATED_TEACHER:
      "Effectuez des modifications d'enseignant ici. Cliquez sur Enregistrer lorsque vous avez terminé.",
    ADD_TEACHER:
      "Ajouter un nouveau enseignant ici.Cliquez sur Enregistrer lorsque vous avez terminé.",
    DELETE_TEACHER: "Veillez confirmer la suppression d'un enseignant",
    SHOW_TEACHER:
      "Vous retrouverez ici toutes les formation lie a cet enseignant. Bous pouvers copier les information dans votre presse papier en clickant sur la dite information.",
  },
  TOOLTIPS: {
    ADD_AGENT: "Ajouter un nouveau membre de l'administration",
    ADD_STUDENT: "Ajouter un nouveau etudiant",
    ADD_TEACHER: "Ajouter un nouveau enseignants",
  },
  ERRORS: {
    BAD_CREDENTIALS: "Vos informations d'identification semblent incorrectes.",
    NETWORK: "Erreur réseau, vérifiez votre connexion Internet et réessayez",
    UNFORESEEN:
      "Oops! Une erreur inattendue est apparue. Si cela persiste, contactez le support informatique",
  },
  TEXTS: {
    MODIFY_AGENT: "Modification des infos de cet agent",
    ADD_AGENT: "Ajout s'un nouveau membre de l'administration",
    LIST_AGENT: "Liste des menbres de l'administration",
    DELETE_AGENT: "Suppression d'un membre de l'administration",
    SHOW_AGENT: "Détails sur un membre de l'administration",
    UPDATE_AGENT: "Mise a jour d'un membre de l'administration",
    AGENT_INFO: "Information sur l'agent",
    // Student
    MODIFY_STUDENT: "Modification des infos de cet etudiant",
    ADD_STUDENT: "Ajout s'un nouveau etudiant",
    LIST_STUDENT: "Liste desetudiant",
    DELETE_STUDENT: "Suppression d'unetudiant",
    SHOW_STUDENT: "Détails sur un metudiant",
    UPDATE_STUDENT: "Mise a jour d'un etudiant",
    STUDENT_INFO: "Information sur l'etudiant",
    // Teacher
    MODIFY_TEACHER: "Modification des infos de cet enseignant",
    ADD_TEACHER: "Ajout s'un nouveau enseignant",
    LIST_TEACHER: "Liste desetudiant",
    DELETE_TEACHER: "Suppression d'une enseignant",
    SHOW_TEACHER: "Détails sur un enseignant",
    UPDATE_TEACHER: "Mise a jour d'un enseignant",
    TEACHER_INFO: "Information sur l'enseignant",

    PERSONNE_INFO: "Information sur la personne",
  },
  TH: {
    PHONE1: "Téléphone 1 (What)",
    PHONE2: "Téléphone 2",
    EMAIL: "Adresse email",
    FIRST_NAME: "Prénom(s)",
    LAST_NAME: "Nom",
    REGISTRATION_NO: "N° matricule",
    TITLE: "Titre",
    BANNER: "Banniere",
    GENDER: "Genre",
    STATUS: "Status",
    MASCULIN: "M",
    FEMININ: "F",
  },
  MESSAGES: {
    WELCOME_BACK: "Content de vous revoir",
    PLEASE_SING_IN: "Veuillez saisir vos identifiants pour vous connecter !",
    SUCCESS_SAVE: "Enregistrement effectuer avec succès",
    SUCCESS_DELETE: "Suppression effectuer avec succès",
    SUCCESS_ACTION: "Opération effectuer avec succès",
    FAILED_SAVE:
      "L'enregistrement a échoué, contactez le support si cela persiste",
    FAILED_DELETE:
      "La suppression a échoué, contactez le support si cela persiste",
    FAILED_ACTION:
      "L'Opération a échoué, contactez le support si cela persiste",
    SURE_TO_DELETE: "Etes-vous sûr que vous voulez supprimer ",
    AUTO_DISCONNECTION:
      "Votre session a expiré. Vous devez vous reconnecter. Mesure de sécurité.",
  },
  BUTTONS: {
    SING_IN: "Me connecter",
    SINGING_IN: "Connexion ...",
    SING_OUT: "Me déconnecter",
    SINGING_OUT: "Déconnexion ...",
    SAVING: "Enregistrement ...",
    SAVE: "Enregistrer",
    RESET_FORM: "Réinitialiser le formulaire",
    CANCEL: "Annuler",
    CLOSE: "Fermer",
    DELETE: "Supprimer",
    DELETEING: "Suppression ...",
    CONFIRM: "Oui",
    CONFIRMIMG: "En cours ...",
    ADD: "Ajouter",
    EDIT: "Modifier",
    SHOW: "Inspecter",
    OK_CLOSE: "Ok, femer",
    UPDATING: "Mise a jour en cours ...",
    UPDATE: "Mettre a jour",
  },

  PERMISSIONS: {
    AGNET_LIST: "agents.list", // Agent
    AGNET_SHOW: "agents.show",
    AGNET_UPDATE: "agents.update",
    AGNET_STORE: "agents.store",
    AGNET_DESTROY: "agents.destroy",
    STUDENT_LIST: "students.list", // Students
    STUDENT_SHOW: "students.show",
    STUDENT_UPDATE: "students.update",
    STUDENT_STORE: "students.store",
    STUDENT_DESTROY: "students.destroy",
    TEACHER_LIST: "teachers.list", // teachers
    TEACHER_SHOW: "teachers.show",
    TEACHER_UPDATE: "teachers.update",
    TEACHER_STORE: "teachers.store",
    TEACHER_DESTROY: "teachers.destroy",
  },
  PAGES: {},
  ACTIONS: {},
};
export default strings;
