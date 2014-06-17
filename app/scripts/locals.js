define(
  {
    ui: {
      nl: {
        meta:      {
          name:  'nl',
          label: 'Nederlands'
        },
        login:     {
          header:               'Inloggen',
          placeholder_username: 'Vul uw gebruikersnaam in',
          placeholder_password: 'Vul uw wachtwoord in',
          label_rememberMe:     'Onthoud mij',
          button_login:         'Login',
          button_loggingIn:     'Inloggen...',
          forgot_password:      'Wachtwoord vergeten?',
          forgetPassword:       'Wachtwoord vergeten',
          emailAddress:         'Email adres',
          resetPassword:        'Wachtwoord opnieuw instellen',
          returnLogin:          'Terugkeren om in te loggen',
          changePassword:       'Wachtwoord wijzigen',
          downloadApp:          'Download Mobiele App',
          ph_username:          'gebruikersnaam',
          ph_newPass:           'nieuw wachtwoord',
          ph_retypePass:        'Typ wachtwoord',
          alert_fillfiled:      'Vul alle velden in!',
          alert_wrongUserPass:  'Onjuiste gebruikersnaam of wachtwoord!',
          loading_User:         'Gebruikersinformatie laden...',
          loading_Message:      'Berichten laden...',
          loading_Group:        'Groepen laden...',
          loading_Members:      'Leden laden...',
          loading_everything:   'Alles is geladen!',
          logout:               'Logout',
          loading:              'Loading..',
          loading_clientGroups: 'Loading client groups...'
        },
        dashboard: {
          thisWeek:      'Deze week',
          welcome:       'Welkom',
          newMessage:    'Nieuwe berichten',
          goToInbox:     'Ga naar inbox',
          loadingPie:    'Cirkeldiagrammen laden...',
          announcements: 'Alarm berichten',
          loadingP2000:  'Alarm berichten laden...',
          noP2000:       'Er zijn geen alarm berichten.'
        },
        planboard: {
          planboard:                   'Agenda',
          newAvail:                    'Nieuwe beschikbaarheid',
          day:                         'Dag',
          week:                        'Week',
          month:                       'Maand',
          updateAvail:                 'Update beschikbaarheid',
          from:                        'Van',
          till:                        'Tot',
          state:                       'Status',
          selectAState:                'selecteer een status',
          reoccuring:                  'Herhaling',
          lessPeople:                  'Er is een tekort van $v mens(en)!',
          samePeople:                  'Er zijn precies genoeg mensen.',
          morePeople:                  'Er is een overschot van $v mens(en)!',
          wished:                      'Gewenst',
          combine_reoccuring:          'Dit is een gecombineerde planning.',
          sendMsgToMember:             'Stuur bericht naar leden',
          add:                         'Toevoegen',
          del:                         'Verwijderen',
          change:                      'Wijzigen',
          setWish:                     'Behoefte instellen',
          timeline:                    'Tijdlijn',
          statistics:                  'Statistieken',
          barCharts:                   'Staafdiagrammen',
          wishes:                      'Behoefte',
          legenda:                     'Legenda',
          group:                       'Groep',
          groups:                      'Groepen',
          members:                     'Leden',
          bothAvailable:               'Beiden beschikbaar',
          northAavailable:             'Beschikbaar Noord',
          southAvailable:              'Beschikbaar Zuid',
          skipperOutService:           'Schipper van dienst',
          notAvailable:                'Niet beschikbaar',
          notachieve:                  'Niet behaald',
          legendaLabels:               {
            morePeople:   'Meer mensen',
            enoughPeople: 'Precies genoeg mensen',
            lessPeople:   'Te weinig mensen'
          },
          lastSyncTime:                'Laatste synchronisatietijd:',
          dataRangeStart:              'Begin gegevensscala: ',
          DataRangeEnd:                'Eind gegevensscala: ',
          loadingTimeline:             'Tijdlijn laden...',
          addTimeSlot:                 'Tijdslot toevoegen...',
          slotAdded:                   'Tijdslot succesvol toegevoegd.',
          changingSlot:                'Tijdslot wijzigen...',
          slotChanged:                 'Tijdslot succesvol gewijzigd.',
          changingWish:                'Behoefte veranderen...',
          wishChanged:                 'Behoefte succesvol veranderd.',
          deletingTimeslot:            'Tijdslot verwijderen...',
          timeslotDeleted:             'Tijdslot succesvol verwijderd.',
          refreshTimeline:             'Tijdlijn vernieuwen...',
          preCompilingStortageMessage: 'Opstellen tekortbericht',
          weeklyPlanning:              'Wekelijkse planning',
          planning:                    'Planning',
          minNumber:                   'Minimum aantal benodigde mensen'
        },
        message:   {
          messages:          'Berichten',
          composeAMessage:   'Bericht opstellen',
          compose:           'Opstellen',
          inbox:             'Inbox',
          outbox:            'Outbox',
          trash:             'Prullenbak',
          composeMessage:    'Bericht opstellen',
          close:             'Sluiten',
          broadcast:         'Extra medium',
          sms:               'SMS',
          email:             'Email',
          receviers:         'Ontvanger(s)',
          // troubled
          // chooseRecept: 'Ontvanger(s) selecteren',
          //
          subject:           'Onderwerp',
          message:           'Bericht',
          sendMessage:       'Bericht versturen',
          sender:            'Zender',
          date:              'Datum',
          questionText:      'Bericht',
          reply:             'Antwoorden',
          del:               'Verwijderen',
          noMessage:         'Er zijn geen berichten.',
          from:              'Van',
          newMsg:            'Nieuw',
          deleteSelected:    'Verwijder geselecteerde berichten',
          someMessage:       'Er zijn $v berichten',
          emptyTrash:        'Prullenbak legen',
          noMsgInTrash:      'Er zijn geen berichten.',
          box:               'Box',
          persons:           'Personen',
          restoreSelected:   'Geselecteerde berichten terugplaatsen',
          loadingMessage:    'Bericht laden...',
          escalation:        'Escalatiebericht',
          escalationBody:    function (diff, startDate, startTime, endDate, endTime)
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
          removed:           'Bericht succesvol verwijderd.',
          removing:          'Bericht verwijderen...',
          refreshing:        'Bericht vernieuwen...',
          removingSelected:  'Geselecteerde berichten verwijderen...',
          restoring:         'Bericht terugplaatsen...',
          restored:          'Bericht succesvol teruggeplaatst.',
          restoringSelected: 'Geselecteerde berichten terugplaatsen...',
          emptying:          'Prullenbak leegmaken...',
          emptied:           'Prullenbak succesvol geleegd.',
          sending:           'Bericht versturen...',
          sent:              'Bericht verstuurd.',
          typeSubject:       'Vul een onderwerp in',
          // messages: 'Berichten',
          ph_filterMessage:  'Berichten filteren...',
          noReceivers:       'Graag een ontvanger selecteren.',
          emptyMessageBody:  'The message is empty, please write a message',
          send:              'Send'
        },
        groups:    {
          groups:                'Groepen',
          newGroup:              'Nieuwe Group',
          newMember:             'Nieuw lid',
          serach:                'Zoeken',
          addNewGroup:           'Nieuwe groep toevoegen',
          editGroup:             'Groep wijzigen',
          searchResults:         'Zoekresultaten',
          group:                 'Groep',
          close:                 'Sluiten',
          name:                  'Naam',
          saveGroup:             'Groep opslaan',
          registerMember:        'Lid registreren',
          role:                  'Functie',
          selectRole:            'Selecteer een functie',
          // troubled
          // selectGroup: 'Selecteer een group',
          //
          email:                 'Email',
          phone:                 'Telefoon',
          address:               'Adres',
          postCode:              'Postcode',
          tel:                   'Tel',
          city:                  'Stad',
          userName:              'Gebruikersnaam',
          password:              'Wachtwoord',
          saveMember:            'Lid opslaan',
          serachFor:             'Zoekresultaten voor ',
          sorryCanNotFind:       'Sorry, geen resultaten.',
          addToGroup:            'Aan groep toevoegen',
          addMemberToGroup:      'Voeg geselecteerde leden aan groep toe',
          resultCount:           'Er zijn $v resultaten.',
          deleteGroup:           'Groep verwijderen',
          noMembers:             'Er zijn geen leden.',
          removeSelectedMembers: 'Geselecteerde leden verwijderen',
          memberCount:           'Er zijn $v leden',
          searchingMembers:      'Leden zoeken...',
          addingNewMember:       'Nieuw lid toevoegen...',
          memberAdded:           'Lid succesvol aan groep toegevoegd.',
          refreshingGroupMember: 'Groepen- en ledenlijst vernieuwen...',
          removingMember:        'Lid van groep verwijderen...',
          memberRemoved:         'Lid succesvol van groep verwijderd.',
          removingSelected:      'Geselecteerde leden verwijderen...',
          saving:                'Groep opslaan...',
          groupSaved:            'Groep succesvol opgeslagen.',
          registerNew:           'Nieuw lid registreren...',
          memberRegstered:       'Lid succesvol geregistreerd.',
          deleting:              'Groep verwijderen...',
          deleted:               'Groep succesvol verwijderd.',
          filterMembers:         'Leden filteren...',
          searchfor:             'voornaam, achternaam..'
        },
        profile:   {
          profile:          'Profiel',
          edit:             'Wijzigen',
          password:         'Wachtwoord',
          timeline:         'Tijdlijn',
          profileView:      'Profiel weergave',
          userGroups:       'Gebruikersgroepen',
          role:             'Functie',
          email:            'Email',
          phone:            'Telefoon',
          address:          'Adres',
          postcode:         'Postcode',
          city:             'Stad',
          editProfile:      'Profiel wijzigen',
          name:             'Naam',
          saveProfile:      'Profiel opslaan',
          passChange:       'Wachtwoord wijzigen',
          currentPass:      'Huidig wachtwoord',
          newPass:          'Nieuw wachtwoord',
          newPassRepeat:    'Herhaal nieuw wachtwoord',
          changePass:       'Wachtwoord wijzigen',
          newAvail:         'Nieuwe beschikbaarheid',
          // saveProfile: 'Profielinformatie opslaan...',
          refreshing:       'Profielinformatie vernieuwen...',
          dataChanged:      'Profielgegevens succesvol gewijzigd.',
          pleaseFill:       'Vul a.u.b. alle velden in!',
          passNotMatch:     'Ingevoerd wachtwoord komt niet overeen. Probeer het opnieuw.',
          changingPass:     'Wachtwoord wijzigen...',
          passChanged:      'Wachtwoord succesvol gewijzigd.',
          passwrong:        'Ingevoerd wachtwoord is foutief! Probeer het opnieuw.',
          newTimeslotAdded: 'Nieuw tijdslot succesvol toegevoegd.',
          changingTimeslot: 'Tijdslot wijzigen...',
          timeslotChanged:  'Tijdslot succesvol gewijzigd.',
          firstName:        'Voornaam',
          lastName:         'Achternaam',
          editProfileImg:   'Profile foto wijzigen',
          loadUploadURL:    'Foto upload URL laden',
          click2upload:     'Klik hier om te uploaden',
          birthday:         'Geboortedag',
          username:         'Gebruikersnaam',
          retypePassword:   'Nogmaals wachtwoord',
          roleChangePrompt: 'Je veranderd je eigen rol, zal het systeem automatisch uitloggen, druk op "Yes" om verder te gaan.',//'You changed your own role, system will automatically logout, press "Yes" to continue.',
          specifyTeam: 'Je moet een team opgeven om deze gebruiker'//'You need to sepcify a team to this user'
        },
        settings:  {
          settings:     'Instellingen',
          user:         'Gebruiker',
          application:  'Applicatie',
          userSettings: 'Gebruikersinstellingen',
          appSettings:  'Applicatie-instellingen',
          saveSettings: 'Instellingen Opslaan',
          langSetting:  'Taal',
          saving:       'Instellingen wijzigen...',
          refreshing:   'Instellingen vernieuwen...',
          saved:        'Instellingen succesvol gewijzigd.'
        },
        help:      {
          header:  'Hulp & Ondersteuning',
          support: 'Ondersteuning'
        },
        downloads: {
          app:    'Binnenkort te downloaden.',
          manual: 'Download Handleiding'
        },
        loading:   {
          general:   'Laden',
          dashboard: 'dashboard',
          planboard: 'agenda',
          messages:  'berichten',
          groups:    'groepen',
          profile:   'profiel',
          settings:  'instellingen'
        },
        teamup:    {
          teams:                   'teams',
          clients:                 'cliënten',
          manage:                  'beheren',
          chooseTeam:              'Selecteer een team',
          edit:                    'bewerk',
          editTeam:                'bewerk team',
          team:                    'team',
          del:                     'verwijder',
          noMembers:               'Geen leden in dit team',
          newTeam:                 'Nieuw Team',
          teamName:                'Teamnaam',
          createTeam:              'Maak nieuw team',
          newMember:               'Nieuw lid',
          name:                    'Naam',
          role:                    'rol',
          phone:                   'telefoon',
          street:                  'straat',
          postCode:                'postcode',
          city:                    'Stad',
          saveMember:              'Opslaan',
          state:                   'status',
          states:                  'Status',
          saveTeam:                'Team opslaan',
          save:                    'Opslaan',
          refreshing:              'Team info opnieuw ophalen',
          dataChanged:             'Data is veranderd',
          teamSubmitError:         'Fouten tijdens aanmaken van het team',
          queryTeamError:          'Fouten tijdens het opzoeken van de teams',
          teamNamePrompt1:         'Teamnaam mag niet leeggelaten worden',
          teamNamePrompt2:         'Voeg contact data toe a.u.b.',
          cancel:                  'Annuleren',
          chooseRole:              'Kies een rol',
          func:                    'functie',
          chooseFunction:          'Kies een functie',
          newClientGroup:          'Nieuwe Groep',
          newClient:               'Nieuwe cliënt',
          reports:                 'Rapporten',
          report:                  'Rapport',
          noClients:               'Geen cliënten in deze groep',
          TeamClients:             'TEAMS-CLIENTEN',
          createClientGroup:       'Maak nieuwe cliënten groep aan',
          contacts:                'Contacten',
          Number:                  'Nummer',
          clientProfileUrl:        'URL Cliënten profiel',
          addContact:              'contactpersoon toevoegen',
          saveClient:              'Opslaan',
          group:                   'Groep',
          noContacts:              'Er zijn geen contactpersonen gedefinieerd',
          contactCount:            'Er zijn $v contactpersonen',
          accountInfoFill:         'Vul uw account informatie in a.u.b.',
          passNotSame:             'Wachtwoorden zijn niet hetzelfde.',
          savingMember:            'Lid aan het opslaan',
          selectTeam:              'Selecteer een team a.u.b.',
          clinetInfoFill:          'Vul the basis cliënt informatie (naam en telefoon) in a.u.b.',
          savingClient:            'Cliënt aan het opslaan',
          clientSubmitError:       'Fouten bij het aanmaken van een nieuwe cliënt',
          clientGroups:            'Cliënten groepen',
          teams_Cap:               'Teams',
          editClient:              'Bewerk client',
          loadingNumber:           'Team telefoonnummer aan het laden',
          birthdayError:           'Fout in the geboortedatum',
          map:                     'kaart',
          saveContacts:            'Contactpersonen opslaan',
          loadingReports:          'Rapporten laden',
          datetime:                'Datum en tijd',
          writenBy:                'Geschreven door',
          noSharedStates:          'Geen gedeelde status',
          savingContacts:          'Contactpersonen oplsaan',
          delClientGroupConfirm:   'Weet u zeker dat u deze cliënten groep wil verwijderen? Het kan even duren.',
          delTeamConfirm:          'Weet u zeker dat u dit team wil verwijderen? Het kan even duren.',
          deletingClientGroup:     'Groep verwijderen ... ',
          deleteConfirm:           'Druk op OK om door te gaan.',
          deletingTeam:            'Team verwijderen...',
          deletingMember:          'Lid verwijderen ...',
          deletingClient:          'Cliënt verwijderen ...',
          noMessages:              'Er zijn geen berichten',
          newReport:               'Nieuw Rapport',
          selectClient:            'Selecteer een cliënt',
          selectMember:            'Selecteer een lid',
          selectMonth:             'Selecteer een maand',
          saveReport:              'Rapport opslaan',
          reportTitle:             'Titel',
          selectSlot:              'Selecteer een tijdsslot a.u.b.',
          editClientImg:           'Wijzig foto van de cliënt',
          newTask:                 'Nieuwe Taak',
          updateTask:              'Wijzig Taak',
          managePanelchangePrompt: 'Data is changed. Click \'Yes\' to go on, \'Cancel\' to stay.'
        },
        task:{
          information : 'informatie',
          noTasks: 'No Tasks',
          clientName: 'client',
          memberName: 'Member',
          orderType1: 'StandRoute',
          orderType2: 'PlanningTime',
          myTask: 'Mijn taken',
          orderby: 'Sorteer op',
          allTasks: 'Alle Taken',
          description: 'Opmerkingen',
          filltheTime: 'Please fill the start and end time for the task',
          startTimeEmpty: 'Please fill the start date or time',
          endTimeEmpty: 'Please fill the end date or time',
          planTaskInFuture: 'Please sepcify the start and end time in the future.',
          startLaterThanEnd: 'Start time should be eailer than the end time',
          specifyClient: 'Please specify a client to the task.',
          taskSaved: 'Task saved.',
          deleteTaskConfirm: 'Delete this task ? The task will be permanently deleted.',
          taskDeleted: 'Task deleted.',
          planningTime: 'planning time',
        }
      }
    }
  }
);