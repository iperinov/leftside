// This file is auto-generated by @hey-api/openapi-ts

export type Description = {
    description: string;
};

export type LeagueByEvent = {
    /**
     * The IdEvent in ORO.
     */
    eid?: number;
    /**
     * The IdLeague mapped to the IdEvent
     */
    lid?: number;
    /**
     * The IdRealSport in ORO.
     */
    rsid?: number;
    /**
     * The IdGameTyoe in ORO.
     */
    gtid?: number;
    /**
     * Unique identifier for the League entry
     */
    luuid?: string;
    /**
     * Unique identifier for the Real Sport entry
     */
    rsuuid?: string;
};

export type LeagueByEventArray = Array<LeagueByEvent>;

export type League = {
    /**
     * The UUID of the League
     */
    luuid: string;
    /**
     * The IdLeague in ORO
     */
    lid: number;
    /**
     * The league name in ORO
     */
    ln: string;
    /**
     * The league short description in ORO
     */
    lsd: string;
    /**
     * The IdTakeBackProfile mapped to the IdLeague.
     */
    tbp: number;
    /**
     * The Real Sport ID from ORO.
     */
    rsid: number;
    /**
     * Unique identifier for the Real Sport entry
     */
    rsuuid?: string;
    /**
     * The IdSport in ORO
     */
    sid: string;
    /**
     * The league value for HideForMaster in ORO
     */
    hfm?: boolean;
    /**
     * The League Region ID in ORO
     */
    lrid?: number;
    /**
     * Unique identifier for the League Region entry
     */
    lruuid?: string;
};

export type LeagueArray = Array<League>;

export type LeagueTranslation = {
    /**
     * The IdLeague in ORO
     */
    lid?: number;
    /**
     * Unique identifier for the translation entry
     */
    uuid?: string;
    /**
     * Language ID
     */
    lang?: number;
    /**
     * Localized league description
     */
    desc?: string;
};

export type LeagueTranslationArray = Array<LeagueTranslation>;

export type TakeBackProfile = {
    /**
     * The IdTakeBackProfile in ORO
     */
    pid?: number;
    /**
     * The take-back coefficient for moneyline markets
     */
    ml?: number;
    /**
     * The take-back coefficient for spread markets
     */
    sp?: number;
    /**
     * The take-back coefficient for total markets
     */
    tot?: number;
};

export type TakeBackProfileArray = Array<TakeBackProfile>;

export type Event = {
    /**
     * The IdEvent in ORO
     */
    eid?: number;
    /**
     * The Event Description in ORO
     */
    ed?: string;
    /**
     * The Event GameDescription in ORO
     */
    egd?: string;
};

export type EventsArray = Array<Event>;

export type EventTranslation = {
    /**
     * The IdEvent in ORO
     */
    eid?: number;
    /**
     * Language ID
     */
    lang?: number;
    /**
     * Localized event description
     */
    desc?: string;
};

export type EventTranslationArray = Array<EventTranslation>;

export type RealSport = {
    /**
     * The UUID of the RealSport
     */
    rsuuid: string;
    /**
     * The IdRealSport in ORO
     */
    rsid: number;
    /**
     * The real sport description in ORO
     */
    rsd: string;
    /**
     * The Game Delay for Pregame in ORO
     */
    gd: number;
    /**
     * The Game Delay for Live game in ORO
     */
    gdl: number;
};

export type RealSportsArray = Array<RealSport>;

export type RealSportTranslation = {
    /**
     * The IdRealSport in ORO
     */
    rsid?: number;
    /**
     * Unique identifier
     */
    uuid?: string;
    /**
     * Language identifier
     */
    lang?: number;
    /**
     * Short description
     */
    sdesc?: string;
    /**
     * Full description
     */
    desc?: string;
};

export type RealSportTranslationArray = Array<RealSportTranslation>;

export type Period = {
    /**
     * The IdSport in ORO
     */
    sid?: string;
    /**
     * The period number. 0 if Full Game, other values have sport-specific meaning, e.g. 1 is First Half, First Quarter, etc.
     */
    pn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    /**
     * The Period Description in ORO
     */
    pd?: string;
};

