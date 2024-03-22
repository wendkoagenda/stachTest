const strings = {
  APPLICATION_NAME: "Campus flow",

  ACTORS: {},
  ROLES: {},
  PLACEHOLDERS: {
    REGISTRATION_NO: "Numéro matricule",
    PHONE1: "Numéro de téléphone Whatsapp ici",
    PHONE2: "Numéro téléphone de secours ici ",
    EMAIL: "Adresse email ici",
    FIRST_NAME: "Prénom(s) ici",
    LAST_NAME: "Nom de famille ici",
    TITLE: "Saisir une phrase en gise de Titre",
    BANNER: "Saisir une phrase en gise de banniere",
    VH_CM: "Saisir VH_CM",
    VH_TP: "Saisir VH_TP",
    VH_TD: "Saisir VH_TD",
    CREDIT: "Saisir CREDIT",
    COEF: "Saisir COEF",
    DESCRIPTION: "Saisir DESCRIPTION",
    ACRONYM: "Saisir ACRONYM",
    CODE: "Saisir CODE",
    SELECT_MODULE: "Selectionnner un module",
    CONTENU: "Contenu",
  },

  INSTRUCTIONS: {
    //seances
    APPROUVE_SEANCE: "Entrer votre matricule pour valider",
    STUDENT_ALLOW:
      "Donner modifier les droits dajout et de modification de seances par les delegue et sous delegue de la classe",
    // s
    SELECT_MODULE: "Le module appartiendra a cette classe egalement?",
    STATUS: "L'tilisateur sera-t-il actif ou inactif ?",
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
    //Classe
    UPDATED_CLASSE:
      "Effectuez des modifications d'une classe ici. Cliquez sur Enregistrer lorsque vous avez terminé.",
    ADD_CLASSE:
      "Ajouter une nouvelle classe ici.Cliquez sur Enregistrer lorsque vous avez terminé.",
    DELETE_CLASSE: "Veillez confirmer la suppression d'une classe",
    SHOW_CLASSE:
      "Vous retrouverez ici toutes les formation lie a cette classe. Bous pouvers copier les information dans votre presse papier en clickant sur la dite information.",
    // Seance
    UPDATED_SEANCE:
      "Effectuez des modifications seance ici. Cliquez sur Enregistrer lorsque vous avez terminé.",
    ADD_SEANCE:
      "Ajouter un nouveau seance ici.Cliquez sur Enregistrer lorsque vous avez terminé.",
    DELETE_SEANCE: "Veillez confirmer la suppression d'un seance",
    SHOW_SEANCE:
      "Vous retrouverez ici toutes les formation lie a cet seance. Bous pouvers copier les information dans votre presse papier en clickant sur la dite information.",
    //Module
    UPDATED_MODULE:
      "Effectuez des modifications d'une module ici. Cliquez sur Enregistrer lorsque vous avez terminé.",
    ADD_MODULE:
      "Ajouter une nouvelle module ici.Cliquez sur Enregistrer lorsque vous avez terminé.",
    DELETE_MODULE: "Veillez confirmer la suppression d'une module",
    SHOW_MODULE:
      "Vous retrouverez ici toutes les formation lie a cette module. Bous pouvers copier les information dans votre presse papier en clickant sur la dite information.",
  },
  TOOLTIPS: {
    PARMS_LIST: "Liste paramettres",
    USERS_LIST: "Liste des membres de l'administration",
    ADD_AGENT: "Ajouter un nouveau membre de l'administration",
    ADD_SEANCE: "Ajouter un nouveau seance",
    ADD_STUDENT: "Ajouter un nouveau etudiant",
    ADD_TEACHER: "Ajouter un nouveau enseignants",
    ADD_MODULE: "Ajouter un nouveau module",
    NOT_YET_DISPONIBLE: "Pas encor disponible",
    CLASSE_LIST: "Aller a la liste de toutes les classes",
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
    LIST_STUDENT: "Liste des étudiants",
    DELETE_STUDENT: "Suppression d'unetudiant",
    SHOW_STUDENT: "Détails sur un metudiant",
    UPDATE_STUDENT: "Mise a jour d'un etudiant",
    STUDENT_INFO: "Information sur l'etudiant",
    // Teacher
    MODIFY_TEACHER: "Modification des infos de cet enseignant",
    ADD_TEACHER: "Ajout s'un nouveau enseignant",
    LIST_TEACHER: "Liste des enseignant",
    DELETE_TEACHER: "Suppression d'une enseignant",
    SHOW_TEACHER: "Détails sur un enseignant",
    UPDATE_TEACHER: "Mise a jour d'un enseignant",
    TEACHER_INFO: "Information sur l'enseignant",
    // Seance
    MODIFY_SEANCE: "Modification des infos de cet seance",
    ADD_SEANCE: "Ajout s'un nouveau seance",
    LIST_SEANCE: "Liste des seance",
    DELETE_SEANCE: "Suppression d'une seance",
    SHOW_SEANCE: "Détails sur un seance",
    UPDATE_SEANCE: "Mise a jour d'un seance",
    SEANCE_INFO: "Information sur l'seance",
    STUDENT_ALLOW: "Droit d'ajout par delegué",
    STUDENT_ALLOW_NON: "Accès en écriture délégués : Non",
    STUDENT_ALLOW_YES: "Accès en écriture délégués : Oui",
    // Departements
    LIST_DEPARTEMENT: "Liste des departements",
    DEPARTEMENT_EMPTY: "Aucun departement trouvé",
    // classes
    LIST_CLASSE_OF_DEPARTEMENT: "Liste des classes du departements",
    MODIFY_CLASSE: "Modification des infos de cette classe",
    ADD_CLASSE: "Ajout d'une nouvel classe",
    LIST_CLASSE: "Liste des classes",
    DELETE_CLASSE: "Suppression d'une classe ",
    SHOW_CLASSE: "Détails de cette classes",
    UPDATE_CLASSE: "Mise a jour d'une classe",
    CLASSE_INFO: "Information sur la classe",
    CLASSE_EMPTY: "Aucune classes",
    // Module
    MODIFY_MODULE: "Modification des infos de ce module",
    ADD_MODULE: "Ajout s'un nouveau module",
    LIST_MODULE: "Liste des module",
    DELETE_MODULE: "Suppression d'une module",
    SHOW_MODULE: "Détails sur un module",
    UPDATE_MODULE: "Mise a jour d'un module",
    MODULE_INFO: "Information sur l'module",
    VH: "Voumes horaires",
    HEURES: "heures",
    NOT_YET_ASSIGNED: "Le module n'est pas encor assigner.",
    ASSIGNE_TO_PROF: "Assignation de module",
    MY_MODULES_LIST: "Liste de mes modules",
    /// DCNFSUM
    ADD_DCNFSUM: "Ajouter un module a cette classe",
    // Specifique
    PERSONNE_INFO: "Information sur la personne",
    GENERAL_INFO: "Informations générales",
    PLUS: "Plus",
    VALIDATIONS: "Validations",
    USERS: "Utilisateurs",
    SETTINGS: "Parametre du systheme",
    // Seances
    NO_SEANCES: "Aucune seance pour le moment",
    APPROUVE_SEANCE: "Viser la seance",
    // visa
    VISA_STUDENT: "Visa Délégué",
    VISA_AGENT: "Visa Administration",
    VISA_TEACHER: "Visa Enseignant",
    // my classes
    MY_CLAASES_LIST: "Liste de mes classes",
  },
  TH: {
    SEANCES: "Séances",
    MY_DOCS: "Mes documents",
    MY_STATS: "Mes stattistiques",
    MY_MODULES: "Mes modules",
    MY_CLASSES: "Mes classes",
    MY_COURSES: "Mes cours",
    DEPARTEMENT: "Departements",
    PARAMS: "Parametres",
    AGENT: "Agents",
    TEACHER: "Ensignants",
    STUDENT: "Etudiants",
    PROGRESS: "Progression",
    CONTENU: "Contenu",
    CREATED_AT: "Créer le",
    VHT: "VHT",
    MODULE: "Module",
    DESCRIPTION: "Description",
    COEF: "Coef",
    CREDIT: "Crédit",
    STUDENT_COUNT: "Nombre d'étudiants",
    FILIERE: "Filière",
    VH_CM: "CM",
    VH_TD: "TD",
    VH_TP: "TP",
    CODE: "Code",
    NIVEAU: "Niveau",
    CLASSE: "Classe",
    ACRONYM: "Sigle",
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
    CLASSES: "Classes",
    STATISTIQUES: "Statistiques",
    STUDENTS: "Etudiants",
  },
  MESSAGES: {
    NO_DATA: "Humm , nous n'avons rien trouver",
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
    YES_CHANGE: "Oui,changer",
    ASSIGNE_TO_PROF: "Assigner",
    WITHDRAW: "Retirer",
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
    //Params
    PARAMS_LIST: "params.list",
    PARAMS_CLASSES: "params.classes",
    PARAMS_MY_COURSES: "params.myCourses",
    PARAMS_DEPARTEMENTS: "params.departements",
    PARAMS_USERS: "params.users",
    AGENT_LIST: "agents.list", // Agent
    AGENT_SHOW: "agents.show",
    AGENT_UPDATE: "agents.update",
    AGENT_STORE: "agents.store",
    AGENT_DESTROY: "agents.destroy",
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
    DEPARTEMENT_LIST: "d_c.list", // d_c (departement)
    DEPARTEMENT_SHOW: "d_c.show",
    DEPARTEMENT_UPDATE: "d_c.update",
    DEPARTEMENT_STORE: "d_c.store",
    DEPARTEMENT_DESTROY: "d_c.destroy",
    MODULE_LIST: "modules.list", // modules
    MODULE_SHOW: "modules.show",
    MODULE_UPDATE: "modules.update",
    MODULE_STORE: "modules.store",
    MODULE_DESTROY: "modules.destroy",
    SEANCE_LIST: "seances.list", // seances
    SEANCE_SHOW: "seances.show",
    SEANCE_UPDATE: "seances.update",
    SEANCE_STORE: "seances.store",
    SEANCE_DESTROY: "seances.destroy",
  },
  PAGES: {},
  ACTIONS: {},
};
export default strings;
