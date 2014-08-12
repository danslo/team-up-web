define(
  {
    ui: {
      nl: {
        meta: {
          name: 'nl',
          label: 'Nederlands'
        },
        login: {
          header: 'Inloggen',
          placeholder_username: 'Vul uw gebruikersnaam in',
          placeholder_password: 'Vul uw wachtwoord in',
          label_rememberMe: 'Onthoud mij',
          button_login: 'Inloggen',
          button_loggingIn: 'Inloggen...',
          forgot_password: 'Wachtwoord vergeten?',
          forgetPassword: 'Wachtwoord vergeten',
          emailAddress: 'Emailadres',
          resetPassword: 'Wachtwoord opnieuw instellen',
          returnLogin: 'Terugkeren om in te loggen',
          changePassword: 'Wachtwoord wijzigen',
          downloadApp: 'Download mobiele app',
          ph_username: 'Gebruikersnaam',
          ph_password: 'Wachtwoord',
          ph_newPass: 'nieuw wachtwoord',
          ph_retypePass: 'Herhaal wachtwoord',
          alert_fillfiled: 'Vul alle velden in!',
          alert_wrongUserPass: 'Onjuiste gebruikersnaam of wachtwoord!',
          loading_User: 'Gebruikersinformatie laden...',
          loading_Message: 'Berichten laden...',
          loading_Group: 'Groepen laden...',
          loading_Members: 'Leden laden...',
          loading_everything: 'Alles is geladen!',
          logout: 'Uitloggen',
          loading: 'Laden..',
          loading_clientGroups: 'Cliëntengroepen laden...'
        },
        dashboard: {
          thisWeek: 'Deze week',
          welcome: 'Welkom',
          newMessage: 'Nieuwe berichten',
          goToInbox: 'Ga naar inbox',
          loadingPie: 'Cirkeldiagrammen laden...',
          announcements: 'Alarmberichten',
          loadingP2000: 'Alarmberichten laden...',
          noP2000: 'Er zijn geen alarmberichten.'
        },
        planboard: {
          planboard: 'Agenda',
          newAvail: 'Nieuwe beschikbaarheid',
          day: 'Dag',
          week: 'Week',
          month: 'Maand',
          updateAvail: 'Update beschikbaarheid',
          from: 'Van',
          till: 'Tot',
          state: 'Status',
          selectAState: 'selecteer een status',
          reoccuring: 'Herhaling',
          lessPeople: 'Er is een tekort van $v mens(en)!',
          samePeople: 'Er zijn precies genoeg mensen.',
          morePeople: 'Er is een overschot van $v mens(en)!',
          wished: 'Gewenst',
          combine_reoccuring: 'Dit is een gecombineerde planning.',
          sendMsgToMember: 'Stuur bericht naar leden',
          add: 'Toevoegen',
          del: 'Verwijderen',
          change: 'Wijzigen',
          setWish: 'Behoefte instellen',
          timeline: 'Tijdlijn',
          statistics: 'Statistieken',
          barCharts: 'Staafdiagrammen',
          wishes: 'Behoefte',
          legenda: 'Legenda',
          group: 'Groep',
          groups: 'Groepen',
          members: 'Leden',
          bothAvailable: 'Beide beschikbaar',
          northAavailable: 'Beschikbaar Noord',
          southAvailable: 'Beschikbaar Zuid',
          skipperOutService: 'Schipper van dienst',
          notAvailable: 'Niet beschikbaar',
          notachieve: 'Niet behaald',
          legendaLabels: {
            morePeople: 'Meer mensen',
            enoughPeople: 'Precies genoeg mensen',
            lessPeople: 'Te weinig mensen'
          },
          lastSyncTime: 'Laatste synchronisatietijd:',
          dataRangeStart: 'Begin gegevensscala: ',
          DataRangeEnd: 'Eind gegevensscala: ',
          loadingTimeline: 'Tijdlijn laden...',
          addTimeSlot: 'Tijdslot toevoegen...',
          slotAdded: 'Tijdslot succesvol toegevoegd.',
          changingSlot: 'Tijdslot wijzigen...',
          slotChanged: 'Tijdslot succesvol gewijzigd.',
          changingWish: 'Behoefte wijzigen...',
          wishChanged: 'Behoefte succesvol gewijzigd.',
          deletingTimeslot: 'Tijdslot verwijderen...',
          timeslotDeleted: 'Tijdslot succesvol verwijderd.',
          refreshTimeline: 'Tijdlijn vernieuwen...',
          preCompilingStortageMessage: 'Opstellen tekortbericht',
          weeklyPlanning: 'Wekelijkse planning',
          planning: 'Planning',
          minNumber: 'Minimum aantal benodigde mensen',
          time: 'Time: ',
          weekNumber: 'Weeknummer: ',
          monthNumber: 'Maand nummer: ',
          totalDays: 'Totaal dagen: '
        },
        message: {
          messages: 'Berichten',
          composeAMessage: 'Bericht opstellen',
          compose: 'Opstellen',
          inbox: 'Inbox',
          outbox: 'Outbox',
          trash: 'Prullenbak',
          composeMessage: 'Bericht opstellen',
          close: 'Sluiten',
          broadcast: 'Extra medium',
          sms: 'SMS',
          email: 'Email',
          receviers: 'Ontvanger(s)',
          // troubled
          // chooseRecept: 'Ontvanger(s) selecteren',
          //
          subject: 'Onderwerp',
          message: 'Bericht',
          sendMessage: 'Bericht versturen',
          sender: 'Zender',
          date: 'Datum',
          questionText: 'Bericht',
          reply: 'Antwoorden',
          del: 'Verwijderen',
          noMessage: 'Er zijn geen berichten.',
          from: 'Van',
          newMsg: 'Nieuw',
          deleteSelected: 'Verwijder geselecteerde berichten',
          someMessage: 'Er zijn $v berichten',
          emptyTrash: 'Prullenbak legen',
          noMsgInTrash: 'Er zijn geen berichten.',
          box: 'Box',
          persons: 'Personen',
          restoreSelected: 'Geselecteerde berichten terugplaatsen',
          loadingMessage: 'Bericht laden...',
          escalation: 'Escalatiebericht',
          escalationBody: function (diff, startDate, startTime, endDate, endTime)
          {
            return 'Er is een tekort van ' +
                   diff +
                   ' mensen tussen ' +
                   startDate + ' ' +
                   startTime + ' en ' +
                   endDate + ' ' +
                   endTime + '. ' +
                   'Zet uzelf a.u.b. op beschikbaar indien u beschikbaar bent voor die periode';
          },
          removed: 'Bericht succesvol verwijderd.',
          removing: 'Bericht verwijderen...',
          refreshing: 'Bericht vernieuwen...',
          removingSelected: 'Geselecteerde berichten verwijderen...',
          restoring: 'Bericht terugplaatsen...',
          restored: 'Bericht succesvol teruggeplaatst.',
          restoringSelected: 'Geselecteerde berichten terugplaatsen...',
          emptying: 'Prullenbak leegmaken...',
          emptied: 'Prullenbak succesvol geleegd.',
          sending: 'Bericht versturen...',
          sent: 'Bericht verstuurd.',
          typeSubject: 'Vul een onderwerp in.',
          // messages: 'Berichten',
          ph_filterMessage: 'Berichten filteren...',
          noReceivers: 'Selecteer een ontvanger',
          emptyMessageBody: 'Het bericht is leeg, typ a.u.b. een bericht.',
          send: 'Versturen'
        },
        groups: {
          groups: 'Groepen',
          newGroup: 'Nieuwe groep',
          newMember: 'Nieuw lid',
          serach: 'Zoeken',
          addNewGroup: 'Nieuwe groep toevoegen',
          editGroup: 'Groep wijzigen',
          searchResults: 'Zoekresultaten',
          group: 'Groep',
          close: 'Sluiten',
          name: 'Naam',
          saveGroup: 'Groep opslaan',
          registerMember: 'Lid registreren',
          role: 'Functie',
          selectRole: 'Selecteer een functie',
          // troubled
          // selectGroup: 'Selecteer een group',
          //
          email: 'Email',
          phone: 'Telefoon',
          address: 'Adres',
          postCode: 'Postcode',
          tel: 'Telefoonnummer',
          city: 'Woonplaats',
          userName: 'Gebruikersnaam',
          password: 'Wachtwoord',
          saveMember: 'Lid opslaan',
          serachFor: 'Zoekresultaten voor ',
          sorryCanNotFind: 'Sorry, geen resultaten.',
          addToGroup: 'Aan groep toevoegen',
          addMemberToGroup: 'Voeg geselecteerde leden aan groep toe',
          resultCount: 'Er zijn $v resultaten.',
          deleteGroup: 'Groep verwijderen',
          noMembers: 'Er zijn geen leden.',
          removeSelectedMembers: 'Geselecteerde leden verwijderen',
          memberCount: 'Er zijn $v leden.',
          searchingMembers: 'Leden zoeken...',
          addingNewMember: 'Nieuw lid toevoegen...',
          memberAdded: 'Lid succesvol aan groep toegevoegd.',
          refreshingGroupMember: 'Groepen- en ledenlijst vernieuwen...',
          removingMember: 'Lid uit groep verwijderen...',
          memberRemoved: 'Lid succesvol uit groep verwijderd.',
          removingSelected: 'Geselecteerde leden verwijderen...',
          saving: 'Groep opslaan...',
          groupSaved: 'Groep succesvol opgeslagen.',
          registerNew: 'Nieuw lid registreren...',
          memberRegstered: 'Lid succesvol geregistreerd.',
          deleting: 'Groep verwijderen...',
          deleted: 'Groep succesvol verwijderd.',
          filterMembers: 'Leden filteren...',
          searchfor: 'voornaam, achternaam..'
        },
        profile: {
          profile: 'Profiel',
          edit: 'Wijzigen',
          password: 'Wachtwoord',
          timeline: 'Tijdlijn',
          profileView: 'Profiel weergave',
          userGroups: 'Gebruikersgroepen',
          role: 'Functie',
          email: 'Email',
          phone: 'Telefoon',
          address: 'Adres',
          postcode: 'Postcode',
          city: 'Woonplaats',
          editProfile: 'Profiel wijzigen',
          name: 'Naam',
          saveProfile: 'Profiel opslaan',
          passChange: 'Wachtwoord wijzigen',
          currentPass: 'Huidig wachtwoord',
          newPass: 'Nieuw wachtwoord',
          newPassRepeat: 'Herhaal nieuw wachtwoord',
          changePass: 'Wachtwoord wijzigen',
          newAvail: 'Nieuwe beschikbaarheid',
          // saveProfile: 'Profielinformatie opslaan...',
          refreshing: 'Profielinformatie vernieuwen...',
          dataChanged: 'Profielgegevens succesvol gewijzigd.',
          pleaseFill: 'Vul a.u.b. alle velden in!',
          passNotMatch: 'Ingevoerd wachtwoord komt niet overeen. Probeer het opnieuw.',
          changingPass: 'Wachtwoord wijzigen...',
          passChanged: 'Wachtwoord succesvol gewijzigd.',
          passwrong: 'Ingevoerd wachtwoord is foutief! Probeer het opnieuw.',
          newTimeslotAdded: 'Nieuw tijdslot succesvol toegevoegd.',
          changingTimeslot: 'Tijdslot wijzigen...',
          timeslotChanged: 'Tijdslot succesvol gewijzigd.',
          firstName: 'Voornaam',
          lastName: 'Achternaam',
          editProfileImg: 'Profielfoto wijzigen',
          loadUploadURL: 'Foto upload URL laden',
          click2upload: 'Klik hier om te uploaden',
          birthday: 'Geboortedatum',
          username: 'Gebruikersnaam',
          retypePassword: 'Herhaal wachtwoord',
          roleChangePrompt: 'Je verandert je eigen rol. Het systeem zal hierdoor automatisch uitloggen. Druk op "Ok" om verder te gaan.',//'You changed your own role, system will automatically logout, press "Yes" to continue.',
          specifyTeam: 'Selecteer een team voor deze gebruiker.'//'You need to sepcify a team to this user'
        },
        settings: {
          settings: 'Instellingen',
          user: 'Gebruiker',
          application: 'Applicatie',
          userSettings: 'Gebruikersinstellingen',
          appSettings: 'Applicatie-instellingen',
          saveSettings: 'Instellingen opslaan',
          langSetting: 'Taal',
          saving: 'Instellingen wijzigen...',
          refreshing: 'Instellingen vernieuwen...',
          saved: 'Instellingen succesvol gewijzigd.'
        },
        help: {
          header: 'Hulp & Ondersteuning',
          support: 'Ondersteuning'
        },
        downloads: {
          app: 'Binnenkort te downloaden.',
          manual: 'Download handleiding'
        },
        loading: {
          general: 'Laden',
          dashboard: 'dashboard',
          planboard: 'agenda',
          messages: 'berichten',
          groups: 'groepen',
          profile: 'profiel',
          settings: 'instellingen'
        },
        teamup: {
          teams: 'Teams',
          clients: 'Cliënten',
          manage: 'Beheren',
          chooseTeam: 'Selecteer een team',
          edit: 'Bewerk',
          editTeam: 'Bewerk team',
          team: 'Team',
          del: 'Verwijder',
          noMembers: 'Geen leden in dit team.',
          newTeam: 'Nieuw Team',
          teamName: 'Teamnaam',
          createTeam: 'Opslaan',
          newMember: 'Nieuw lid',
          name: 'Naam',
          role: 'Rol',
          phone: 'Telefoon',
          street: 'Straat',
          postCode: 'Postcode',
          city: 'Woonplaats',
          saveMember: 'Opslaan',
          state: 'Status',
          states: 'Status',
          saveTeam: 'Team opslaan',
          save: 'Opslaan',
          refreshing: 'Teaminformatie opnieuw ophalen',
          dataChanged: 'Data is veranderd.',
          teamSubmitError: 'Fouten tijdens aanmaken van het team.',
          queryTeamError: 'Fouten tijdens het opzoeken van de teams.',
          teamNamePrompt1: 'Vul een teamnaam in.',
          teamNamePrompt2: 'Voeg contactdata toe a.u.b.',
          cancel: 'Annuleren',
          chooseRole: 'Kies een rol',
          func: 'Functie',
          chooseFunction: 'Kies een functie',
          newClientGroup: 'Nieuwe groep',
          newClient: 'Nieuwe cliënt',
          reports: 'Rapporten',
          report: 'Rapport',
          noClients: 'Geen cliënten in deze groep',
          TeamClients: 'TEAMS - CLIËNTEN',
          createClientGroup: 'Opslaan',
          contacts: 'Contacten',
          Number: 'Nummer',
          clientProfileUrl: 'URL Cliëntenprofiel',
          addContact: 'Contactpersoon toevoegen',
          saveClient: 'Opslaan',
          group: 'Groep',
          errorSaveClientGroup: 'Opslaan wijzigingen cliëntengroep mislukt.',
          noContacts: 'Er zijn geen contactpersonen gedefinieerd.',
          contactCount: 'Er zijn $v contactpersonen.',
          reportCount: 'Er zijn $v rapporteren.',
          accountInfoFill: 'Vul uw accountinformatie in a.u.b.',
          passNotSame: 'Wachtwoorden zijn niet hetzelfde.',
          savingMember: 'Lid aan het opslaan...',
          selectTeam: 'Selecteer een team a.u.b.',
          clinetInfoFill: 'Vul de cliëntinformatie (naam en telefoon) in a.u.b.',
          savingClient: 'Cliënt aan het opslaan...',
          clientSubmitError: 'Fouten bij het aanmaken van een nieuwe cliënt.',
          clientGroups: 'Cliëntengroepen',
          teams_Cap: 'Teams',
          editClient: 'Bewerk cliënt',
          loadingNumber: 'Teamtelefoonnummer aan het laden...',
          birthdayError: 'Fout in de geboortedatum.',
          map: 'kaart',
          saveContacts: 'Contactpersonen opslaan',
          loadingReports: 'Rapporten laden',
          date: 'Datum',
          datetime: 'Datum en tijd',
          writenBy: 'Geschreven door',
          noSharedStates: 'Geen gedeelde status',
          savingContacts: 'Contactpersonen oplsaan',
          // delClientGroupConfirm: 'Weet u zeker dat u deze cliëntengroep wilt verwijderen? Het kan even duren.',
          // delTeamConfirm: 'Weet u zeker dat u dit team wilt verwijderen? Het kan even duren.',
          deletingClientGroup: 'Groep verwijderen... ',
          //deleteConfirm: 'Druk op OK om door te gaan.',
          confirms: {
            deleteClientTitle: 'Verwijder client',
            deleteClient: 'Weet u zeker dat u de client wilt verwijderen?',
            deleteReportTitle: 'Verwijder rapport',
            deleteReport: 'Weet u zeker dat u het rapport wilt verwijderen?',
            deleteProfileTitle: 'Verwijder profile',
            deleteProfile: 'Weet u zeker dat u het profiel wilt verwijderen?',
            deleteMemberTitle: 'Verwijderen lid',
            deleteMember: 'Weet u zeker dat u het lid wilt verwijderen?',
            deleteClientGroupTitle: 'Verwijder cliëntengroep',
            deleteClientGroup: 'Weet u zeker dat u deze cliëntengroep wilt verwijderen? Het kan even duren.',
            deleteTeamTitle: 'Verwijderen team',
            deleteTeam: 'Weet u zeker dat u dit team wilt verwijderen? Het kan even duren.',
            deleteTaskTitle: 'Verwijderen taak',
            deleteTask: 'Weet u zeker dat u het taak wilt verwijderen?',
            remove: 'Verwijderen',
            cancel: 'Annuleren'
          },
          deletingTeam: 'Team verwijderen...',
          deletingMember: 'Lid verwijderen ...',
          deletingClient: 'Cliënt verwijderen ...',
          noMessages: 'Er zijn geen berichten.',
          newReport: 'Nieuw rapport',
          selectClient: 'Selecteer een cliënt',
          selectMember: 'Selecteer een lid',
          selectMonth: 'Selecteer een maand',
          saveReport: 'Rapport opslaan',
          reportTitle: 'Titel',
          selectSlot: 'Selecteer een periode',
          editClientImg: 'Wijzig foto van de cliënt',
          newTask: 'Nieuwe taak',
          updateTask: 'Wijzig taak',
          managePanelchangePrompt: 'Data is gewijzigd. Klik op \'Ok\' om door te gaan, \'Annuleren\' om te blijven.',
          pagePrevious: 'Vorige',
          pageNext: 'Volgende',
          pageFirst: 'Eerste',
          pageLast: 'Laatste',
          refresh: 'Verversen',
          stateValue: {
            'reachable': 'Bereikbaar',
            'available': 'Beschikbaar',
            'working': 'Aan het werk',
            'offline': 'Offline'
          },
          reportNotExists: 'Rapport bestaat niet.'
        },
        task: {
          information: 'Informatie',
          noTasks: 'Geen taken',
          clientName: 'Cliënt',
          memberName: 'Lid',
          orderType1: 'Standaard volgorde',
          orderType2: 'Tijd',
          myTask: 'Mijn taken',
          orderby: 'Sorteer op',
          allTasks: 'Alle taken',
          description: 'Opmerkingen',
          filltheTime: 'Vul de start- en eindtijd in voor de taak.',
          startTimeEmpty: 'Vul de startdatum en -tijd in.',
          endTimeEmpty: 'Vul de einddatum en -tijd in.',
          planTaskInFuture: 'U kunt geen taak in het verleden aanmaken. Selecteer een start- en eindtijd in de toekomst.',
          startLaterThanEnd: 'Beginttijd moet eerder zijn dan de eindtijd.',
          specifyClient: 'Selecteer een cliënt voor deze taak.',
          taskSaved: 'Taak is aangemaakt.',
          deleteTaskConfirm: 'Weet u zeker dat u deze taak permanent wilt verwijderen?',
          taskDeleted: 'Taak verwijderd.',
          planningTime: 'Tijdsbestek',
          refreshTask: 'Het herladen van de taken'
        }
      }
    }
  }
);