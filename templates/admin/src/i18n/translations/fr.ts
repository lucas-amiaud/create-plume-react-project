import { Translations } from './Translations';

const frMessages: Translations = {
  app: {
    name: 'Plume admin',
    baseline: 'Espace d\'administration',
  },
  // actions
  action: {
    back: 'Retour',
    cancel: 'Annuler',
    save: 'Enregistrer',
    delete: 'Supprimer',
    search: 'Rechercher',
    add: 'Ajouter',
    update: 'Modifier',
    authenticate: 'Me connecter',
    disconnect: 'Me déconnecter',
    keep_editing: 'Rester sur la page',
    close: 'Fermer',
    close_without_saving: 'Fermer sans sauvegarder',
    google: {
      authenticate: 'Se connecter avec Google'
    },
    apple: {
      authenticate: 'Se connecter avec Apple'
    },
  },
  // common labels
  label: {
    creation_date: 'Date de création',
    loading: 'Chargement...',
    empty: 'Aucun élément',
    more_options: 'Plus d\'options',
  },
  // common messages
  message: {
    changes_saved: 'Les modifications ont bien été enregistrées',
    unsaved_data: 'Des modifications n\'ont pas été enregistrées. '
      + 'Si vous voulez enregistrer ces modifications, cliquez sur le bouton "Rester sur la page"',
    confirm_delete: 'Pour confirmer la suppression, cliquez sur le bouton "Supprimer"',
  },
  // navigation
  nav: {
    home: 'Accueil',
    users: 'Gestion des utilisateurs',
    user_list: 'Utilisateurs',
    settings: 'Paramètres',
    log_api: 'API Logs',
  },
  //format
  format : {
    date: 'DD/MM/YYYY',
    date_mask: '__/__/____',
    hour: 'hh:mm',
    date_hour: 'DD/MM/YYYY hh:mm',
  },
  // home
  home: {
    title: 'Page d\'accueil',
  },
  login: {
    title: 'Se connecter',
    actions: {
      forgot: 'J\'ai oublié mon mot de passe',
    }
  },
  // users
  users: {
    userName: 'Nom d\'utilisateur',
    password: 'Mot de passe',
    password_confirm: 'Confirmation du mot de passe',
    email: 'E-mail',
    firstName: 'Prénom',
    lastName: 'Nom',
    role: 'Rôle',
  },
  // pages users
  user: {
    title_list: 'Liste des utilisateurs',
    title_create: 'Création d\'un utilisateur',
    title_edit: 'Modification d\'un utilisateur',
    add: 'Ajouter un utilisateur',
    error_passwords_different: 'Le mot de passe et sa confirmation sont différents',
    popin: {
      title_delete: 'Supprimer l\'utilisateur',
      cancel: 'Annuler la saisie',
    },
    list: {
      count: (count: number) => 'Nombre d\'utilisateurs : ' + count,
    },
  },
  // logs api
  logs_api: {
    title_list: 'Liste des appels API',
    title_detail: (api: string) => 'Détails de l\'appel à l\'API ' + api,
    api: 'API',
    url: 'URL',
    date: 'Date de l\'appel',
    method: 'Méthode HTTP',
    status_code: 'Code de retour',
    body_request: 'Corps de la requête',
    body_response: 'Corps de la réponse',
    header_request: 'Entêtes de la requête',
    header_response: 'Entêtes de la réponse',
    list: {
      count: (count: number) => 'Nombre de logs API : ' + count,
    },
  },
  // sorts wording
  'sort': {
    'user': {
      'name_desc': 'Trier par ordre alphabétique descendant',
      'name_asc': 'Trier par ordre alphabétique ascendant',
    },
    logs_api: {
      date_desc: 'Trier du plus nouveau au plus ancien',
      date_asc: 'Trier du plus ancien au plus nouveau',
    },
  },
  // filters wording
  'filter': {
    'user': {
      'title': 'Filtres',
      'name': 'Nom',
      'role': 'Rôle',
    },
    logs_api: {
      api_name: 'Nom d\'API',
      status_code: 'Code de retour',
      method: 'Méthode HTTP',
    },
  },
  // errors
  error: {
    field: {
      required: 'Le champ est requis',
      email_wrong_format: 'L\'adresse e-mail saisie semble être incorrecte',
    },
  },
  'http-errors': {
    INTERNAL_ERROR: 'Une erreur inattendue s\'est produite',
    NETWORK_ERROR: 'Erreur réseau, votre connexion internet semble indisponible',
    TIMEOUT_ERROR: 'Erreur réseau (timeout), votre connexion internet ou le serveur distant semble indisponible',
    FORBIDDEN_ERROR: 'Il semble que vous n\'avez pas accès à cette ressource ou à cette action',
    WRONG_LOGIN_OR_PASSWORD: 'Nom d\'utilisateur ou mot de passe incorrect',
    // eslint-disable-next-line max-len
    TOO_MANY_WRONG_ATTEMPTS: (seconds: string) => `Suite à des erreurs dans la saisie de vos identifiants, votre compte est verrouillé pendant ${seconds} secondes, veuillez-vous reconnecter ultérieurement`,
    FIELD_REQUIRED: (fieldName: string) => `Le champ '${fieldName}' est requis`,
    MESSAGE: (message: string) => message,
  },
} as const;

export default frMessages;