export type PeriodsArray = Array<Period>;

export type PlayerInfo = {
    /**
     * The IdPlayer in ORO
     */
    pid?: number;
    /**
     * The nickname of the player in ORO
     */
    nickname?: string;
};

export type TakeBackSetting = {
    /**
     * The IdTakeBackSettings in ORO
     */
    tbsid?: number;
    /**
     * The IdSport in ORO
     */
    sid?: string;
    /**
     * The Line Type ID in ORO
     */
    ltid?: number;
    /**
     * The Game Type ID in ORO
     */
    gtid?: number;
    /**
     * Affected line component - 1 for Spread, 2 for Total, 3 for MoneyLine
     */
    ln?: number;
    /**
     * The Rebate percentage for the lines determined by the other fields
     */
    rp?: number;
};

export type TakeBackSettingsArray = Array<TakeBackSetting>;

export type GameType = {
    /**
     * The IdGameType in ORO
     */
    gtid?: number;
    /**
     * The 2-character unique identifier of the game type in ORO
     */
    s?: string;
    /**
     * The description of the game type in ORO
     */
    d?: string;
    /**
     * The AllowHookUps setting in ORO
     */
    ahu?: boolean;
    /**
     * The AllowBuyPoints setting in ORO
     */
    abp?: boolean;
    /**
     * Background color (for display purposes)
     */
    bkc?: number;
    /**
     * Foreground color for (display purposes)
     */
    fkc?: number;
};

export type GameTypeArray = Array<GameType>;

export type Team = {
    /**
     * The IdTeam in ORO
     */
    id?: number;
    /**
     * The Teamnname in ORO
     */
    name?: string;
};

export type TeamFull = {
    /**
     * The IdTeam in ORO
     */
    id?: number;
    /**
     * The Teamnname in ORO
     */
    name?: string;
    /**
     * The long team name in ORO
     */
    lname?: string;
};

export type TeamsArray = Array<Team>;

export type TeamsFullArray = Array<TeamFull>;

export type CashoutRule = {
    /**
     * The LeagueID in ORO
     */
    lid?: number;
    /**
     * Wether it allows pre spread
     */
    presp?: boolean;
    /**
     * Wether it allows pre total
     */
    pretot?: boolean;
    /**
     * Wether it allows pre money line
     */
    preml?: boolean;
    /**
     * Wether it allows live spread
     */
    lsp?: boolean;
    /**
     * Wether it allows live total
     */
    ltot?: boolean;
    /**
     * Wether it allows live money line
     */
    lml?: boolean;
};

export type CashoutRulesArray = Array<CashoutRule>;

export type CashoutRulesPerEvent = {
    /**
     * The EventID in ORO
     */
    eid?: number;
    /**
     * Indicates if pre-game spread cashout is allowed.
     */
    presp?: boolean;
    /**
     * Indicates if pre-game total cashout is allowed.
     */
    pretot?: boolean;
    /**
     * Indicates if pre-game money line cashout is allowed.
     */
    preml?: boolean;
    /**
     * Indicates if live-game spread cashout is allowed.
     */
    lsp?: boolean;
    /**
     * Indicates if live-game total cashout is allowed.
     */
    ltot?: boolean;
    /**
     * Indicates if live-game money line cashout is allowed.
     */
    lml?: boolean;
};

export type CashoutRulesPerEventArray = Array<CashoutRulesPerEvent>;

export type Book = {
    /**
     * The IdBook in ORO
     */
    bid?: number;
    /**
     * The Book name
     */
    name?: string;
    /**
     * Web Column ID
     */
    wcid?: number;
    /**
     * Indicates if the book is enabled.
     */
    enabled?: boolean;
};

export type BookArray = Array<Book>;

export type Banner = {
    /**
     * Unique identifier for the Banner entry
     */
    uuid?: string;
    /**
     * The banner description
     */
    desc?: string;
    /**
     * The banner top line
     */
    tl?: string;
    /**
     * The banner bottom line
     */
    bl?: string;
};

export type BannerArray = Array<Banner>;

