/**
 * Created by acommuni on 24/07/2015.
 */

// Enum of all possible return case from LBPhone
var EResult = {
    CONFIG_FILE_NOT_VALID: {
        http_code: 500,
        http_body: {
            message: 'Le fichier de configuration n est pas valide.'
        },
        print_stack: false
    },
    WRONG_USER_AGENT: {
        http_code: 400,
        http_body: {
            respstatus: '100',
            message: 'Parametre X_ERABLE_UA manquant ou invalide.'
        },
        print_stack: false
    },
    WRONG_PUID: {
        http_code: 400,
        http_body: {
            respstatus: '101',
            message: 'Parametre X_WASSUP_PUID manquant ou invalide.'
        },
        print_stack: false
    },
    WRONG_MID: {
        http_code: 400,
        http_body: {
            respstatus: '102',
            message: 'Parametre X_ERABLE_MID manquant ou invalide.'
        },
        print_stack: false
    },
    WRONG_DEVICEPUSHID: {
        http_code: 400,
        http_body: {
            respstatus: '103',
            message: 'Parametre X_ERABLE_DEVICEPUSHID manquant ou invalide.'
        },
        print_stack: false
    },
    WRONG_ISE: {
        http_code: 400,
        http_body: {
            respstatus: '104',
            message: 'Parametre X_WASSUP_ISE manquant ou invalide.'
        },
        print_stack: false
    },
    WRONG_SAI: {
        http_code: 400,
        http_body: {
            respstatus: '105',
            message: 'Parametre X_WASSUP_SAI manquant ou invalide.'
        },
        print_stack: false
    },
    NO_SERVICE_FOUND: {
        http_code: 404,
        http_body: {
            respstatus: '106',
            message: 'Ressource inconnue.'
        },
        print_stack: false
    },

    WRONG_CREDENTIALS: {
        http_code: 400,
        http_body: {
            respstatus: '120',
            message: 'Parametre CREDENTIALS manquant ou invalide.'
        },
        print_stack: false
    },
    WRONG_DATAS: {
        http_code: 400,
        http_body: {
            respstatus: '121',
            message: 'Parametre DATA manquant ou invalide.'
        },
        print_stack: false
    },
    WRONG_INPUT_SET_RENVOIS: {
        http_code: 400,
        http_body: {
            respstatus: '122',
            message: 'Requete modification de renvois invalide.'
        },
        print_stack: false
    },
    VERSIONING_SERVICE_UNAVAILABLE: {
        http_code: 503,
        http_body: {
            respstatus: '200',
            message: 'Enabler Versioning injoignable.'
        },
        print_stack: false
    },
    VERSIONING_SERVICE_ERROR: {
        http_code: 500,
        http_body: {
            respstatus: '201',
            message: 'Erreur Enabler Versioning.'
        },
        print_stack: false
    },
    INIT_SERVICE_UNAVAILABLE: {
        http_code: 503,
        http_body: {
            respstatus: '202',
            message: 'Enabler Init injoignable.'
        },
        print_stack: false
    },
    INIT_SERVICE_ERROR: {
        http_code: 500,
        http_body: {
            respstatus: '203',
            message: 'Erreur Enabler Init.'
        },
        print_stack: false
    },
    NOTIF_SERVICE_UNAVAILABLE: {
        http_code: 503,
        http_body: {
            respstatus: '204',
            message: 'Enabler Notification injoignable.'
        },
        print_stack: false
    },
    NOTIF_SERVICE_ERROR: {
        http_code: 500,
        http_body: {
            respstatus: '205',
            message: 'Erreur Enabler Notification.'
        },
        print_stack: false
    },
    MU_SERVICE_UNAVAILABLE: {
        http_code: 503,
        http_body: {
            respstatus: '206',
            message: 'Enabler Messagerie Unifiee injoignable.'
        },
        print_stack: false
    },
    MU_SERVICE_ERROR: {
        http_code: 500,
        http_body: {
            respstatus: '207',
            message: 'Erreur Enabler Messagerie Unifiee.'
        },
        print_stack: false
    },
    CFG_SERVICE_UNAVAILABLE: {
        http_code: 503,
        http_body: {
            respstatus: '208',
            message: 'Enabler CFG injoignable.'
        },
        print_stack: false
    },
    CFG_SERVICE_ERROR: {
        http_code: 500,
        http_body: {
            respstatus: '209',
            message: 'Erreur Enabler CFG.'
        },
        print_stack: false
    },
    GENMSG_SERVICE_UNAVAILABLE: {
        http_code: 503,
        http_body: {
            respstatus: '210',
            message: 'Enabler GenMSG injoignable.'
        },
        print_stack: false
    },
    GENMSG_SERVICE_ERROR: {
        http_code: 500,
        http_body: {
            respstatus: '211',
            message: 'Erreur Enabler GenMSG.'
        },
        print_stack: false
    },
    CFG_GET_KO_FONCTIONNEL: {
        http_code: 500,
        http_body: {
            respstatus: '212',
            message: 'Nous ne pouvons accÃ©der Ã  votre requÃªte suite Ã  un problÃ¨me technique. ' +
            'Veuillez rÃ©essayer ultÃ©rieurement et nous excuser pour la gÃªne occasionnÃ©e.'
        },
        print_stack: false
    },
    CFG_GET_KO_TECHNIQUE: {
        http_code: 500,
        http_body: {
            respstatus: '213',
            message: 'Nous ne pouvons accÃ©der Ã  votre requÃªte suite Ã  un problÃ¨me technique. ' +
            'Veuillez rÃ©essayer ultÃ©rieurement et nous excuser pour la gÃªne occasionnÃ©e.'
        },
        print_stack: false
    },
    CFG_GET_KO_PREMIUM: {
        http_code: 500,
        http_body: {
            respstatus: '214',
            message: 'Votre ligne bÃ©nÃ©ficie du service Renvoi d\'Appels Premium. ' +
            'Vous ne pouvez pas modifier vos paramÃ¨tres de renvoi depuis l\'application. ' +
            'Pour les consulter et les configurer, veuillez vous rendre dans votre espace client sur orange.fr.'
        },
        print_stack: false
    },
    CFG_SET_KO_FONCTIONNEL: {
        http_code: 500,
        http_body: {
            respstatus: '215',
            message: 'Nous ne pouvons accÃ©der Ã  votre requÃªte suite Ã  un problÃ¨me technique. ' +
            'Veuillez nous excuser pour la gÃªne occasionnÃ©e.'
        },
        print_stack: false
    },
    CFG_SET_KO_TECHNIQUE: {
        http_code: 500,
        http_body: {
            respstatus: '216',
            message: 'Nous ne pouvons accÃ©der Ã  votre requÃªte suite Ã  un problÃ¨me technique. ' +
            'Veuillez rÃ©essayer ultÃ©rieurement et nous excuser pour la gÃªne occasionnÃ©e.'
        },
        print_stack: false
    },
    CFG_SET_KO_NUM_FORMAT: {
        http_code: 500,
        http_body: {
            respstatus: '217',
            message: 'Le numÃ©ro de tÃ©lÃ©phone que vous avez saisi nâ€™est pas au bon format. ' +
            'Merci de vÃ©rifier votre saisie.'
        },
        print_stack: false
    },
    CFG_SET_KO_NUM_INTERNATIONAL: {
        http_code: 500,
        http_body: {
            respstatus: '218',
            message: 'Le renvoi d\'appel vers un numÃ©ro international n\'est pas possible depuis l\'application. ' +
            'Vous pouvez activer ce renvoi directement depuis le tÃ©lÃ©phone de votre ligne Livebox en composant le *21*, ' +
            'le numÃ©ro de renvoi puis #. Vous pouvez toujours dÃ©sactiver le renvoi d\'appel depuis l\'application.'
        },
        print_stack: false
    },
    CFG_SET_KO_NUM_INVALIDE: {
        http_code: 500,
        http_body: {
            respstatus: '219',
            message: 'Le numÃ©ro de tÃ©lÃ©phone que vous avez saisi est incorrect. ' +
            'Il doit impÃ©rativement dÃ©buter par 01, 02, 03, 04, 05, 06, 07, 087, 09. Merci de vÃ©rifier votre saisie.'
        },
        print_stack: false
    },
    CFG_SET_KO_INCOMPATIBLE: {
        http_code: 500,
        http_body: {
            respstatus: '220',
            message: 'Le renvoi demandÃ© nâ€™est pas compatible avec votre filtrage dâ€™appels.'
        },
        print_stack: false
    },
    ONGOING_SUBSCRIPTION: {
        http_code: 503,
        http_body: {
            respstatus: '220',
            message: 'Erreur Souscription deja en cours.'
        },
        print_stack: false
    },
    ONGOING_UNSUBSCRIPTION: {
        http_code: 503,
        http_body: {
            respstatus: '221',
            message: 'Erreur Desouscription deja en cours.'
        },
        print_stack: false
    },
    UNEXPECTED_ERROR: {
        http_code: 500,
        http_body: {
            respstatus: '300',
            message: 'Erreur interne.'
        },
        print_stack: true
    },
    BDD_ERROR: {
        http_code: 500,
        http_body: {
            respstatus: '301',
            message: 'Erreur base de donnÃ©es.'
        },
        print_stack: true
    }
};

module.exports = {EResult: EResult};