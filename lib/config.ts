export const dictionary = {
  fr: {
    common: {
      step: "Étape",
      of: "de",
      previous: "Précédent",
      next: "Suivant",
      edit: "Modifier",
    },
    header: {
      title: "Calculateur de Prime Assurance Ancêtre",
      subtitle: "Estimez votre prime d'assurance en quelques étapes simples.",
    },
    steps: {
      user: "Profil utilisateur",
      vehicle: "Véhicule à assurer",
      coverage: "Garanties souhaitées",
      summary: "Résumé & Prix",
    },
    fields: {
      userStatus: {
        label: "Je suis",
        options: {
          club_member: "Membre d’un club",
          supporter: "Supporter",
          individual: "Individuel",
        },
      },
      clubName: {
        label: "Nom du club",
        placeholder: "Sélectionnez votre club",
      },
      otherClub: {
        label: "Autre club (précisez)",
        placeholder: "Nom du club",
      },
      behvaRefNumber: {
        label: "Numéro de référence Behva",
        placeholder: "Ex: 123456",
      },
      contractType: {
        label: "Contrat",
        options: {
          new: "Nouveau contrat",
          change: "Changement de véhicule",
        },
      },
      vehicleOrContractNumber: {
        label: "Véhicule / N° Contrat",
        placeholder: "Plaque ou numéro de contrat",
      },
      vehicleType: {
        label: "Type de véhicule",
        placeholder: "Sélectionnez le type",
      },
      registrationStatus: {
        label: "Statut d'immatriculation",
        placeholder: "Sélectionnez le statut",
      },
      registrationNumber: {
        label: "Immatriculation",
        placeholder: "Ex: 1-ABC-123",
      },
      plateType: {
        label: "Type de plaque",
        placeholder: "Sélectionnez le type",
      },
      plateFormat: {
        label: "Format de la plaque",
        placeholder: "Sélectionnez le format",
      },
      brand: {
        label: "Marque",
        placeholder: "Ex: Porsche",
      },
      model: {
        label: "Modèle",
        placeholder: "Ex: 911",
      },
      chassisNumber: {
        label: "Numéro de châssis",
        placeholder: "Numéro de châssis",
      },
      firstRegistrationDate: {
        label: "Date de 1ère mise en circulation",
        placeholder: "JJ/MM/AAAA",
      },
      powerKw: {
        label: "Puissance (kW)",
        placeholder: "Ex: 150",
      },
      vehicleValue: {
        label: "Valeur du véhicule (€)",
        placeholder: "Ex: 25000",
      },
      isFirstVehicle: {
        label: "Est-ce le 1er véhicule assuré ?",
      },
      vehicleRank: {
        label: "Nombre de véhicules assurés",
        placeholder: "Sélectionner le rang",
      },
    },
    coverages: {
      rc: {
        label: "Responsabilité Civile",
        description: "Assurance obligatoire pour rouler.",
      },
      surcharge: {
        individual: {
          label: "Cotisation Membre (Individuel)",
        },
      },
      omnium: {
      label: "Omnium",
        description: "Couvre les dommages à votre propre véhicule. La franchise pour dégâts matériels et vandalisme est de 2,5% de la valeur assurée (min. 250€, max. 1.250€).",
      full: {
        label: "Omnium Complète",
        description: "Couvre les dommages propres, le vandalisme, le vol, l'incendie, le bris de glace, les forces de la nature et les collisions avec des animaux."
      },
      mini: {
        label: "Mini Omnium",
        description: "Couvre le vol, l'incendie, le bris de glace, les forces de la nature et les collisions avec des animaux."
      }
    },
    omniumType: {
      full: "Omnium Complète",
      mini: "Mini Omnium",
    },
      assistance: {
        label: "Assistance",
        description: "Dépannage inclus en cas d'accident ou de panne (sauf vélomoteurs et tracteurs agricoles). Franchise de 5km du domicile (sauf accident). Valable en Belgique et pays limitrophes.",
      },
      legalProtection: {
        label: "Protection Juridique",
        description: "Aide juridique en cas de litige.",
        details:
          "Libre choix d’un avocat - Recours civil/pénale/contractuel - 12.500 EUR par sinistre",
      },
      driverProtection: {
        label: "Protection des conducteurs",
        description: "Garanties: Décès 12.500€, Invalidité Permanente 25.000€, Frais Médicaux 2.500€. Prime: Voiture 9€, Moto/Cyclo 12€.",
      },
      fireTheftResting: {
        label: "Incendie / Vol au repos",
        description: "Couvre le véhicule au garage (non immatriculé).",
      },
      assistancePlus: {
        label: "Extension Assistance Europe",
        description: "Étend la couverture à toute l'Europe avec véhicule de remplacement et assistance à la famille.",
      },
    },
    summary: {
      title: "Vérifiez votre demande",
      calculating: "Complétez le formulaire pour voir votre estimation.",
      annualPremium: "Prime annuelle estimée",
      monthlyPremium: "Soit par mois",
      breakdown: "Détail des garanties",
      disclaimer: "Estimation indicative – l’offre finale sera confirmée par BEHVA.",
      cta: "Demander une offre complète",
      contactTitle: "Vos coordonnées",
      submit: "Envoyer ma demande",
      submitting: "Envoi en cours...",
      submitError: "Une erreur est survenue lors de l'envoi du formulaire. Veuillez réessayer.",
      successTitle: "Merci !",
      successMessage: "Votre demande a été enregistrée. Nous vous contacterons bientôt à l'adresse {email} avec une offre complète.",
      vehicle: "Véhicule",
      year: "Année",
      power: "Puissance",
      status: "Statut",
      member: "Membre",
      notMember: "Non membre",
      coveragesChosen: "Garanties choisies",
      memberDiscount: "Réduction membre",
      calculationDetails: "Détails du calcul",
      details: {
        category: "Catégorie",
        vehicleAge: "Âge du véhicule",
        years: "ans",
        ageGroup: "Groupe d'âge",
        rank: "Rang",
        firstVehicle: "1er véhicule",
        additionalVehicle: "Véhicule supplémentaire",
        power: "Puissance",
        rule: "Règle appliquée",
        condition: "Condition",
        vehicleValue: "Valeur du véhicule",
        omniumType: "Type d'omnium",
        mopeds: "Cyclomoteurs",
        allOtherCategories: "Toutes les autres catégories",
        vehicleAtRest: "Véhicule au repos (0.58%)",
        miniOmnium25: "Mini-Omnium, 25+ ans (0.83%)",
        miniOmnium15_24: "Mini-Omnium, 15-24 ans (1.18%)",
        omniumPercentage25: "Omnium, 25+ ans (% de la valeur)",
        omniumPercentage15_24: "Omnium, 15-24 ans (% de la valeur)",
        omniumTable: "Tableau Omnium standard",
        minPremiumApplied: "Prime minimale appliquée",
        percentage: "Pourcentage",
      },
      notes: {
        title: "Remarques",
        contactBrokerOmnium: "Pour les véhicules de plus de 150.000 €, veuillez contacter le courtier.",
      }
    },
    contact: {
      firstName: "Prénom",
      lastName: "Nom",
      email: "Email",
      phone: "Téléphone (optionnel)",
    },
    warnings: {
      omnium: "Combinaison à vérifier",
      omniumDesc: "L'Omnium complète pour un véhicule non immatriculé nécessite une vérification avec BEHVA.",
      assistanceDisabled: "Non disponible pour ce type de véhicule",
    },
    validation: {
      required: "Ce champ est obligatoire",
      brandRequired: "La marque est obligatoire",
      modelRequired: "Le modèle est obligatoire",
      chassisRequired: "Le numéro de châssis est obligatoire",
      dateRequired: "La date est obligatoire",
      dateInvalid: "Date invalide",
      powerRequired: "La puissance est obligatoire",
      numberInvalid: "Veuillez entrer un nombre valide",
      powerMin: "La puissance doit être supérieure à 0",
      firstNameRequired: "Le prénom est obligatoire",
      lastNameRequired: "Le nom est obligatoire",
      emailRequired: "L'email est obligatoire",
      emailInvalid: "Adresse email invalide",
    },
    options: {
      vehicleTypes: {
        car: "Voiture",
        motorcycle: "Moto",
        van: "Camionnette",
        tractor: "Tracteur",
        truck: "Camion",
        bus: "Autobus",
        trailer: "Remorque",
        caravan: "Caravane",
        moped: "Cyclomoteur",
      },
      registrationStatuses: {
        not_registered: "Pas encore immatriculé",
        registered: "Immatriculé à votre nom",
        storage: "Sans immatriculation (au repos)",
      },
      plateTypes: {
        normal: "Plaque normale",
        classic: "Plaque ancêtre (O)",
      },
      vehicleRanks: {
        "1": "1er Véhicule",
        "2": "2ème Véhicule",
        "3+": "3ème Véhicule ou plus",
      },
      plateFormats: {
        rectangular: "Rectangulaire (52×11)",
        square: "Carré (34×21)",
        moto: "Format Moto",
        cyclo: "Format Cyclo",
      },
    },
  },
  en: {
    common: {
    step: "Step",
    of: "of",
    previous: "Previous",
    next: "Next",
    edit: "Edit",
  },
    header: {
      title: "Classic Car Insurance Premium Calculator",
      subtitle: "Estimate your insurance premium in a few simple steps.",
    },
    steps: {
      user: "User Profile",
      vehicle: "Vehicle to Insure",
      coverage: "Desired Coverages",
      summary: "Summary & Price",
    },
    fields: {
      userStatus: {
        label: "I am",
        options: {
          club_member: "Club Member",
          supporter: "Supporter",
          individual: "Individual",
        },
      },
      clubName: {
        label: "Club Name",
        placeholder: "Select your club",
      },
      otherClub: {
        label: "Other club (specify)",
        placeholder: "Club Name",
      },
      behvaRefNumber: {
        label: "BEHVA Reference Number",
        placeholder: "Ex: 123456",
      },
      contractType: {
        label: "Contract",
        options: {
          new: "New contract",
          change: "Vehicle change",
        },
      },
      vehicleOrContractNumber: {
        label: "Vehicle / Contract No.",
        placeholder: "Plate or contract number",
      },
      vehicleType: {
        label: "Vehicle Type",
        placeholder: "Select type",
      },
      registrationStatus: {
        label: "Registration Status",
        placeholder: "Select status",
      },
      registrationNumber: {
        label: "Registration",
        placeholder: "Ex: 1-ABC-123",
      },
      plateType: {
        label: "Plate Type",
        placeholder: "Select type",
      },
      plateFormat: {
        label: "Plate Format",
        placeholder: "Select format",
      },
      brand: {
        label: "Brand",
        placeholder: "Ex: Porsche",
      },
      model: {
        label: "Model",
        placeholder: "Ex: 911",
      },
      chassisNumber: {
        label: "Chassis Number",
        placeholder: "Chassis Number",
      },
      firstRegistrationDate: {
        label: "First Registration Date",
        placeholder: "DD/MM/YYYY",
      },
      powerKw: {
        label: "Power (kW)",
        placeholder: "Ex: 150",
      },
      vehicleValue: {
        label: "Vehicle Value (€)",
        placeholder: "Ex: 25000",
      },
      isFirstVehicle: {
        label: "Is this the 1st insured vehicle?",
      },
      vehicleRank: {
        label: "Number of insured vehicles",
        placeholder: "Select rank",
      },
    },
    coverages: {
      rc: {
        label: "Civil Liability",
        description: "Mandatory insurance for driving.",
      },
      surcharge: {
        individual: {
          label: "Membership Fee (Individual)",
        },
      },
      omnium: {
        label: "Omnium",
        description: "Covers damage to your own vehicle. The deductible for material damage and vandalism is 2.5% of the insured value (min. €250, max. €1,250).",
        full: {
          label: "Full Omnium",
          description: "Covers own damage, vandalism, theft, fire, glass breakage, natural forces, and collisions with animals."
        },
        mini: {
          label: "Mini Omnium",
          description: "Covers theft, fire, glass breakage, natural forces, and collisions with animals."
        }
      },
      omniumType: {
        full: "Full Omnium",
        mini: "Mini Omnium",
      },
      assistance: {
        label: "Assistance",
        description: "Breakdown assistance included in case of accident or breakdown (except for mopeds and agricultural tractors). 5km deductible from home (except in case of accident). Valid in Belgium and neighboring countries.",
      },
      legalProtection: {
        label: "Legal Protection",
        description: "Legal help in case of dispute.",
        details:
          "Free choice of a lawyer - Civil/penal/contractual recourse - 12,500 EUR per claim",
      },
      driverProtection: {
        label: "Driver Protection",
        description: "Coverage: Death €12,500, Permanent Disability €25,000, Medical Expenses €2,500. Premium: Car €9, Moto/Moped €12.",
      },
      fireTheftResting: {
        label: "Fire / Theft Resting",
        description: "Covers the vehicle in the garage (not registered).",
      },
      assistancePlus: {
        label: "Europe Assistance Extension",
        description: "Extends coverage to all of Europe with a replacement vehicle and family assistance.",
      },
    },
    summary: {
      title: "Review your submission",
      calculating: "Complete the form to see your estimate.",
      annualPremium: "Estimated Annual Premium",
      monthlyPremium: "Or per month",
      breakdown: "Coverage Details",
      disclaimer: "Indicative estimate – final offer will be confirmed by BEHVA.",
      cta: "Request Full Offer",
      contactTitle: "Your Details",
      submit: "Send My Request",
      submitting: "Sending...",
      submitError: "An error occurred while submitting the form. Please try again.",
      successTitle: "Thank you!",
      successMessage: "Your request has been recorded. We will contact you soon at {email} with a full offer.",
      vehicle: "Vehicle",
      year: "Year",
      power: "Power",
      status: "Status",
      member: "Member",
      notMember: "Non-member",
      coveragesChosen: "Chosen Coverages",
      memberDiscount: "Member Discount",
      calculationDetails: "Calculation Details",
      details: {
        category: "Category",
        vehicleAge: "Vehicle Age",
        years: "years",
        ageGroup: "Age Group",
        rank: "Rank",
        firstVehicle: "1st Vehicle",
        additionalVehicle: "Additional Vehicle",
        power: "Power",
        rule: "Applied Rule",
        condition: "Condition",
        vehicleValue: "Vehicle Value",
        omniumType: "Omnium Type",
        mopeds: "Mopeds",
        allOtherCategories: "All other categories",
        vehicleAtRest: "Vehicle at rest (0.58%)",
        miniOmnium25: "Mini-Omnium, 25+ years (0.83%)",
        miniOmnium15_24: "Mini-Omnium, 15-24 years (1.18%)",
        omniumPercentage25: "Omnium, 25+ years (% of value)",
        omniumPercentage15_24: "Omnium, 15-24 years (% of value)",
        omniumTable: "Standard Omnium Table",
        minPremiumApplied: "Minimum premium applied",
        percentage: "Percentage",
      },
      notes: {
        title: "Notes",
        contactBrokerOmnium: "For vehicles over €150,000, please contact the broker.",
      }
    },
    contact: {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone (optional)",
    },
    warnings: {
      omnium: "Combination to verify",
      omniumDesc: "Full Omnium for an unregistered vehicle requires verification with BEHVA.",
      assistanceDisabled: "Not available for this vehicle type",
    },
    validation: {
      required: "This field is required",
      brandRequired: "Brand is required",
      modelRequired: "Model is required",
      chassisRequired: "Chassis number is required",
      dateRequired: "Date is required",
      dateInvalid: "Invalid date",
      powerRequired: "Power is required",
      numberInvalid: "Please enter a valid number",
      powerMin: "Power must be greater than 0",
      firstNameRequired: "First name is required",
      lastNameRequired: "Last name is required",
      emailRequired: "Email is required",
      emailInvalid: "Invalid email address",
    },
    options: {
      vehicleTypes: {
        car: "Car",
        motorcycle: "Motorcycle",
        van: "Van",
        tractor: "Tractor",
        truck: "Truck",
        bus: "Bus",
        trailer: "Trailer",
        caravan: "Caravan",
        moped: "Moped",
      },
      registrationStatuses: {
        not_registered: "Not yet registered",
        registered: "Registered in your name",
        storage: "Unregistered (storage)",
      },
      plateTypes: {
        normal: "Normal Plate",
        classic: "Classic Plate (O)",
      },
      vehicleRanks: {
        "1": "1st Vehicle",
        "2": "2nd Vehicle",
        "3+": "3rd Vehicle or more",
      },
      plateFormats: {
        rectangular: "Rectangular (52×11)",
        square: "Square (34×21)",
        moto: "Motorcycle Format",
        cyclo: "Moped Format",
      },
    },
  },
  nl: {
    common: {
      step: "Stap",
      of: "van",
      previous: "Vorige",
      next: "Volgende",
      edit: "Bewerken",
    },
    header: {
      title: "Premiecalculator Oldtimerverzekering",
      subtitle: "Schat uw verzekeringspremie in enkele eenvoudige stappen.",
    },
    steps: {
      user: "Gebruikersprofiel",
      vehicle: "Te verzekeren voertuig",
      coverage: "Gewenste waarborgen",
      summary: "Samenvatting & Prijs",
    },
    fields: {
      userStatus: {
        label: "Ik ben",
        options: {
          club_member: "Clublid",
          supporter: "Supporter",
          individual: "Individu",
        },
      },
      clubName: {
        label: "Clubnaam",
        placeholder: "Selecteer uw club",
      },
      otherClub: {
        label: "Andere club (specificeer)",
        placeholder: "Clubnaam",
      },
      behvaRefNumber: {
        label: "BEHVA Referentienummer",
        placeholder: "Bijv: 123456",
      },
      contractType: {
        label: "Contract",
        options: {
          new: "Nieuw contract",
          change: "Voertuigwijziging",
        },
      },
      vehicleOrContractNumber: {
        label: "Voertuig / Contract Nr.",
        placeholder: "Nummerplaat of contractnummer",
      },
      vehicleType: {
        label: "Type voertuig",
        placeholder: "Selecteer type",
      },
      registrationStatus: {
        label: "Inschrijvingsstatus",
        placeholder: "Selecteer status",
      },
      registrationNumber: {
        label: "Inschrijving",
        placeholder: "Bijv: 1-ABC-123",
      },
      plateType: {
        label: "Type plaat",
        placeholder: "Selecteer type",
      },
      plateFormat: {
        label: "Plaatsformaat",
        placeholder: "Selecteer formaat",
      },
      brand: {
        label: "Merk",
        placeholder: "Bijv: Porsche",
      },
      model: {
        label: "Model",
        placeholder: "Bijv: 911",
      },
      chassisNumber: {
        label: "Chassisnummer",
        placeholder: "Chassisnummer",
      },
      firstRegistrationDate: {
        label: "Datum 1e ingebruikname",
        placeholder: "DD/MM/JJJJ",
      },
      powerKw: {
        label: "Vermogen (kW)",
        placeholder: "Bijv: 150",
      },
      vehicleValue: {
        label: "Waarde voertuig (€)",
        placeholder: "Bijv: 25000",
      },
      isFirstVehicle: {
        label: "Is dit het 1ste verzekerde voertuig?",
      },
      vehicleRank: {
        label: "Aantal verzekerde voertuigen",
        placeholder: "Selecteer rang",
      },
    },
    coverages: {
      rc: {
        label: "Burgerlijke Aansprakelijkheid",
        description: "Verplichte verzekering om te rijden.",
      },
      surcharge: {
        individual: {
          label: "Lidmaatschapsbijdrage (Individueel)",
        },
      },
      omnium: {
        label: "Omnium",
        description: "Dekt schade aan uw eigen voertuig. De franchise voor materiële schade en vandalisme bedraagt 2,5% van de verzekerde waarde (min. €250, max. €1.250).",
        full: {
          label: "Volledige Omnium",
          description: "Dekt eigen schade, vandalisme, diefstal, brand, glasbreuk, natuurkrachten en aanrijdingen met dieren."
        },
        mini: {
          label: "Mini Omnium",
          description: "Dekt diefstal, brand, glasbreuk, natuurkrachten en aanrijdingen met dieren."
        }
      },
      omniumType: {
        full: "Volledige Omnium",
        mini: "Mini Omnium",
      },
      assistance: {
        label: "Bijstand",
        description: "Pechverhelping inbegrepen bij ongeval of pech (behalve voor bromfietsen en landbouwtractoren). Franchise van 5 km vanaf de woonplaats (behalve bij ongeval). Geldig in België en buurlanden.",
      },
      legalProtection: {
        label: "Rechtsbijstand",
        description: "Juridische hulp bij geschillen.",
        details:
          "Vrije keuze van advocaat - Burgerlijk/strafrechtelijk/contractueel verhaal - 12.500 EUR per schadegeval",
      },
      driverProtection: {
        label: "Bestuurdersbescherming",
        description: "Dekking: Overlijden €12.500, Blijvende Invaliditeit €25.000, Medische Kosten €2.500. Premie: Auto €9, Moto/Bromfiets €12.",
      },
      fireTheftResting: {
        label: "Brand / Diefstal (Stilstand)",
        description: "Dekt het voertuig in de garage (niet ingeschreven).",
      },
      assistancePlus: {
        label: "Uitbreiding Bijstand Europa",
        description: "Breidt de dekking uit naar heel Europa met een vervangwagen en bijstand aan het gezin.",
      },
    },
    summary: {
      title: "Controleer uw inzending",
      calculating: "Vul het formulier in om uw schatting te zien.",
      annualPremium: "Geschatte Jaarpremie",
      monthlyPremium: "Of per maand",
      breakdown: "Detail van de waarborgen",
      disclaimer: "Indicatieve schatting – het definitieve aanbod wordt bevestigd door BEHVA.",
      cta: "Volledige offerte aanvragen",
      contactTitle: "Uw gegevens",
      submit: "Mijn aanvraag versturen",
      submitting: "Verzenden...",
      submitError: "Er is een fout opgetreden bij het verzenden van het formulier. Probeer het opnieuw.",
      successTitle: "Bedankt!",
      successMessage: "Uw aanvraag is geregistreerd. We nemen binnenkort contact met u op via {email} met een volledig aanbod.",
      vehicle: "Voertuig",
      year: "Jaar",
      power: "Vermogen",
      status: "Status",
      member: "Lid",
      notMember: "Geen lid",
      coveragesChosen: "Gekozen waarborgen",
      memberDiscount: "Ledenkorting",
      calculationDetails: "Berekeningsdetails",
      details: {
        category: "Categorie",
        vehicleAge: "Leeftijd voertuig",
        years: "jaar",
        ageGroup: "Leeftijdsgroep",
        rank: "Rang",
        firstVehicle: "1ste Voertuig",
        additionalVehicle: "Extra Voertuig",
        power: "Vermogen",
        rule: "Toegepaste Regel",
        condition: "Voorwaarde",
        vehicleValue: "Waarde voertuig",
        omniumType: "Type omnium",
        mopeds: "Bromfietsen",
        allOtherCategories: "Alle andere categorieën",
        vehicleAtRest: "Voertuig in rust (0.58%)",
        miniOmnium25: "Mini-Omnium, 25+ jaar (0.83%)",
        miniOmnium15_24: "Mini-Omnium, 15-24 jaar (1.18%)",
        omniumPercentage25: "Omnium, 25+ jaar (% van waarde)",
        omniumPercentage15_24: "Omnium, 15-24 jaar (% van waarde)",
        omniumTable: "Standaard Omnium Tabel",
        minPremiumApplied: "Minimumpremie toegepast",
        percentage: "Percentage",
      },
      notes: {
        title: "Notities",
        contactBrokerOmnium: "Voor voertuigen boven €150.000, neem contact op met de makelaar.",
      }
    },
    contact: {
      firstName: "Voornaam",
      lastName: "Naam",
      email: "E-mail",
      phone: "Telefoon (optioneel)",
    },
    warnings: {
      omnium: "Combinatie te verifiëren",
      omniumDesc: "Volledige Omnium voor een niet-ingeschreven voertuig vereist verificatie met BEHVA.",
      assistanceDisabled: "Niet beschikbaar voor dit type voertuig",
    },
    validation: {
      required: "Dit veld is verplicht",
      brandRequired: "Merk is verplicht",
      modelRequired: "Model is verplicht",
      chassisRequired: "Chassisnummer is verplicht",
      dateRequired: "Datum is verplicht",
      dateInvalid: "Ongeldige datum",
      powerRequired: "Vermogen is verplicht",
      numberInvalid: "Voer een geldig getal in",
      powerMin: "Vermogen moet groter zijn dan 0",
      firstNameRequired: "Voornaam is verplicht",
      lastNameRequired: "Achternaam is verplicht",
      emailRequired: "E-mail is verplicht",
      emailInvalid: "Ongeldig e-mailadres",
    },
    options: {
      vehicleTypes: {
        car: "Auto",
        motorcycle: "Motorfiets",
        van: "Bestelwagen",
        tractor: "Tractor",
        truck: "Vrachtwagen",
        bus: "Bus",
        trailer: "Aanhangwagen",
        caravan: "Caravan",
        moped: "Bromfiets",
      },
      registrationStatuses: {
        not_registered: "Nog niet ingeschreven",
        registered: "Op uw naam ingeschreven",
        storage: "Zonder inschrijving (stalling)",
      },
      plateTypes: {
        normal: "Normale Plaat",
        classic: "Oldtimer Plaat (O)",
      },
      vehicleRanks: {
        "1": "1ste Voertuig",
        "2": "2de Voertuig",
        "3+": "3de Voertuig of meer",
      },
      plateFormats: {
        rectangular: "Rechthoekig (52×11)",
        square: "Vierkant (34×21)",
        moto: "Motorfietsformaat",
        cyclo: "Bromfietsformaat",
      },
    },
  },
};

export const config = {
  clubs: [
    "Club Porsche Francorchamps",
    "Royal Automobile Club",
    "Autre club",
  ],
};

export type Language = "fr" | "en" | "nl";
export type Dictionary = typeof dictionary.fr;