export type BannerTranslation = {
    /**
     * Unique identifier
     */
    uuid?: string;
    /**
     * Language identifier
     */
    lang?: number;
    /**
     * The banner top line
     */
    tl?: string;
    /**
     * The banner bottom line
     */
    bl?: string;
};

export type BannerTranslationArray = Array<BannerTranslation>;

export type LeagueRegion = {
    /**
     * League region ID
     */
    lrid?: number;
    /**
     * Unique identifier for the League Region entry
     */
    lruuid?: string;
    /**
     * The league region description
     */
    lrd?: string;
    /**
     * League region order
     */
    lrro?: number;
    /**
     * Signals if league region is enabled
     */
    lre?: boolean;
};

export type LeagueRegionArray = Array<LeagueRegion>;

export type SportEntitiesIn = {
    'real-sport'?: RealSportIn;
    region?: RegionIn;
    league?: LeagueIn;
};

export type RealSportIn = {
    /**
     * ORO UUID
     */
    uuid?: string;
    description?: string;
    short?: string;
    'pre-game-delay'?: number;
    'live-delay'?: number;
    enabled?: boolean;
};

export type RegionIn = {
    /**
     * ORO UUID
     */
    uuid?: string;
    description?: string;
    order?: number;
    enabled?: boolean;
};

export type LeagueIn = {
    /**
     * ORO IdSport
     */
    sport?: string;
    description?: string;
    short?: string;
    order?: number;
    'team-fk-required'?: boolean;
    'take-back-profile'?: number;
    'hide-for-master'?: boolean;
    enabled?: boolean;
};

export type SportEntitiesOut = {
    'real-sport'?: RealSportOut;
    region?: RegionOut;
    league?: LeagueOut;
};

export type RealSportOut = {
    /**
     * ORO ID
     */
    id: number;
    /**
     * ORO UUID
     */
    uuid: string;
};

export type RegionOut = {
    /**
     * ORO ID
     */
    id: number;
    /**
     * ORO UUID
     */
    uuid: string;
};

export type LeagueOut = {
    /**
     * ORO ID
     */
    id: number;
    /**
     * ORO UUID
     */
    uuid: string;
};

export type GetConfigLeagueByEventByIdData = {
    body?: never;
    path: {
        /**
         * event identifier
         */
        id: number;
    };
    query?: never;
    url: '/config/league-by-event/{id}';
};

export type GetConfigLeagueByEventByIdErrors = {
    /**
     * Bad Request
     */
    400: Description;
    /**
     * Not Found
     */
    404: Description;
    /**
     * Service Unavailable
     */
    500: Description;
};

export type GetConfigLeagueByEventByIdError = GetConfigLeagueByEventByIdErrors[keyof GetConfigLeagueByEventByIdErrors];

export type GetConfigLeagueByEventByIdResponses = {
    /**
     * OK
     */
    200: LeagueByEventArray;
};

export type GetConfigLeagueByEventByIdResponse = GetConfigLeagueByEventByIdResponses[keyof GetConfigLeagueByEventByIdResponses];

export type GetConfigLeaguesByEventsData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * The list of real sports to filter by
         */
        rsid?: Array<number>;
    };
    url: '/config/leagues-by-events/';
};

export type GetConfigLeaguesByEventsErrors = {
    /**
     * Service Unavailable
     */
    500: Description;
};

export type GetConfigLeaguesByEventsError = GetConfigLeaguesByEventsErrors[keyof GetConfigLeaguesByEventsErrors];

export type GetConfigLeaguesByEventsResponses = {
    /**
     * OK
     */
    200: LeagueByEventArray;
};

export type GetConfigLeaguesByEventsResponse = GetConfigLeaguesByEventsResponses[keyof GetConfigLeaguesByEventsResponses];

export type GetConfigLeagueByIdData = {
    body?: never;
    path: {
        /**
         * league identifier
         */
        id: number;
    };
    query?: never;
    url: '/config/league/{id}';
};

export type GetConfigLeagueByIdErrors = {
    /**
     * Bad Request
     */
    400: Description;
    /**
     * Not Found
     */
    404: Description;
    /**
     * Service Unavailable
     */
    500: Description;
};

