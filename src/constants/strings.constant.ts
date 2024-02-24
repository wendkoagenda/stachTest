const strings = {
  APPLICATION_NAME: "Campus flow",

  ACTORS: {
    CLIENTS: "Clients",
    TECHNICIAN: "Technicians",
  },
  ROLES: {
    SUPERADMIN: "SuperAdmin",
    ADMIN: "Admin",
    TECHNICIAN: "Technician",
  },
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
      "Vous retrouverez ici toutes les formation lie a cet utilisateru. Bous pouvers copier les information dans votre presse papier en clickant sur la dite information.",
  },
  TOOLTIPS: {
    ADD_AGENT: "Ajouter un nouveau membre de l'administration",
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
  },
  PAGES: {
    HOME: "Home",
    USER: "Users",
    CLIENT: "Client",
    CATEGORY: "Categories",
    ARTICLE: "Aritcles",
    COMPANY: "Companies",
    CUSTOMER: "Customers",
    PROJECT: "Projects",
    PROJECTARTICLE: "ProjectArticles",
    QUOTE: "Quotes",
    DISPATCH: "Dispatchs",
    COMPETENCE: "Skills",
    INVOICE: "Invoices",
    CLAIM: "Permissions",
    ROLE: "Roles",
  },
  ACTIONS: {
    DISCARD: "Discard",
    GOT_IT: "Got it",
    UPDATE: "Update",
    GO_BACK: "Go back",
    DELETE: "Delete",
    CREATE_USER: "Create new User",
    CREATE_INVOICE: "Create new Invoice",
    CREATE_USER_COMPETENCE: "Add skill",
    CREATE_ARTICLE: "Create new Article ",
    CREATE_CATEGORY: "Create new Category ",
    CREATE_COMPANY: "Create new Company ",
    CREATE_CUSTOMER: "Create new Customer ",
    CREATE_PROJECT: "Create new Project ",
    CREATE_PROJECTARTICLE: "Add an article ",
    CREATE_DISPATCH: "Create new Dispatch ",
    CREATE_QUOTE: "Initialize new Quote ",
    CREATE_COMPETENCE: "Create new Skill ",
    CREATE_ROLE: "Create new Role ",
    EDIT_PROJECT: "Edit Project ",
    EDIT_PROJECTARTICLE: "Edit ProjectArticle",
    UPDATE_PROJECTARTICLE: "Update",
    EDIT_DISPATCH: "Edit Dispatch ",
    EDIT_QUOTE: "Edit Quote ",
    UPDATE_COMPETENCE: "Upadate Skill",
    UPDATE_INVOICE: "Upadate Invoice",
    UPDATE_CUSTOMER: "Upadate Customer",
    UPDATE_PROJECT: "Upadate Project",
    UPDATE_QUOTE: "Upadate Quote",
    UPDATE_DISPATCH: "Upadate Dispatch",
    UPADATE_ARTICLE: "Upadate Artcile",
    UPDATE_ROLE: "Upadate Role",
    UPDATE_CATEGORY: "Upadate Category",
  },
};
export default strings;
