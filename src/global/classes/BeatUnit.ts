/**
 * A beat unit is a fraction of a whole note that represents the duration of a note.
 * This is used for things like tempo and pulse.
 */
class BeatUnit {
    readonly value: number;
    readonly name: string;

    private constructor(value: number, name: string) {
        this.value = value;
        this.name = name;
    }

    // The following are the beat units that are available
    static readonly WHOLE = new BeatUnit(1, "WHOLE");
    static readonly HALF = new BeatUnit(1 / 2, "HALF");
    static readonly DOTTED_HALF = new BeatUnit(3 / 4, "DOTTED HALF");
    static readonly QUARTER = new BeatUnit(1 / 4, "QUARTER");
    static readonly DOTTED_QUARTER = new BeatUnit(3 / 8, "DOTTED QUARTER");
    static readonly EIGHTH = new BeatUnit(1 / 8, "EIGHTH");
    static readonly DOTTED_EIGHTH = new BeatUnit(3 / 16, "DOTTED EIGHTH");
    static readonly SIXTEENTH = new BeatUnit(1 / 16, "SIXTEENTH");
    static readonly DOTTED_SIXTEENTH = new BeatUnit(3 / 32, "DOTTED SIXTEENTH");
    static readonly THIRTY_SECOND = new BeatUnit(1 / 32, "THIRTY-SECOND");
    static readonly SIXTY_FOURTH = new BeatUnit(1 / 64, "64TH");
    /** An array of all supported beat units */
    static readonly ALL = [
        BeatUnit.WHOLE,
        BeatUnit.HALF,
        BeatUnit.DOTTED_HALF,
        BeatUnit.QUARTER,
        BeatUnit.DOTTED_QUARTER,
        BeatUnit.EIGHTH,
        BeatUnit.DOTTED_EIGHTH,
        BeatUnit.SIXTEENTH,
        BeatUnit.DOTTED_SIXTEENTH,
        BeatUnit.THIRTY_SECOND,
        BeatUnit.SIXTY_FOURTH
    ];

    /**
     * Returns the string representation of the beat unit.
     */
    toString() {
        return this.name;
    }

    /**
     * Returns the fraction representation in a string.
     *
     * E.g. Half -> 1/2, dotted quarter -> 3/8
     */
    toFractionString() {
        switch (this.name) {
            case "WHOLE": return '1/1';
            case "HALF": return '1/2';
            case "DOTTED HALF": return '3/4';
            case "QUARTER": return '1/4';
            case "DOTTED QUARTER": return '3/8';
            case "EIGHTH": return '1/8';
            case "DOTTED_EIGHTH": return '3/16';
            case "SIXTEENTH": return '1/16';
            case "DOTTED_SIXTEENTH": return '3/32';
            case "THIRTY_SECOND": return '1/32';
            case "SIXTY_FOURTH": return '1/64';
            default: throw new Error(`Invalid beat unit name: ${this.name}`);
        }
    }

    /**
     * @param other The other beat unit to compare to.
     * @returns True if the other beat unit is equal to this beat unit.
     */
    equals(other: BeatUnit): boolean {
        return this.value === other.value && this.name === other.name;
    }

    /**
     * Returns the beat unit from the string representation.
     * @param name The name of the beat unit. (e.g. "DOTTED HALF")
     * @returns The beat unit object.
     */
    static fromName(name: string): BeatUnit {
        switch (name) {
            case "WHOLE": return BeatUnit.WHOLE;
            case "HALF": return BeatUnit.HALF;
            case "DOTTED HALF": return BeatUnit.DOTTED_HALF;
            case "QUARTER": return BeatUnit.QUARTER;
            case "DOTTED QUARTER": return BeatUnit.DOTTED_QUARTER;
            case "EIGHTH": return BeatUnit.EIGHTH;
            case "DOTTED_EIGHTH": return BeatUnit.DOTTED_EIGHTH;
            case "SIXTEENTH": return BeatUnit.SIXTEENTH;
            case "DOTTED_SIXTEENTH": return BeatUnit.DOTTED_SIXTEENTH;
            case "THIRTY_SECOND": return BeatUnit.THIRTY_SECOND;
            case "SIXTY_FOURTH": return BeatUnit.SIXTY_FOURTH;
            default: throw new Error(`Invalid beat unit name: ${name}`);
        }
    }

    /**
     * @param beatUnitString A string representation of the beat unit's value. (e.g. "1/4")
     * @returns BeatUnit object representing the beat unit
     */
    static fromString(beatUnitString: string): BeatUnit {
        let value = 0;
        if (beatUnitString.includes('/'))
            value = parseInt(beatUnitString.split('/')[0]) / parseInt(beatUnitString.split('/')[1]);
        else
            value = parseInt(beatUnitString);

        switch (value) {
            case 1: return BeatUnit.WHOLE;
            case 1 / 2: return BeatUnit.HALF;
            case 3 / 4: return BeatUnit.DOTTED_HALF;
            case 1 / 4: return BeatUnit.QUARTER;
            case 3 / 8: return BeatUnit.DOTTED_QUARTER;
            case 1 / 8: return BeatUnit.EIGHTH;
            case 3 / 16: return BeatUnit.DOTTED_EIGHTH;
            case 1 / 16: return BeatUnit.SIXTEENTH;
            case 3 / 32: return BeatUnit.DOTTED_SIXTEENTH;
            case 1 / 32: return BeatUnit.THIRTY_SECOND;
            case 1 / 64: return BeatUnit.SIXTY_FOURTH;
            default: throw new Error(`Invalid beat unit string: ${beatUnitString}`);
        }
    }
}

export default BeatUnit;