export type GetConfigLeagueByIdError = GetConfigLeagueByIdErrors[keyof GetConfigLeagueByIdErrors];

export type GetConfigLeagueByIdResponses = {
    /**
     * OK
     */
    200: LeagueArray;
};

export type GetConfigLeagueByIdResponse = GetConfigLeagueByIdResponses[keyof GetConfigLeagueByIdResponses];

export type GetConfigLeaguesData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * The list of real sports to filter by
         */
        rsid?: Array<number>;
    };
    url: '/config/leagues/';
};

export type GetConfigLeaguesErrors = {
    /**
     * Service Unavailable
     */
    500: Description;
};

export type GetConfigLeaguesError = GetConfigLeaguesErrors[keyof GetConfigLeaguesErrors];

export type GetConfigLeaguesResponses = {
    /**
     * OK
     */
    200: LeagueArray;
};

export type GetConfigLeaguesResponse = GetConfigLeaguesResponses[keyof GetConfigLeaguesResponses];

export type GetConfigLeaguesTranslationsData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * Filter by League IDs
         */
        lid?: Array<number>;
    };
    url: '/config/leagues/translations/';
};

export type GetConfigLeaguesTranslationsErrors = {
    /**
     * Not Found
     */
    404: Description;
    /**
     * Service Unavailable
     */
    500: Description;
};

export type GetConfigLeaguesTranslationsError = GetConfigLeaguesTranslationsErrors[keyof GetConfigLeaguesTranslationsErrors];

export type GetConfigLeaguesTranslationsResponses = {
    /**
     * OK
     */
    200: LeagueTranslationArray;
};

export type GetConfigLeaguesTranslationsResponse = GetConfigLeaguesTranslationsResponses[keyof GetConfigLeaguesTranslationsResponses];

export type GetConfigTakeBackProfileByIdData = {
    body?: never;
    path: {
        /**
         * profile identifier
         */
        id: number;
    };
    query?: never;
    url: '/config/take-back-profile/{id}';
};

export type GetConfigTakeBackProfileByIdErrors = {
    /**
     * Bad Request
     */
    400: Description;
    /**
     * Not Found
     */
    404: Description;
    /**
     * Service Unavailable
     */
    500: Description;
};

export type GetConfigTakeBackProfileByIdError = GetConfigTakeBackProfileByIdErrors[keyof GetConfigTakeBackProfileByIdErrors];

export type GetConfigTakeBackProfileByIdResponses = {
    /**
     * OK
     */
    200: TakeBackProfileArray;
};

export type GetConfigTakeBackProfileByIdResponse = GetConfigTakeBackProfileByIdResponses[keyof GetConfigTakeBackProfileByIdResponses];

export type GetConfigTakeBackProfilesData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/config/take-back-profiles/';
};

export type GetConfigTakeBackProfilesErrors = {
    /**
     * Service Unavailable
     */
    500: Description;
};

export type GetConfigTakeBackProfilesError = GetConfigTakeBackProfilesErrors[keyof GetConfigTakeBackProfilesErrors];

export type GetConfigTakeBackProfilesResponses = {
    /**
     * OK
     */
    200: TakeBackProfileArray;
};

export type GetConfigTakeBackProfilesResponse = GetConfigTakeBackProfilesResponses[keyof GetConfigTakeBackProfilesResponses];

export type GetConfigEventsData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/config/events/';
};

export type GetConfigEventsErrors = {
    /**
     * Service Unavailable
     */
    500: Description;
};

export type GetConfigEventsError = GetConfigEventsErrors[keyof GetConfigEventsErrors];

export type GetConfigEventsResponses = {
    /**
     * OK
     */
    200: EventsArray;
};

export type GetConfigEventsResponse = GetConfigEventsResponses[keyof GetConfigEventsResponses];

export type GetConfigEventsTranslationsData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * Filter by Event IDs
         */
        eid?: Array<number>;
    };
    url: '/config/events/translations/';
};

export type GetConfigEventsTranslationsErrors = {
    /**
     * Player not found
     */
    404: Description;
    /**
     * Service Unavailable
     */
    500: Description;
};

