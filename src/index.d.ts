import { EventEmitter } from 'events';
import { Client, Interaction } from 'discord.js';

/**
 * Represents a game instance.
 */
declare class Game extends EventEmitter {
    /**
     * Game variables.
     */
    var: {
        /**
         * Game's state.
         */
        gaming: boolean;
    };
    /**
     * Discord.js Client Instance.
     */
    client: Client;
    /**
     * Game's Unique Identifier
     */
    id: string;

    /**
     * Constructs a new Game instance.
     * @param {Client} client A Discord.js client
     * @param {string} id A unique game identifier
     */
    constructor(client: Client, id: string);

    /**
     * Start's the game
     */
    start(): void;

    /**
     * Returns true/false if game is on
     */
    isGameOn(): boolean;

    /**
     * End's the game
     * @param {Interaction} interaction Pass the interaction that was associated with the game. If null it will not do anythinng to the message.
     */
    end(interaction?: Interaction): void;

    /**
     * Forces the game to error and ends the game
     * @param {string} error Error message
     */
    error(error: string): void;

    /**
     * Handles button Interactions. can be placed beneath `game.start()`
     */
    handleButtons(): void;

    /**
     * Listens for when the game starts
     */
    on(event: 'start', listener: () => void): this;
    /**
     * Listens for when the game ends.
     */
    on(event: 'end', listener: () => void): this;
    /**
     * Listens for when an error occurs
     */
    on(event: 'error', listener: (error: TypeError) => void): this;
    /**
     * Listens for button interactions. ${string} is the button's ID
     */
    on(
        event: `${string}-btn`,
        listener: (interaction: Interaction) => void
    ): this;
}

/**
 * A 2d plane
 */
declare class Plane extends EventEmitter {
    /**
     *
     * @param {Game} game Pass the game object
     * @param {number} rows Amount of rows
     * @param {number} columns Amount of columns
     * @param {string|null} blank The string that represents a default character in the plane.
     */
    constructor(
        game: Game,
        rows: number,
        columns: number,
        blank?: string | null
    );

    /**
     * The string that represents a default character in the plane.
     */
    blank: any;
    /**
     * The actual plane itself in it's raw form.
     */
    plane: string[][];
    /**
     * Plane's objects
     */
    objects: {
        /**
         * ID's of object cached on the plane. This is updated whenever the plane is updated.
         */
        ids: string[];
        /**
         * some planeobjects defined by the ids
         */
        objects: { [id: string]: PlaneObject };
    };

    /**
     *
     * @param {string} inputValue Lookup an objects id
     * @returns {object|null} {x:?, y:?}
     */
    lookupObj(inputValue: string): { x: number; y: number } | null;

    /**
     *
     * @param {number} x X Coordinate
     * @param {number} y Y Coordinate
     * @returns {string|undefined}
     */
    lookupCoords(x: number, y: number): string | undefined;

    /**
     * Clears the entire grid, removing every object. (Preserves object coordinates)
     */
    clear(): void;

    /**
     *
     * @param  {...PlaneObject} arr Objects to be updated on plane
     */
    update(...arr: PlaneObject[]): void;

    /**
     *
     * @param {string} row Split rows, default is null (assumes you use emojis for planes.)
     * @param {string} column Split columns, default is a line break.
     * @returns String with output plane.
     */
    return(row?: string, column?: string): string;
}

/**
 * An object to be represented on a plane
 * @class
 */
declare class PlaneObject {
    /**
     *
     * @param {number} x X coordinate, origin is (0) (top left hand corner) [Not zero idnexed]
     * @param {number} y Y coordinate, origin is (0) (top left hand corner) [Not zero indexed]
     * @param {string} id A unique object ID
     * @param {string} value An emoji for said object to display on the plane. Defaults to objectID
     * @param {boolean} detectCollision Detect collision on other Objects.
     */
    constructor(
        x: number,
        y: number,
        id: string,
        value?: string,
        detectCollision?: boolean
    );

    /**
     * X coordinate
     */
    x: number;
    /**
     * Y coordinate
     */
    y: number;
    /**
     *  Unique Identifier
     */
    id: string;
    /**
     * Value for it to return when displayed on the plane.
     */
    value: string;
    /**
     * Detect collision, if false, it will pass through existing PlaneObjects
     */
    detectCollision: boolean;
}

export { Game, Plane, PlaneObject };