export type GetConfigEventsTranslationsError = GetConfigEventsTranslationsErrors[keyof GetConfigEventsTranslationsErrors];

export type GetConfigEventsTranslationsResponses = {
    /**
     * OK
     */
    200: EventTranslationArray;
};

export type GetConfigEventsTranslationsResponse = GetConfigEventsTranslationsResponses[keyof GetConfigEventsTranslationsResponses];

export type GetConfigRealsportsData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/config/realsports/';
};

export type GetConfigRealsportsErrors = {
    /**
     * Service Unavailable
     */
    500: Description;
};

export type GetConfigRealsportsError = GetConfigRealsportsErrors[keyof GetConfigRealsportsErrors];

export type GetConfigRealsportsResponses = {
    /**
     * OK
     */
    200: RealSportsArray;
};

export type GetConfigRealsportsResponse = GetConfigRealsportsResponses[keyof GetConfigRealsportsResponses];

export type GetConfigRealsportsTranslationsData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * Filter by RealSport IDs
         */
        rsid?: Array<number>;
    };
    url: '/config/realsports/translations/';
};

export type GetConfigRealsportsTranslationsErrors = {
    /**
     * RealSport translation not found
     */
    404: Description;
    /**
     * Service Unavailable
     */
    500: Description;
};

export type GetConfigRealsportsTranslationsError = GetConfigRealsportsTranslationsErrors[keyof GetConfigRealsportsTranslationsErrors];

export type GetConfigRealsportsTranslationsResponses = {
    /**
     * OK
     */
    200: RealSportTranslationArray;
};

export type GetConfigRealsportsTranslationsResponse = GetConfigRealsportsTranslationsResponses[keyof GetConfigRealsportsTranslationsResponses];

export type GetConfigPeriodsData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/config/periods/';
};

export type GetConfigPeriodsErrors = {
    /**
     * Service Unavailable
     */
    500: Description;
};

export type GetConfigPeriodsError = GetConfigPeriodsErrors[keyof GetConfigPeriodsErrors];

export type GetConfigPeriodsResponses = {
    /**
     * OK
     */
    200: PeriodsArray;
};

export type GetConfigPeriodsResponse = GetConfigPeriodsResponses[keyof GetConfigPeriodsResponses];

export type GetConfigPlayerByIdData = {
    body?: never;
    path: {
        /**
         * player identifier in ORO
         */
        id: number;
    };
    query?: never;
    url: '/config/player/{id}';
};

export type GetConfigPlayerByIdErrors = {
    /**
     * Player not found
     */
    404: Description;
    /**
     * Service Unavailable
     */
    500: Description;
};

export type GetConfigPlayerByIdError = GetConfigPlayerByIdErrors[keyof GetConfigPlayerByIdErrors];

export type GetConfigPlayerByIdResponses = {
    /**
     * OK
     */
    200: PlayerInfo;
};

export type GetConfigPlayerByIdResponse = GetConfigPlayerByIdResponses[keyof GetConfigPlayerByIdResponses];

export type GetConfigPlayerByAccountByNumberData = {
    body?: never;
    path: {
        /**
         * Account number is the Player in ORO
         */
        number: string;
    };
    query?: never;
    url: '/config/player/by-account/{number}';
};

export type GetConfigPlayerByAccountByNumberErrors = {
    /**
     * Player not found
     */
    404: Description;
    /**
     * Service Unavailable
     */
    500: Description;
};

export type GetConfigPlayerByAccountByNumberError = GetConfigPlayerByAccountByNumberErrors[keyof GetConfigPlayerByAccountByNumberErrors];

export type GetConfigPlayerByAccountByNumberResponses = {
    /**
     * OK
     */
    200: PlayerInfo;
};

export type GetConfigPlayerByAccountByNumberResponse = GetConfigPlayerByAccountByNumberResponses[keyof GetConfigPlayerByAccountByNumberResponses];

export type GetConfigTakeBackSettingsData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/config/take-back-settings/';
};

export type GetConfigTakeBackSettingsErrors = {
    /**
     * Service Unavailable
     */
    500: Description;
};

export type GetConfigTakeBackSettingsError = GetConfigTakeBackSettingsErrors[keyof GetConfigTakeBackSettingsErrors];

export type GetConfigTakeBackSettingsResponses = {
    /**
     * OK
     */
    200: TakeBackSettingsArray;
};

export type GetConfigTakeBackSettingsResponse = GetConfigTakeBackSettingsResponses[keyof GetConfigTakeBackSettingsResponses];

export type GetConfigGameTypesData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/config/game-types/';
};

export type GetConfigGameTypesErrors = {
    /**
     * Service Unavailable
     */
    500: Description;
};

export type GetConfigGameTypesError = GetConfigGameTypesErrors[keyof GetConfigGameTypesErrors];

export type GetConfigGameTypesResponses = {
    /**
     * OK
     */
    200: GameTypeArray;
};

export type GetConfigGameTypesResponse = GetConfigGameTypesResponses[keyof GetConfigGameTypesResponses];

export type GetConfigTeamsData = {
    body?: never;
    path?: never;
    query: {
        /**
         * The IDs of teams needed
         */
        id: Array<number>;
    };
    url: '/config/teams/';
};

export type GetConfigTeamsErrors = {
    /**
     * Bad Request
     */
    400: Description;
    /**
     * Service Unavailable
     */
    500: Description;
};

export type GetConfigTeamsError = GetConfigTeamsErrors[keyof GetConfigTeamsErrors];

export type GetConfigTeamsResponses = {
    /**
     * OK
     */
    200: TeamsFullArray;
};

export type GetConfigTeamsResponse = GetConfigTeamsResponses[keyof GetConfigTeamsResponses];

export type PostConfigTeamsData = {
    body: TeamsFullArray;
    path?: never;
    query?: never;
    url: '/config/teams/';
};

export type PostConfigTeamsErrors = {
    /**
     * Bad Request
     */
    400: Description;
    /**
     * Service Unavailable
     */
    500: Description;
};

export type PostConfigTeamsError = PostConfigTeamsErrors[keyof PostConfigTeamsErrors];

export type PostConfigTeamsResponses = {
    /**
     * OK
     */
    200: Description;
};

export type PostConfigTeamsResponse = PostConfigTeamsResponses[keyof PostConfigTeamsResponses];

export type GetConfigTeamsSearchByPatternData = {
    body?: never;
    path: {
        /**
         * Case-insensitive start of the teams' name
         */
        pattern: string;
    };
    query?: never;
    url: '/config/teams/search/{pattern}';
};

export type GetConfigTeamsSearchByPatternErrors = {
    /**
     * Bad Request
     */
    400: Description;
    /**
     * Service Unavailable
     */
    500: Description;
};

export type GetConfigTeamsSearchByPatternError = GetConfigTeamsSearchByPatternErrors[keyof GetConfigTeamsSearchByPatternErrors];

export type GetConfigTeamsSearchByPatternResponses = {
    /**
     * OK
     */
    200: TeamsArray;
};

export type GetConfigTeamsSearchByPatternResponse = GetConfigTeamsSearchByPatternResponses[keyof GetConfigTeamsSearchByPatternResponses];

export type GetConfigCashoutsRulesPerLeagueData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * League ID to query cashout rules for. Use 0 for all leagues.
         */
        id?: number;
    };
    url: '/config/cashouts-rules-per-league';
};

export type GetConfigCashoutsRulesPerLeagueErrors = {
    /**
     * Service Unavailable
     */
    500: Description;
};

export type GetConfigCashoutsRulesPerLeagueError = GetConfigCashoutsRulesPerLeagueErrors[keyof GetConfigCashoutsRulesPerLeagueErrors];

export type GetConfigCashoutsRulesPerLeagueResponses = {
    /**
     * OK
     */
    200: CashoutRulesArray;
};

export type GetConfigCashoutsRulesPerLeagueResponse = GetConfigCashoutsRulesPerLeagueResponses[keyof GetConfigCashoutsRulesPerLeagueResponses];

export type GetConfigCashoutsRulesPerEventData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * Event ID to query cashout rules for. Use 0 for all events.
         */
        eventId?: number;
    };
    url: '/config/cashouts-rules-per-event';
};

export type GetConfigCashoutsRulesPerEventErrors = {
    /**
     * Not Found
     */
    404: Description;
    /**
     * Service Unavailable
     */
    500: Description;
};

export type GetConfigCashoutsRulesPerEventError = GetConfigCashoutsRulesPerEventErrors[keyof GetConfigCashoutsRulesPerEventErrors];

export type GetConfigCashoutsRulesPerEventResponses = {
    /**
     * OK
     */
    200: CashoutRulesPerEventArray;
};

export type GetConfigCashoutsRulesPerEventResponse = GetConfigCashoutsRulesPerEventResponses[keyof GetConfigCashoutsRulesPerEventResponses];

export type GetConfigBooksData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * Filter by Book IDs
         */
        bid?: Array<number>;
    };
    url: '/config/books/';
};

export type GetConfigBooksErrors = {
    /**
     * Not Found
     */
    404: Description;
    /**
     * Service Unavailable
     */
    500: Description;
};

export type GetConfigBooksError = GetConfigBooksErrors[keyof GetConfigBooksErrors];

export type GetConfigBooksResponses = {
    /**
     * OK
     */
    200: BookArray;
};

export type GetConfigBooksResponse = GetConfigBooksResponses[keyof GetConfigBooksResponses];

export type GetConfigBannersData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * Filter by Banner UUIDs
         */
        uuid?: Array<string>;
    };
    url: '/config/banners/';
};

export type GetConfigBannersErrors = {
    /**
     * Not Found
     */
    404: Description;
    /**
     * Service Unavailable
     */
    500: Description;
};

export type GetConfigBannersError = GetConfigBannersErrors[keyof GetConfigBannersErrors];

export type GetConfigBannersResponses = {
    /**
     * OK
     */
    200: BannerArray;
};

export type GetConfigBannersResponse = GetConfigBannersResponses[keyof GetConfigBannersResponses];

export type GetConfigBannersTranslationsData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * Filter by Banner IDs
         */
        bid?: Array<number>;
    };
    url: '/config/banners/translations/';
};

export type GetConfigBannersTranslationsErrors = {
    /**
     * Not Found
     */
    404: Description;
    /**
     * Service Unavailable
     */
    500: Description;
};

export type GetConfigBannersTranslationsError = GetConfigBannersTranslationsErrors[keyof GetConfigBannersTranslationsErrors];

export type GetConfigBannersTranslationsResponses = {
    /**
     * OK
     */
    200: BannerTranslationArray;
};

export type GetConfigBannersTranslationsResponse = GetConfigBannersTranslationsResponses[keyof GetConfigBannersTranslationsResponses];

export type GetConfigRegionsData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * Filter by League Region UUIDs
         */
        uuid?: Array<string>;
    };
    url: '/config/regions/';
};

export type GetConfigRegionsErrors = {
    /**
     * Not Found
     */
    404: Description;
    /**
     * Service Unavailable
     */
    500: Description;
};

export type GetConfigRegionsError = GetConfigRegionsErrors[keyof GetConfigRegionsErrors];

export type GetConfigRegionsResponses = {
    /**
     * OK
     */
    200: LeagueRegionArray;
};

export type GetConfigRegionsResponse = GetConfigRegionsResponses[keyof GetConfigRegionsResponses];

export type PostSportEntitiesData = {
    body: SportEntitiesIn;
    path?: never;
    query?: never;
    url: '/sport/entities';
};

export type PostSportEntitiesErrors = {
    /**
     * Bad Request
     */
    400: Description;
    /**
     * Internal server error
     */
    500: unknown;
};

export type PostSportEntitiesError = PostSportEntitiesErrors[keyof PostSportEntitiesErrors];

export type PostSportEntitiesResponses = {
    /**
     * Successful creation of entities
     */
    200: SportEntitiesOut;
};

export type PostSportEntitiesResponse = PostSportEntitiesResponses[keyof PostSportEntitiesResponses];

export type ClientOptions = {
    baseUrl: 'http://localhost:8080' | 'http://integ-fbsd-apps.im.priv:8080' | 'http://qa2-fbsd-apps.im.priv:8080' | (string & {});
};